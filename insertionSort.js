export function insertionSort(array) {
  const animations = [];
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j > 0) {
      animations.push({
        type: "compare",
        indices: [j - 1, j],
      });

      if (arr[j - 1] <= arr[j]) {
        break;
      }

      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

      animations.push({
        type: "swap",
        array: [...arr],
      });

      j--;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
}
