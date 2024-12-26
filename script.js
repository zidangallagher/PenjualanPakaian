// Array untuk menyimpan item keranjang
let keranjangItems = [];

// Fungsi untuk menambahkan item ke keranjang
function tambahKeKeranjang(nama, harga) {
    const item = {
        nama: nama,
        harga: harga,
        jumlah: 1
    };

    // Cek apakah item sudah ada di keranjang
    const existingItem = keranjangItems.find(i => i.nama === nama);
    if (existingItem) {
        existingItem.jumlah += 1;
    } else {
        keranjangItems.push(item);
    }

    updateKeranjangDisplay();
    showNotification('Produk ditambahkan ke keranjang!');
}

// Fungsi untuk menampilkan keranjang
function updateKeranjangDisplay() {
    const keranjangContainer = document.getElementById('keranjang-items');
    keranjangContainer.innerHTML = '';
    
    let total = 0;

    keranjangItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'keranjang-item';
        
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        itemElement.innerHTML = `
            <span>${item.nama} x${item.jumlah}</span>
            <div class="item-controls">
                <span>Rp ${subtotal.toLocaleString()}</span>
                <button onclick="kurangiJumlah(${index})">-</button>
                <button onclick="tambahJumlah(${index})">+</button>
                <button onclick="hapusItem(${index})">🗑️</button>
            </div>
        `;
        keranjangContainer.appendChild(itemElement);
    });

    document.getElementById('total-harga').textContent = 
        `Total: Rp ${total.toLocaleString()}`;
}

// Fungsi untuk menambah jumlah item
function tambahJumlah(index) {
    keranjangItems[index].jumlah += 1;
    updateKeranjangDisplay();
}

// Fungsi untuk mengurangi jumlah item
function kurangiJumlah(index) {
    if (keranjangItems[index].jumlah > 1) {
        keranjangItems[index].jumlah -= 1;
    } else {
        hapusItem(index);
    }
    updateKeranjangDisplay();
}

// Fungsi untuk menghapus item
function hapusItem(index) {
    keranjangItems.splice(index, 1);
    updateKeranjangDisplay();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Modal keranjang
    const modal = document.getElementById('keranjangModal');
    const keranjangLink = document.querySelector('a[href="#keranjang"]');
    const closeBtn = document.querySelector('.close');

    keranjangLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tambahkan event listener untuk tombol "Tambah ke Keranjang"
    const addToCartButtons = document.querySelectorAll('.produk-card button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.produk-card');
            const nama = card.querySelector('h3').textContent;
            const harga = parseInt(card.querySelector('p').textContent.replace(/\D/g, ''));
            tambahKeKeranjang(nama, harga);
        });
    });
});