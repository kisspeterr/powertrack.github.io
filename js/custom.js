fetch('./products.json')
  .then(response => response.json())
  .then(products => {
    const featuredContainer = document.getElementById('featured-products');
    const allProductsContainer = document.getElementById('all-products');

    // Ellenőrizzük, hogy a konténerek léteznek-e
    if (!featuredContainer) {
      console.warn('A #featured-products konténer nem található!');
    }
    if (!allProductsContainer) {
      console.warn('A #all-products konténer nem található!');
    }

    products.forEach(product => {
      // Csak akkor jelenítjük meg a terméket, ha a visible értéke true
      if (!product.visible) return;

      // Rövidített leírás
      const shortDescription = product.description.substring(0, 100) + '...';

      const card = `
        <div class="col-md-4 product-card">
          <div class="card" onclick="viewProduct(${product.id})">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <p class="card-text">${shortDescription}</p>
              <p class="card-price">${product.price} Ft</p>
              <button class="btn btn-primary">Tovább a termékhez</button>
            </div>
          </div>
        </div>`;

      // Hozzáadás a megfelelő konténerhez
      if (product.featured && featuredContainer) {
        featuredContainer.innerHTML += card;
      }
      if (allProductsContainer) {
        allProductsContainer.innerHTML += card;
      }
    });
  })
  .catch(error => console.error('Hiba a termékek betöltésekor:', error));





  function viewProduct(productId) {
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id === productId);
        if (product) {
          // Töltsd be a modal tartalmát dinamikusan
          document.getElementById('modal-title').innerText = product.name;
          document.getElementById('modal-image').src = product.image;
          document.getElementById('modal-description').innerText = product.description;
  
          // Ízek betöltése
          const flavorsList = document.getElementById('modal-flavors');
          flavorsList.innerHTML = product.flavors
            ? product.flavors.map(flavor => `<li>${flavor}</li>`).join('')
            : '<li>Nincs információ</li>';
  
          // Kiszerelés betöltése
          const packagingList = document.getElementById('modal-packaging');
          packagingList.innerHTML = product.packaging
            ? product.packaging.map(size => `<li>${size}</li>`).join('')
            : '<li>Nincs információ</li>';
  
          // Adagolás betöltése
          const dosageElement = document.getElementById('modal-dosage');
          dosageElement.innerText = product.dosage || 'Nincs információ';
  
          // Modal megjelenítése
          new bootstrap.Modal(document.getElementById('productModal')).show();
        } else {
          console.error('Nem található a termék az adott azonosítóval:', productId);
        }
      })
      .catch(error => console.error('Hiba a termék részleteinek betöltésekor:', error));
  }
  

const scrollArrow = document.getElementById('scroll-arrow');
let isAtBottom = false; // Jelöli, hogy az oldal legalján vagyunk-e

scrollArrow.addEventListener('click', () => {
  if (isAtBottom) {
    // Ha az oldal legalján vagyunk, visszagörgetünk a tetejére
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Az összes szekciót lekérjük
  const sections = document.querySelectorAll('section');
  const currentScroll = window.scrollY + 1; // Kisebb offset elkerülése miatt hozzáadunk 1-et

  // Keressük meg az első szekciót, amely a jelenlegi pozíció után van
  let foundNextSection = false;
  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].offsetTop;
    if (sectionTop > currentScroll) {
      sections[i].scrollIntoView({ behavior: 'smooth' });
      foundNextSection = true;
      break;
    }
  }

  // Ha nincs több szekció, görgess az oldal aljára
  if (!foundNextSection) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// Görgetési esemény figyelése
window.addEventListener('scroll', () => {
  // Ellenőrizzük, hogy az oldal legaljára értünk-e
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
    scrollArrow.textContent = '↑'; // Nyíl felfelé
    isAtBottom = true;
  } else {
    scrollArrow.textContent = '↓'; // Nyíl lefelé
    isAtBottom = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
    // Kiemelt elem kiválasztása
    const featuredProduct = document.querySelector("#all-products .featured");
  
    if (featuredProduct) {
      // Automatikus görgetés a kiemelt elemhez
      featuredProduct.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  });
  