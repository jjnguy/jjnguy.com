<script>
  import PostInfo from "./PostInfo.svelte";
  import TagList from "./TagList.svelte";
  export let post;
  export let authors;
  export let tags;

  let postSlug = post.data.Title.toLowerCase().replaceAll(" ", "-");
</script>

<h3>
  <a href={`/posts/${post.id}/${postSlug}`}>{post.data.Title} 🡒</a>
</h3>
<PostInfo {post} {authors} />
<p class="description">{post.data.Description}</p>
<TagList
  tags={post.data.Tags?.map((tId) => tags.filter((t) => t.id == tId)[0])}
/>

<style>
  h3 {
    font-size: 1.4rem;
  }
</style>
