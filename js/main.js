import { fetchRecipes, fetchRandomRecipes } from './api.js';
import { displayRecipes, displayNoResults, displayError } from './dom.js';

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const seeMoreBtn = document.getElementById("see-more-btn");

// Event listener for search button
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const meals = await fetchRecipes(query);
      meals ? displayRecipes(meals) : displayNoResults();
      seeMoreBtn.style.display = "none";
    } catch (err) {
      console.error(err);
      displayError();
    }
  }
});

// Load random meals on homepage
(async () => {
  try {
    const randomMeals = await fetchRandomRecipes();
    displayRecipes(randomMeals);
  } catch (err) {
    displayError();
  }
})();


document.addEventListener("DOMContentLoaded", async () => {
  const initialMeals = await fetchRandomRecipes(6);
  displayRecipes(initialMeals);  
});

seeMoreBtn.addEventListener("click", async () => {
  const moreMeals = await fetchRandomRecipes(6);
  displayRecipes(moreMeals, true); // Append!
});