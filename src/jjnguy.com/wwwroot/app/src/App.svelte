<script>
  import AboutMe from "./AboutMe.svelte";
  import Author from "./Author.svelte";
  import { getData } from "./DataAccess";
  import Portfolio from "./Portfolio.svelte";

  import Post from "./Post.svelte";
  import PostList from "./PostList.svelte";
  import { currentView } from "./router";
  import TaggedPosts from "./TaggedPosts.svelte";

  let tags = { loading: true };
  let authors = { loading: true };

  getData(`/api/v1/public/collections/55KF1JlFBU6eDYucwLSg-w/data`)
    .then((resp) => resp.json())
    .then((json) => (tags = json));

  getData(`/api/v1/public/computed-collections/npLvJaPizEaVrKCbcs0UCA/data`)
    .then((resp) => resp.json())
    .then((json) => (authors = json));

  let showMenu = false;
</script>

<header>
  <h1><a href="/">jjnguy.com | A Potpourri of Tech</a></h1>
  <nav class:active={showMenu}>
    <label>menu <input type="checkbox" bind:checked={showMenu} /></label>
    <div class="menu-container">
      <ul>
        <li><a href="/">home</a></li>
        <li><a href="/posts">blog posts</a></li>
        <li><a href="/portfolio">portfolio</a></li>
        <li><a href="/about">about me</a></li>
      </ul>
    </div>
  </nav>
</header>
<main>
  {#if $currentView.viewName == "home" || $currentView.viewName == "posts"}
    <PostList {authors} {tags} />
  {:else if $currentView.viewName == "post"}
    {#if !tags.loading && !authors.loading}
      <Post
        collectionId={"k5TiOzOuwUeUTy2Q8dv2hQ"}
        postId={$currentView.metadata.postId}
        {authors}
        {tags}
      />
    {/if}
  {:else if $currentView.viewName == "tagged"}
    <p>
      <TaggedPosts
        tagId={$currentView.metadata.tagId}
        tagName={$currentView.metadata.tagName}
        {authors}
        {tags}
      />
    </p>
  {:else if $currentView.viewName == "portfolio"}
    <Portfolio />
  {:else if $currentView.viewName == "about"}
    <AboutMe />
  {:else if $currentView.viewName == "author"}
    <Author authorId={$currentView.metadata.authorId} {authors} {tags} />
  {:else}
    <p class="coming-soon">Coming soon!</p>
  {/if}
</main>
<footer>
  <a target="_blank" href="https://github.com/jjnguy">&copy; 2021 - jjnguy</a>
</footer>

<style lang="less">
  header {
    display: flex;

    nav {
      margin-left: auto;
      margin-top: 1rem;

      label {
        padding: 0.5rem;
        display: inline-block;
        margin-right: 0.5rem;
        cursor: pointer;

        transition: background-color 150ms, color 150ms;
      }

      input {
        display: none;
      }

      div.menu-container {
        position: relative;

        ul {
          position: absolute;
          visibility: hidden;
          opacity: 0;
          height: 0;
          outline: 1px solid black;
          right: 0.5rem;
          background-color: white;
          box-shadow: 1px 1px 3px -1px #000;
          width: 6rem;

          transition: opacity 150ms;

          li {
            a {
              display: inline-block;
              text-decoration: none;
              color: black;
              cursor: pointer;
              width: 100%;
              padding: 0.5rem;
            }

            a:hover {
              text-decoration: underline;
            }
          }
        }
      }

      &.active {
        label {
          background-color: black;
          color: white;
        }

        div.menu-container {
          ul {
            visibility: unset;
            opacity: 1;
            height: unset;
          }
        }
      }
    }
  }

  h1 {
    padding: 0.5rem;
    margin-top: 1rem;
  }

  h1 a {
    text-decoration: unset;
    color: unset;
  }
  main {
    flex: 1;

    .coming-soon {
      text-align: center;
      font-size: 3rem;
      margin-top: 2rem;
    }
  }

  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  footer {
    margin: 0.5rem;
  }
</style>
