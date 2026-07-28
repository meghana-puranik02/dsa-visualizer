export function quickSort(array) {
  const animations = [];
  const arr = [...array];

  function partition(start, end) {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      animations.push({
        type: "compare",
        indices: [i, end],
      });

      if (arr[i] < pivotValue) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

        animations.push({
          type: "swap",
          array: [...arr],
        });

        pivotIndex++;
      }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

    animations.push({
      type: "swap",
      array: [...arr],
    });

    animations.push({
      type: "sorted",
      index: pivotIndex,
    });

    return pivotIndex;
  }

  function sort(start, end) {
    if (start > end) return;

    if (start === end) {
      animations.push({
        type: "sorted",
        index: start,
      });

      return;
    }

    const pivotIndex = partition(start, end);

    sort(start, pivotIndex - 1);
    sort(pivotIndex + 1, end);
  }

  sort(0, arr.length - 1);

  return animations;
}
