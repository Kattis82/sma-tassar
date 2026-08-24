console.log("Små Tassar JavaScript är igång!");

const buyButtons = document.querySelectorAll(".buy-button");
console.log(buyButtons);

// objektet (varukorgen) som ska innehålla produkter (nyckel) och antal (värde)
const cartItems = {};

// funktion som visar innehållet i varukorgen
function updateCart() {
  const cartList = document.querySelector("#cart-items");

  // töm hela listan innan den fylls igen, för att inte samma produkter
  // ska skrivas ut om och om igen
  cartList.innerHTML = "";

  // gå igenom alla produkter i varukorgen
  for (const productName in cartItems) {
    // skapar ett nytt HTML-element
    const listItem = document.createElement("li");
    listItem.textContent = `${productName} (${cartItems[productName]} st)`;

    // lägger in <li> i <ul>
    cartList.appendChild(listItem);
  }
}

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.name;

    // hämtar antal-fältet som hör till den här produkten
    const quantityInput = button.previousElementSibling; // vilket HTML-element ligger precis före button

    // hämtar värdet från antal-fältet och gör om det till ett nummer
    const quantity = Number(quantityInput.value);

    // öka antalet med det valt antal
    if (cartItems[productName]) {
      cartItems[productName] += quantity;
    } else {
      cartItems[productName] = quantity;
    }

    updateCart();
  });
});

// hämtar varukorgen och knapparna för att dölja/visa den
const cart = document.querySelector("#cart");
const cartButton = document.querySelector("#cart-button");
const closeCartButton = document.querySelector("#close-cart");

// när man klickar på menylänken visas varukorgen
cartButton.addEventListener("click", (event) => {
  event.preventDefault(); // gör inte länkens vanliga beteende
  cart.classList.remove("hidden");

  // scrolla ned till varukorgen
  cart.scrollIntoView({ behavior: "smooth" });
});

// när man klickar på stäng så döljs varukorgen
closeCartButton.addEventListener("click", () => {
  cart.classList.add("hidden");
});
