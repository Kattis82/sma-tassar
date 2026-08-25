console.log("Små Tassar JavaScript är igång!");

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

function updateCartCount() {
  let totalItems = 0;

  // går igenom alla produkter i varukorgen
  for (const productName in cartItems) {
    totalItems += cartItems[productName];
  }

  // uppdaterar siffran i menyn
  cartCount.textContent = totalItems;
}

// hämtar varukorgen och knapparna för att dölja/visa den
const cart = document.querySelector("#cart");
const cartButton = document.querySelector("#cart-button");
const closeCartButton = document.querySelector("#close-cart");
const cartCount = document.querySelector("#cart-count");

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

const walkProducts = document.getElementById("walk-products");
const toyProducts = document.getElementById("toy-products");
const homeProducts = document.getElementById("home-products");

const getProducts = async () => {
  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      console.error("Fel från servern: " + response.status);
      return;
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error("Fel: ", error);
  }
};

const renderProducts = (products) => {
  products.forEach((product) => {
    
    // skapar en article för varje produkt
    const article = document.createElement("article");
    article.classList.add("product-card");

    // badge (bara om produkten har en badge)
    if (product.badge) {
      const badge = document.createElement("span");
      // har egen CSS, klassen badge
      badge.classList.add("badge");
      badge.textContent = product.badge;
      article.appendChild(badge);
    }

    // bild
    const image = document.createElement("img");
    // bilder har ingen text utan har istället attribut
    image.src = product.image;
    image.alt = product.imageAlt;

    // produktnamn
    const title = document.createElement("h4");
    title.textContent = product.name;

    // beskrivning
    const description = document.createElement("p");
    description.textContent = product.description;

    // pris
    const price = document.createElement("p");
    // har egen CSS, klassen price
    price.classList.add("price");
    price.textContent = `${product.price} kr`;

    // antal-label
    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Antal";
    quantityLabel.setAttribute("for", `quantity-${product.id}`);

    // antal-fält
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = `quantity-${product.id}`;
    quantityInput.min = "1";
    quantityInput.value = "1";

    // köp-knapp
    const button = document.createElement("button");
    button.classList.add("buy-button");
    button.textContent = "Lägg i varukorg";

    button.addEventListener("click", () => {
      const quantity = Number(quantityInput.value);

      if (cartItems[product.name]) {
        cartItems[product.name] += quantity;
      } else {
        cartItems[product.name] = quantity;
      }

      updateCart();
      updateCartCount();
    });

    // lägger in allt i produktkortet
    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(price);

    article.appendChild(quantityLabel);
    article.appendChild(quantityInput);
    article.appendChild(button);

    // placerar kortet i rätt kategori
    if (product.category === "walk") {
      walkProducts.appendChild(article);
    } else if (product.category === "toy") {
      toyProducts.appendChild(article);
    } else if (product.category === "home") {
      homeProducts.appendChild(article);
    }
  });
};

getProducts();
