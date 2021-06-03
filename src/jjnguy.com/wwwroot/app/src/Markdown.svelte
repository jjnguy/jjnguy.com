<script>
  import * as commonmark from "commonmark";

  export let md;

  function mdToHtml() {
    // https://github.com/commonmark/commonmark.js/
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();
    var parsed = reader.parse(md); // parsed is a 'Node' tree
    // transform parsed if you like...
    return writer.render(parsed); // result is a String
  }
</script>

{@html mdToHtml()}

<style>
  :global(p) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
