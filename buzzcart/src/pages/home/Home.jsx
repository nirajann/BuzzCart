import React, { useState, useEffect } from "react";
import { Product } from "../../components/product/Product";

export const Home = () => {
  const gifUrls = [
    "https://i.pinimg.com/originals/d3/49/0a/d3490a38f3a742e7cf27c94da9df9bb3.gif",
    "https://media.giphy.com/media/sjtczd4OuvNJK/giphy.gif",
    "https://media.gq.com/photos/56031643f0075b5033a12bcf/master/w_1600%2Cc_limit/how-to-wear-parka.jpg",
    "https://media.giphy.com/media/sjtczd4OuvNJK/giphy.gif"
  ];

  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGifIndex((prevIndex) =>
        (prevIndex + 1) % gifUrls.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="home pb-5" style={{ backgroundColor: "#fefdfe" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mt-5 py-3">
              <h1 className="text-warning ms-4 fw-bold"> {/* Adjusted margin-left */}
                Discover the <span className="text-dark">Best Products</span>
              </h1>
              <br />
              <p className="text-dark ms-4 fs-5 fst-italic"> {/* Adjusted margin-left */}
                Looking to buy?
              </p>
              <br />
              <a href="/" className="btn btn-warning ms-4 fw-bold fs-5"> {/* Adjusted margin-left */}
                Shop Now
              </a>
            </div>
            <div className="col-md-5 text-center">
              <img
                src={gifUrls[currentGifIndex]}
                alt=""
                style={{ width: "40rem", height: "25rem" }}
                className="py-2 img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      <Product />
    </>
  );
};
