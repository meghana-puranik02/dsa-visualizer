import { useState } from "react";
import StackBox from "../components/StackBox";

function StackVisualizer() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Ready");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const MAX_STACK_SIZE = 7;

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function pushValue() {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setStatus("Enter a value before pushing");
      return;
    }

    if (stack.length >= MAX_STACK_SIZE) {
      setStatus("Stack Overflow: maximum size reached");
      return;
    }

    const value = Number(trimmedValue);

    if (Number.isNaN(value)) {
      setStatus("Enter a valid number");
      return;
    }

    const newStack = [...stack, value];

    setStack(newStack);
    setInputValue("");
    setHighlightedIndex(newStack.length - 1);
    setStatus(`Pushed ${value} onto the stack`);

    await sleep(700);
    setHighlightedIndex(null);
  }

  async function popValue() {
    if (stack.length === 0) {
      setStatus("Stack Underflow: stack is empty");
      return;
    }

    const topIndex = stack.length - 1;
    const removedValue = stack[topIndex];

    setHighlightedIndex(topIndex);
    setStatus(`Popping ${removedValue} from the stack`);

    await sleep(700);

    setStack((previousStack) => previousStack.slice(0, -1));
    setHighlightedIndex(null);
    setStatus(`Popped ${removedValue} from the stack`);
  }

  async function peekValue() {
    if (stack.length === 0) {
      setStatus("Stack is empty");
      return;
    }

    const topIndex = stack.length - 1;
    const topValue = stack[topIndex];

    setHighlightedIndex(topIndex);
    setStatus(`Top element is ${topValue}`);

    await sleep(900);
    setHighlightedIndex(null);
  }

  function clearStack() {
    setStack([]);
    setHighlightedIndex(null);
    setStatus("Stack cleared");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      pushValue();
    }
  }

  const topElement =
    stack.length > 0 ? stack[stack.length - 1] : "Empty";

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Data Structure</p>
        <h1>Stack Visualizer</h1>

        <span>
          Learn Last In, First Out operations using Push, Pop and Peek.
        </span>
      </div>

      <section className="control-panel stack-control-panel">
        <div className="control-group">
          <label htmlFor="stack-value">Value</label>

          <input
            id="stack-value"
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
          onClick={pushValue}
        >
          Push
        </button>

        <button type="button" onClick={popValue}>
          Pop
        </button>

        <button type="button" onClick={peekValue}>
          Peek
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={clearStack}
        >
          Clear
        </button>
      </section>

      <section className="statistics-panel stack-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Size</span>
          <strong>{stack.length}</strong>
        </article>

        <article>
          <span>Top Element</span>
          <strong>{topElement}</strong>
        </article>

        <article>
          <span>Maximum Size</span>
          <strong>{MAX_STACK_SIZE}</strong>
        </article>
      </section>

      <section className="stack-visualizer-container">
        <div className="stack-side-label stack-top-text">
          TOP
        </div>

        <div className="stack-elements">
          {stack.length === 0 ? (
            <div className="empty-stack-message">
              Stack is empty
            </div>
          ) : (
            [...stack]
              .reverse()
              .map((value, reversedIndex) => {
                const originalIndex =
                  stack.length - 1 - reversedIndex;

                const isTop = originalIndex === stack.length - 1;
                const isHighlighted =
                  highlightedIndex === originalIndex;

                return (
                  <div
                    className={
                      isHighlighted
                        ? "stack-item-highlighted"
                        : ""
                    }
                    key={`${value}-${originalIndex}`}
                  >
                    <StackBox
                      value={value}
                      isTop={isTop}
                    />
                  </div>
                );
              })
          )}
        </div>

        <div className="stack-base">BOTTOM</div>
      </section>

      <section className="complexity-card">
        <h2>Stack Operation Complexity</h2>

        <div className="complexity-grid">
          <p>
            Push
            <strong>O(1)</strong>
          </p>

          <p>
            Pop
            <strong>O(1)</strong>
          </p>

          <p>
            Peek
            <strong>O(1)</strong>
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

export default StackVisualizer;
