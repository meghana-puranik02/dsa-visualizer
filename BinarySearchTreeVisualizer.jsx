import { useState } from "react";

function BinarySearchTreeVisualizer() {
  const [values, setValues] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Ready");
  const [highlightedValue, setHighlightedValue] = useState(null);

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

  function insertValue() {
    const value = getValidValue();

    if (value === null) return;

    if (values.includes(value)) {
      setStatus(`${value} already exists in the tree`);
      return;
    }

    setValues((previousValues) => [...previousValues, value]);
    setInputValue("");
    setStatus(`Inserted ${value}`);
  }

  async function searchValue() {
    const value = getValidValue();

    if (value === null) return;

    const sortedValues = [...values].sort((a, b) => a - b);

    for (const currentValue of sortedValues) {
      setHighlightedValue(currentValue);
      setStatus(`Checking ${currentValue}`);

      await sleep(600);

      if (currentValue === value) {
        setStatus(`${value} found in the tree`);
        await sleep(700);
        setHighlightedValue(null);
        return;
      }
    }

    setHighlightedValue(null);
    setStatus(`${value} was not found`);
  }

  function deleteValue() {
    const value = getValidValue();

    if (value === null) return;

    if (!values.includes(value)) {
      setStatus(`${value} was not found`);
      return;
    }

    setValues((previousValues) =>
      previousValues.filter((currentValue) => currentValue !== value)
    );

    setInputValue("");
    setHighlightedValue(null);
    setStatus(`Deleted ${value}`);
  }

  function clearTree() {
    setValues([]);
    setInputValue("");
    setHighlightedValue(null);
    setStatus("Tree cleared");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      insertValue();
    }
  }

  function createTree(valuesArray) {
    let root = null;

    function insertNode(node, value) {
      if (!node) {
        return {
          value,
          left: null,
          right: null,
        };
      }

      if (value < node.value) {
        node.left = insertNode(node.left, value);
      } else {
        node.right = insertNode(node.right, value);
      }

      return node;
    }

    for (const value of valuesArray) {
      root = insertNode(root, value);
    }

    return root;
  }

  function renderTree(node) {
    if (!node) return null;

    return (
      <div className="tree-node-group">
        <div
          className={`tree-node ${
            highlightedValue === node.value ? "tree-node-highlighted" : ""
          }`}
        >
          {node.value}
        </div>

        {(node.left || node.right) && (
          <div className="tree-children">
            <div className="tree-child">
              {node.left ? renderTree(node.left) : <div className="empty-node" />}
            </div>

            <div className="tree-child">
              {node.right
                ? renderTree(node.right)
                : <div className="empty-node" />}
            </div>
          </div>
        )}
      </div>
    );
  }

  const tree = createTree(values);

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Data Structure</p>

        <h1>Binary Search Tree Visualizer</h1>

        <span>
          Visualize insertion, searching and deletion in a Binary Search Tree.
        </span>
      </div>

      <section className="control-panel bst-control-panel">
        <div className="control-group">
          <label htmlFor="bst-value">Value</label>

          <input
            id="bst-value"
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
          onClick={insertValue}
        >
          Insert
        </button>

        <button type="button" onClick={searchValue}>
          Search
        </button>

        <button type="button" onClick={deleteValue}>
          Delete
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={clearTree}
        >
          Clear
        </button>
      </section>

      <section className="statistics-panel bst-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Nodes</span>
          <strong>{values.length}</strong>
        </article>

        <article>
          <span>Root</span>
          <strong>{values.length > 0 ? values[0] : "Empty"}</strong>
        </article>
      </section>

      <section className="bst-container">
        {tree ? (
          <div className="bst-tree">{renderTree(tree)}</div>
        ) : (
          <div className="empty-stack-message">
            Binary Search Tree is empty
          </div>
        )}
      </section>

      <section className="complexity-card">
        <h2>Binary Search Tree Complexity</h2>

        <div className="complexity-grid">
          <p>
            Insert Average
            <strong>O(log n)</strong>
          </p>

          <p>
            Search Average
            <strong>O(log n)</strong>
          </p>

          <p>
            Delete Average
            <strong>O(log n)</strong>
          </p>

          <p>
            Worst Case
            <strong>O(n)</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default BinarySearchTreeVisualizer;
