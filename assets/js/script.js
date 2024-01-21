// Empty array of previous searches, needed for buttons and localstorage
let userIngredientsSearch = [];


function getInfo(ingredient) {

    //APi for the food search conform the ingredients 
    const apiKeySearch = "20fa1c17de69490f93632c908260c7bb";

    const queryUrlSearch = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&addRecipeInformation=true&fillIngredients=true&number=4&apiKey=${apiKeySearch}`

    fetch(queryUrlSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        renderButton(ingredient)
      
        recipesCards(data)
      
        $(`#userData-input`).val(``);

      });
}

  function userInput() {
    $("#search-form").on("submit", function (e) {
      e.preventDefault();
  
      let userInputIngredients = $("#userData").val().trim();
  
      getInfo(userInputIngredients)
    })
  }
  
  userInput()
  
  
  // This function capitalize any string parameter will be passed in. It makes sure that each input ingredient from the user will be capitalized and then used for the name of the buttons (this is happening in the renderButton function).
  function capitalizeWords(inputString) {
    return inputString.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  }
  

// This function creates buttons for each user search and it checks if the button with the same ingredient already exist, if not it will append it to the aside section.
function renderButton(userInputIngredients) {
  // If the user inputs any ingredient with capital letter the method will tranform every letter to lowercase.
  if (/[A-Z]/.test(userInputIngredients)) {
    userInputIngredients = userInputIngredients.toLowerCase();
  }
  const capitalizedUserInputIngredients = capitalizeWords(userInputIngredients);
  if (!userIngredientsSearch.includes(capitalizedUserInputIngredients)){
    const createButton = $("<button class = buttonSearch>").text(`${capitalizedUserInputIngredients}`);
    $(`.history`).append(createButton);
    userIngredientsSearch.push(capitalizedUserInputIngredients)
  }
}

// Event listener for click on buttonSearch, it will regenerate a search when clicking on the history buttons.
$(document).on("click", ".buttonSearch", function (event) {
  // console.log("Button clicked:", event.target.textContent)
  getInfo(event.target.textContent)
});



//API for the food Nutrition
// !Test the input
function nutrition(){

const ingredientsNutrition = `${data.ingredients}`

const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
const apiIdNutrition = '3b7c2557';

// const apiKeyNutrition = '8ac12198fbdb382b08155c59b542c40f';
// const apiIdNutrition = 'c3a22b69';

// const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
// const apiIdNutrition = '3b7c2557';

const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=${ingredientsNutrition}`;

fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataIngredients) {
    console.log(dataIngredients);
  });
}


  function recipesCards(data) {
    $(`.food-options`).empty()
    for (let i = 0; i < data.results.length; i++) {
      const divCard = $(`<div class = card>`);
      const divCardBody = $(`<div class= card-body>`);
      const recipeTitle = $(`<h5>`).text(data.results[i].title);
      const recipeImg = $(`<img class = imgRecipe>`).attr(`src`, data.results[i].image);
      const recipeTime = $(`<p class = readyInMinutes>`).text(`Ready in ${data.results[i].readyInMinutes} min`)
      const recipeServing = $(`<p class = serving>`).text(`Serving: ${data.results[i].servings}`)
  
      const dietsDiv = $(`<div class = dietsInfo>`)
      const dietsTitle = $(`<h6>`).text(`Diets:`)
      let dietsString = "";
      for (let j = 0; j < data.results[i].diets.length; j++) {
        const recipeDiets = data.results[i].diets[j];
        dietsString += recipeDiets + `, `
      }
      dietsString = dietsString.slice(0, -2);
      dietsDiv.append(dietsTitle, ($(`<p>`).text(dietsString)))
  
      const ingredientsDiv = $(`<div class = ingredientsInfo>`)
      const ingredientsTitle = $(`<h6>`).text(`Ingredients:`)
      let ingredientsString = "";
      for (let k = 0; k < data.results[i].extendedIngredients.length; k++) {
        const ingredientName = data.results[i].extendedIngredients[k].name;
        ingredientsString += ingredientName + `, `
      }
      ingredientsString = ingredientsString.slice(0, -2);
      ingredientsDiv.append(ingredientsTitle, ($(`<p>`).text(ingredientsString)))
  
      $(`.food-options`).append(divCard);
      divCard.append(divCardBody);
      divCardBody.append(recipeTitle, recipeImg, recipeTime, recipeServing, dietsDiv, ingredientsDiv)
      // we could add cusines and link to external URL
    }
  }