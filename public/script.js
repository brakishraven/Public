const siteForm = document.getElementById('siteForm');
const siteName = document.getElementById('siteName');
const siteURL = document.getElementById('siteURL');
const siteCategory = document.getElementById('siteCategory');
const addSiteModal = new bootstrap.Modal(document.getElementById('addSiteModal'));

function addCardToPage({ name, url, category }) {
  const newCard = document.createElement('div');
  newCard.className = 'card app-card';
  newCard.innerHTML = `
    <a href="${url}" target="_blank" class="text-decoration-none text-white">
      <div class="card-body text-center">
        <i class="bi bi-globe app-icon"></i>
        <h6 class="card-title">${name}</h6>
      </div>
    </a>
  `;

  const sections = document.querySelectorAll('h3');
  for (let h of sections) {
    if (h.textContent.includes(category)) {
      const scrollRow = h.nextElementSibling;
      if (scrollRow && scrollRow.classList.contains('scroll-row')) {
        scrollRow.appendChild(newCard);
        return;
      }
    }
  }

  const container = document.getElementById('categories');
  const h3 = document.createElement('h3');
  h3.textContent = category;
  const newRow = document.createElement('div');
  newRow.className = 'scroll-row d-flex gap-3 overflow-auto mb-4';
  newRow.appendChild(newCard);
  container.appendChild(h3);
  container.appendChild(newRow);
}

fetch('/api/sites')
  .then(res => res.json())
  .then(data => data.forEach(addCardToPage));

siteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = siteName.value;
  const url = siteURL.value;
  const category = siteCategory.value;

  fetch('/api/sites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, url, category })
  })
  .then(res => res.json())
  .then(site => {
    addCardToPage(site);
    siteForm.reset();
    addSiteModal.hide();
  });
});
