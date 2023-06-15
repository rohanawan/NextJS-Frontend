import React, { useState, useEffect } from "react";
import ProductService from "@/app/services/ProductService";
import Loader from "../loader/Loader";

/* eslint-disable */
const Table = ({ isLoading, setLoading }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const skip = (currentPage - 1) * itemsPerPage;
        const response = await ProductService.pagination(skip, itemsPerPage);
        setProducts(response);
        setTotalPages(Math.ceil(response?.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [currentPage]);

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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto sm:h-[300px] md:h-[300px] lg:h-full">
      {!isLoading ? (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left font-semibold">Title</th>
                <th className="py-2 px-4 text-left font-semibold">
                  Description
                </th>
                <th className="py-2 px-4 text-left font-semibold">Price</th>
                <th className="py-2 px-4 text-left font-semibold">Category</th>
                <th className="py-2 px-4 text-left font-semibold">Brand</th>
                <th className="py-2 px-4 text-left font-semibold">Stock</th>
                <th className="py-2 px-4 text-left font-semibold">Thumbnail</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products?.products?.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="text-sm py-1 px-4">{item.title}</td>
                  <td className="text-sm py-1 px-4">{item.description}</td>
                  <td className="text-sm py-1 px-4">{item.price}</td>
                  <td className="text-sm py-1 px-4">{item.category}</td>
                  <td className="text-sm py-1 px-4">{item.brand}</td>
                  <td className="text-sm py-1 px-4">{item.stock}</td>
                  <td className="text-sm py-1 px-4">
                    <img
                      src={item.thumbnail}
                      alt={item.thumbnail}
                      className="h-10 w-10"
                    />
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
                {products.total}
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Table;
