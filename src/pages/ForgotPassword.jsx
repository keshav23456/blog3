import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Logo, Container } from "../components";
import { useForm } from "react-hook-form";
import AuthService from "../appwrite/auth";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleForgotPassword = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await AuthService.sendPasswordRecoveryEmail(data.email);
      setSuccess(true);
    } catch (error) {
      setError(error.message || "Failed to send recovery email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Container>
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 mb-4">
                <Logo size="default" />
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Check your email
              </h2>
              <p className="text-sm text-center text-gray-600">
                We've sent password reset instructions to your email address.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Click the link in the email to reset your password. The link will expire in 1 hour.
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full text-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Container>
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 mb-4">
              <Logo size="default" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Forgot your password?
            </h2>
            <p className="text-sm text-center text-gray-600">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />

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
                  Sending...
                </span>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-purple-600 hover:text-purple-500 font-medium"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;


