$(document).ready(function () {
  function highlight(word, query) {
    let check = new RegExp(query, "ig");
    return word.toString().replace(check, function (matchedText) {
      return "<u style='background-color: yellow'>" + matchedText + "</u>";
    });
  }

  $(".search-input, .search-year, .search-type").keyup(function () {
    let search = $(this).val();
    let year = $(".search-year").val();
    let type = $(".search-type").val();
    let results = "";
    if (search == "") {
      $("#result-list").hide();
      $(".search-input").removeClass("arrow").addClass("search");
    } else {
      $(".search-input").removeClass("search").addClass("arrow");
    }

    $.getJSON(
      "https://www.omdbapi.com/?",
      { apikey: "fd161998", s: search },
      function (data) {
        if (data.Search !== undefined) {
          $.each(data.Search, function (index, value) {
            if (index < 2) {
              $.getJSON(
                "https://www.omdbapi.com/?",
                { apikey: "fd161998", i: value.imdbID },
                function (movieData) {
                  if (movieData) {
                    results += '<div class="result row p-1">';
                    results +=
                      '<div class="col-sm-5"><img src=' +
                      movieData.Poster +
                      ' style="width: 170px; height: 250px;" /></div>';
                    results += '<div class="col-sm-7 text-left">';
                    results +=
                      '<div class="movie-title">' +
                      highlight(movieData.Title, $(".search-input").val()) +
                      " (" +
                      movieData.Year +
                      ")</div>";
                    results +=
                      '<div class="rating-div"><span class="h4 rating">' +
                      movieData.imdbRating +
                      "</span>/10</div>";
                    results += "</div>";
                    results += "</div>";
                    $("#results").html(results);

                    if (/Mobi|Android/i.test(navigator.userAgent)) {
                      $("#results").children(".result").eq(1).hide();
                    } else {
                      $(".result").first().after("<hr>");
                    }
                  }
                }
              );
            }
          });
          $("#result-list").show();
        }
      }
    );
  });

  $("#show-more").click(function (e) {
    e.preventDefault();
    var search = $(".search-input").val();
    let listResults = "";
    $("#search").hide();
    $("#list").show();
    $("#search-term").html("Resultat de recheche pour: " + search);
    $.getJSON(
      "https://www.omdbapi.com/?",
      { apikey: "fd161998", s: search },
      function (listData) {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          $("#list-count").html("(" + listData.totalResults + ")");
        } else {
          $("#list-count").html(listData.totalResults + " movie found");
        }
        if (listData.Search !== undefined) {
          $.each(listData.Search, function (index, value) {
            $.getJSON(
              "https://www.omdbapi.com/?",
              { apikey: "fd161998", i: value.imdbID },
              function (listMovieData) {
                if (listMovieData) {
                  listResults += '<div class="list-result col-6 p-3">';
                  listResults += '<div class="row">';
                  if (listMovieData.Poster !== "N/A") {
                    listResults +=
                      '<div class="col-md-6"><img src="' +
                      listMovieData.Poster +
                      '" style="width: 100%;" /></div>';
                  } else {
                    listResults +=
                      '<div class="col-md-6"><img src="imported_image.jpg" style="width: 100%;" /></div>';
                  }
                  listResults += '<div class="col-md-6 text-left">';
                  listResults +=
                    '<div class="movie-title">' +
                    highlight(listMovieData.Title, $(".search-input").val()) +
                    " (" +
                    listMovieData.Year +
                    ")</div>";
                  listResults += "</div>"; // col-6 end
                  listResults += "</div>"; // row end
                  listResults += "</div>"; // list-result col-6 end
                  $("#list-results").html(listResults);
                  $(".list-result:odd:not(:last-child)").after(
                    "<div class='col-12'><hr></div>"
                  );
                }
              }
            );
          });
        }
      }
    );
  });

  $("#searchAgain").click(function () {
    $("#search").show();
    $("#list").hide();
    $("#result-list").hide();
    $(".search-input").val("");
  });
});


//La fonction "highlight" est définie pour surligner le mot recherché dans le résultat. Elle prend en entrée un mot et une requête, 
//et utilise une expression régulière pour remplacer le mot trouvé par une version surlignée.

//Le code suivant définit un écouteur d'événement "keyup" pour les champs de saisie de recherche. Lorsque l'utilisateur saisit 
//du texte dans ces champs, une requête JSON est envoyée à l'API OMDB.

//La réponse de l'API OMDB contenant les résultats de la recherche est parcourue et, pour les deux premiers résultats, 
//des données supplémentaires sur les films sont récupérées grâce à une autre requête JSON.

//Les données sur les films sont ensuite utilisées pour construire une liste HTML des résultats de recherche, avec 
//le titre et l'année de chaque film, ainsi que son poster et son classement IMDB.

//Le code suivant définit un écouteur d'événement "click" pour le bouton "show-more". Lorsque l'utilisateur 
//clique sur ce bouton, une nouvelle requête JSON est envoyée à l'API OMDB pour obtenir une liste complète des résultats de recherche.

//Les résultats de la recherche sont affichés dans une liste HTML avec le titre et l'année de chaque film, ainsi que son poster.