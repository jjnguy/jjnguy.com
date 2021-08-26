<script>
  import { getData } from "./DataAccess";
  import PostPreview from "./PostPreview.svelte";

  export let authors;
  export let tags;

  let posts = { loading: true };
  getData(`/api/v1/public/computed-collections/k5TiOzOuwUeUTy2Q8dv2hQ/data`)
    .then((resp) => resp.json())
    .then(
      (json) =>
        (posts = json.sort((one, two) => {
          return two.data.PublishDate.localeCompare(one.data.PublishDate);
        }))
    );
</script>

<p>This is the tech editorial column of Justin Nelson (jjnguy).</p>
<h2>Newest Posts</h2>
{#if !posts.loading && !tags.loading && !authors.loading}
  <ol>
    {#each posts as post}
      <li>
        <PostPreview {post} {authors} {tags} />
      </li>
    {/each}
  </ol>
{/if}

<style>
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  ol li {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
</style>
