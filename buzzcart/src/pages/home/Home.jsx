import React from "react"
import { Product } from "../../components/product/Product"

export const Home = () => {
  return (
    <>
     <section className="home pb-5" style={{ backgroundColor: "#06cba8" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mt-5 py-3">
              <h1 className="text-danger ms-5 fw-bold">Discover the <span className="text-dark">Best Products</span></h1>
              <br />
              <p className="text-light ms-5 fs-5 fst-italic">Looking to buy ?</p>
              <br />
              <a href="/" className="btn btn-danger ms-5 fw-bold fs-5">Shop Now</a>
            </div>
            <div className="col-md-5 text-center">
              <img src="https://cache.quantocustaviajar.com/blog/wp-content/uploads/2017/11/compras-online.gif" alt="" style={{ width: '40rem', height: '25rem' }} className="py-2 img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <Product />
    </>
  )
}
