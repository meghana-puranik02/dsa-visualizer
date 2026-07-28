export function binarySearch(array, target) {
  const animations = [];

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    animations.push({
      type: "range",
      left,
      right,
      middle,
    });

    animations.push({
      type: "check",
      index: middle,
    });

    if (array[middle] === target) {
      animations.push({
        type: "found",
        index: middle,
      });

      return animations;
    }

    if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  animations.push({
    type: "not-found",
  });

  return animations;
}
