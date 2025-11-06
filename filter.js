(() => {
  const searchIn = document.getElementById("foodSearch");
  const searchBtn = document.getElementById("searchBtn");
  const meals = document.getElementById("meals");


  function displayMealsList(mealsData) {
    meals.classList.add("flex", "flex-wrap", "justify-center", "gap-8", "px-10", "py-10");
    meals.innerHTML = "";

    if (!mealsData || mealsData.length === 0) {
      meals.innerHTML = `<p class="text-gray-700 text-xl text-center">No meals found. Try another search!</p>`;
      return;
    }

  mealsData.forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.className = "bg-white rounded-xl shadow-lg overflow-hidden w-80 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer";
      mealCard.innerHTML = `
        <div class="relative p-4">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-52 object-cover rounded-lg">
          <div class="mt-3">
            <h3 class="text-lg font-semibold text-orange-600">${meal.strMeal}</h3>
          </div>
        </div>
      `;
      meals.appendChild(mealCard);
  });
}

  function searchMealsByName(foodName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then((response) => response.json())
      .then((data) => displayMealsList(data.meals))
      .catch((error) => console.error("Error fetching search results:", error));
  }

  function filterByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => displayMealsList(data.meals))
      .catch((error) => console.error("Error filtering meals:", error));
  }

  searchBtn.addEventListener("click", () => {
    const query = searchIn.value.trim();
    if (query) searchMealsByName(query);
  });

  searchIn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchIn.value.trim();
      if (query) searchMealsByName(query);
    }
  });
  window.filterByCategory = filterByCategory;
})();
