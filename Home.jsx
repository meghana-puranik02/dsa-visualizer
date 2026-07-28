import { Link } from "react-router-dom";

function Home() {
  const algorithms = [
    {
      title: "Sorting",
      description:
        "Visualize Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort.",
      icon: "📊",
      path: "/sorting",
    },
    {
      title: "Searching",
      description:
        "Understand Linear Search and Binary Search using step-by-step animations.",
      icon: "🔍",
      path: "/searching",
    },
    {
      title: "Stack",
      description:
        "Learn push, pop and peek operations using a visual stack.",
      icon: "📚",
      path: "/stack",
    },
    {
      title: "Queue",
      description:
        "Visualize enqueue, dequeue, front and rear operations.",
      icon: "🚶",
      path: "/queue",
    },
    {
      title: "Linked List",
      description:
        "Learn insertion, deletion, searching and traversal in linked lists.",
      icon: "🔗",
      path: "/linked-list",
    },
    {
      title: "Binary Search Tree",
      description:
        "Explore insertion, searching and deletion in a Binary Search Tree.",
      icon: "🌳",
      path: "/binary-search-tree",
    },
    {
      title: "Graph",
      description:
        "Understand Breadth-First Search and Depth-First Search using animations.",
      icon: "🕸️",
      path: "/graph",
    },
  ];

  return (
    <>
      <main className="hero" id="home">
        <p className="hero-label">Learn • Visualize • Understand</p>

        <h1>
          Learn Data Structures and Algorithms through interactive
          visualizations
        </h1>

        <p className="hero-description">
          Understand sorting, searching, stacks, queues, linked lists, trees
          and graphs using step-by-step animations.
        </p>

        <a href="#algorithms" className="start-button">
          Start Visualizing
        </a>
      </main>

      <section className="algorithms-section" id="algorithms">
        <div className="section-heading">
          <p>Explore Algorithms</p>
          <h2>Choose a visualization</h2>
        </div>

        <div className="algorithm-grid">
          {algorithms.map((algorithm) => (
            <article className="algorithm-card" key={algorithm.title}>
              <div className="card-icon">{algorithm.icon}</div>

              <h3>{algorithm.title}</h3>

              <p>{algorithm.description}</p>

              <Link className="explore-link" to={algorithm.path}>
                Explore
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-content">
          <div>
            <p className="about-label">About the project</p>

            <h2>Learn algorithms by watching every operation</h2>

            <p className="about-description">
              DSA Visualizer helps students understand complex data structures
              and algorithms through animations, operation counters,
              complexity information and interactive controls.
            </p>
          </div>

          <div className="about-features">
            <article>
              <strong>5+</strong>
              <span>Sorting algorithms</span>
            </article>

            <article>
              <strong>2</strong>
              <span>Searching algorithms</span>
            </article>

            <article>
              <strong>5</strong>
              <span>Data structures</span>
            </article>

            <article>
              <strong>100%</strong>
              <span>Interactive learning</span>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
