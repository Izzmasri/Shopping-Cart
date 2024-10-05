
document.addEventListener("DOMContentLoaded",() =>{
    const addBtn = document.getElementById("shopBtn");
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const cartItem = document.getElementById("cart-item");
    const itemNumber = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const itemContainer = document.getElementById("item-container");

    const products = [
        {
            id: 1,
            name: "Coffee machine",
            price: 30,
            category: "Electronic",
            img:"https://productimages.hepsiburada.net/s/777/200-200/110000726984534.jpg/format:webp",
        },
        {
            id: 2,
            name: "Apple Air pods",
            price: 70,
            category: "Phone",
            img:"https://productimages.hepsiburada.net/s/777/200-200/110000774021644.jpg/format:webp",
        },
        {
            id: 3,
            name: "Mouse",
            price: 10,
            category: "Computer",
            img:"https://productimages.hepsiburada.net/s/31/200-200/10333309599794.jpg/format:webp",
        },
        {
            id: 4,
            name: "Iphone",
            price: 300,
            category: "Phone",
            img:"https://productimages.hepsiburada.net/s/189/200-200/110000155170588.jpg/format:webp",
        },
        {
            id: 5,
            name: "Vacuum",
            price: 150,
            category: "Electronic",
            img:"https://productimages.hepsiburada.net/s/777/200-200/110000668048332.jpg/format:webp",
        },
        {
            id: 6,
            name: "Air pods",
            price: 50,
            category: "Phone",
            img:"https://productimages.hepsiburada.net/s/498/200-200/110000549560136.jpg/format:webp",
        },
    ];
    products.forEach(({name,id,price,category,img}) => {
        itemContainer.innerHTML +=`<div class="item-cart">
<img src="${img}" class="image-cart" alt="${name}"/>
<h3 class="mt-2">${name}</h3>
<p class="cart-category mb-1">Category: ${category}</p>
<p>$${price}</p>
<button id="${id}" class="cart-btn">Add to cart</button>
</div>`
    });

    class ShoppingCart{
        constructor(){
            this.items = [];
        }
        addItem(id,products){
            const product = products.find(element => element.id === id);
            const {name, price} = product;
            this.items.push(product);

            let productInCart = document.getElementById(`product${id}`);

            if(productInCart){
                // If the product already exists, just update the count
                let currentCount = document.getElementById(`product-count-for-id${id}`);
                let newCount = parseInt(currentCount.textContent) + 1;
                currentCount.textContent = `${newCount}x`;
            } else {
                // If it's a new product, add it to the cart
                cartItem.innerHTML += `
            <div id="product${id}">
                <p>${name}</p>
                <p id="product-count-for-id${id}">1X</p>
                <p>$${price}</p>
                <hr>
            </div>`;
            }
        }
        getTotalItems(){
            return this.items.length;
        };
        getTotalPrice(){
            return this.items.reduce((total, item) => total + item.price, 0);
        };

        clearCart(){
            if(!this.items.length){
                alert("Your shopping cart is already empty");
                return;
            }
            const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");
            if(isCartCleared){
                this.items = [];
                cartItem.innerHTML = "";
                itemNumber.textContent = 0;
                totalPrice.textContent = 0;

            }
        }

    }

    const cart = new ShoppingCart();

    const addToCartBtns = document.getElementsByClassName("cart-btn");

    [...addToCartBtns].forEach((btn) => {
        btn.addEventListener("click", (event) => {
            cart.addItem(Number(event.target.id), products);
            itemNumber.textContent = cart.getTotalItems();
            totalPrice.textContent = `$${cart.getTotalPrice()}`;
        });
    });

    clearCartBtn.addEventListener("click",cart.clearCart.bind(cart));

    shopBtn.addEventListener("click", ()=>{
        myModal.show();
    });
});
