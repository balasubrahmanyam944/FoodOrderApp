import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import CartContext from './store/CartContext';
import { useContext } from 'react';
import UserProgressContext from './store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) =>  {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }
    return (
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant" />
          <h1>Balu Food Court</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
    );
}
