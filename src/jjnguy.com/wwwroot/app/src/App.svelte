<script>
	import Post from "./Post.svelte";
	import { currentView, navigate } from "./router";

	let posts = { loading: true };

	fetch(
		//`https://localhost:7001/api/v1/public/collections/h7D1FLVTcUON42qBpoLIVg/data`,
		`https://tegrity-content.azurewebsites.net/api/v1/public/collections/h7D1FLVTcUON42qBpoLIVg/data`,
		{
			headers: {
				"x-api-key": "fmoRmTVnCUKEjD_FY__enQ",
			},
		}
	)
		.then((resp) => resp.json())
		.then((json) => (posts = json));
</script>

<main>
	{#if $currentView.viewName == "home"}
		<h1>THE jjnguy Blog</h1>
		{#if !posts.loading}
			<ol>
				{#each posts as post}
					<li>
						<h2>
							<a
								on:click={() => navigate("posts", { postId: posts.id })}
								href={`/posts/${post.id}`}>{post.data.Title}</a
							>
						</h2>
						<p>{post.data.Description}</p>
					</li>
				{/each}
			</ol>
		{/if}
	{:else if $currentView.viewName == "post"}
		<Post
			collectionId={"h7D1FLVTcUON42qBpoLIVg"}
			postId={$currentView.metadata.postId}
		/>
	{:else}
		{$currentView.viewName}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
