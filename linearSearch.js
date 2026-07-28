export function linearSearch(array, target) {
  const animations = [];

  for (let index = 0; index < array.length; index++) {
    animations.push({
      type: "check",
      index,
    });

    if (array[index] === target) {
      animations.push({
        type: "found",
        index,
      });

      return animations;
    }
  }

  animations.push({
    type: "not-found",
  });

  return animations;
}
