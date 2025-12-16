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
  <img src="img/shutter.svg" on:click={pic} alt="shutter" />
  <video bind:this={video} />
  <canvas bind:this={canvas} width="600" height="400"></canvas>
</div>
<p>Shuttrer from here https://thenounproject.com/icon/take-photo-4744642/</p>

<!-- Add your markup here -->

<style lang="less">
  .container {
    position: relative;
    width: 600px;
    height: 400px;

    img {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 50px;
      height: 50px;
      z-index: 20;
      margin-left: auto;
      margin-right: auto;
    }

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
