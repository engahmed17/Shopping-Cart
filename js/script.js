let productsDom = document.querySelector(".products");
let products = productsDB;
let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productsUI = products.map((item) => {
    return `
      <div class="product-item" style="border:2px solid green">
        <img src="${item.imageUrl}"class="product-item-img"alt="image"/>
        <div class="product-item-desc">
        <p>${item.title}</p>
          <p>${item.desc}</p>
          <p>${item.size} </p><br>
          <button class="add-to-cart" onclick="saveItemData(${item.id})">Details</button>
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
        </div>
      </div>
    `;
  });
  productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);
function addedToCart(id) {
  if (localStorage.getItem("username")) {
let prod = JSON.parse(localStorage.getItem("products")) || products;
    let product = prod.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);
    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }
    cartProductDivDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
    });
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    let cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}
function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unique;
}
function saveItemData(id) {
  if (localStorage.getItem("username")) {
    localStorage.setItem("productId", id);
    window.location = "cartDetails.html";
    let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
    let newProducts = [...allProducts];
    localStorage.setItem("products", JSON.stringify(newProducts));
  }else {
    window.location = "login.html";
  }
}
let input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));
  if (e.target.value.trim() === "")
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
});
function search(title) {
  let prd = JSON.parse(localStorage.getItem("products")) || products;
  let arr = prd.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
  drawProductsUI(arr);
}
let sizeFilter = document.getElementById("size-filter");
sizeFilter.addEventListener("change", getProductsFilteredBySize);
function getProductsFilteredBySize(e) {
  let val = e.target.value;
  let produc = JSON.parse(localStorage.getItem("products")) || products;
  if (val === "all") {
    drawProductsUI(produc);
  } else {
    produc = products.filter((i) => i.size === val);
    drawProductsUI(produc);
  }
}
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}