<script>
  import { getData } from "./DataAccess";

  let portfolio = { loading: true };
  getData(`/api/v1/public/computed-collections/6L0m2u1TEkSTYDBzWSbaBg/data`)
    .then((resp) => resp.json())
    .then(
      (json) =>
        (portfolio = json.sort((one, two) => {
          return one.data.Name.localeCompare(two.data.Name);
        }))
    );
</script>

{#if portfolio.loading}
  loading...
{:else}
  {#each portfolio as item}
    <section>
      <h2>{item.data.Name}</h2>
      <div class="container">
        {#if item.data.image}
          <div>
            <img
              width="300"
              src={JSON.parse(item.data.image?.data ?? "{}")?.url}
              alt={item.data.image.alt}
            />
          </div>
        {/if}
        <div>
          <p>
            {item.data.description}
          </p>
          <a href={item.data["primary link"]} target="_blank"
            >Check it out! &#8594;</a
          >
        </div>
      </div>
    </section>
  {/each}
{/if}

<style lang="less">
  h2 {
    margin-bottom: 1rem;
  }

  section {
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    margin-top: 2rem;
  }

  .container {
    display: flex;

    p {
      margin-bottom: 1rem;
    }

    div {
      flex: 1;
    }

    a {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      border: 1px solid black;
    }
  }
</style>
