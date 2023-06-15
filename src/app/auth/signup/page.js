"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import UserService from '../../services/UserService';
import { validationSchema } from '@/app/utils/createValidationSchema';
const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("123")
      try {
        setIsLoading(true);
        const response = await UserService.signup(values);
        if(response){
          toast.success('Signup successful!', {
            position: toast.POSITION.TOP_RIGHT, 
            className: 'success-notification', 
          });
        }
        router.push('/auth/signin')
      } catch (err) {
        toast.error(`${err.message}`, {
          position: toast.POSITION.TOP_RIGHT, 
        });
      } finally {
        setIsLoading(false);
      }
    }
  })
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md shadow-lg ring-1 ring-gray-300 pt-8">
          <div className='flex justify-center'>
            <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
          </div>          
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="name">
                  Name
                </label>
                <input
                className='w-full mt-2 p-2 rounded border border-solid'
                type="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
              )}
              </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                Email
              </label>
              <input
                className='w-full mt-2 p-2 rounded border border-solid'
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold " htmlFor="password">
                Password
              </label>
              <input
              type="password"
              className='w-full mt-2 p-2 rounded border border-solid'
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
            <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="role">
                Role
              </label>
              <select
                className="w-full mt-2 p-2 rounded border border-gray-300 border border-solid"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-sm text-red-500">{formik.errors.role}</div>
              )}
            </div>
            <div className="">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
                type="submit"
              >
                {isLoading ? "Loading..." :"Sign Up"}
              </button>
              <Link href="/auth/signin"
              className='text-sm text-gray-500 underline'>
                  Do you already have an account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
export default Signup;
  