import { useState } from "react";

const initialNodes = [
  { id: 1, label: "A", x: 120, y: 80 },
  { id: 2, label: "B", x: 320, y: 60 },
  { id: 3, label: "C", x: 520, y: 100 },
  { id: 4, label: "D", x: 220, y: 250 },
  { id: 5, label: "E", x: 430, y: 260 },
];

const initialEdges = [
  [1, 2],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

function GraphVisualizer() {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bfs");
  const [startNode, setStartNode] = useState("A");
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [status, setStatus] = useState("Ready");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(600);

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function createAdjacencyList() {
    const adjacencyList = {};

    nodes.forEach((node) => {
      adjacencyList[node.label] = [];
    });

    edges.forEach(([fromId, toId]) => {
      const fromNode = nodes.find((node) => node.id === fromId);
      const toNode = nodes.find((node) => node.id === toId);

      adjacencyList[fromNode.label].push(toNode.label);
      adjacencyList[toNode.label].push(fromNode.label);
    });

    return adjacencyList;
  }

  function getBfsOrder(start, adjacencyList) {
    const queue = [start];
    const visited = new Set([start]);
    const order = [];

    while (queue.length > 0) {
      const current = queue.shift();
      order.push(current);

      for (const neighbor of adjacencyList[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return order;
  }

  function getDfsOrder(start, adjacencyList) {
    const visited = new Set();
    const order = [];

    function dfs(node) {
      visited.add(node);
      order.push(node);

      for (const neighbor of adjacencyList[node]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);

    return order;
  }

  async function startTraversal() {
    if (isRunning) return;

    setIsRunning(true);
    setVisitedNodes([]);
    setActiveNode(null);
    setStatus("Traversal started");

    const adjacencyList = createAdjacencyList();

    const traversalOrder =
      selectedAlgorithm === "bfs"
        ? getBfsOrder(startNode, adjacencyList)
        : getDfsOrder(startNode, adjacencyList);

    for (const nodeLabel of traversalOrder) {
      setActiveNode(nodeLabel);
      setStatus(`Visiting node ${nodeLabel}`);

      await sleep(speed);

      setVisitedNodes((previous) => [...previous, nodeLabel]);

      await sleep(speed / 2);
    }

    setActiveNode(null);
    setStatus(`${selectedAlgorithm.toUpperCase()} traversal completed`);
    setIsRunning(false);
  }

  function resetTraversal() {
    if (isRunning) return;

    setVisitedNodes([]);
    setActiveNode(null);
    setStatus("Ready");
  }

  const nodeMap = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );

  return (
    <main className="visualizer-page">
      <div className="visualizer-heading">
        <p>Graph Algorithm</p>
        <h1>Graph Visualizer</h1>

        <span>
          Visualize Breadth-First Search and Depth-First Search step by step.
        </span>
      </div>

      <section className="control-panel graph-control-panel">
        <div className="control-group">
          <label htmlFor="graph-algorithm">Algorithm</label>

          <select
            id="graph-algorithm"
            value={selectedAlgorithm}
            disabled={isRunning}
            onChange={(event) => {
              setSelectedAlgorithm(event.target.value);
              resetTraversal();
            }}
          >
            <option value="bfs">Breadth-First Search</option>
            <option value="dfs">Depth-First Search</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="start-node">Start Node</label>

          <select
            id="start-node"
            value={startNode}
            disabled={isRunning}
            onChange={(event) => {
              setStartNode(event.target.value);
              resetTraversal();
            }}
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.label}>
                {node.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group speed-control">
          <label htmlFor="graph-speed">
            Speed:{" "}
            {speed === 900
              ? "Slow"
              : speed === 600
                ? "Medium"
                : "Fast"}
          </label>

          <input
            id="graph-speed"
            type="range"
            min="300"
            max="900"
            step="300"
            value={1200 - speed}
            disabled={isRunning}
            onChange={(event) => {
              setSpeed(1200 - Number(event.target.value));
            }}
          />
        </div>

        <button
          type="button"
          className="sort-button"
          onClick={startTraversal}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Start Traversal"}
        </button>

        <button
          type="button"
          className="danger-button"
          onClick={resetTraversal}
          disabled={isRunning}
        >
          Reset
        </button>
      </section>

      <section className="statistics-panel graph-statistics">
        <article>
          <span>Status</span>
          <strong>{status}</strong>
        </article>

        <article>
          <span>Visited</span>
          <strong>
            {visitedNodes.length > 0 ? visitedNodes.join(" → ") : "-"}
          </strong>
        </article>

        <article>
          <span>Start Node</span>
          <strong>{startNode}</strong>
        </article>
      </section>

      <section className="graph-container">
        <svg
          className="graph-svg"
          viewBox="0 0 650 360"
          role="img"
          aria-label="Graph visualization"
        >
          {edges.map(([fromId, toId]) => {
            const fromNode = nodeMap[fromId];
            const toNode = nodeMap[toId];

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className="graph-edge"
              />
            );
          })}

          {nodes.map((node) => {
            const isVisited = visitedNodes.includes(node.label);
            const isActive = activeNode === node.label;

            let nodeClass = "graph-node-circle";

            if (isVisited) {
              nodeClass += " graph-node-visited";
            }

            if (isActive) {
              nodeClass += " graph-node-active";
            }

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="32"
                  className={nodeClass}
                />

                <text
                  x={node.x}
                  y={node.y + 7}
                  textAnchor="middle"
                  className="graph-node-text"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </section>

      <section className="legend">
        <div>
          <span className="legend-box normal"></span>
          Unvisited
        </div>

        <div>
          <span className="legend-box comparing"></span>
          Current
        </div>

        <div>
          <span className="legend-box completed"></span>
          Visited
        </div>
      </section>

      <section className="complexity-card">
        <h2>{selectedAlgorithm.toUpperCase()} Complexity</h2>

        <div className="complexity-grid">
          <p>
            Time
            <strong>O(V + E)</strong>
          </p>

          <p>
            Space
            <strong>O(V)</strong>
          </p>

          <p>
            Vertices
            <strong>{nodes.length}</strong>
          </p>

          <p>
            Edges
            <strong>{edges.length}</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default GraphVisualizer;
