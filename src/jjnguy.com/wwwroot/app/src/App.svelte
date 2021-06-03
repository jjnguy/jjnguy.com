<script>
	import Post from "./Post.svelte";
	import PostPreview from "./PostPreview.svelte";
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
		<p>This is the tech editorial column of Justin Nelson (jjnguy).</p>
		{#if !posts.loading && !tags.loading && !authors.loading}
			<ol>
				{#each posts as post}
					<li>
						<PostPreview {post} {authors} {tags} />
					</li>
				{/each}
			</ol>
		{/if}
	{:else if $currentView.viewName == "post"}
		{#if !tags.loading && !authors.loading}
			<Post
				collectionId={"ua5W4meHJEy2JErfo8Yhag"}
				postId={$currentView.metadata.postId}
				{authors}
				{tags}
			/>
		{/if}
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
		margin-top: 1rem;
	}
	main {
		flex: 1;
		max-width: 700px;
		margin-right: auto;
		margin-left: auto;
	}

	p {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	ol li {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		margin-bottom: 1rem;
	}

	footer {
		margin: 0.5rem;
	}
</style>
