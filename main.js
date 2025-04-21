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

// Event listener for "See More" button
seeMoreBtn.addEventListener("click", async () => {
    try {
      const randomMeals = await fetchRandomRecipes();
      displayRecipes(randomMeals);
    } catch (err) {
      displayError();
    }
  })();

