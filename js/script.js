document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const modalImage = document.getElementById('modalImage');

    // Función para cargar productos desde el archivo JSON
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            renderProducts(products);

            // Filtrar productos cuando se escribe en el campo de búsqueda
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.price.toLowerCase().includes(query)
                );
                renderProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('col-md-4', 'mb-4');
            productItem.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onclick="showImageModal('${product.image}')">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Precio: ${product.price}</p>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    window.showImageModal = function(imageSrc) {
        modalImage.src = imageSrc;
        $('#imageModal').modal('show');
    };
});