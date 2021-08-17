<script>
  export let post;
  export let authors;
</script>

<p class="info">
  By -
  {#each post.data.Authors.map((postAuthor) => authors.filter((a) => a.id == postAuthor)[0]) as author}
    <a href={`/authors/${author.id}`}>{author.data.Name}</a>
  {/each}
  on {post.data.PublishDate}
</p>

<style>
  .info {
    color: #595959;
  }
</style>
