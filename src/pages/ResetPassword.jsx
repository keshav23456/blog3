import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Logo, Container } from "../components";
import { useForm } from "react-hook-form";
import AuthService from "../appwrite/auth";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  useEffect(() => {
    if (!userId || !secret) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [userId, secret]);

  const handleResetPassword = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await AuthService.resetPassword(userId, secret, data.password, data.confirmPassword);
      // Success - redirect to login
      navigate("/login", {
        state: { message: "Password reset successful! Please login with your new password." }
      });
    } catch (error) {
      setError(error.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Container>
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 mb-4">
              <Logo size="default" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Reset your password
            </h2>
            <p className="text-sm text-center text-gray-600">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {(!userId || !secret) ? (
            <div className="text-center">
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                This password reset link is invalid or has expired.
              </div>
              <Button
                onClick={() => navigate("/forgot-password")}
                className="w-full"
              >
                Request New Reset Link
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain uppercase, lowercase, and number"
                  }
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === password || "Passwords do not match"
                })}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Password requirements:</strong>
                  <br />• At least 8 characters
                  <br />• One uppercase letter
                  <br />• One lowercase letter
                  <br />• One number
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;


