const productsLikeBtn = document.querySelectorAll('.product__like-btn');
const likeProductsList = document.querySelector('.like-content__list');
const like = document.querySelector('.like');

const printLikeQuantity = () => {
	let length = likeProductsList.children.length;
	document.querySelector('._like__circle-with-number').textContent = length;
	length > 0 ? like.classList.add('active') : like.classList.remove('active');
	length > 0 ? like.querySelector('.header__like').classList.add('active') : like.querySelector('.header__like').classList.remove('active');
	length > 0 ? like.querySelector('.like-btn').classList.add('active') : like.querySelector('.like-btn').classList.remove('active');
	length > 0 ? like.querySelector('.like-content__message').classList.add('active') : like.querySelector('.like-content__message').classList.remove('active');
};

const generateLikeProduct = (img, title, price, id) => {
	return `
	<li class="like-content__item">
									<article class="like-product like-content__product" data-id="${id}">
										<img src="${img}" alt="" class="like-product__img">
										<div class="like-product__text">
											<h3 class="like-product__title">${title}
											</h3>
											<span class="like-product__price">${price}</span>
										</div>
										<button class="like-product__delete" aria-label="Удалить товар">X</button>
									</article>
								</li>
	`;
}

productsLikeBtn.forEach(el => {
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product__link img').getAttribute('src');
		let title = parent.querySelector('.space-for-text h4').textContent;
		let priceString = parent.querySelector('.buy-product-price').textContent;
		likeProductsList.insertAdjacentHTML('afterbegin', generateLikeProduct(img, title, priceString, id));
		printLikeQuantity();
		self.disabled = true;
	});
});

//удаление

const deleteLikeProducts = (productParent) => {

	let id = productParent.querySelector('.like-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__like-btn').disabled = false;
	productParent.remove();
	printLikeQuantity();
};

likeProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('like-product__delete')) {
		deleteLikeProducts(e.target.closest('.like-content__item'))
	}
});


// $(document).ready(function () {
// 	$('.like-btn').click(function (event) {
// 		let i = likeProductsList.children.length;
// 		while (i > 0) {
// 			i--;
// 			let id = likeProductsList.childNodes.querySelector('.like-product').dataset.id;
// 			console.log(id);
// 		};
// 	});
// });