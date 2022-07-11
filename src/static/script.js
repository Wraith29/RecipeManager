window.onload = () => {
    let recipePopups = document.querySelectorAll(".recipe-popup");
    let createRecipePopup = document.querySelector("#new-recipe-popup-container");

    createRecipePopup.style.display = "none";

    for (let popup of recipePopups)
        popup.style.display = "none";
}

function filter(event) {
    const tagId = event.target.value;
    const recipeContainer = document.querySelector("#recipe-container");
    const recipes = recipeContainer.getElementsByClassName("recipe");

    for (let recipe of recipes)
        recipe.style.display = "grid";
    
    for (let recipe of recipes) {
        if (tagId === "0")
            return;

        let tags = recipe.querySelectorAll(".recipe-name-tag-container > .tags > .tag");

        let hasTag = false;
        for (let tag of tags) 
            if (tag.classList.contains(`tag-${tagId}`)) 
                hasTag = true;

        if (!hasTag)
            recipe.style.display = "none";
    }

}

function toggleRecipe(recipeId) {
    const popup = document.querySelector(`#recipe-popup-${recipeId}`);

    if (popup.style.display === "none")
        popup.style.display = "grid";
    else
        popup.style.display = "none";
}

function toggleNewRecipe() {
    const recipeElem = document.querySelector("#new-recipe-popup-container");

    if (recipeElem.style.display === "none")
        recipeElem.style.display = "grid";
    else
        recipeElem.style.display = "none";
}

function deleteRecipe(recipeId) {
    recipeId = parseInt(recipeId)
    fetch(`/delete/recipe/${recipeId}`, {
        method: 'DELETE'
    });
    toggleRecipe(recipeId);
    window.location.relad();
}
