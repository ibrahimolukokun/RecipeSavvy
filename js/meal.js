// Get meal ID from URL query string (e.g., meal.html?id=52772)
const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");
const selectedMeal = JSON.parse(localStorage.getItem("selectedMeal"));


// Get the meal container from the DOM
const mealDetailsContainer = document.getElementById("meal-detail-container");

// Fetch meal details by ID from TheMealDB
async function fetchMealDetails(id) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        if (data.meals) {
            renderMealDetails(data.meals[0]);
        } else {
            mealDetailsContainer.innerHTML = `<p>Meal not found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching meal details:", error);
        mealDetailsContainer.innerHTML = `<p style="color:red;">Error loading meal. Try again later.</p>`;
    }
}

// Render full meal data to the page
function renderMealDetails(meal) {
    // Get all ingredients + measurements
    const ingredients = Object.keys(meal)
        .filter(key => key.startsWith("strIngredient") && meal[key])
        .map(key => {
            const index = key.replace("strIngredient", "");
            return `${meal[key]} - ${meal[`strMeasure${index}`]}`;
        });

    // Get YouTube embed link if available
    const youtubeId = meal.strYoutube ? new URL(meal.strYoutube).searchParams.get("v") : null;

    // Inject details into the DOM
    mealDetailsContainer.innerHTML = `

<div class="meal-header">

  <div class="back-link">
      
      <a href="/" class="back-link"> <i class="ri-arrow-left-line"></i> Back to Home </a>
  </div>

  <div class="header-info">
      <h2 class="recipes-name">${meal.strMeal || "Unknown Meal"}</h2>
      <p class="recipes-category">${meal.strCategory || "Unknown Category"} • ${meal.strArea || "Unknown Area"}</p>
  </div>

</div>

<div class="meal-content">
      
    <div class="video-container">

        <div class="video">
          ${
           youtubeId
          ? `<iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen="true" title="Recipe Video"></iframe>`
          : `<p class="no-video">No video available</p>`
          }
        </div>

    </div>

    <div class="meal-sidebar">
    
        <img class="meal-image" src="${meal.strMealThumb || ''}" alt="Image of the meal: ${meal.strMeal || 'Unknown Meal'}" />

        <div class="recipe-tabs">
          <button class="tab-button active" data-tab="ingredientsTab">Ingredients</button>
          <button class="tab-button" data-tab="instructionsTab">Instructions</button>
        </div>

        <div id="ingredientsTab" class="tab-content active">
          <ul>
              ${ingredients.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>

        <div id="instructionsTab" class="tab-content">
          <ol>
                ${
                (meal.strInstructions || "")
                .split(/\r?\n+/) // only split on double/multiple newlines
                .map(step => step.trim())
                .filter(step => step.length > 0)
                .map(step => `<li>${step}</li>`)
                .join("")
                }
          </ol>
        </div>

    </div>

</div>
  
`;

}

// Trigger fetch once DOM is ready
if (mealId) {
    fetchMealDetails(mealId);
  } else if (selectedMeal) {
    renderMealDetails(selectedMeal);
    localStorage.removeItem("selectedMeal"); // Only clear if used
  } else {
    mealDetailsContainer.innerHTML = `<p>No meal selected.</p>`;
  }
  
// Clear localStorage after rendering
localStorage.removeItem("selectedMeal");


// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add 'active' to clicked tab and corresponding content
    button.classList.add('active');
    const tab = button.getAttribute('data-tab');
    document.getElementById(tab).classList.add('active');
  });
});

