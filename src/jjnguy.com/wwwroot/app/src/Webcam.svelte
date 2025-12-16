<script>
  import { onMount } from "svelte";

  let video;
  let canvas;

  let hasPhoto = false;

  onMount(async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 600,
        height: 400,
        facingMode: "environment",
      },
      audio: false,
    });
    video.srcObject = stream;
    video.play();
  });

  function pic() {
    var vRatio = (canvas.height / video.videoHeight) * video.videoWidth;
    var hRatio = (canvas.width / video.videoWidth) * video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, vRatio, hRatio);
  }
</script>

<div class="container">
  <video bind:this={video}></video>
  <canvas bind:this={canvas} width="600" height="400"></canvas>
</div>
<button on:click={pic}>snap</button>

<!-- Add your markup here -->

<style lang="less">
  .container {
    position: relative;
    width: 600px;
    height: 400px;

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      opacity: 0.7;
    }

    video,
    canvas {
      width: 600px;
      height: 400px;
    }
  }

  video {
    border: 1px solid black;
  }
</style>
