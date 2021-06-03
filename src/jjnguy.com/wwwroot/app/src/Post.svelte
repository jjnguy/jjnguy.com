<script>
  import Markdown from "./Markdown.svelte";
  import TagList from "./TagList.svelte";

  export let postId;
  export let collectionId;
  export let tags;
  export let authors;

  let data = { loading: true };
  let postTags = { loading: true };
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
    .then((json) => {
      data = json;
      postTags = data.data.Tags?.map(
        (tId) => tags.filter((t) => t.id == tId)[0]
      );
      document.title =
        document.title +
        ` | ${data.data.Title} | ${postTags
          .map((t) => t.data.value)
          .join(", ")}`;
    });
</script>

{#if data.loading}
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
  <section>
    {#if !postTags.loading}
      <TagList tags={postTags} />
    {/if}
  </section>
{/if}

<style>
  h1,
  section {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  h1 {
    margin-bottom: 0.5rem;
  }
</style>
