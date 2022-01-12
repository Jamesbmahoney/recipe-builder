// apiKeyForSpoonacular=62e75e598b60470591e3fd45554b92ca
// apiKeyForCocktailDb=1
var textInputEl = $("#text-input");
var searchListEl = $("#search-list");
var recipeContentEl = $("#recipe-content");
var clearBtnEl = $("#clear-btn");

var recipeList = [];

initList();
clearButton();

$(document).on("submit", function (event) {
    event.preventDefault();

    var ingredients = textInputEl.val();

    getRecipe(ingredients);
    recipeHistory(ingredients);
});

$("#search-btn").on("click", function (event) {
    event.preventDefault();

    var ingredients = textInputEl.val();

    getRecipe(ingredients);
    recipeHistory(ingredients);
});

$("#clear-btn").on("click", function (event) {
    recipeList = [];
    listArray();

    $(this).addClass("hide");
})

searchListEl.on("click", "li.card", function (event) {
    event.preventDefault();

    var value = $(this).data("value");

    getRecipe(value);
    recipeHistory(value);
});


$("#random-btn").on("click", function (event) {
    event.preventDefault();

    getDrink();
})


function getRecipe(ingredients) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=62e75e598b60470591e3fd45554b92ca&ingredients=" + ingredients + "&ranking=1&ignorePantry=true";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    displayRecipe(data);

                })
            }
        })
}

function displayRecipe(recipeInfo) {
    for (var i = 0; i < recipeInfo.length; i++) {

        var recipeImage = recipeInfo[i].image;
        var recipeName = recipeInfo[i].title;
        var recipeId = recipeInfo[i].id;

        console.log(recipeImage, recipeName, recipeId);

        getRecipeId(recipeId);

        function getRecipeId(recipeId) {
            var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=62e75e598b60470591e3fd45554b92ca&includeNutrition=false"
            fetch(apiUrl)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                        })
                    }
                })
        }
    }
}

function getDrink() {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php?apiKey=1";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    var cocktailName = data.drinks[0].strDrink;
                    var cocktailThumb = data.drinks[0].strDrinkThumb;
                    var cocktailIngr = data.drinks[0].strIngredient1 + "\n"
                        + data.drinks[0].strIngredient2 + "\n"
                        + data.drinks[0].strIngredient3 + "\n"
                        + data.drinks[0].strIngredient4 + "\n"
                        + data.drinks[0].strIngredient5 + "\n";
                    var cocktailInst = data.drinks[0].strInstructions;

                    console.log(cocktailName, cocktailThumb, cocktailIngr, cocktailInst);

                    document.getElementById("cocktail-name").textContent = cocktailName;
                    document.getElementById("cocktail-img").src = cocktailThumb;
                    document.getElementById("cocktail-ingr").textContent = cocktailIngr;
                    document.getElementById("cocktail-inst").textContent = cocktailInst;

                })
            }
        })
}

function recipeHistory(ingredients) {
    if (ingredients) {
        if (recipeList.indexOf(ingredients) === -1) {
            recipeList.push(ingredients);

            listArray();
            clearBtnEl.removeClass("hide");
            recipeContentEl.removeClass("hide");
        } else {
            var removeIndex = recipeList.indexOf(ingredients);
            recipeList.splice(removeIndex, 1);

            recipeList.push(ingredients);

            listArray();
            clearBtnEl.removeClass("hide");
            recipeContentEl.removeClass("hide");
        }
    }

}

function listArray() {
    searchListEl.empty();
    recipeList.forEach(function (recipe) {
        var recipeObj = $('<li class="card">');
        recipeObj.attr("data-value", recipe);
        recipeObj.text(recipe);
        searchListEl.prepend(recipeObj);
    });

    localStorage.setItem("recipes", JSON.stringify(recipeList));
}


function initList() {
    if (localStorage.getItem("recipes")) {
        recipeList = JSON.parse(localStorage.getItem("recipes"));
        var lastIndex = recipeList.length - 1;

        listArray();

        if (recipeList.length !== 0) {
            getRecipe(recipeList[lastIndex]);
            recipeContentEl.removeClass("hide");
        }
    }
}

function clearButton() {
    if (searchListEl.text() !== "") {
        clearBtnEl.removeClass("hide");
    }
}