const recipeCardsContainer = document.querySelector(".recipe-cards-container");

// Function to display recipes
// This function takes an array of meal objects and displays them in the recipe cards container
export function displayRecipes(meals, append = false) {
  if (!append) {
      recipeCardsContainer.innerHTML = ""; // clear only if not appending
  }

  meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
          <div class="recipe-image" style="background-image: url('${meal.strMealThumb}'); background-size: cover; background-position: center; height: 200px; position: relative; display: flex; align-items: start; justify-content: flex-end;">
          <div class="recipe-review" style="position: absolute; background-color: rgba(31, 31, 31, 0.761); color: #fff; padding: 0.5rem 1rem; border-radius: 0 0.3rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="ri-star-fill" style="color: orange;"></i>
          <p style="margin: 0; font-weight: 600;">${(Math.random() * 1 + 4).toFixed(1)}</p>
          </div>
          </div>

          <div class="recipe-details">
          <div class="recipe-title">
          <h3>${meal.strMeal}</h3>
          </div>
          <div class="recipe-description">
          <p>${meal.strInstructions.substring(0, 100)}...</p>
          </div>
          </div>

          <div class="recipe-info">
          <div class="recipe-icon-info">
          <i class="ri-time-line"></i>
          <p>30 mins</p>
          </div>
          <div class="recipe-icon-info">
          <i class="ri-heart-line"></i>
          <p>${Math.floor(Math.random() * 200 + 50)} saves</p>
          </div>
          </div>
      `;

      recipeCardsContainer.appendChild(card);
  });
}


// Function to display a message when no recipes are found
// This function clears the recipe cards container and displays a message
export function displayNoResults() {
  recipeCardsContainer.innerHTML = `
    <p style="text-align: center; font-size: 1.2rem; padding: 2rem;">No recipes found. Try something else!</p>
  `;
}

// Function to display an error message
// This function clears the recipe cards container and displays an error message
export function displayError() {
  recipeCardsContainer.innerHTML = `
    <p style="text-align: center; font-size: 1.2rem; padding: 2rem; color: red;">An error occurred. Please try again later.</p>
  `;
}

