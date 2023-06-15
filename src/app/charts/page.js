'use client'

import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import LineChart from '../components/shared-components/charts/lineChart';
import Navbar from '../components/shared-components/nav-bar/Navbar';
import DonutChart from '../components/shared-components/charts/donutChart';
import Table from '../components/shared-components/table/Table';
import Loader from '../components/shared-components/loader/Loader';

const DashboardOverview = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.get(limit)
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchData();
  }, [limit]);

  const getAverageRating = () => {
    const ratings = products?.products?.map((product) => product.rating);
    const sum = ratings?.reduce((acc, curr) => acc + curr, 0);
    const average = sum / ratings?.length;
    return average.toFixed(1);
  };


  const getAverageRatingOfCategory = () => {
    const categories = {};
    const counts = {};
  
    products?.products?.forEach((product) => {
      if (categories[product.category]) {
        categories[product.category] += product.rating;
        counts[product.category]++;
      } else {
        categories[product.category] = product.rating;
        counts[product.category] = 1;
      }
    });
  
    const averages = {};
  
    for (const category in categories) {
      const average = categories[category] / counts[category];
      averages[category] = average.toFixed(1)
    }
  
    return averages;
  };

  const getProductsByCategory = () => {
    const categories = {};
  
    products?.products?.forEach((product) => {
      if (categories[product.category]) {
        categories[product.category]++;
      } else {
        categories[product.category] = 1;
      }
    });
  
    return categories;
  };

  const handleSeeMore = () => {
    setLimit(limit + 10);
  }

  return (
    <>    
    <Navbar />
    <div className='container mx-auto'>
    <h1 className="flex justify-center text-3xl font-bold tracking-tight text-gray-900 mt-4 mb-4">Dashboard Overview</h1>
    <div className="contianer max-w-screen-2xl mx-auto">
      <Table products={products} isLoading={isLoading} setLoading={setLoading}  />
    </div>
    {!isLoading ? 
    <div className="flex justify-center h-screen pt-8">
      <div className="contianer w-full max-w-screen-2xl">
        <div> 
          <h1 className="flex justify-center text-3xl font-bold tracking-tight text-gray-900 mt-8 mb-6">
            Graph Representaion 
          </h1>
        </div>
        <div className="flex justify-between grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 border-2 p-2">
          <div className="w-200 sm:w-full md:w-full">
            <LineChart
              getProductsByCategory={getProductsByCategory}
              getAverageRatingOfCategory={getAverageRatingOfCategory}
              getAverageRating={getAverageRating}
              handleSeeMore={handleSeeMore}
            />
          </div>
          <div className="w-300 sm:w-full md:w-full flex justify-center items-center">
            <DonutChart
              getAverageRating={getAverageRating}
            />
          </div>
        </div>
      </div>
    </div>
    :
    <Loader />
    }
    </div>
  </>
  );
};

export default DashboardOverview;
