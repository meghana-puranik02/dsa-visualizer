import { useState } from "react";

function QueueVisualizer() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Ready");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const MAX_QUEUE_SIZE = 7;

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function enqueueValue() {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setStatus("Enter a value before enqueueing");
      return;
    }

    if (queue.length >= MAX_QUEUE_SIZE) {
      setStatus("Queue Overflow: maximum size reached");
      return;
    }

    const value = Number(trimmedValue);

    if (Number.isNaN(value)) {
      setStatus("Enter a valid number");
      return;
    }

    const newQueue = [...queue, value];

    setQueue(newQueue);
    setInputValue("");
    setHighlightedIndex(newQueue.length - 1);
    setStatus(`Enqueued ${value}`);

    await sleep(700);
    setHighlightedIndex(null);
  }

  async function dequeueValue() {
    if (queue.length === 0) {
      setStatus("Queue Underflow: queue is empty");
      return;
    }

    const removedValue = queue[0];

    setHighlightedIndex(0);
    setStatus(`Dequeuing ${removedValue}`);

    await sleep(700);

    setQueue((previousQueue) => previousQueue.slice(1));
    setHighlightedIndex(null);
    setStatus(`Dequeued ${removedValue}`);
  }

  async function peekFront() {
    if (queue.length === 0) {
      setStatus("Queue is empty");
      return;
    }

    setHighlightedIndex(0);
    setStatus(`Front element is ${queue[0]}`);

    await sleep(900);
    setHighlightedIndex(null);
  }

  function clearQueue() {
    setQueue([]);
    setHighlightedIndex(null);
    setStatus("Queue cleared");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      enqueueValue();
    }
  }

  const frontElement = queue.length > 0 ? queue[0] : "Empty";
  const rearElement =
    queue.length > 0 ? queue[queue.length - 1] : "Empty";

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Data Structure</p>
        <h1>Queue Visualizer</h1>

        <span>
          Learn First In, First Out operations using Enqueue, Dequeue and Front.
        </span>
      </div>

      <section className="control-panel queue-control-panel">
        <div className="control-group">
          <label htmlFor="queue-value">Value</label>

          <input
            id="queue-value"
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
          onClick={enqueueValue}
        >
          Enqueue
        </button>

        <button type="button" onClick={dequeueValue}>
          Dequeue
        </button>

        <button type="button" onClick={peekFront}>
          Front
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={clearQueue}
        >
          Clear
        </button>
      </section>

      <section className="statistics-panel queue-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Size</span>
          <strong>{queue.length}</strong>
        </article>

        <article>
          <span>Front</span>
          <strong>{frontElement}</strong>
        </article>

        <article>
          <span>Rear</span>
          <strong>{rearElement}</strong>
        </article>
      </section>

      <section className="queue-visualizer-container">
        {queue.length === 0 ? (
          <div className="empty-stack-message">
            Queue is empty
          </div>
        ) : (
          <div className="queue-elements">
            {queue.map((value, index) => (
              <div
                className={`queue-item ${
                  highlightedIndex === index ? "queue-item-highlighted" : ""
                }`}
                key={`${value}-${index}`}
              >
                {index === 0 && (
                  <span className="queue-label front-label">FRONT</span>
                )}

                <strong>{value}</strong>

                {index === queue.length - 1 && (
                  <span className="queue-label rear-label">REAR</span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="complexity-card">
        <h2>Queue Operation Complexity</h2>

        <div className="complexity-grid">
          <p>
            Enqueue
            <strong>O(1)</strong>
          </p>

          <p>
            Dequeue
            <strong>O(1)</strong>
          </p>

          <p>
            Front
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

export default QueueVisualizer;
