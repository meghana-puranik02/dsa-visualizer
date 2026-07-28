import { useState } from "react";

function LinkedListVisualizer() {
  const [list, setList] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Ready");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function getValidValue() {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setStatus("Enter a value");
      return null;
    }

    const value = Number(trimmedValue);

    if (Number.isNaN(value)) {
      setStatus("Enter a valid number");
      return null;
    }

    return value;
  }

  async function insertAtHead() {
    const value = getValidValue();

    if (value === null) return;

    setList((previousList) => [value, ...previousList]);
    setInputValue("");
    setHighlightedIndex(0);
    setStatus(`Inserted ${value} at the head`);

    await sleep(700);
    setHighlightedIndex(null);
  }

  async function insertAtTail() {
    const value = getValidValue();

    if (value === null) return;

    const newList = [...list, value];

    setList(newList);
    setInputValue("");
    setHighlightedIndex(newList.length - 1);
    setStatus(`Inserted ${value} at the tail`);

    await sleep(700);
    setHighlightedIndex(null);
  }

  async function deleteValue() {
    const value = getValidValue();

    if (value === null) return;

    const index = list.indexOf(value);

    if (index === -1) {
      setStatus(`${value} was not found`);
      return;
    }

    setHighlightedIndex(index);
    setStatus(`Deleting ${value}`);

    await sleep(700);

    setList((previousList) =>
      previousList.filter((_, currentIndex) => currentIndex !== index)
    );

    setInputValue("");
    setHighlightedIndex(null);
    setStatus(`Deleted ${value}`);
  }

  async function searchValue() {
    const value = getValidValue();

    if (value === null) return;

    setStatus(`Searching for ${value}`);

    for (let index = 0; index < list.length; index++) {
      setHighlightedIndex(index);

      await sleep(600);

      if (list[index] === value) {
        setStatus(`${value} found at position ${index + 1}`);
        await sleep(700);
        setHighlightedIndex(null);
        return;
      }
    }

    setHighlightedIndex(null);
    setStatus(`${value} was not found`);
  }

  function clearList() {
    setList([]);
    setInputValue("");
    setHighlightedIndex(null);
    setStatus("Linked list cleared");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      insertAtTail();
    }
  }

  const headValue = list.length > 0 ? list[0] : "Empty";
  const tailValue = list.length > 0 ? list[list.length - 1] : "Empty";

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Data Structure</p>
        <h1>Linked List Visualizer</h1>

        <span>
          Visualize insertion, deletion and searching in a singly linked list.
        </span>
      </div>

      <section className="control-panel linked-list-control-panel">
        <div className="control-group">
          <label htmlFor="linked-list-value">Value</label>

          <input
            id="linked-list-value"
            type="number"
            value={inputValue}
            placeholder="Enter a number"
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          type="button"
          className="sort-button"
          onClick={insertAtHead}
        >
          Insert Head
        </button>

        <button type="button" onClick={insertAtTail}>
          Insert Tail
        </button>

        <button type="button" onClick={deleteValue}>
          Delete
        </button>

        <button type="button" onClick={searchValue}>
          Search
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={clearList}
        >
          Clear
        </button>
      </section>

      <section className="statistics-panel linked-list-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Length</span>
          <strong>{list.length}</strong>
        </article>

        <article>
          <span>Head</span>
          <strong>{headValue}</strong>
        </article>

        <article>
          <span>Tail</span>
          <strong>{tailValue}</strong>
        </article>
      </section>

      <section className="linked-list-container">
        {list.length === 0 ? (
          <div className="empty-stack-message">
            Linked list is empty
          </div>
        ) : (
          <div className="linked-list-items">
            {list.map((value, index) => (
              <div className="linked-list-group" key={`${value}-${index}`}>
                <div
                  className={`linked-list-node ${
                    highlightedIndex === index
                      ? "linked-list-node-highlighted"
                      : ""
                  }`}
                >
                  {index === 0 && (
                    <span className="linked-list-label head-label">
                      HEAD
                    </span>
                  )}

                  <strong>{value}</strong>

                  {index === list.length - 1 && (
                    <span className="linked-list-label tail-label">
                      TAIL
                    </span>
                  )}
                </div>

                {index < list.length - 1 && (
                  <div className="linked-list-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="complexity-card">
        <h2>Linked List Operation Complexity</h2>

        <div className="complexity-grid">
          <p>
            Insert Head
            <strong>O(1)</strong>
          </p>

          <p>
            Insert Tail
            <strong>O(n)</strong>
          </p>

          <p>
            Search
            <strong>O(n)</strong>
          </p>

          <p>
            Space
            <strong>O(n)</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LinkedListVisualizer;
