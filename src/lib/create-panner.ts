export const createPanner = (context: AudioContext) => {
  let panner: StereoPannerNode | null = context.createStereoPanner();

  panner.connect(context.destination);

  panner.addEventListener('ended', function cleanup() {
    if (!panner) return;

    panner.disconnect();
    panner.removeEventListener('ended', cleanup);

    panner = null;
  });

  return panner;
};
