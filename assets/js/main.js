// pastikan data tersedia di local storage
if(!localStorage.getItem('data_buku')){
    localStorage.setItem('data_buku', JSON.stringify([]))
}

// ambil data dari local storage
const data = JSON.parse(localStorage.getItem('data_buku'))

const form = document.querySelector('form')
const table = document.querySelector('table')

// aksi ketika submit
form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (form.ID.value == '') {
        tambahData()
    } else {
        updateData()
    }
    form.reset()
})

// fungsi untuk menampilkan data
function tampilkanData() {

    // pastikan seluruh data tersimpan
    localStorage.setItem('data_buku', JSON.stringify(data))

    // kosongkan tabel
    const tbody = table.querySelector('tbody')
    tbody.innerHTML = ''

    for (let index = 0; index < data.length; index++) {

        const item = data[index]

        const tr = document.createElement('tr')

        tr.innerHTML =
            `
            <th>${index + 1}</th>
            <th>
                <img src="${item.gambar}" alt="gambar" width="100" />
            </th>
            <th>${item.judul}</th>
            <th>${item.kategori}</th>
            <th>
                <button class="tombol tombol-hapus" onclick="hapusData(${index})">hapus</button>
                <button class="tombol tombol-edit" onclick="editData(${index})">edit</button>
            </th>
            `

        tbody.appendChild(tr)
    }
}

tampilkanData()

// fungsi untuk menambahkan data
function tambahData() {
    const item = {
        id: Math.floor(Math.random() * 100000),
        gambar: URL.createObjectURL(form.gambar.files[0]),
        judul: form.judul.value,
        kategori: form.kategori.value
    }

    data.push(item)
    tampilkanData()
}

// fungsi untuk mengedit data
function editData(index) {
    const item = data[index]

    form.ID.value = item.id
    form.judul.value = item.judul
    form.kategori.value = item.kategori
}

// fungsi untuk mengupdate data
function updateData() {
    // ambil data dengan id yang sama dengan input id
    const index = data.findIndex(data => data.id == form.ID.value)

    const item = {
        id: data[index].id,
        gambar: data[index].gambar,
        judul: form.judul.value,
        kategori: form.kategori.value
    }

    // ubah gambar apabila file diupload
    if(form.gambar.files[0]){
        item.gambar = URL.createObjectURL(form.gambar.files[0])
    }
    
    data[index] = item

    tampilkanData()
}

// fungsi untuk menghapus data
function hapusData(index) {
    data.splice(index, 1)
    tampilkanData()
}

