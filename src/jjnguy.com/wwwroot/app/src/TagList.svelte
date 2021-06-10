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

<style lang="less">
  .tag {
    border: 1px solid black;
    margin-right: 0.2rem;
    display: inline-block;

    a {
      display: inline-block;
      padding: 0.3rem;
      color: black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
