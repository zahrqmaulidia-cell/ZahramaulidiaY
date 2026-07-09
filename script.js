// ===============================
// GELS BY EMY - CART SYSTEM
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");

if (checkoutItems) {

    cart.forEach(item => {

        checkoutItems.innerHTML += `
        <div class="produk-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="product-info">

                <h3>${item.name}</h3>

                <p>Jumlah : ${item.quantity}</p>

                <p>Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</p>

            </div>

        </div>

        <hr>
        `;
    });

}

const cartCount = document.getElementById("cart-count");

updateCart();

function updateCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let jumlah = 0;

    cart.forEach(item=>{
        jumlah += item.quantity;
    });

    if(cartCount){
        cartCount.innerText = jumlah;
    }

}
document.addEventListener("DOMContentLoaded", function(){
console.log("Search berjalan");
    const searchInput = document.getElementById("searchInput");

    if(searchInput){

        searchInput.addEventListener("keyup", function(){

            let keyword = this.value.toLowerCase();

            let products = document.querySelectorAll(".card");

            products.forEach(product => {

                let namaProduk = product.querySelector("h3").textContent.toLowerCase();

                if(namaProduk.includes(keyword)){
                    product.style.display = "";
                }else{
                    product.style.display = "none";
                }

            });

        });

    }

});
function buyNow(name, price, image){

    let produk = [
        {
            name: name,
            price: price,
            image: image,
            quantity: 1
        }
    ];

    localStorage.setItem("cart", JSON.stringify(produk));

    window.location.href = "checkout.html";
}
function addToCart(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    showToast(name + " berhasil ditambahkan ke keranjang");

} // <-- PENUTUP addToCart ADA DI SINI

function showToast(pesan){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML = "🛒 " + pesan;

    toast.classList.add("show");

    setTimeout(function(){
        toast.classList.remove("show");
    }, 2000);

}