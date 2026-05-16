let menuData = [];

// Load data dari file JSON
fetch('data_menu.json')
    .then(res => res.json())
    .then(data => {
        menuData = data;
        render(menuData);
    })
    .catch(err => {
        console.error("Gagal memuat data menu:", err);
        document.getElementById('menu-grid').innerHTML = "<p>Data tidak ditemukan. Jalankan dengan Live Server.</p>";
    });

function render(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = items.map(item => `
        <article class="card">
            <img src="${item.img}" alt="${item.nama}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
            <div class="card-content">
                <p class="card-category">${item.kategori}</p>
                <h3 class="card-title">${item.nama}</h3>
                <p class="card-price">IDR ${item.harga / 1000}k</p>
            </div>
        </article>
    `).join('');
}

function filterMenu(cat, btn) {
    // Ganti status tombol aktif
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter datanya
    if (cat === 'all') {
        render(menuData);
    } else {
        const filtered = menuData.filter(item => item.kategori === cat);
        render(filtered);
    }
}