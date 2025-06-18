import { useContext, useActionState, useEffect,useState } from "react";

import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Inpur";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import useHttp from "./hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  // This component handles the checkout process}
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
const [modalOpen, setModalOpen] = useState(false);

useEffect(() => {
  if(userProgressCtx.progress === "checkout") {
    setModalOpen(true);
  } else {
    setModalOpen(false);
  }
}, [userProgressCtx.progress]);

console.log(modalOpen);

  const { data, error, sendRequest } = useHttp(
    "https://foodorder-backend-jif9.onrender.com/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
      console.log("Modal close triggered");
    // This function is called when the user clicks the close button
    // It hides the checkout modal
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    console.log("Modal finish triggered");
    // This function is called when the user clicks the finish button
    // It hides the checkout modal and clears the cart and the user progress context
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function CheckoutAction(prevState,fd) {
    // This function is called when the form is submitted
    // It sends the order data to the server using the sendRequest function
    // It also clears the cart and the user progress context
    const customData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(CheckoutAction, null);
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    // If the order was submitted successfully, show a success message
console.log("Modal open prop:", userProgressCtx.progress === "checkout");
console.log("Data received:", data);
console.log("Error state:", error);

return(
    <Modal open={modalOpen} onClose={handleClose}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email withnin the next few
        minutes.
      </p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>)
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
