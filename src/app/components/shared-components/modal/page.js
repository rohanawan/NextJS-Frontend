"use client"

import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import UserService from '@/app/services/UserService';
import { toast } from "react-toastify";
import { validationSchema } from '@/app/utils/createValidationSchema';

const Modal = ({open, setOpen, setIsUserCreated}) => {
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await UserService.signup(values);
        if(response){
          toast.success('User Created successfully!', {
            position: toast.POSITION.TOP_RIGHT, 
            className: 'success-notification', 
          });
        }
        setIsUserCreated(true)
      } catch (err) {
        toast.error(`${err.message}`, {
          position: toast.POSITION.TOP_RIGHT, 
        });
    } finally {
        setIsLoading(false);
        setOpen(false);
      }
    }
  })
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          show={open}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              show={open}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <UserCircleIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                    </div>
                      <Dialog.Title as="h3" className="flex justify-center text-base font-semibold leading-6 text-gray-900">
                        Add User
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                            </label>
                            <input
                            className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              autoComplete="email"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            />
                            {formik.touched.email && formik.errors.email && (
                              <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              autoComplete="current-password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            />
                            {formik.touched.password && formik.errors.password && (
                              <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
                            )}
                          </div>
                          <div className="mb-6">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                              Role
                            </label>
                            <select
                              id="role"
                              name="role"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.role}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              <option value="">Select a role</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                              <p className="mt-2 text-sm text-red-500">{formik.errors.role}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              type="submit"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            >         
                            {isLoading ? 'Loading..' : 'Add User'}                  
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;