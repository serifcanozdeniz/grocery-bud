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





//! functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value; // finputun giriş değerini al
    const id = new Date().getTime().toString();
    console.log(id);
}