/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [
  {
    name: "Cherry",
    price: 0.99,
    quantity: 0,
    productId: 100,
    image: "../src/images/cherry.jpg"
  },
  {
    name: "Strawberry",
    price: 1.55,
    quantity: 0,
    productId: 200,
    image: "../src/images/strawberry.jpg"
  },
  {
    name: "Orange",
    price: 1.99,
    quantity: 0,
    productId: 300,
    image: "../src/images/orange.jpg"
  },
  {
    name: "Banana",
    price: 0.49,
    quantity: 0,
    productId: 400,
    image: "../src/images/banana.jpg"
  },
  {
    name: "Apple",
    price: 1.29,
    quantity: 0,
    productId: 500,
    image: "../src/images/apple.jpg"
  }
];

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a helper function named findItemById that takes in an array and a productId as arguments */
function findItemById(array, productId) {
  return array.find(item => item.productId === productId);
}

/* Create a function named getProductById that takes in the productId as an argument */
function getProductById(productId) {
  return findItemById(products, productId);
}

/* Create a function named findCartItemById that takes in the productId as an argument */
function findCartItemById(productId) {
  return findItemById(cart, productId);
}

/* Create a function named addProductToCart that takes in the product productId as an argument */
function addProductToCart(productId) {
  // Find the product in the products array
  const product = getProductById(productId);
  if (product) {
    // Check if the product is already in the cart
    const cartItem = findCartItemById(productId);
    if (cartItem) {
      // Increase quantity if product is already in the cart
      cartItem.quantity++;
    } else {
      // Add product to the cart with quantity 1
      product.quantity = 1;
      cart.push(product);
    }
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument */
function increaseQuantity(productId) {
  // Find the product in the cart
  const cartItem = findCartItemById(productId);
  if (cartItem) {
    // Increase the quantity
    cartItem.quantity++;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument */
function decreaseQuantity(productId) {
  // Find the product in the cart
  const cartItem = findCartItemById(productId);
  if (cartItem) {
    // Decrease the quantity
    cartItem.quantity--;
    // Remove the product if the quantity is 0
    if (cartItem.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument */
function removeProductFromCart(productId) {
  // Find the index of the product in the cart
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) {
    // Remove the product from the cart
    const removedProduct = cart.splice(index, 1)[0];
    // Reset the product's quantity to 0
    const product = getProductById(removedProduct.productId);
    if (product) {
      product.quantity = 0;
    }
  }
}

/* Create a function named cartTotal that has no parameters */
function cartTotal() {
  // Calculate the total cost of all items in the cart
  let total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  // Round the total to 2 decimal places
  total = Math.round(total * 100) / 100;
  return total;
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  // Reset the quantity of all products in the cart to 0
  cart.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      product.quantity = 0;
    }
  });
  // Empty the cart
  cart = [];
}

/* Create a function named pay that takes in an amount as an argument */
let totalPaid = 0;

function pay(amount) {
  // Add the payment amount to the totalPaid
  totalPaid += amount;
  // Calculate the remaining balance
  let remainingBalance = totalPaid - cartTotal();
  // If the remaining balance is non-negative, reset totalPaid and empty the cart
  if (remainingBalance >= 0) {
    totalPaid = 0;
    emptyCart();
  }
  // Round the remaining balance to 2 decimal places
  remainingBalance = Math.round(remainingBalance * 100) / 100;
  return remainingBalance;
}

/* Currency conversion logic */
function convertCurrency(amount, currency) {
  switch (currency) {
    case 'EUR':
      return amount * 0.85; // Example conversion rate
    case 'YEN':
      return amount * 110; // Example conversion rate
    default:
      return amount;
  }
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  convertCurrency
};