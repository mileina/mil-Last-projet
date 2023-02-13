var films = [
  { name: "Deadpool", year: 2016, author: "Tim Miller" },
  { name: "Spiderman", year: 2002, author: "Sam Raimi" },
  { name: "Scream", year: 1996, author: "Wes Craven" },
  { name: "It: Chapter 1", year: 2019, author: "Andy Muschietti" },
];
var table = document.querySelector("table");
var form = document.querySelector("form");
var titleInput = document.querySelector("#film-title");
var yearInput = document.querySelector("#film-year");
var authorInput = document.querySelector("#film-author");
var submitBtn = document.querySelector("button[type='submit']");
var addFilmBtn = document.querySelector("#add-film-btn");
var filterSelect = document.querySelector("#filter-select");

filterSelect.addEventListener("change", function () {
  var selectedOption = this.value;

  films.sort(function (a, b) {
    if (selectedOption === "title") {
      return a.name.localeCompare(b.name);
    } else if (selectedOption === "year") {
      return a.year - b.year;
    } else if (selectedOption === "author") {
      return a.author.localeCompare(b.author);
    }
  });
  renderFilms();
});

function validateForm() {
  var title = titleInput.value;
  var year = yearInput.value;
  var author = authorInput.value;

  var errors = [];

  if (title.length < 2) {
    errors.push("Le titre doit comporter au moins 2 caractères");
  }

  if (year.length !== 4 || year < 1900 || year > new Date().getFullYear()) {
    errors.push(
      "L'année doit être une valeur à 4 chiffres entre 1900 et l'année en cours"
    );
  }

  if (author.length < 5) {
    errors.push("L'auteur doit avoir au moins 5 caractères");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
}

function addFilm() {
  if (validateForm()) {
    films.push({
      name: titleInput.value,
      year: yearInput.value,
      author: authorInput.value,
    });
    form.reset();
    form.classList.add("d-none");
    addFilmBtn.classList.remove("d-none");
    renderFilms();
  }
}

function renderFilms() {
  var filmsList = document.querySelector("#films-list");
  filmsList.innerHTML = "";

  films.forEach(function (film) {
    var tr = document.createElement("tr");
    var nameTd = document.createElement("td");
    nameTd.textContent = film.name;
    tr.appendChild(nameTd);

    var yearTd = document.createElement("td");
    yearTd.textContent = film.year;
    tr.appendChild(yearTd);

    var authorTd = document.createElement("td");
    authorTd.textContent = film.author;
    tr.appendChild(authorTd);

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "supprimer";
    deleteBtn.addEventListener("click", function () {
      var confirmDeletion = confirm("Voulez-vous vraiment supprimer ce film ?");
      if (confirmDeletion) {
        var filmIndex = films.indexOf(film);
        films.splice(filmIndex, 1);
        renderFilms();
      }
    });

    var cell = document.createElement("td");
    cell.appendChild(deleteBtn);
    tr.appendChild(cell);

    filmsList.appendChild(tr);
  });
}

addFilmBtn.addEventListener("click", function () {
  form.classList.remove("d-none");
  addFilmBtn.classList.add("d-none");
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addFilm();
});

function addFilm() {
  if (validateForm()) {
    films.push({
      name:
        titleInput.value.charAt(0).toUpperCase() + titleInput.value.slice(1),
      year: yearInput.value,
      author:
        authorInput.value.charAt(0).toUpperCase() + authorInput.value.slice(1),
    });
    form.reset();
    form.classList.add("d-none");
    addFilmBtn.classList.remove("d-none");
    renderFilms();

    setTimeout(function () {
      alert("Film ajouté avec succès");
    }, 3000);
  } else {
    setTimeout(function () {
      alert("Erreur dans le formulaire: " + errors.join(", "));
    }, 5000);
  }
}

renderFilms();

//Ce code JavaScript implémente une application de gestion de films. Il se compose des étapes suivantes :

//Définition d'un tableau de films et sélection de différents éléments HTML dans la page.
//Ajout d'un écouteur d'événement "change" sur le sélecteur de filtre pour permettre le tri des films en fonction du titre, de l'année ou de l'auteur.
//Définition de la fonction "validateForm" pour valider le formulaire d'ajout de film en vérifiant la longueur du titre, l'année et l'auteur.
//Définition de la fonction "addFilm" pour ajouter un nouveau film dans le tableau de films en utilisant les entrées du formulaire et en appelant la fonction "validateForm".
//Définition de la fonction "renderFilms" pour afficher les films dans un tableau HTML en utilisant une boucle pour chaque film dans le tableau de films.
//Ajout d'un écouteur d'événement "click" sur le bouton d'ajout de film pour afficher le formulaire d'ajout de film.
//Ajout d'un écouteur d'événement "click" sur le bouton "soumettre" pour ajouter un nouveau film en appelant la fonction "addFilm".
// Ajout d'un écouteur d'événement "click" sur le bouton "supprimer" pour chaque film pour permettre la suppression de films en confirmant avec l'utilisateur.

//suite alert
//parsint pour les nombres /!>