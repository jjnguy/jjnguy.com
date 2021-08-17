<script>
  import { getData } from "./DataAccess";
  import PostPreview from "./PostPreview.svelte";

  export let authors;
  export let tags;

  export let authorId;

  $: author = authors.loading ? {} : authors.filter((a) => a.id == authorId)[0];

  let posts = { loading: true };

  getData(`/api/v1/public/referenced/data/${authorId}`)
    .then((resp) => resp.json())
    .then((json) => (posts = json));
</script>

{#if authors.loading}
  loading...
{:else}
  <h2>{author.data.Name}</h2>
  <img
    width="300"
    src={JSON.parse(author.data.Pic?.data ?? "{}")?.url}
    alt={author.data.Pic.alt}
  />
  <p>
    {@html author.data.Bio}
  </p>

  {#if !posts.loading && !authors.loading && !tags.loading}
    <h3>Posts by {author.data.Name}</h3>
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
{/if}

<style lang="less">
  h3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
