<script>
  import PostPreview from "./PostPreview.svelte";

  export let tagId;
  export let tagName;
  export let authors;
  export let tags;

  let posts = { loading: true };

  fetch(
    `https://tegrity-content.azurewebsites.net/api/v1/public/referenced/data/${tagId}`,
    {
      headers: {
        "x-api-key": "{tegrity_content_api_key}",
      },
    }
  )
    .then((resp) => resp.json())
    .then((json) => (posts = json));
</script>

<h2>Posts Tagged "{tagName}"</h2>
{#if !posts.loading}
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
