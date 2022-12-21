import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../Home/Home.css";
import web from "../../images/hero-11.png";
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";



const Home = () => {
    const dispatch = useDispatch();
    const {loading, products} = useSelector(
        (state)=>state.products
    );



    useEffect(()=>{
        dispatch(getProduct());
    }, [dispatch]);


    return (
        <>
            {loading ? <Loader/>:<>
        <MetaData title="Denish Store"/>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-10 mx-auto">
                        <div className="row">
                        <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                            <h1> Welcome to <strong className="brand-name">Denish's Store</strong></h1>
                            <h2 className="my-3">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</h2>
                        <div className="mt-3">
                            <NavLink to="/login" className="btn-get-started">Login</NavLink>
                        </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 header-img">
                        <img src={web} className="img-fluid animated" alt="Home"></img>
                        </div>    
                        </div>
                        </div>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products && products.map((product)=> <ProductCard product={product}/>)}
                    </div>
                </div>
            </section>
           

        </>}
        </>
);
};


export default Home;