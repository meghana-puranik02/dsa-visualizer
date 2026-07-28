import { useState } from "react";
import { linearSearch } from "../algorithms/searching/linearSearch";
import { binarySearch } from "../algorithms/searching/binarySearch";

function SearchingVisualizer() {
  const [array, setArray] = useState([
    10, 18, 24, 31, 42, 56, 63, 72, 84, 95,
  ]);

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("linear");

  const [target, setTarget] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchRange, setSearchRange] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500);

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function resetSearchState() {
    setActiveIndex(null);
    setFoundIndex(null);
    setSearchRange(null);
    setComparisons(0);
    setStatus("Ready");
  }

  function generateNewArray() {
    if (isSearching) return;

    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 90) + 10
    ).sort((a, b) => a - b);

    setArray(newArray);
    setTarget("");
    resetSearchState();
  }

  function getAnimations(targetNumber) {
    if (selectedAlgorithm === "binary") {
      return binarySearch(array, targetNumber);
    }

    return linearSearch(array, targetNumber);
  }

  async function startSearching() {
    if (isSearching) return;

    if (target.trim() === "") {
      setStatus("Enter a target value");
      return;
    }

    const targetNumber = Number(target);

    if (Number.isNaN(targetNumber)) {
      setStatus("Enter a valid number");
      return;
    }

    setIsSearching(true);
    setActiveIndex(null);
    setFoundIndex(null);
    setSearchRange(null);
    setComparisons(0);
    setStatus("Searching...");

    const animations = getAnimations(targetNumber);

    for (const animation of animations) {
      if (animation.type === "range") {
        setSearchRange({
          left: animation.left,
          right: animation.right,
          middle: animation.middle,
        });

        setStatus(
          `Searching between positions ${animation.left + 1} and ${
            animation.right + 1
          }`
        );

        await sleep(speed / 2);
      }

      if (animation.type === "check") {
        setActiveIndex(animation.index);
        setComparisons((previous) => previous + 1);
        setStatus(`Checking value ${array[animation.index]}`);

        await sleep(speed);
      }

      if (animation.type === "found") {
        setFoundIndex(animation.index);
        setActiveIndex(null);
        setStatus(
          `Target ${targetNumber} found at position ${
            animation.index + 1
          }`
        );

        await sleep(speed);
      }

      if (animation.type === "not-found") {
        setActiveIndex(null);
        setStatus(`Target ${targetNumber} was not found`);
      }
    }

    setIsSearching(false);
  }

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Searching Algorithm</p>

        <h1>Searching Visualizer</h1>

        <span>
          Enter a value and watch how Linear Search or Binary Search finds it.
        </span>
      </div>

      <section className="control-panel">
        <div className="control-group">
          <label htmlFor="search-algorithm">Algorithm</label>

          <select
            id="search-algorithm"
            value={selectedAlgorithm}
            disabled={isSearching}
            onChange={(event) => {
              setSelectedAlgorithm(event.target.value);
              resetSearchState();
            }}
          >
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="target">Target Value</label>

          <input
            id="target"
            type="number"
            value={target}
            disabled={isSearching}
            placeholder="Example: 42"
            onChange={(event) => {
              setTarget(event.target.value);
              resetSearchState();
            }}
          />
        </div>

        <div className="control-group speed-control">
          <label htmlFor="search-speed">
            Speed:{" "}
            {speed === 800
              ? "Slow"
              : speed === 500
                ? "Medium"
                : "Fast"}
          </label>

          <input
            id="search-speed"
            type="range"
            min="200"
            max="800"
            step="300"
            value={1000 - speed}
            disabled={isSearching}
            onChange={(event) => {
              setSpeed(1000 - Number(event.target.value));
            }}
          />
        </div>

        <button
          type="button"
          onClick={generateNewArray}
          disabled={isSearching}
        >
          Generate New Array
        </button>

        <button
          type="button"
          className="sort-button"
          onClick={startSearching}
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Start Search"}
        </button>
      </section>

      <section className="statistics-panel search-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Comparisons</span>
          <strong>{comparisons}</strong>
        </article>

        <article>
          <span>Target</span>
          <strong>{target || "-"}</strong>
        </article>
      </section>

      <section className="search-array-container">
        {array.map((value, index) => {
          let itemClass = "search-item";

          if (
            searchRange &&
            (index < searchRange.left || index > searchRange.right)
          ) {
            itemClass += " outside-range";
          }

          if (activeIndex === index) {
            itemClass += " checking-item";
          }

          if (foundIndex === index) {
            itemClass += " found-item";
          }

          return (
            <div className={itemClass} key={`${value}-${index}`}>
              <span className="search-index">{index}</span>
              <strong>{value}</strong>
            </div>
          );
        })}
      </section>

      <section className="legend">
        <div>
          <span className="legend-box normal"></span>
          Unchecked
        </div>

        <div>
          <span className="legend-box comparing"></span>
          Checking
        </div>

        <div>
          <span className="legend-box completed"></span>
          Found
        </div>
      </section>

      <section className="complexity-card">
        <h2>
          {selectedAlgorithm === "linear"
            ? "Linear Search Complexity"
            : "Binary Search Complexity"}
        </h2>

        <div className="complexity-grid">
          <p>
            Best Time
            <strong>O(1)</strong>
          </p>

          <p>
            Average Time
            <strong>
              {selectedAlgorithm === "linear" ? "O(n)" : "O(log n)"}
            </strong>
          </p>

          <p>
            Worst Time
            <strong>
              {selectedAlgorithm === "linear" ? "O(n)" : "O(log n)"}
            </strong>
          </p>

          <p>
            Space
            <strong>O(1)</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SearchingVisualizer;
