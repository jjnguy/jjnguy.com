<script>
  export let tags;
</script>

{#if tags}
  <div class="tag-list">
    {#each tags as tag}
      <span class="tag">
        <a href={`/posts/tagged/${tag.id}/${tag.data.value}`}
          >{tag.data.value}</a
        >
      </span>
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
