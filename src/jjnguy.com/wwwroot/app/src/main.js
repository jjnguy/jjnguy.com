import App from './App.svelte';
import { registerView, setView } from './router';

registerView("home", "");
registerView("word-find", "word-find");
registerView("webcam", "webcam");
registerView("about", "about");
registerView("posts", "posts");
registerView("authors", "authors");
registerView("author", "authors/{authorId}");
registerView("author", "authors/{authorId}/{slug}");
registerView("portfolio", "portfolio");
registerView("post", "posts/{postId}");
registerView("post", "posts/{postId}/{slug}");
registerView("tagged", "posts/tagged/{tagId}/{tagName}");

setView(window.location.pathname);

const app = new App({
	target: document.body,
	props: {}
});

export default app;