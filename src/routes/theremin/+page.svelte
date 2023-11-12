<script lang="ts">
  import { onMount } from 'svelte';
  import * as faceapi from 'face-api.js';

  import { getCenterOfFace, rankExpressions } from './get-measurements';
  import { mapRange } from '$lib/map-range';

  let interval: NodeJS.Timeout;

  let context: AudioContext;
  let oscillator: OscillatorNode | null;

  let userMedia: MediaStream | null;
  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;

  let width = 640;
  let height = 480;

  let x: number | null;
  let y: number | null;
  let expression: string;

  $: if (video) video.srcObject = userMedia;

  onMount(async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).catch(console.error);
  });

  const startVideo = async () => {
    context = new AudioContext();
    userMedia = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
      },
    });
  };

  const stopVideo = async () => {
    if (!userMedia) return;

    userMedia.getTracks().forEach((track) => track.stop());
    userMedia = null;

    oscillator?.stop();

    clearInterval(interval);
  };

  const onLoad = () => {
    width = video.videoWidth;
    height = video.videoHeight;

    video.play();
    play();
  };

  const play = () => {
    const displaySize = { width, height };

    faceapi.matchDimensions(canvas, displaySize);

    const gain = context.createGain();

    oscillator = context.createOscillator();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();

    interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

      const [firstFace] = resizedDetections;

      const facePosition = getCenterOfFace(firstFace);

      x = facePosition.x;
      y = facePosition.y;
      expression = rankExpressions(firstFace);

      if (oscillator && x && y) {
        const gainValue = mapRange(y, [0, height], [0, 1]);

        oscillator.frequency.value = x;

        gain.gain.setValueAtTime(gainValue, context.currentTime);
      }

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  };
</script>

<svelte:head>
  <title>Face Theremin</title>
</svelte:head>

<div class="grid lg:grid-cols-2 gap-8">
  <article>
    <h2>Face Theremin</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius, nibh
      ut ullamcorper tempus, ligula augue dignissim leo, sed tincidunt eros orci
      ut nisi. Vestibulum eu nisl pretium, tincidunt turpis non, cursus mauris.
      Aenean vestibulum sollicitudin tortor non porttitor. Quisque at erat
      ullamcorper, ornare felis at, blandit dolor. Mauris ut dui vitae nunc
      varius hendrerit eu non augue. Sed ligula eros, mattis nec arcu quis,
      placerat tincidunt purus. Aliquam eget venenatis dolor, eget interdum leo.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Praesent pretium vitae ante luctus laoreet. Sed
      ultricies vitae metus a ultrices. Pellentesque id metus eget risus cursus
      posuere. Mauris mollis dictum augue, in blandit augue aliquet molestie.
      Donec dignissim, est nec sagittis eleifend, odio ex faucibus lorem, ac
      gravida nisl urna in lorem.
    </p>
  </article>

  <div
    class="relative flex items-center justify-center bg-indigo-100 rounded-xl shadow-xl row-span-2 place-self-end"
    style="width: {width}px; height: {height}px"
  >
    <p>Press the <strong>Play</strong> button to get started.</p>
    <video
      class="absolute top-0 left-0 rounded-xl"
      class:invisible={!userMedia}
      on:loadedmetadata={onLoad}
      bind:this={video}
      muted
    />
    <canvas
      class="absolute top-0 left-0"
      class:invisible={!userMedia}
      id="canvas"
      {width}
      {height}
      bind:this={canvas}
    />
  </div>

  <div class="space-y-4">
    <div>
      <button on:click={startVideo} disabled={!!userMedia}>▶ Play</button>
      <button on:click={stopVideo} disabled={!userMedia}>Stop</button>
    </div>
    <dl class="items-end" class:invisible={!userMedia}>
      <dt>X</dt>
      <dd>{x && Math.round(x)}</dd>
      <dt>Y</dt>
      <dd>{y && Math.round(y)}</dd>
      <dt>Expression</dt>
      <dd>{expression}</dd>
    </dl>
  </div>
</div>
