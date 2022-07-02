<script lang="ts">
  import Tag from './tag.svelte';
  import type { ITag } from '../data/types';

  export let tags: ITag[];
</script>

<main class="tag-list">
  {#each tags as tag}
    <Tag tag={tag} />
  {/each}
</main>

<style>
  .tag-list {
    display: flex;
  }
</style>
