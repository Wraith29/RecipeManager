<script lang="ts">
  import type { ITag } from '../data/types';
  import { TagClient } from '../data/clients';
  export let tag: ITag;
</script>

<main class="tag">
  <span class="center">
    {tag.name} 
  </span>
</main>

<style>
  .tag {
    text-align: center;
    font-weight: bold;
    border: 1px solid black;
    background-color: aqua;
    width: 100px;
    height: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

.center {
  grid-column-start: 2;
}
</style>
