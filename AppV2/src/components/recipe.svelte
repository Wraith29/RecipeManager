<script lang="ts">
  import Tag from './tag.svelte';
  import type { IRecipe, ITag } from '../data/types';

  export let recipe: IRecipe;
  export let tags: ITag[];
</script>

<main>
  <h3>{recipe.name}</h3>
  {#each tags as tag}
    <Tag {tag} />
  {/each}
</main>

<style></style>
