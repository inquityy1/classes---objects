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

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	constructor(renderHookId) {
		this.hookId = renderHookId;
		this.render();
	}
	
	render() {}
	
	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if(cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];
	
	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
	}
	
	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, curItem) => prevValue + curItem.price,
			0
		);
		return sum;
	}
	
	constructor(renderHookId) {
		super(renderHookId);
	}
	
	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}
	
	render() {
		const cartEl = this.createRootElement('section', 'cart');
		cartEl.innerHTML = `
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		this.totalOutput = cartEl.querySelector('h2');
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId);
		this.product = product;
	}
	
	addToCart() {
		App.addProductToCart(this.product);
	}
	
	render() {
		const prodEl = this.createRootElement('li', 'product-item');
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
		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCart.bind(this));
	}
}

class ProductList extends Component {
	products = [];

	constructor(renderHookId) {
		this.products = [
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
		]
	}	
	
	render() {
		this.createRootElement('ul', 'product-list', [
			new ElementAttribute('id', 'prod-list')
		]);
		for (const prod of this.products) {
			new ProductItem(prod, 'prod-list');
		}
	}
}

class Shop {
	constructor() {
		this.render();
	}
	
	render() {
		this.cart = new ShoppingCart('app');
		new ProductList('app');
	}
}

class App {
	static cart;
	
	static init() {
		const shop = new Shop();
		this.cart = shop.cart;
	}
	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();




















