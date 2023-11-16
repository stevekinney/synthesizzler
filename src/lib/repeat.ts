export function* repeat(times: number, start = 0): Iterable<number> {
  let iteration = start;
  while (iteration++ < times + start) {
    yield iteration;
  }
}
