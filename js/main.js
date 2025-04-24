import { fetchRecipes, fetchRandomRecipes } from './api.js';
import { displayRecipes, displayNoResults, displayError } from './dom.js';

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const seeMoreBtn = document.getElementById("see-more-btn");
const recipeHeader = document.getElementById("recipe-list-header");



// Handle search
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const meals = await fetchRecipes(query);
      meals ? displayRecipes(meals) : displayNoResults();
      seeMoreBtn.style.display = "none";
      recipeHeader.textContent = `Search Results for "${query}"`;
      recipeHeader.style.fontSize = "1.5rem";
      recipeHeader.style.fontWeight = "bold";
      recipeHeader.style.color = "#333";
      localStorage.removeItem("randomMeals"); // clear cache on search
    } catch (err) {
      console.error(err);
      displayError();
    }
  }
});

// Load meals on page load
document.addEventListener("DOMContentLoaded", async () => {
  const cachedMeals = localStorage.getItem("randomMeals");
  if (cachedMeals) {
    const meals = JSON.parse(cachedMeals);
    displayRecipes(meals);
  } else {
    try {
      const initialMeals = await fetchRandomRecipes(6);
      displayRecipes(initialMeals);
      localStorage.setItem("randomMeals", JSON.stringify(initialMeals));
    } catch (err) {
      displayError();
    }
  }
});

// Show See More button after random recipes are loaded
seeMoreBtn.style.display = "none"; // Hide initially
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const initialMeals = await fetchRandomRecipes(6);
    if (initialMeals && initialMeals.length > 0) {
      seeMoreBtn.style.display = "block"; // Show button if meals are loaded
    }
  } catch (err) {
    console.error(err);
  }
});

// Handle See More
seeMoreBtn.addEventListener("click", async () => {
  try {
    const moreMeals = await fetchRandomRecipes(6);
    const currentMeals = JSON.parse(localStorage.getItem("randomMeals")) || [];
    const updatedMeals = [...currentMeals, ...moreMeals];
    displayRecipes(moreMeals, true); // Append!
    localStorage.setItem("randomMeals", JSON.stringify(updatedMeals));
  } catch (err) {
    console.error(err);
    displayError();
  }
});
