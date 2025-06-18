import Button from "./UI/Button"
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting"
import CartContext from "./store/CartContext";

export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);
    function handleAddMealToCart() {
        console.log("Adding meal to cart:", meal);
        
        cartCtx.addItem(meal);
    }
    return (
      <li className="meal-item">
        <article>
          <img src={`https://foodorder-backend-jif9.onrender.com/${meal.image}`} alt={meal.name} />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {currencyFormatter.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
          </p>
        </article>
      </li>
    );
}
