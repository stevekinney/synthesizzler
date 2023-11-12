export function* repeat(times: number): Iterable<number> {
  let iteration = 0;
  while (iteration++ < times) {
    yield iteration;
  }
}
