<script>
	import Post from "./Post.svelte";
	import { currentView, navigate } from "./router";
	import TagList from "./TagList.svelte";

	let posts = { loading: true };
	let tags = { loading: true };
	let authors = { loading: true };

	fetch(
		`https://tegrity-content.azurewebsites.net/api/v1/public/computed-collections/ua5W4meHJEy2JErfo8Yhag/data`,
		{
			headers: {
				"x-api-key": "{tegrity_content_api_key}",
			},
		}
	)
		.then((resp) => resp.json())
		.then(
			(json) =>
				(posts = json.sort((one, two) => {
					return two.data.PublishDate.localeCompare(one.data.PublishDate);
				}))
		);

	fetch(
		`https://tegrity-content.azurewebsites.net/api/v1/public/collections/dq1E1EbsHUSIva8ZAfCrYg/data`,
		{
			headers: {
				"x-api-key": "{tegrity_content_api_key}",
			},
		}
	)
		.then((resp) => resp.json())
		.then((json) => (tags = json));

	fetch(
		`https://tegrity-content.azurewebsites.net/api/v1/public/collections/_MiiHrbqKkWAp5nR3RLtHw/data`,
		{
			headers: {
				"x-api-key": "{tegrity_content_api_key}",
			},
		}
	)
		.then((resp) => resp.json())
		.then((json) => (authors = json));
</script>

<main>
	{#if $currentView.viewName == "home"}
		<h1>jjnguy.com | A Potpourri of Tech Content</h1>
		{#if !posts.loading && !tags.loading && !authors.loading}
			<ol>
				{#each posts as post}
					<li>
						<h2>
							<a
								on:click={() => navigate("posts", { postId: posts.id })}
								href={`/posts/${post.id}`}>{post.data.Title}</a
							>
						</h2>
						<p class="authors">
							By -
							{#each post.data.Authors.map((postAuthor) => authors.filter((a) => a.id == postAuthor)[0]) as author}
								{author.data.Name}
							{/each}
						</p>
						<p class="description">{post.data.Description}</p>
						<TagList
							tags={post.data.Tags?.map(
								(tId) => tags.filter((t) => t.id == tId)[0]
							)}
						/>
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
<footer>
	<a target="_blank" href="https://github.com/jjnguy">&copy; 2021 - jjnguy</a>
</footer>

<style>
	h1 {
		padding: 0.5rem;
	}
	main {
		max-width: 240px;
	}
</style>
