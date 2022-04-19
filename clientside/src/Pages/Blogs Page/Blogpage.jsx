import React from 'react'
import "./Blogpage.css"

function Blogpage() {
  return (
    <div className="blogpage">
        <h2 className="heading">Latest Posts</h2>
        <p className='blog-category'>All Categories</p>

        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
        <div className="post">
            <div className="post-image">
                <img src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")} alt={"blog"} />
            </div>
            <div className="post-main">
                <h3>This is a Sample Post in the Posts Page</h3>
                <span>10 Days Ago</span>
            </div>
        </div>
    </div>
  )
}

export default Blogpage