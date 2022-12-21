import React, { useEffect, useState } from 'react'
import "../../component/Product/Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import MetaData from "../layout/MetaData";


const categories = [
    "Laptop",
    "Mobile",
    "Ipad",
    "Smartwatch",
    "Headphone",
    "Camera",
  ];

const Products = ({match}) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage]= useState(1);
    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");

    const {products, loading, productsCount, resultPerPage,} = useSelector(
        (state) => state.products
    );

    const keyword = match.params.keyword

    const setCurrentPageNo = (e) =>{
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) =>{
        setPrice(newPrice);
    }



    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category));
      }, [dispatch, keyword, currentPage, price, category]);
 

  return (
    <>
        {loading ? (<Loader/>) : (
            <>
            <MetaData title="Products"/>
            <h2 className='productsHeading'>Products</h2>

            <div className='products'>
                {products && 
                    products.map((product) =>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            <div className="filterBox">
            <h2 className='pricefilter'>Price</h2>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}/>

            <h2 className='pricefilter'>Categories</h2>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            </div>

            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
            
            </>
        )}

    </>
  )
}

export default Products