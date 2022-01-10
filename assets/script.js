// apiKeyForSpoonacular=62e75e598b60470591e3fd45554b92ca
// apiKeyForCocktailDb=1
var textInputEl = $("#text-input");
var searchListEl = $("#search-list");
var recipeContentEl = $("#recipe-content");

var recipeList = [];
var recipeInfo = "";
var recipeInfo = {
    name : recipeName,
    img : recipeImage,
    id : recipeId
};

$("#search-btn").on("click", function (event) {
    event.preventDefault();

    var ingredients = textInputEl.val();
    
    getRecipe(ingredients);
    recipeHistory(recipeInfo);
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

                            var recipeFull = recipeId.recipe;

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

                    var cocktail = data.drinks[0].strDrink + "\n"
                        + data.drinks[0].strDrinkThumb + "\n"
                        + data.drinks[0].strIngredient1 + "\n"
                        + data.drinks[0].strIngredient2 + "\n"
                        + data.drinks[0].strIngredient3 + "\n"
                        + data.drinks[0].strIngredient4 + "\n"
                        + data.drinks[0].strIngredient5 + "\n"
                        + data.drinks[0].strInstructions + "\n";

                    console.log(cocktail);
                })
            }
        })
}

function recipeHistory(recipeInfo) {
    if (recipeInfo) {
        var removeIndex = recipeList.indexOf(recipeInfo);
        recipeList.splice(removeIndex, 1);

        recipeList.push(recipeInfo);

        listArray();
    }

    function listArray() {
        searchListEl.empty();
        recipeList.forEach(function (recipe) {
            var recipeObj = $('<li class="list-group-item city-btn bg-light bg-gradient border rounded justify-content-start mx-1 my-1">');
            recipeObj.attr("data-value", recipe);
            recipeObj.text(recipe);
            searchListEl.prepend(recipeObj);
        });

        localStorage.setItem("recipes", JSON.stringify(recipeList));
    }
}

function initList() {
    if (localStorage.getItem("recipes")) {
        recipeList = JSON.parse(localStorage.getItem("recipes"));
        var lastIndex = recipeList.length - 1;

        listArray();

        if (recipeList.length !== 0) {
            getRecipeName(recipeList[lastIndex]);
            weatherContentEl.removeClass("hide");

        }
    }
}