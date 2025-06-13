import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axios";
import { IoReloadOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import ksa from "../image/KSA.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export default function PhoneInput() {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState('');

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validate: (values) => {
      const errors = {};
      const phoneRegex = /^(\+?966|0)?5\d{8}$/;

      if (!values.phone) {
        errors.phone = "Phone number is required";
      } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone number";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        let normalizedPhone = values.phone;

        if (normalizedPhone.startsWith("+")) {
          normalizedPhone = normalizedPhone.substring(1);
        }
        if (normalizedPhone.startsWith("966")) {
          normalizedPhone = "0" + normalizedPhone.substring(3);
        }
        if (!normalizedPhone.startsWith("0")) {
          normalizedPhone = "0" + normalizedPhone;
        }

        const url = process.env.REACT_APP_AUTH_URL + "/send-sms-otp"; 
        const response = await axiosInstance.post(url, {
          phone: normalizedPhone,
          token: captchaToken,
        });

        if (response.status === 200) {
          navigate("/user-otp", {
            state: { type: "phone", value: normalizedPhone },
          });
        } else {
          setErrors({ phone: "Failed to send OTP" });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server error occurred",
        });
        setErrors({ phone: "Server error occurred" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <img src={ksa} width={35} height={35} alt="Country code" />
            </span>
            <input
              className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              required
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>

        <ReCAPTCHA
          sitekey="6LdLNhAmAAAAANFJxdmha-Pz3IK4L1XHa9S-R4l_"
          onChange={handleCaptchaChange}
          className="mx-auto my-3"
        />
        {formik.touched.phone && !captchaToken && (
          <div className="text-danger mt-1">Please complete the CAPTCHA</div>
        )}

        <div className="row flex-end my-3">
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={formik.isSubmitting || !captchaToken}
          >
            {formik.isSubmitting && (
              <IoReloadOutline size={25} className="spinner-border" />
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
