import React, { useEffect, useRef, useState } from "react";
import "./Verification.css";
import "../forgotPassword/ForgotPassword.css";
import {
  HiCheckBadge,
  HiOutlineLockClosed,
  HiMagnifyingGlassMinus,
} from "react-icons/hi2";
import { confirmPasswordReset, applyActionCode } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { Link } from "react-router-dom";

const Verification = () => {
  const currentUrl = new URL(window.location.href);

  const mode = currentUrl.searchParams.get("mode");
  const code = currentUrl.searchParams.get("oobCode");

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsLoading(true);
    try {
      if (!formRef.current || !code) return;
      const formData = new FormData(formRef.current);
      const password = formData.get("password");
      const confirmPassword = formData.get("confirm-password");

      if (password !== confirmPassword) {
        throw Error(
          "The new password and the confirmation password do not match"
        );
      }
      await confirmPasswordReset(auth, code, confirmPassword);
      setStatus({
        type: "success",
        message: "Your password has been updated. 🎉",
      });
    } catch (err) {
      if (err.code === "auth/invalid-action-code") {
        return setStatus({
          type: "error",
          message: "Invalid code or expired code. Please try again. 😕",
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

  const handleVerifyEmail = async () => {
    setStatus({ type: "", message: "" });
    if (mode !== "verifyEmail" || !code) return;
    try {
      await applyActionCode(auth, code);
    } catch (err) {
      if (err.code === "auth/invalid-action-code") {
        return setStatus({
          type: "error",
          message: "Invalid code or expired code. Please try again. 😕",
        });
      }
      setStatus({
        type: "error",
        message: err.message.replace("Firebase:", ""),
      });
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <div className="form-container absolute-center">
      <div className="photogram-logo">Okv Photogram</div>
      {mode === "resetPassword" ? (
        <form
          className="form-wrapper absolute-center"
          ref={formRef}
          onSubmit={handlePasswordReset}
        >
          <HiOutlineLockClosed size={80} />
          <h3>Reset password</h3>
          <p>
            Please create a strong and unique password that you'll remember.
          </p>
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            autocomplete="new-password"
            required
            minlength={8}
          />
          <input
            type="password"
            name="confirm-password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            autocomplete="new-password"
            required
            minlength={8}
          />
          <button
            type="submit"
            title="update"
            disabled={isLoading || status.type === "success"}
            className="submit-button cur-point"
          >
            {isLoading ? "Updating..." : "Update Password"}
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
          {status.type === "sucess" ? (
            <p>
              Now you can login to you account{" "}
              <Link to="/login" replace={true} className="cur-point">
                Login
              </Link>
            </p>
          ) : null}
        </form>
      ) : mode === "verifyEmail" ? (
        <>
          {!status.message ? (
            <div className="verification-wrapper form-wrapper absolute-center">
              <HiCheckBadge size={100} color="#0095f6" />

              <p>
                Email verification successful. You may now log in to your
                account.
              </p>

              <Link
                to="/login"
                replace={true}
                className="login-link submit-button cur-point"
              >
                Login
              </Link>
            </div>
          ) : (
            <p
              className={`${
                status.type === "error" ? "errorMessage" : "successMessage"
              } `}
            >
              {status.message}
            </p>
          )}
        </>
      ) : (
        <div className="verification-wrapper form-wrapper absolute-center">
          <HiMagnifyingGlassMinus size={80} color="#0095f6" />

          <p>
            It appears that the requested code is not found in the URL. Please
            try again or return to the home page.
          </p>

          <Link
            to="/"
            replace={true}
            className="login-link submit-button cur-point"
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Verification;
