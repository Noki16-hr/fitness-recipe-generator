function displayRecipe(response) {
  console.log("Full API response:", response.data);

  let recipeElement = document.querySelector("#recipe");
  recipeElement.innerHTML =
    response.data.answer || "No recipe was generated. Please try again.";
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
You are a healthy fitness chef.
Create one quick, healthy recipe using the user's ingredients.
Adapt it to their fitness goal and cooking time.
Include a title, ingredients, instructions, cooking time,
servings, estimated calories, protein, and one healthy tip.
Use simple HTML tags. Do not use Markdown.
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
