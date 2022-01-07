// apiKeyForSpoonacular=62e75e598b60470591e3fd45554b92ca
// apiKeyForCocktailDb=1 



 function getRecipe() {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=62e75e598b60470591e3fd45554b92ca&ingredients=apples,+flour,+sugar&number=2";
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
                        + data.drinks[0].strIngredient1; + "\n";
                        
                       
                        
                        console.log(cocktail);
                    })
                }
            })
}


 getRecipe();
getDrink();



