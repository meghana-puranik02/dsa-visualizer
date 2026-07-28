import { useState } from "react";
import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import { selectionSort } from "../algorithms/sorting/selectionSort";
import { insertionSort } from "../algorithms/sorting/insertionSort";
import { mergeSort } from "../algorithms/sorting/mergeSort";
import { quickSort } from "../algorithms/sorting/quickSort";

function SortingVisualizer() {
  const [arraySize, setArraySize] = useState(10);

  const [array, setArray] = useState([
    45, 20, 70, 35, 90, 55, 25, 80, 40, 60,
  ]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(400);

  const [comparisons, setComparisons] = useState(0);
  const [operations, setOperations] = useState(0);
  const [status, setStatus] = useState("Ready");

  function createRandomArray(size) {
    return Array.from(
      { length: size },
      () => Math.floor(Math.random() * 80) + 10
    );
  }

  function resetVisualization() {
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setOperations(0);
    setStatus("Ready");
  }

  function generateNewArray() {
    if (isSorting) return;

    setArray(createRandomArray(arraySize));
    resetVisualization();
  }

  function handleArraySizeChange(event) {
    if (isSorting) return;

    const newSize = Number(event.target.value);

    setArraySize(newSize);
    setArray(createRandomArray(newSize));
    resetVisualization();
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function getAnimations() {
    if (selectedAlgorithm === "selection") {
      return selectionSort(array);
    }

    if (selectedAlgorithm === "insertion") {
      return insertionSort(array);
    }

    if (selectedAlgorithm === "merge") {
      return mergeSort(array);
    }

    if (selectedAlgorithm === "quick") {
      return quickSort(array);
    }

    return bubbleSort(array);
  }

  async function startSorting() {
    if (isSorting) return;

    setIsSorting(true);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setOperations(0);
    setStatus("Sorting in progress...");

    const animations = getAnimations();

    for (const animation of animations) {
      if (animation.type === "compare") {
        setActiveIndices(animation.indices);
        setComparisons((previous) => previous + 1);
        setStatus(
          `Comparing positions ${animation.indices[0] + 1} and ${
            animation.indices[1] + 1
          }`
        );

        await sleep(speed);
      }

      if (animation.type === "swap") {
        setArray(animation.array);
        setOperations((previous) => previous + 1);
        setStatus("Swapping values");

        await sleep(speed);
      }

      if (animation.type === "overwrite") {
        setArray(animation.array);
        setActiveIndices([animation.index]);
        setOperations((previous) => previous + 1);
        setStatus(`Writing value at position ${animation.index + 1}`);

        await sleep(speed);
      }

      if (animation.type === "sorted") {
        setSortedIndices((previous) => [
          ...new Set([...previous, animation.index]),
        ]);

        setStatus(`Position ${animation.index + 1} is sorted`);

        await sleep(speed / 2);
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
    setStatus("Sorting completed");
  }

  const algorithmInformation = {
    bubble: {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    selection: {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    insertion: {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    merge: {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },

    quick: {
      name: "Quick Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)",
    },
  };

  const currentAlgorithm = algorithmInformation[selectedAlgorithm];

  const barWidth =
    arraySize <= 10 ? 48 : arraySize <= 15 ? 34 : arraySize <= 20 ? 26 : 20;

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Sorting Algorithm</p>

        <h1>Sorting Visualizer</h1>

        <span>
          Generate a random array and watch sorting algorithms rearrange the
          values.
        </span>
      </div>

      <section className="control-panel">
        <div className="control-group">
          <label htmlFor="algorithm">Algorithm</label>

          <select
            id="algorithm"
            value={selectedAlgorithm}
            disabled={isSorting}
            onChange={(event) => {
              setSelectedAlgorithm(event.target.value);
              resetVisualization();
            }}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        <div className="control-group speed-control">
          <label htmlFor="speed">
            Speed:{" "}
            {speed === 700
              ? "Slow"
              : speed === 400
                ? "Medium"
                : "Fast"}
          </label>

          <input
            id="speed"
            type="range"
            min="100"
            max="700"
            step="300"
            value={800 - speed}
            disabled={isSorting}
            onChange={(event) => {
              setSpeed(800 - Number(event.target.value));
            }}
          />
        </div>

        <div className="control-group size-control">
          <label htmlFor="array-size">Array Size: {arraySize}</label>

          <input
            id="array-size"
            type="range"
            min="5"
            max="25"
            step="1"
            value={arraySize}
            disabled={isSorting}
            onChange={handleArraySizeChange}
          />
        </div>

        <button
          type="button"
          onClick={generateNewArray}
          disabled={isSorting}
        >
          Generate New Array
        </button>

        <button
          type="button"
          className="sort-button"
          onClick={startSorting}
          disabled={isSorting}
        >
          {isSorting ? "Sorting..." : "Start Sorting"}
        </button>
      </section>

      <section className="statistics-panel">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Comparisons</span>
          <strong>{comparisons}</strong>
        </article>

        <article>
          <span>Swaps / Writes</span>
          <strong>{operations}</strong>
        </article>

        <article>
          <span>Array Size</span>
          <strong>{arraySize}</strong>
        </article>
      </section>

      <section className="bars-container">
        {array.map((value, index) => {
          let barClass = "array-bar";

          if (activeIndices.includes(index)) {
            barClass += " active-bar";
          }

          if (sortedIndices.includes(index)) {
            barClass += " sorted-bar";
          }

          return (
            <div
              className="bar-wrapper"
              key={index}
              style={{ minWidth: `${barWidth}px` }}
            >
              <div
                className={barClass}
                style={{
                  height: `${value * 4}px`,
                  width: `${barWidth}px`,
                }}
              ></div>

              <span>{value}</span>
            </div>
          );
        })}
      </section>

      <section className="legend">
        <div>
          <span className="legend-box normal"></span>
          Unsorted
        </div>

        <div>
          <span className="legend-box comparing"></span>
          Comparing
        </div>

        <div>
          <span className="legend-box completed"></span>
          Sorted
        </div>
      </section>

      <section className="complexity-card">
        <h2>{currentAlgorithm.name} Complexity</h2>

        <div className="complexity-grid">
          <p>
            Best Time
            <strong>{currentAlgorithm.best}</strong>
          </p>

          <p>
            Average Time
            <strong>{currentAlgorithm.average}</strong>
          </p>

          <p>
            Worst Time
            <strong>{currentAlgorithm.worst}</strong>
          </p>

          <p>
            Space
            <strong>{currentAlgorithm.space}</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SortingVisualizer;
