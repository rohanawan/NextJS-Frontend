"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../redux/actions";
import UserService from "@/app/services/UserService";
import { validationSchema } from "@/app/utils/validation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await UserService.login(values);
        if (response) {
          localStorage.setItem("authToken", response.tokens.access.token);
          localStorage.setItem("refreshToken", response.tokens.refresh.token);
          toast.success("login successful!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "success-notification",
          });
          dispatch(
            login(
              response.user,
              response.tokens.access.token,
              response.user.role
            )
          );
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error(`${err.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md shadow-lg ring-1 ring-gray-300 pt-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
        </div>
        <form
          className="bg-white rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full mt-2 p-2 rounded border border-solid"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 p-2 rounded border border-solid"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
              {isLoading ? "Loading" : "Sign In"}
            </button>
            <Link href="/auth/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
