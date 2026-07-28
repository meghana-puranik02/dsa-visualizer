export function mergeSort(array) {
  const animations = [];
  const arr = [...array];

  function merge(left, middle, right) {
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArray.length && j < rightArray.length) {
      animations.push({
        type: "compare",
        indices: [left + i, middle + 1 + j],
      });

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }

      animations.push({
        type: "overwrite",
        index: k,
        value: arr[k],
        array: [...arr],
      });

      k++;
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];

      animations.push({
        type: "overwrite",
        index: k,
        value: arr[k],
        array: [...arr],
      });

      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];

      animations.push({
        type: "overwrite",
        index: k,
        value: arr[k],
        array: [...arr],
      });

      j++;
      k++;
    }
  }

  function divide(left, right) {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);

    divide(left, middle);
    divide(middle + 1, right);
    merge(left, middle, right);
  }

  divide(0, arr.length - 1);

  for (let i = 0; i < arr.length; i++) {
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
}
