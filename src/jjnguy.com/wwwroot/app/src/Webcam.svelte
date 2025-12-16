<script>
  import { onMount } from "svelte";
  import Webcam from "webcam-easy";

  let video;
  let canvas;
  let webcam;

  onMount(async () => {
    webcam = new Webcam(video, "user", canvas);
    await webcam.start();
  });

  function pic() {
    const picture = webcam.snap();
    canvas.getContext("2d").drawImage(picture, 0, 0);
  }
</script>

<div>
  <video bind:this={video}></video>
  <button on:click={pic}>snap</button>
  <canvas bind:this={canvas}></canvas>
</div>

<!-- Add your markup here -->

<style>
  video {
    border: 1px solid black;
  }
</style>
