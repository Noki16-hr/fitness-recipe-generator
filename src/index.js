function displayRecipe(response) {
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
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
You are a professional healthy fitness chef.

Create one simple, delicious recipe using the
ingredients provided by the user.

Include:
1. A creative recipe title
2. Preparation and cooking time
3. Ingredients with quantities
4. Step-by-step cooking instructions
5. Estimated calories and protein per serving
6. One healthy cooking tip

Prioritize affordable ingredients, quick preparation,
and balanced nutrition.

Use simple HTML formatting.
Do not include Markdown code fences.
Clearly label nutritional information as estimates.
Use an <h2> element for the recipe title.
Use <h3> elements for section headings.
Use <ul> for ingredients and <ol> for cooking steps.
Use <strong> to highlight cooking time and nutrition.
Keep the formatting clean and easy to read.

Adapt the recipe to the selected fitness goal.

For muscle gain, prioritize protein-rich ingredients.
For weight management, prioritize balanced, satisfying meals.
For balanced eating, include a good balance of protein,
vegetables, carbohydrates, and healthy fats.

The total preparation and cooking time should not exceed
the user's selected time limit.

Clearly label calories and protein as estimates.
`;

  let apiURL = "https://api.shecodes.io/ai/v1/generate";

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
    });

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating"> ⏳ Generating a healthy recipe about ${instructionsInput.value}</div>`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
