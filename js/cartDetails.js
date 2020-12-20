let products = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item-details");
let productDetails = products.find((item) => item.id == productId);
itemDom.innerHTML = `
<img src="${productDetails.imageUrl}" alt="" />
<p>Name :  ${productDetails.title} </p>
<p> Description :  ${productDetails.desc} </p>
<p>Size : ${productDetails.size}</p><br>
<button onclick="editProduct(${productId})">Eidt Product</button>
`;
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}