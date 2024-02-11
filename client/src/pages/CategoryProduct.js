import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { MdFavorite } from 'react-icons/md'
import { IoCartSharp } from 'react-icons/io5'

const CategoryProduct = () => {
    const [catagory, setCategory]= useState([])
    const [products, setProduct]= useState([])
    const params = useParams([])

    const getProductByCat = async () =>{
        try {
            const {data}= await axios.get(`/api/v1/products/product-category/${params.slug}`)
            setProduct(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( ()=>{
        if( params?.slug) getProductByCat()
    }, [params?.slug])
  return (
    <Layout title={"Category"}>
        <div className='container'>
            <div>  CategoryProduct</div>
            {console.log(catagory.name)}
            <h2>{products.length}</h2>
            <div className="col-md-9">
          <h1 className="text-center"> Products by</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="product-card">
                <div className="product-tumb">
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="middle">
                    <div className="product-links">
                      <a href="#">
                        <MdFavorite size={35} />
                      </a>
                      <a href="#">
                        <IoCartSharp size={35} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="product-details">
                  <span className="product-name">{p.name}</span>
                  <span className="product-catagory">{p.category.name}</span>

                  <div className="product-bottom-details">
                    <div className="product-price">${p.price}</div>
                    <div className="btnn">
                      <Link to={`/product/${p.slug}`} className="pnf-btnn ">
                        More Details.
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
                    {/* <div className="m-2 p-2">
                        {products && products.length < total && (
                        <button
                            className="btn btn-warning"
                            onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                            }}
                        >
                            {loading ? "Loading..." : "Loadmore"}
                        </button>
                        )}
                    </div> */}
        </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct