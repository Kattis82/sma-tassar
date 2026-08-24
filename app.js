console.log("Små Tassar JavaScript är igång!");

const buyButtons = document.querySelectorAll(".buy-button");
console.log(buyButtons);

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.name;

    alert(`Vara lagd i varukorg: ${productName}`);
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
