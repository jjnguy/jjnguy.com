<script>
  import { onMount } from "svelte";

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let words = [
    "svelte",
    "javascript",
    "typescript",
    "html",
    "css",
    "web",
    "development",
    "frontend",
    "backend",
    "fullstack",
  ];

  let gridSize = 12;
  let grid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(null));

  // Simple function to place words in the grid horizontally
  function placeWords() {
    words.forEach((word) => {
      let orientation = getRandomInt(3); // 0: horizontal, 1: vertical, 2: diagonal
      let direction = getRandomInt(2); // 0: normal, 1: reverse
      let startRow = 0;
      let startCol = 0;
    });

    // Fill empty spaces with random letters
    const alphabet = " ";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  onMount(() => {
    placeWords();
  });
</script>

<h2>word find</h2>
<div>
  {#each grid as row}
    <div>
      {#each row as cell}
        <span
          style="display: inline-block; width: 20px; height: 20px; border: 1px solid #ccc; text-align: center;"
        >
          {cell || ""}
        </span>
      {/each}
    </div>
  {/each}
</div>
<div>
  <h3>Words to Find:</h3>
  <ul>
    {#each words as word}
      <li>{word}</li>
    {/each}
  </ul>
</div>

<!-- Add your markup here -->

<style>
  /* Add your styles here */
</style>
