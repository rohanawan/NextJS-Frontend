"use client";

import React, { useState } from "react";
import Navbar from "../components/shared-components/nav-bar/Navbar";
import Modal from "../components/shared-components/modal/page";
import CrudTable from "../components/shared-components/crud-table/page";

const UserForm = () => {
  const [open, setOpen] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar />
      <Modal
        open={open}
        setOpen={setOpen}
        setIsUserCreated={setIsUserCreated}
        isUserCreated={isUserCreated}
      />
      <div className="flex justify-center h-screen">
        <div className="container w-full pt-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">User List</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              onClick={handleModal}
            >
              Add User
            </button>
          </div>
          <div>
            <CrudTable
              isUserCreated={isUserCreated}
              setIsUserCreated={setIsUserCreated}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
