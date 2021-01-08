class Product {
//	title = 'DEFAULT';
//	imageUrl;
//	description;
//	price;
	
	constructor(title, image, desc, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = desc;
		this.price = price;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}
	
	render() {
		const prodEl = document.createElement('li');
			prodEl.className = 'product-item';
			prodEl.innerHTML = `
				<div>
					<img src="${this.product.imageUrl}" alt="${this.product.title}">
					<div class="product-item__content">
						<h2>${this.product.title}</h2>
						<h3>\$${this.product.price}</h3>
						<p>${this.product.description}</p>
						<button>Add to Cart</button>
					</div>
				</div>
			`;
		return prodEl;
	}
}

class ProductList {
	products = [
		new Product(
			'A Pillow',
			'https://wallpaperaccess.com/full/1941443.jpg',
			'A soft pillow!',
			19.99
		),
		new Product(
			'A Carpet',
			'https://steamuserimages-a.akamaihd.net/ugc/940587658404822896/E5E0BC2DA2C74C08032227B339CA2AA2DCBE307B/',
			'A carpet whitch you might like!',
			89.99
		)
	];

	constructor() {}	
	
	render() {
		const renderHook = document.getElementById('app');
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';
		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		renderHook.append(prodList);
	}
}

const productList = new ProductList();
productList.render();