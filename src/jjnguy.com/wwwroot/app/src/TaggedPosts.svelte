<script>
  import PostPreview from "./PostPreview.svelte";
  import { getData } from "./DataAccess";

  export let tagId;
  export let tagName;
  export let authors;
  export let tags;

  let posts = { loading: true };

  getData(`/api/v1/public/referenced/data/${tagId}`)
    .then((resp) => resp.json())
    .then((json) => (posts = json));
</script>

<h2>Posts Tagged "{tagName}"</h2>
{#if !posts.loading && !authors.loading && !tags.loading}
  <ul>
    {#each posts as post}
      <li>
        <PostPreview
          post={{ data: post.referencedByData, id: post.referencedById }}
          {authors}
          {tags}
        />
      </li>
    {/each}
  </ul>
{/if}

<style>
  h2 {
    margin-bottom: 1rem;
  }
</style>
