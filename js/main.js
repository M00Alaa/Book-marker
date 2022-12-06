var bookName = document.getElementById("bookName");
var bookLink = document.getElementById("bookLink");
var submit = document.getElementById("submit");
var searchBook = document.getElementById("searchBook");
var currentIndex = 0;

var books = [];
if (localStorage.getItem("bookData") != null) {
  books = JSON.parse(localStorage.getItem("bookData"));
  displayData();
}
var nameAlert = document.getElementById("nameAlert");
bookName.onkeyup = function () {
  var nameRejx = /^[A-Z][a-z]{3,}$/;
  if (nameRejx.test(bookName.value)) {
    submit.removeAttribute("disabled");
    bookName.classList.add("is-valid");
    bookName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    submit.disabled = "true";
    bookName.classList.add("is-invalid");
    bookName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
};
var linkAlert = document.getElementById("linkAlert");
bookLink.onkeyup = function () {
    var linkRejx = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{3,8}\.[a-z]{3}$/;
  if (linkRejx.test(bookLink.value)) {
    submit.removeAttribute("disabled");
    bookLink.classList.add("is-valid");
    bookLink.classList.remove("is-invalid");
    linkAlert.classList.add("d-none");
  } else {
    submit.disabled = "true";
    bookLink.classList.add("is-invalid");
    bookLink.classList.remove("is-valid");
    linkAlert.classList.remove("d-none");
  }
};
submit.onclick = function () {
  addBookData();
  // if (submit.innerHTML == "Submit") {
  // } else {
  //   // updateBook();
  // }
  displayData();
  clearForm();
};
function addBookData() {
  var book = {
    name: bookName.value,
    link: bookLink.value,
  };
  books.push(book);
  localStorage.setItem("bookData", JSON.stringify(books));
  console.log(books);
}
function clearForm() {
  bookName.value = "";
  bookLink.value = "";
}
function displayData() {
  var e = "";
  for (var i = 0; i < books.length; i++) {
    e += `<tr>
    <td>${books[i].name}</td>
    <td><a target="_blank" class="btn btn-outline-primary" href="https://${books[i].link}">visit</a></td>
    <td><button onclick="getBookInfo(${i})" class="btn btn-outline-success">Update</button></td>
    <td><button onclick="deleteData(${i})" class="btn btn-outline-danger">Delete</button></td>
</tr>`;
  }
  document.getElementById("myBody").innerHTML = e;
}
function deleteData(index) {
  books.splice(index, 1);
  localStorage.setItem("bookData", JSON.stringify(books));
  displayData();
}
// function getBookInfo(index) {
//   currentIndex = index;

//   var currentBook = books[index];
//   bookName.value = currentBook.name;
//   bookLink.value = currentBook.link;

//   submit.innerHTML = "update data";
// }
// function updateBook() {
//   var book = {
//     name: bookName.value,
//     link: bookLink.value,
//   };
//   books[currentIndex] = book;
//   localStorage.setItem("bookData", JSON.stringify(books));
//   submit.innerHTML = "Submit";
// }
searchBook.onkeyup = function () {
  var e = "";
  for (var i = 0; i < books.length; i++) {
    if (books[i].name.toLowerCase().includes(searchBook.value.toLowerCase())) {
      e += `<tr>
      <td>${books[i].name}</td>
      <td><a target="_blank" class="btn btn-outline-primary" href="https://${books[i].link}">visit</a></td>
      <td><button onclick="getBookInfo(${i})" class="btn btn-outline-success">Update</button></td>
      <td><button onclick="deleteData(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
    }
  }
  document.getElementById("myBody").innerHTML = e;
};