<script>
  import TagList from "./TagList.svelte";
  export let post;
  export let authors;
  export let tags;
</script>

<h2>
  <a href={`/posts/${post.id}`}>{post.data.Title}</a>
</h2>
<p class="authors">
  By -
  {#each post.data.Authors.map((postAuthor) => authors.filter((a) => a.id == postAuthor)[0]) as author}
    {author.data.Name}
  {/each}
</p>
<p class="description">{post.data.Description}</p>
<TagList
  tags={post.data.Tags?.map((tId) => tags.filter((t) => t.id == tId)[0])}
/>
