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
    `https://tegrity-content.azurewebsites.net/api/v1/public/computed-collections/${collectionId}/data/${postId}`,
    {
      headers: {
        "x-api-key": "{tegrity_content_api_key}",
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
  <div class="title">
    <h2>
      {data.data.Title}
    </h2>
    <section class="authors">
      By -
      {#each data.data.Authors.map((postAuthor) => authors.filter((a) => a.id == postAuthor)[0]) as author}
        {author.data.Name}
      {/each}
    </section>
  </div>
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
  .title {
    text-align: center;
  }

  h2,
  section {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  h2 {
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
</style>
