import React from "react";
import "./Newsletter.css";

function Newsletter() {
	return (
		<div className="newsletter">
			<div className ="desc">
				<h2>Get Our Newsletters</h2>
				<p>Subscribe to Our Newsletters and Get Great Content</p>
			</div>

			<div className ="inputDiv">
				<input
					className="input"
					type="email"
					placeholder="Provide Your email address"
				/>
			</div>
		</div>
	);
}

export default Newsletter;
