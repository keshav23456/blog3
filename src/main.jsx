// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { AuthLayout, Login } from "./components/index.js";
// import AddPost from "./pages/AddPost.jsx";
// import Signup from "./pages/Signup.jsx";
// import EditPost from "./pages/EditPost.jsx";
// import Home from "./pages/Home.jsx";
// // import Login from "./pages/Login.jsx";
// import Post from "./pages/Post.jsx";
// import AllPost from "./pages/AllPost.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <Signup />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             {""}
//             <AllPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <AddPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <EditPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// );


// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { AuthLayout, ErrorPage } from "./components/index.js";

// // Lazy-loaded pages for better performance
// const Home = React.lazy(() => import("./pages/Home.jsx"));
// const Login = React.lazy(() => import("./pages/Login.jsx"));
// const Signup = React.lazy(() => import("./pages/Signup.jsx"));
// const AllPost = React.lazy(() => import("./pages/AllPost.jsx"));
// const AddPost = React.lazy(() => import("./pages/AddPost.jsx"));
// const EditPost = React.lazy(() => import("./pages/EditPost.jsx"));
// const Post = React.lazy(() => import("./pages/Post.jsx"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />, // Global error boundary
//     children: [
//       {
//         index: true,
//         element: (
//           <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Home...</div>}>
//             <Home />
//           </React.Suspense>
//         ),
//       },
//       {
//         path: "login",
//         element: (
//           <AuthLayout authentication={false}>
//             <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Login...</div>}>
//               <Login />
//             </React.Suspense>
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Signup...</div>}>
//               <Signup />
//             </React.Suspense>
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "all-posts",
//         element: (
//           <AuthLayout authentication>
//             <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Posts...</div>}>
//               <AllPost />
//             </React.Suspense>
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "add-post",
//         element: (
//           <AuthLayout authentication>
//             <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Editor...</div>}>
//               <AddPost />
//             </React.Suspense>
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Editor...</div>}>
//               <EditPost />
//             </React.Suspense>
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "post/:slug",
//         element: (
//           <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Post...</div>}>
//             <Post />
//           </React.Suspense>
//         ),
//       },
//       {
//         path: "*",
//         element: (
//           <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-4xl font-bold">404</h1>
//             <p className="text-xl mt-4">Page Not Found</p>
//             <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Go Home
//             </Link>
//           </div>
//         ),
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );



import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import React from "react";

// Lazy-loaded pages for better performance
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup.jsx"));
const AllPost = React.lazy(() => import("./pages/AllPost.jsx"));
const AddPost = React.lazy(() => import("./pages/AddPost.jsx"));
const EditPost = React.lazy(() => import("./pages/EditPost.jsx"));
const Post = React.lazy(() => import("./pages/Post.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Home...</div>}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Login...</div>}>
            <Login />
          </React.Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Signup...</div>}>
            <Signup />
          </React.Suspense>
        ),
      },
      {
        path: "all-posts",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Posts...</div>}>
            <AllPost />
          </React.Suspense>
        ),
      },
      {
        path: "add-post",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Editor...</div>}>
            <AddPost />
          </React.Suspense>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Editor...</div>}>
            <EditPost />
          </React.Suspense>
        ),
      },
      {
        path: "post/:slug",
        element: (
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Post...</div>}>
            <Post />
          </React.Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Go Home
            </Link>
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);