import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Role-based access control component
 * 
 * Roles hierarchy: admin > author > reader
 * - admin: Can do everything (manage users, all posts, settings)
 * - author: Can create/edit/delete own posts
 * - reader: Can only read posts (default)
 */

const ROLE_HIERARCHY = {
  admin: 3,
  author: 2,
  reader: 1,
};

function RoleGuard({ children, allowedRoles = [], requireVerifiedEmail = false }) {
  const { status, userRole, isEmailVerified } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is logged in
  if (!status) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check email verification if required
  if (requireVerifiedEmail && !isEmailVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Email Verification Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please verify your email address to access this feature.
          </p>
          <button
            onClick={async () => {
              const AuthService = (await import('../appwrite/auth')).default;
              try {
                await AuthService.sendVerificationEmail();
                alert("Verification email sent! Please check your inbox.");
              } catch (error) {
                alert("Failed to send verification email.");
              }
            }}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  // Check role permissions
  if (allowedRoles.length > 0) {
    const userRoleLevel = ROLE_HIERARCHY[userRole] || 0;
    const hasPermission = allowedRoles.some(
      role => userRoleLevel >= ROLE_HIERARCHY[role]
    );

    if (!hasPermission) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
              <br />
              <span className="text-sm">Your role: <span className="font-semibold capitalize">{userRole}</span></span>
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

export default RoleGuard;


