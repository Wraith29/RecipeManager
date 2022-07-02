<script lang="ts">
  import { RecipeClient } from '../data/clients';
  import Recipe from '../components/recipe.svelte';

  let recipeClient = new RecipeClient();
  let recipeTagMap = recipeClient.getRecipeTagMap();
</script>

<main>
  <h1 class="center">Recipe Manager</h1>
  {#await recipeTagMap}
    <p>Waiting For Recipes...</p>
  {:then rtm}
    {#each rtm.recipes as recipe}
      <Recipe recipe={recipe.recipe} tags={recipe.tags} />
    {/each}
  {/await}
</main>

<style>
  
</style>
