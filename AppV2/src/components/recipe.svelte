<script lang="ts">
  import type { IRecipe, ITag } from '../data/types';
  import TagList from './tag-list.svelte';

  export let recipe: IRecipe;
  export let tags: ITag[];
</script>

<main>
  <h3>{recipe.name}</h3>
  <TagList {tags} />
</main>

<style></style>
