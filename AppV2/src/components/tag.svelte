<script lang="ts">
  import type { ITag } from '../data/types';

  export let tag: ITag;
</script>

<main>
  <div class="tag">
    <p>{tag.name}</p>
  </div>
</main>

<style>
  .tag {
    border: 1px solid black;
    background-color: aqua;
  }
</style>
