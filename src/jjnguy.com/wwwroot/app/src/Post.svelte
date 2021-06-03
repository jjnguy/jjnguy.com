<script>
  import Markdown from "./Markdown.svelte";
  import TagList from "./TagList.svelte";

  export let postId;
  export let collectionId;
  export let tags;
  export let authors;

  let data = { __loading: true };

  fetch(
    //`https://localhost:7001/api/v1/public/collections/h7D1FLVTcUON42qBpoLIVg/data`,
    `https://tegrity-content.azurewebsites.net/api/v1/public/computed-collections/${collectionId}/data/${postId}`,
    {
      headers: {
        "x-api-key": "fmoRmTVnCUKEjD_FY__enQ",
      },
    }
  )
    .then((resp) => resp.json())
    .then((json) => (data = json));
</script>

{#if data.__loading}
  __loading
{:else}
  <h1>
    {data.data.Title}
  </h1>
  <section class="authors">
    By -
    {#each data.data.Authors.map((postAuthor) => authors.filter((a) => a.id == postAuthor)[0]) as author}
      {author.data.Name}
    {/each}
  </section>
  <section>
    <Markdown md={data.data.Content} />
  </section>
  <TagList
    tags={data.data.Tags?.map((tId) => tags.filter((t) => t.id == tId)[0])}
  />
{/if}
