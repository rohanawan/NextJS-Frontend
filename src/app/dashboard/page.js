"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/shared-components/header/Header";
import Navbar from "../components/shared-components/nav-bar/Navbar";
import ProductService from "../services/ProductService";
import RatingBar from "../components/shared-components/rating/Rating";
import Loader from "../components/shared-components/loader/Loader";
import LoadButton from "../components/shared-components/button/LoadButton";

const Dashboard = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await ProductService.get(limit);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [limit]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products?.products?.filter(
        (product) =>
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [products, searchQuery]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const response = await ProductService.get();
        const products = response;
        const filtered = products?.products?.filter(
          (product) =>
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
      }
      setLoading(false);
    }, 700),
    [searchQuery]
  );

  const loadMore = () => {
    setLimit(limit + 10);
  };

  return (
    <>
      <Navbar />
      <Header />
      <main>
        <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
          <div className="w-full px-4 mb-4">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Search by brand or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {!isLoading ? (
          <section className="pt-20 pb-10 lg:pb-20 bg-[#F3F4F6]">
            <div className="container mx-auto">
              <div className="flex flex-wrap -mx-4">
                {filteredProducts?.length ? (
                  filteredProducts?.map((item, index) => {
                    return (
                      <div
                        className="w-full md:w-1/2 xl:w-1/3 px-4"
                        key={index}
                      >
                        <div className="bg-white rounded-lg overflow-hidden mb-10">
                          <img
                            src={item.thumbnail}
                            alt="image"
                            className="w-full sm:h-[250px] md:h-[250px] lg:h-[250px] xl:h-[250px] 2xl:h-[250px]"
                          />
                          <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                            <h1 className="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4">
                              {item.category.toUpperCase()}
                            </h1>
                            <h1 className="font-semibold text-dark text-lg sm:text-[22px] md:text-xl lg:text-[22px] xl:text-lg 2xl:text-[18px] mb-4">
                              {item.brand} - {item.title}
                            </h1>
                            <p className="text-base text-body-color leading-relaxed mb-7 overflow-y-auto sm:h-32 md:h-32 lg:h-32 xl:h-32 2xl:h-32 pt-6">
                              {item.description}
                            </p>
                            <RatingBar rating={item.rating} />
                            <div className="flex justify-between pt-4">
                              <p>Price: {item.price} Rs</p>
                              <p>Discount: {item.discountPercentage}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full px-4">
                    <div className="mb-10">
                      <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                        <h1 className="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4">
                          No Product Found
                        </h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {products?.products?.length !== products?.total &&
              filteredProducts?.length &&
              limit ? (
                <LoadButton handleClick={loadMore} text={"Load More"} />
              ) : (
                ""
              )}
            </div>
          </section>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
};

export default Dashboard;
