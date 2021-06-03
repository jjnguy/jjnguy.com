import App from './App.svelte';
import { registerView, setView } from './router';

registerView("home", "");
registerView("post", "posts/{postId}");
registerView("post", "posts/{postId}/{slug}");

setView(window.location.pathname);

const app = new App({
	target: document.body,
	props: {}
});

export default app;