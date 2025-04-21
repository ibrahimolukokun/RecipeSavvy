const API_BASE = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Function to fetch recipes based on a search query
// This function takes a search query as an argument and fetches recipes from the API
export async function fetchRecipes(query) {
  const response = await fetch(`${API_BASE}${query}`);
  const data = await response.json();
  return data.meals || null;
}

// Function to fetch random recipes
// This function fetches a specified number of random recipes from the API
export async function fetchRandomRecipes(count = 6) {
  const meals = [];
  for (let i = 0; i < count; i++) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    if (data.meals) meals.push(data.meals[0]);
  }
  return meals;
}

// Function to fectch more recipes on the homepage
// This function fetches a specified number of random recipes from the API
export async function fetchMoreRecipes(count = 6) {
  const meals = [];
  for (let i = 0; i < count; i++) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    if (data.meals) meals.push(data.meals[0]);
  }
  return meals;
}