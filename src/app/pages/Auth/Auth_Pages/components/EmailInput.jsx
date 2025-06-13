import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from "sweetalert2";

export default function EmailInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (!captchaToken) {
      setError('Please complete the CAPTCHA');
      return;
    }

    setIsSubmitting(true);
    const url = process.env.REACT_APP_AUTH_URL + '/send-email-otp';
    try {
      const response = await axios.post(url, { email, token: captchaToken });

      if (response.status === 200) {
        navigate('/user-otp', { state: { type: 'email', value: email } });
      } else {
        setError('Failed to send OTP, please try again.');
      }
    } catch (error) {
      setError('An error occurred, please try again.');
      console.error('Error details:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched) {
      setError(validateEmail(e.target.value));
    }
  };

  return (
    <div className="p-4 w-100">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-black-70" htmlFor="email">
            Email <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control ${touched && error ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            onBlur={() => setTouched(true)}
            value={email}
            required
          />
          {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>

        <ReCAPTCHA
          sitekey="6LdLNhAmAAAAANFJxdmha-Pz3IK4L1XHa9S-R4l_"
          onChange={handleCaptchaChange}
          className="mx-auto my-3"
        />
        {touched && !captchaToken && (
          <div className="text-danger mt-1">Please complete the CAPTCHA</div>
        )}

        <button
          className="btn btn-primary px-8 py-2 w-100"
          type="submit"
          disabled={isSubmitting || !captchaToken}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
