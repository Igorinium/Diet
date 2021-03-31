const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.full-price');
let price = 0;

//рандомный айди элементам
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

//удаление пробелов последней строки
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

//Переводит строку без пробелов, в нормальную
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₽`;
	document.querySelector('._cart__full-price').textContent = fullPrice.textContent;
};
const printQuantity = () => {
	let length = cartProductsList.children.length;
	cartQuantity.textContent = length;
	document.querySelector('._cart__circle-with-number').textContent = length;
	length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};


const generateCartProduct = (img, title, price, id) => {
	return `
	<li class="cart-content__item">
									<article class="cart-product _cart-content__product" data-id="${id}">
										<img src="${img}" alt="" class="cart-product__img">
										<div class="cart-product__text">
											<h3 class="cart-product__title">${title}
											</h3>
											<span class="cart-product__price">${normalPrice(price)} ₽</span>
										</div>
										<button class="cart-product__delete" aria-label="Удалить товар">X</button>
									</article>
								</li>
	`;
}

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product__link img').getAttribute('src');
		let title = parent.querySelector('.space-for-text h4').textContent;
		let priceString = parent.querySelector('.buy-product-price').textContent;
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.buy-product-price').textContent));

		plusFullPrice(priceNumber);
		printFullPrice();
		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
		printQuantity();
		self.disabled = true;
	});
});

const deleteProducts = (productParent) => {

	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;

	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();
	printQuantity();

}
cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'))
	}
})