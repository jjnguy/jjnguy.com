<script>
  export let tags;

  tags.forEach((tag) => {
    fetch(`https://localhost:7001/api/v1/public/referenced/data/${tag.id}`, {
      headers: {
        "x-api-key": "{tegrity_content_api_key}",
      },
    });
  });
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
