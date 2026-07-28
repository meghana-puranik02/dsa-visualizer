export function selectionSort(array) {
  const animations = [];
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    let minimumIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      animations.push({
        type: "compare",
        indices: [minimumIndex, j],
      });

      if (arr[j] < arr[minimumIndex]) {
        minimumIndex = j;
      }
    }

    if (minimumIndex !== i) {
      [arr[i], arr[minimumIndex]] = [arr[minimumIndex], arr[i]];

      animations.push({
        type: "swap",
        array: [...arr],
      });
    }

    animations.push({
      type: "sorted",
      index: i,
    });
  }

  animations.push({
    type: "sorted",
    index: arr.length - 1,
  });

  return animations;
}
