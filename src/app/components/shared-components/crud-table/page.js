"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserService from "@/app/services/UserService";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

/* eslint-disable */
const CrudTable = ({ isUserCreated, setIsUserCreated }) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRowId, setEditingRowId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [loadingButtonIndex, setLoadingButtonIndex] = useState(null);
  const itemsPerPage = 10;
  const { token } = useSelector((state) => state.auth);

  const handleEdit = (rowId) => {
    const row = data?.results?.find((item) => item.id === rowId);
    if (row) {
      setEditingRowId(rowId);
      setEditedName(row.name);
      setEditedEmail(row.email);
    }
  };

  const handleSave = async (rowId) => {
    try {
      const id = editingRowId;
      const data = {
        name: editedName,
        email: editedEmail,
      };
      setIsLoading(true);
      const response = await UserService.update(id, data, token);
      if (response) {
        toast.success("User Updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "success-notification",
        });
      }
      setData((prevData) => ({
        ...prevData,
        results: prevData.results.map((item) => {
          if (item.id === rowId) {
            return {
              ...item,
              name: editedName,
              email: editedEmail,
            };
          }
          return item;
        }),
      }));
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setEditingRowId(null);
      setEditedName("");
      setEditedEmail("");
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowId) => {
    try {
      const data = {
        id: rowId,
        token,
      };
      setLoadingButtonIndex(rowId);
      await UserService.delete(data);
      toast.success("User Deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "success-notification",
      });
      const payload = {
        currentPage,
        token,
      };
      const response = await UserService.get(payload);
      setData(response);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoadingButtonIndex(null);
    }
  };

  const handleCancel = () => {
    // Clear the editing state without saving changes
    setEditingRowId(null);
    setEditedName("");
    setEditedEmail("");
    setEditedPassword("");
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const payload = {
          currentPage,
          token,
        };
        setIsLoading(true);
        if (isUserCreated) {
          setIsUserCreated(false);
          const response = await UserService.get(payload);
          setData(response);
        }
        const response = await UserService.get(payload);
        setData(response);
        setTotalPages(response.totalPages);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, isUserCreated]);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto">
          <div className="mx-auto">
            <div className="bg-white rounded-md shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">Name</th>
                      <th className="px-4 py-2 border-b">Email</th>
                      <th className="px-4 py-2 border-b">Role</th>
                      <th className="px-4 py-2 border-b">Password</th>
                      <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.results?.map((row) => (
                      <tr key={row.id}>
                        <td className="px-4 py-2 border-b text-center">
                          {editingRowId === row.id ? (
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                          ) : (
                            row.name
                          )}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                          {editingRowId === row.id ? (
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                            />
                          ) : (
                            row.email
                          )}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                          {row.role}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                          {editingRowId === row.id ? (
                            <input
                              type="password"
                              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editedPassword}
                              onChange={(e) =>
                                setEditedPassword(e.target.value)
                              }
                            />
                          ) : (
                            "********"
                          )}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                          {editingRowId === row.id ? (
                            <>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={() => handleSave(row.id)}
                              >
                                Save
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={() => handleEdit(row.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => handleDelete(row.id)}
                              >
                                {loadingButtonIndex === row.id
                                  ? "Deleting.."
                                  : "Delete"}
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col items-center pb-4 pt-4">
                  <span className="text-sm text-gray-700 dark:text-gray-400 pb-2">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-black">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900 dark:text-black">
                      {endIndex}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-black">
                      {data.totalResults}
                    </span>{" "}
                    Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      onClick={goToPrevPage}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-black">
                      {currentPage}
                    </span>
                    <button
                      onClick={goToNextPage}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CrudTable;
