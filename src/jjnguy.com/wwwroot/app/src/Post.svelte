<script>
  export let postId;
  export let collectionId;

  let data = { __loading: true };

  fetch(
    //`https://localhost:7001/api/v1/public/collections/h7D1FLVTcUON42qBpoLIVg/data`,
    `https://tegrity-content.azurewebsites.net/api/v1/public/collections/${collectionId}/data/${postId}`,
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
  <section>
    {data.data.Content}
  </section>
{/if}
