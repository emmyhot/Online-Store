const productCatalog = {
    beverages: [
        {
            name: 'Schweppes Bottle Pack',
            description: 'Refreshing  drink for everyday family use.',
            price: '₦5,000',
            badge: 'Best Seller',
            image: 'swww.png'
        },
        {
            name: ' Coca-Cola Soft Drink Pack',
            description: 'Assorted soft drinks in a value pack.',
            price: '₦4,800',
            badge: 'Value Pack',
            image: 'coke.png'
        },
        {
            name: ' Predator Energy Drink',
            description: 'Boosting energy drink for active lifestyles.',
            price: '₦5,200',
            badge: 'Popular',
            image: 'predator.png'
        }
    ],
    measuring: [
        {
            name: 'Measuring Jug',
            description: 'Durable measuring jug for kitchen tasks.',
            price: '₦1,800',
            badge: 'Kitchen',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'Digital Scale',
            description: 'Accurate digital scale for home use.',
            price: '₦6,500',
            badge: 'Accurate',
            image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'Kitchen Measuring Set',
            description: 'Complete set for accurate cooking measurements.',
            price: '₦3,900',
            badge: 'Bundle',
            image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'
        }
    ],
    washing: [
        {
            name: 'Laundry Detergent',
            description: 'Powerful detergent that keeps clothes fresh.',
            price: '₦2,200',
            badge: 'Fresh Clean',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'Soap Pack',
            description: 'Household soap pack for daily hygiene.',
            price: '₦1,600',
            badge: 'Daily Use',
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'Bleach Cleaner',
            description: 'Effective cleaning solution for surfaces and homes.',
            price: '₦2,900',
            badge: 'Disinfect',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80'
        }
    ],

    education: [
        {
            name: 'Future Note 40 Leaves Dozen',
            description: 'Strong 40 leaves book good for your child everyday writing.',
            price: '₦2,000',
            badge: 'Writing',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'Ezeee Pen',
            description: 'For beautiful and awesome writing.',
            price: '₦3,700',
            badge: 'Accurate Writing',
            image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80'
        },
        {
            name: 'School Supply Pack',
            description: 'Complete set for schoolwork, writing, and learning essentials.',
            price: '₦3,900',
            badge: 'School Pack',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80'
        }
    ],
};

const categoryButtons = document.querySelectorAll('.category-button');
const productGrid = document.getElementById('productGrid');
const productSearch = document.getElementById('productSearch');
let currentCategory = 'beverages';

function filterProducts(category, query = '') {
    const items = productCatalog[category] || productCatalog.beverages;
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return items;
    }

    return items.filter((item) => {
        const haystack = `${item.name} ${item.description} ${item.badge}`.toLowerCase();
        return haystack.includes(normalizedQuery);
    });
}

function renderProducts(category) {
    const items = filterProducts(category, productSearch ? productSearch.value : '');
    if (!productGrid) return;

    if (!items.length) {
        productGrid.innerHTML = `
            <article class="product-card">
                <div class="product-card-content">
                    <h3>No product found</h3>
                    <p>Try another keyword or choose a different category.</p>
                </div>
            </article>
        `;
        return;
    }

    productGrid.innerHTML = items.map((item) => `
        <article class="product-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-card-content">
                <span class="product-badge">${item.badge}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-meta">
                    <span class="product-price">${item.price}</span>
                    <a class="primary-btn" href="https://wa.me/2348064536814?text=${encodeURIComponent('Hello, I would like to order: ' + item.name + ' (' + item.price + ')') }" target="_blank" rel="noreferrer">Order</a>
                </div>
            </div>
        </article>
    `).join('');
}

if (categoryButtons.length && productGrid) {
    renderProducts('beverages');

    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            categoryButtons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            renderProducts(currentCategory);
        });
    });
}

if (productSearch) {
    productSearch.addEventListener('input', (event) => {
        renderProducts(currentCategory, event.target.value);
    });
}

const yearNodes = document.querySelectorAll('[data-current-year]');
yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
});
