export function bubbleSort(array) {
  const animations = [];
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      animations.push({
        type: "compare",
        indices: [j, j + 1]
      });

      if (arr[j] > arr[j + 1]) {

        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];

        animations.push({
          type: "swap",
          array: [...arr]
        });

      }
    }

    animations.push({
      type: "sorted",
      index: arr.length - 1 - i
    });
  }

  animations.push({
    type: "sorted",
    index: 0
  });

  return animations;
}
