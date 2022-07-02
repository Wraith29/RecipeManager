<script lang="ts">
  import { RecipeClient, TagClient } from '../data/clients';

  let recipeClient = new RecipeClient();
  let tagClient = new TagClient();

  let recipes = recipeClient.getAllRecipes();
  let tags = tagClient.getAllTags();
</script>

<main>
  <a href="/"><button>Home</button></a>

  <table class="table admin-table">
    <tr>
      <th>Recipes</th>
      <th>Tags</th>
    </tr>
    <tr>
      <td class="table-cell">
        <table class="table data-table recipe-table">
          <tr class="data-row">
            <th>Id</th>
            <th>Name</th>
          </tr>
          {#await recipes}
            Waiting for recipes...
          {:then _recipes}
            {#each _recipes as recipe}
              <tr class="data-row">
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
              </tr>
            {/each}
          {/await}
        </table>
      </td>
      <td class="table-cell">
        <table class="table data-table tag-table">
          <tr class="data-row">
            <th>Id</th>
            <th>Name</th>
          </tr>
          {#await tags}
            Waiting for tags...
          {:then _tags}
            {#each _tags as tag}
              <tr class="data-row">
                <td>{tag.id}</td>
                <td>{tag.name}</td>
              </tr>
            {/each}
          {/await}
        </table>
      </td>
    </tr>
  </table>
</main>

<style>
  table,
  tr,
  th,
  td {
    border: 1px solid black;
  }

  .admin-table,
  .data-table {
    width: 100%;
  }

  .table-cell {
    position: relative;
    top: 0;
  }
</style>
