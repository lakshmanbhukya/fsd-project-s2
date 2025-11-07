import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		image: "",
	});

	// Fetch all products on mount
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/products`)
			.then((response) => setProducts(response.data))
			.catch((error) => console.error("Error fetching products:", error));
	}, []);

	// Add a new product
	const handleAddProduct = () => {
		console.log("Add product function called");
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/products`, newProduct)
			.then((response) => {
				setProducts([...products, response.data]);
				setNewProduct({ name: "", description: "", image: "" });
			})
			.catch((error) => console.error("Error adding product:", error));
	};

	// Delete a product
	const handleProductDelete = (productId) => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
			.then((response) => {
				console.log("Deleted Product:", response.data.deletedProduct);
				const updatedProducts = products.filter(
					(product) => product._id !== productId
				);
				setProducts(updatedProducts);
			})
			.catch((error) =>
				console.error(`Error deleting product with ID ${productId}:`, error)
			);
	};

	// Add a review for a product
	const handleReviewSubmit = (productId, review) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/products/${productId}/review`, review)
			.then((response) => {
				const updatedProducts = products.map((product) =>
					product._id === productId ? response.data : product
				);
				setProducts(updatedProducts);
			})
			.catch((error) => console.error("Error adding review:", error));
	};

	return (
		<div className="outer-cont">
			<h1 style={{ marginTop: "10px", color: "white" }}>GFG</h1>
			<h2>Product Review Platform</h2>

			{/* Add Product Form */}
			<div className="add-container">
				<h3>Add a New Product:</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddProduct();
					}}
				>
					<label>
						Name:
						<input
							type="text"
							name="name"
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({ ...newProduct, name: e.target.value })
							}
							required
						/>
					</label>

					<label>
						Description:
						<input
							type="text"
							name="description"
							value={newProduct.description}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									description: e.target.value,
								})
							}
							required
						/>
					</label>

					<label>
						Image URL:
						<input
							type="text"
							name="image"
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({ ...newProduct, image: e.target.value })
							}
							required
						/>
					</label>

					<button className="add-btn" type="submit">
						Add Product
					</button>
				</form>
			</div>

			{/* Product Cards */}
			<div className="cards">
				{products.map((product) => (
					<div key={product._id} className="product-card">
						<h2>{product.name}</h2>

						<button
							className="delete-btn"
							onClick={() => handleProductDelete(product._id)}
						>
							Delete Product
						</button>

						<img
							src={product.image}
							style={{ width: "300px" }}
							alt={product.name}
						/>

						<p>{product.description}</p>

						<h3>Reviews:</h3>
						<ul>
							{product.reviews.length > 0 ? (
								product.reviews.map((review, index) => (
									<li key={index}>
										<strong>{review.user}</strong> - {review.rating}/5:{" "}
										{review.comment}
									</li>
								))
							) : (
								<p>No reviews yet.</p>
							)}
						</ul>

						<h3>Add a Review:</h3>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								const user = e.target.elements.user.value;
								const rating = e.target.elements.rating.value;
								const comment = e.target.elements.comment.value;
								handleReviewSubmit(product._id, { user, rating, comment });
								e.target.reset();
							}}
						>
							<label>
								User: <input type="text" name="user" required />
							</label>
							<label>
								Rating:{" "}
								<input type="number" name="rating" min="1" max="5" required />
							</label>
							<label>
								Comment: <textarea name="comment" required></textarea>
							</label>
							<button type="submit">Submit Review</button>
						</form>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
