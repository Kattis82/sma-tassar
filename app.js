console.log("Små Tassar JavaScript är igång!");

const buyButtons = document.querySelectorAll(".buyButton");
console.log(buyButtons);

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.name;

    alert(`Vara lagd i varukorg: ${productName}`);
  });
});
