import { useState, useContext } from "react";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import CartContext from "./store/CartContext";

export default function MealItem({ meal }) {
  const [showModal, setShowModal] = useState(false); // state for modal visibility
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    console.log("Adding meal to cart:", meal);
    
    cartCtx.addItem(meal);

    // Show the modal
    setShowModal(true);

    // Hide the modal after 1 second
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`https://foodorder-backend-jif9.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>

      {/* Modal for "Added to Cart" */}
      {showModal && (
        <div className="modal1">
          <p>Added to Cart!</p>
        </div>
      )}
    </li>
  );
}
