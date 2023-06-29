displayCartCount();
let productsCombine='';
products.forEach((product)=>{
 const html=`
       <div class="product-grid">
          <div class="image-container">
              <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name">${product.name}</div>        
            <div class="rating-section">
              <img class="rating-stars" src="${product.rating.stars}">
              <div class="rating-count">${product.rating.count}</div>
            </div>
            <div class="cost-of-product">$${(product.costIncent/100).toFixed(2)}</div>
            <div class="dropdown-product">
              <select class="number-list  js-quantity-selector-${product.id}" name="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div class="added-section js-added-section-${product.id}">
              <img class="checkmark" src="checkmark/checkmark.png">
              Added
            </div>
            <div class="add-cart-section">
              <button class="cart-button js-cart-button" data-product-id="${product.id}" data-product-name="${product.name}" data-product-image="${product.image}" data-product-cost="${product.costIncent}">Add to Cart</button>
            </div>
          </div>
        </div>
 `
 productsCombine+=html;
});
let displayProduct=document.querySelector('.js-product-display');
const addedTextTimeouts = {};
displayProduct.innerHTML=productsCombine;
let cartButton=document.querySelectorAll('.js-cart-button');
cartButton.forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId= button.dataset.productId;
    const productName= button.dataset.productName;
    const productImage= button.dataset.productImage;
    const productCost= button.dataset.productCost;
    let matchingItem;
    cartProducts.forEach((item)=>{
      if(productId===item.Id){
        matchingItem=item;
      }
    });
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector.value);
    if(matchingItem){
      matchingItem.quantity += quantity;
    }
    else{
    cartProducts.push({
      Id:productId,
      productName:productName,
      productImage:productImage,
      productCost:productCost,
      quantity:quantity
    });
  }
  localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
  cartCount=0;
  cartProducts.forEach((item)=>{
  cartCount+=item.quantity;
  localStorage.setItem('cartCount',JSON.stringify(cartCount));
});
displayCartCount();
 const addedText=document.querySelector(`.js-added-section-${productId}`);
 addedText.classList.add("added-section-js");
 setTimeout(()=>{
  const previousTimeoutId = addedTextTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        addedText.classList.remove('added-section-js');
      }, 1000);
      addedTextTimeouts[productId] = timeoutId;
  });
 }); 
});

/*document.querySelector('.js-button-cart-count').addEventListener('click',()=>{
  localStorage.removeItem("cartCount");
});*/

