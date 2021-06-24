<script>
  import { getData } from "./DataAccess";

  let portfolio = { loading: true };
  getData(`/api/v1/public/computed-collections/nGziMur56EuuxpMNVIGmNg/data`)
    .then((resp) => resp.json())
    .then((json) => (portfolio = json));
</script>

{#if portfolio.loading}
  loading...
{:else}
  {#each portfolio as item}
    <h2>{item.data.Name}</h2>
    <div>
      <img
        width="300"
        src={JSON.parse(item.data.image.data).url}
        alt={item.data.image.alt}
      />
    </div>
    <div>
      {item.data.description}
    </div>
    <div>
      <a href={item.data["primary link"]} target="_blank">Check it out!</a>
    </div>
  {/each}
{/if}
