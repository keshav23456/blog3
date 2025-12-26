import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Logo, Container, Button } from "../components";
import AuthService from "../appwrite/auth";

function VerifyEmail() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !secret) {
        setError("Invalid verification link.");
        setIsVerifying(false);
        return;
      }

      try {
        await AuthService.verifyEmail(userId, secret);
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Email verified successfully! Please login." }
          });
        }, 3000);
      } catch (error) {
        setError(error.message || "Email verification failed. The link may have expired.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [userId, secret, navigate]);

  const handleResendVerification = async () => {
    try {
      await AuthService.sendVerificationEmail();
      alert("Verification email sent! Please check your inbox.");
    } catch (error) {
      alert("Failed to send verification email. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Container>
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 mb-4">
              <Logo size="default" />
            </div>

            {isVerifying && (
              <>
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Verifying your email...
                </h2>
                <p className="text-sm text-center text-gray-600">
                  Please wait while we verify your email address
                </p>
              </>
            )}

            {!isVerifying && success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Email Verified!
                </h2>
                <p className="text-sm text-center text-gray-600">
                  Your email has been successfully verified. Redirecting to login...
                </p>
              </>
            )}

            {!isVerifying && error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Verification Failed
                </h2>
                <p className="text-sm text-center text-gray-600 mb-4">
                  {error}
                </p>
              </>
            )}
          </div>

          {!isVerifying && error && (
            <div className="space-y-3">
              <Button
                onClick={handleResendVerification}
                className="w-full"
              >
                Resend Verification Email
              </Button>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}

          {!isVerifying && success && (
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Login
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}

export default VerifyEmail;


