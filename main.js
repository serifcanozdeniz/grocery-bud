// html elementleri
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// düzenleme seçenekleri
let editElement; // düzenleme yapılan öğeyi temsil eder
let editFlag = false // düzenleme modunda olup olmadığını belirtir
let editId = ""; // benzersiz ID

// form gönderildiğinde addItem fonksiyonunu çağır
form.addEventListener("submit", addItem);

// temizle butonuna tıklanıldığında clearItems fonksiyonunu çağır
clearBtn.addEventListener("click", clearItems);

// sayfa yüklendiğinde setupItems fonksiyonu çağır
window.addEventListener("DOMContentLoaded", setupItems);





//! functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value; // inputun giriş değerini al
    const id = new Date().getTime().toString();
    console.log(id);
    
    if(value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id"); // yeni bir veri kimliği oluşturur.
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `
                <p class="title">${value}</p> 
                    <div class="btn-container">
                        <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
        `;

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);

        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click", editItem);

        list.appendChild(element);
        // alert
        displayAlert("Başarıyla Eklendi", "success");
        // show-container
        container.classList.add("show-container");
        // local storage a ekleme
        addToLocalStorage(id, value)

        // içeriği temizleme
        setBackToDefault();
        
    } else if(value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Öğe Güncellendi", "success");
        editLocalStorage(editId, value);
        setBackToDefault();
    } else {
        displayAlert("Lütfen listeye Öğe Ekleyiniz", "danger");
    }
}
// alert fonksiyonu
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}
// temizleme
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "Ekle";
}

//silme işlemi
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // console.log(element);
    const id = element.dataset.id; // local storage da kullanılacak
    list.removeChild(element);

    if(list.children.length == 0 ) {
        container.classList.remove("show-container");
    }
    displayAlert("Öğe Silindi", "danger");

    // yerel depodan kaldır
    removeFromLocalStorage(id,);
}

// düzenleme işlemi
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // console.log(element);
    editElement = e.currentTarget.parentElement.previousElementSibling; // aynı kapsayıcı içindeki kardeş elamana ulaşmak için sibling kullanılır
    // console.log(editElement);

    // form değerini düzenlenen öğenin metniyle doldur
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id; // düzenlenen elementin kimliği
    submitBtn.textContent = "Düzenle";
}

// liste temizleme
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    // console.log(items);
    if(items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item); // her öğeyi listeden kaldırır.
        })
    }
    container.classList.remove("show-container");
    displayAlert("Liste Temizlendi", "success");
    setBackToDefault();
    

}

//! localstorage işlemleri

// yerel depoya öğe ekleme işlemi
function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
//localstorage dan verileri alma işlemi
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocalStorage(id,) {
    let items = getLocalStorage();

    items = items.filter(function(item){
        if (item.id !==id) {
            return item;
        }
    })
}

function editLocalStorage(id, value) {
    
}

function setupItems() {
    let items = getLocalStorage();
}