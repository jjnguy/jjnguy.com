import App from './App.svelte';
import { registerView, setView } from './router';

registerView("home", "");
registerView("post", "posts/{postId}");
registerView("post", "posts/{postId}/{slug}");
registerView("tagged", "posts/tagged/{tagId}/{tagName}");

setView(window.location.pathname);

const app = new App({
	target: document.body,
	props: {}
});

export default app;