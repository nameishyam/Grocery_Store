import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import PurchaseSuccess from "./components/PurchaseSuccess";
import "./App.css";

function App() {
  const [cart, setCart] = React.useState([]);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cart.length})</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ProductList {...props} cart={cart} setCart={setCart} />
            )}
          />
          <Route path="/add-product" component={AddProduct} />
          <Route
            path="/cart"
            render={(props) => (
              <Cart {...props} cart={cart} setCart={setCart} />
            )}
          />
          <Route path="/purchase-success" component={PurchaseSuccess} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
