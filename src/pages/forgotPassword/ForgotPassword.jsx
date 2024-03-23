import React, { useState } from "react";
import "./ForgotPassword.css";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSendLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    const email = e.target[0].value;
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({
        type: "success",
        message: "An email for resetting your password has been sent.📧",
      });
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        return setStatus({
          type: "error",
          message:
            "User not found with this email address. Please try again 🙁",
        });
      }
      setStatus({
        type: "error",
        message: err.message.replace("Firebase:", ""),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container form-container absolute-center">
      <div className="photogram-logo">Okv Photogram</div>
      <form
        className="send-email-form form-wrapper absolute-center"
        onSubmit={handleSendLink}
      >
        <HiOutlineLockClosed size={80} />
        <h3>Forgot password</h3>
        <p>
          Enter your email and we'll send you a link to get back into your
          account.
        </p>
        <input
          type="email"
          placeholder="Email address"
          aria-label="Enter your email address"
          aria-required="true"
          autoComplete="off"
          name="email"
          required
        />
        <button
          type="submit"
          title="Send link"
          disabled={isLoading || status.type === "success"}
          className="submit-button cur-point"
        >
          {isLoading ? "Sending..." : "Send link"}
        </button>
        {status.message ? (
          <p
            className={`${
              status.type === "error" ? "errorMessage" : "successMessage"
            } `}
          >
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default ForgotPassword;
