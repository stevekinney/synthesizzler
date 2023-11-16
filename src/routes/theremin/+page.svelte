<script lang="ts">
  import { onMount } from 'svelte';
  import * as faceapi from 'face-api.js';

  import { getCenterOfFace, rankExpressions } from './get-measurements';
  import { mapRange } from '$lib/map-range';
  import ToggleButton from '$components/toggle-button.svelte';

  let interval: NodeJS.Timeout;

  let context: AudioContext;
  let oscillator: OscillatorNode | null;

  let userMedia: MediaStream | null;
  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let container: HTMLElement;

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
    const aspectRatio = video.videoHeight / video.videoWidth;

    width = container
      ? Math.min(video.videoWidth, container.clientWidth)
      : video.videoWidth;
    height = width * aspectRatio;

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

  $: width = Math.min(container?.clientWidth, 640);
  $: height = width * (3 / 4);
</script>

<svelte:head>
  <title>Face Theremin</title>
</svelte:head>

<svelte:window
  on:resize={() => (width = Math.min(container?.clientWidth, 640))}
/>

<div class="flex flex-col-reverse md:flex-row gap-8" bind:this={container}>
  <article class="space-y-4">
    <h2>Face Theremin</h2>
    <p>
      <strong>Instructions</strong>: Once you hit the
      <span class="font-semibold">Play</span> button, the application will ask to
      answer your camera and then play a frequency based on the location of your
      face. Move your face around to change the pitch of the oscillator.
    </p>
    <p>
      This application uses <a href="npm.im/face-api.js" target="_blank">
        face-api.js
      </a> for all of the face tracking goodness.
    </p>
    <p class="block sm:hidden p-4 bg-yellow-50 border-2 border-yellow-100">
      <strong>Note</strong>: You might have some issues using this example on a
      mobile phone.
    </p>
    <div>
      <ToggleButton
        on="▶️ Play"
        off="✋ Stop"
        condition={!!userMedia}
        on:click={userMedia ? stopVideo : startVideo}
      />
    </div>
    <dl class:hidden={!userMedia}>
      <dt>X</dt>
      <dd>{x && Math.round(x)}</dd>
      <dt>Y</dt>
      <dd>{y && Math.round(y)}</dd>
      <dt>Expression</dt>
      <dd>{expression}</dd>
    </dl>
  </article>

  <div
    class="relative w-full flex-shrink-0 flex items-center justify-center bg-indigo-100 rounded-xl shadow-xl row-span-2 place-self-end mx-auto self-center"
    style="width: {width}px; height: {height}px;"
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
</div>
