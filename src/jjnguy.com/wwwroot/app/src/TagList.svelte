<script>
  export let tags;

  console.log(tags);
</script>

{#if tags}
  <div class="tag-list">
    {#each tags as tag}
      <span class="tag">{tag.data.value}</span>
    {/each}
  </div>
{/if}

<style>
  .tag {
    border: 1px solid black;
    padding: 0.3rem;
    margin-right: 0.2rem;
  }
</style>
