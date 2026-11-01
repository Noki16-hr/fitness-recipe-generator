function displayRecipe(response) {
  let recipeElement = document.querySelector("#recipe");

  recipeElement.textContent = "";

  new Typewriter("#recipe", {
    strings: [response.data.answer],
    autoStart: true,
    delay: 5,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let fitnessGoal = document.querySelector("#fitness-goal").value;
  let cookingTime = document.querySelector("#cooking-time").value;

  let apiKey = "oc0tb825b206594e16f09ec343af3b8b";

  let prompt = `
Create a healthy recipe using: ${instructionsInput.value}.

Fitness goal: ${fitnessGoal}.
Maximum cooking time: ${cookingTime} minutes.
`;

  let context = `
You are a healthy fitness chef who creates quick,
affordable and delicious recipes.

Using the user's ingredients, fitness goal and time limit,
generate one simple recipe with:

- A creative title in <h2>
- Total cooking time and servings
- Ingredients with quantities in <ul>
- Step-by-step instructions in <ol>
- Estimated calories and protein per serving
- One healthy cooking tip

Adapt the recipe to the fitness goal:
- Muscle gain: prioritize protein.
- Weight management: prioritize balanced, filling meals.
- Balanced eating: include protein, vegetables,
  carbohydrates and healthy fats.

Keep total preparation and cooking within the time limit.
Use <h3> for sections and <strong> for key information.
Return only basic HTML, without Markdown code fences.
Clearly label nutritional values as estimates.
`;

  let apiURL = "https://api.shecodes.io/ai/v1/generate";

  let recipeElement = document.querySelector("#recipe");
  let submitButton = document.querySelector(".submit-button");
  submitButton.disabled = true;
  recipeElement.classList.remove("hidden");
  recipeElement.textContent = `⏳ Generating a healthy recipe with ${instructionsInput.value}...`;
  axios
    .get(apiURL, {
      params: {
        prompt: prompt,
        context: context,
        key: apiKey,
      },
    })
    .then(displayRecipe)
    .catch(function (error) {
      console.error(error);
      recipeElement.textContent =
        "Sorry, something went wrong. Please try again.";
    })
    .finally(function () {
      submitButton.disabled = false;
    });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
