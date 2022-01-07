// apiKeyForSpoonacular=62e75e598b60470591e3fd45554b92ca
// apiKeyForCocktailDb=1
var textInputEl = $("#text-input");

$(document).on("submit", function (event) {
    event.preventDefault();

    var ingredients = textInputEl.val();

    getRecipe(ingredients);
});


$("#search-btn").on("click", function (event){
    event.preventDefault();

    var ingredients = textInputEl.val();

    getRecipe(ingredients);
});



 function getRecipe(ingredients) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=62e75e598b60470591e3fd45554b92ca&ingredients=" + ingredients;
      fetch(apiUrl)
        .then(function (response){
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);                   

                    displayRecipe(data);
                    
                })
            }
        })
}

function displayRecipe(recipe) {
    for (var i = 0; i < recipe.length; i++) {
        var recipeImage = recipe[i].image;
        var recipeName = recipe[i].title;
        console.log(recipeImage, recipeName);
    }
}

function getDrink() {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php?apiKey=1";
        fetch(apiUrl)
            .then(function (response){
                if (response.ok) {
                    response.json().then(function(data){
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


getRecipe();
getDrink();



