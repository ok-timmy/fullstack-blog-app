import React from 'react'
import "./Blogs.css"
import imageOne from "../../assets/asset-1.webp"

function Blogs() {
  return (
      <div className="blog-section">
    <div className="blogs">
        <div className="card">
            <div className="card-image">
            <img src={imageOne} alt={"post-img"}/>
            </div>
            <div className="category"><button>Sports</button></div>
            <div className="card-details">
                <div className="class-header">
                <h3>How To Make Morroco Bread in five steps</h3>
                </div>
                <div>
                    <p>All he could think about was how it would all end. There was still a bit of uncertainty in the equation.</p>
                </div>
                <h5>Saraki Oladimeji</h5>
                <span>5 Days ago</span>
            </div>
        </div>
        <div className="card">
            <div className="card-image">
            <img src={imageOne} alt={"post-img"}/>
            </div>
            <div className="category"><button>Sports</button></div>
            <div className="card-details">
                <div className="class-header">
                <h3>How To Make Morroco Bread in five steps</h3>
                </div>
                <div>
                    <p>All he could think about was how it would all end. There was still a bit of uncertainty in the equation.</p>
                </div>
                <h5>Saraki Oladimeji</h5>
                <span>5 Days ago</span>
            </div>
        </div>
        <div className="card">
            <div className="card-image">
                <img src={imageOne} alt={"post-img"}/>
            </div>
            <div className="category"><button>Sports</button></div>
            <div className="card-details">
                <div className="class-header">
                   <h3>How To Make Morroco Bread in five steps</h3> 
                </div>
                <div>
                    <p>All he could think about was how it would all end. There was still a bit of uncertainty in the equation.</p>
                </div>
                <h5>Saraki Oladimeji</h5>
                <span>5 Days ago</span>
            </div>
        </div>

        <div className="more-btn"><button>More Posts</button></div>
    </div>
    <div className="categories">
        <h2>Categories</h2>
    </div>
    </div>
  )
}

export default Blogs