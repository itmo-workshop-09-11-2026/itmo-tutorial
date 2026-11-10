"use strict";

// Магазин настольных игр, команда 07.
// Ключ localStorage с номером команды обязателен по ТЗ (пригодится на этапе 2).
const CART_KEY = "team07:cart:v1";

// Товары: 6 вымышленных позиций, целые цены в рублях.
const products = [
  { id: "bones", name: "Набор костей", price: 100, category: "Вечеринки" },
  { id: "uno", name: "Уно", price: 200, category: "Вечеринки" },
  { id: "codenames", name: "Кодовые имена", price: 1800, category: "Вечеринки" },
  { id: "carcassonne", name: "Каркассон", price: 2500, category: "Стратегии" },
  { id: "pandemic", name: "Пандемия", price: 2900, category: "Кооперативные" },
  { id: "settlers", name: "Колонизаторы", price: 3200, category: "Стратегии" },
];

// Повторное добавление — отдельной строкой (решение из spec.md, раздел 0).
const cart = [];

const catalogEl = document.querySelector("#catalog");
const cartEl = document.querySelector("#cart");
const cartEmptyEl = document.querySelector("#cart-empty");
const totalEl = document.querySelector("#total");

function productById(id) {
  return products.find((product) => product.id === id);
}

function formatPrice(price) {
  return `${price} ₽`;
}

function renderCatalog() {
  catalogEl.replaceChildren();

  for (const product of products) {
    const item = document.createElement("li");
    item.className = "product";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Добавить";
    button.addEventListener("click", () => addToCart(product.id));

    item.append(name, price, button);
    catalogEl.append(item);
  }
}

function renderCart() {
  cartEl.replaceChildren();

  for (const [index, id] of cart.entries()) {
    const product = productById(id);
    const row = document.createElement("li");
    row.className = "cart-row";

    const name = document.createElement("span");
    name.textContent = product.name;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Удалить";
    button.addEventListener("click", () => removeFromCart(index));

    row.append(name, price, button);
    cartEl.append(row);
  }

  cartEmptyEl.hidden = cart.length > 0;

  const total = cart.reduce((sum, id) => sum + productById(id).price, 0);
  totalEl.textContent = formatPrice(total);
}

function addToCart(id) {
  cart.push(id);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCatalog();
renderCart();
