import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../api/axios";
import { IoReloadOutline } from "react-icons/io5";
import useAuthContext from "../../../Auth/AuthContext";
import ReactGA from "react-ga4";
import Swal from "sweetalert2";
import axios from "axios";

const UserOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [err, setError] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { TokenSave, getUser, navCount } = useAuthContext();
  
  const otpInputRefs = useRef([]);

  const type = location.state?.type;
  const userValue = location.state?.value;

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: "OTP Verification",
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!location.state?.type) {
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (otp.join("").length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonDisabled(false);
    }
  }, [secondsLeft]);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError(true);
      return;
    }
    setLoadingVerification(true);

    try {
      const apiURL = type === "phone" ? process.env.REACT_APP_AUTH_URL +"/phone-login" : process.env.REACT_APP_AUTH_URL +"/email-login";
      const uuid = localStorage.getItem("uuid");
      const response = await axios.post(apiURL, {
        [type]: userValue,
        code: otpValue,
        uuid: "uuid",
      });
      setLoadingVerification(false);
        console.log('response',response);
        
        if (response.data.data.status === 200) {
        console.log('response22',response);
        // Swal.fire("Success", "OTP verified successfully", "success");
        TokenSave("access_token", response.data.data.token);
        getUser();
        if (navCount <= 2) {
          navigate("/");
        } else {
          navigate(-2);
        }
      } else {
        // Swal.fire("Error", "Failed to verify OTP", "error");
        setError(true);
      }
    } catch (error) {
      setLoadingVerification(false);
      const errorMessage =
        error?.response?.data?.messages === "incorrect code"
          ? "Invalid code entered"
          : "An error occurred during OTP verification";
      // Swal.fire("Error", errorMessage, "error");
    }
  };

  const resendOTP = async () => {
    setLoadingResend(true);

    const url = type === "phone" ? process.env.REACT_APP_AUTH_URL + "/send-sms-otp" : process.env.REACT_APP_AUTH_URL + "/send-email-otp";
    try {
      const response = await axios.post(url, {
        [type]: userValue,
      });

      if (response.status === 200) {
        // Swal.fire("Success", "OTP resent successfully", "success");
        setSecondsLeft(60);
        setIsButtonDisabled(true);
      } else {
        // Swal.fire("Error", "Failed to resend OTP", "error");
      }
    } catch (error) {
      // Swal.fire("Error", "An error occurred while resending OTP", "error");
    } finally {
      setLoadingResend(false);
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent the default backspace behavior
      const newOtp = [...otp];

      if (otp[index] === "" && index > 0) {
        newOtp[index - 1] = ""; // Clear the previous input
        otpInputRefs.current[index - 1].focus(); // Focus the previous input
      } else {
        newOtp[index] = ""; // Clear the current input
      }
      setOtp(newOtp);
    }
  };

  // Handle OTP paste event
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      otpInputRefs.current[5].focus(); // Focus the last input
    }
  };

  return (
    <div className="w-100  d-flex justify-content-center align-items-center vh-100">
      <Outlet />
      <div className=" w-100 d-flex flex-column align-items-center my-5">
        <section className=" w-100 card shadow-lg rounded-lg p-4 mx-auto" >
          <div className="my-4 text-center">
            <h3 className="font-weight-bold">Enter OTP</h3>
            <h5>{type === "phone" ? "Phone Number" : "Email Address"}</h5>
            <p className="text-muted">
              OTP sent to <span className="text-primary">{userValue}</span>
            </p>
          </div>

          <div className="container d-flex justify-content-center mb-4">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                className="form-control text-center mx-1"
                style={{ width: "20%" }}
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste} // Added paste handler
                ref={(el) => (otpInputRefs.current[index] = el)}
              />
            ))}
          </div>

          <div className="text-center d-flex flex-column align-items-center gap-2">
            <button
              className={`btn btn-primary w-50 ${err || otp.join("").length < 6 ? "disabled" : ""}`}
              onClick={handleVerifyOtp}
              disabled={err || otp.join("").length < 6}
            >
              {loadingVerification && <IoReloadOutline className="spinner-border" />}
              Verify OTP
            </button>
            <button
              onClick={resendOTP}
              className="btn btn-outline-secondary w-50 mt-2"
              disabled={isButtonDisabled}
            >
              {loadingResend ? (
                <IoReloadOutline className="spinner-border" />
              ) : isButtonDisabled ? (
                `Resend OTP in ${secondsLeft}s`
              ) : (
                "Resend OTP"
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserOtp;
