interface Node {
  id: string;
  /**
   * The label for the node. This should be a short snippet from the original text.
   */
  label: string;
}

interface Edge {
  /**
   * The identifier for the source node.
   */
  from: string;
  /**
   * The identifier for the target node.
   */
  to: string;
}

/**
 * Given an input string, produce a very simple representation of a directed
 * graph. The algorithm splits the text into individual sentences and then
 * creates a linear sequence of nodes connected by edges. Each node
 * represents one sentence. The resulting graph is returned as a list of
 * nodes and edges.
 *
 * @param text The raw input text to convert into a chart
 * @returns An object containing arrays of nodes and edges
 */
function generateChart(text: string): { nodes: Node[]; edges: Edge[] } {
  // Split the text into sentences. This regex looks for a punctuation mark
  // followed by whitespace to delineate sentence boundaries. It also handles
  // ellipses ("...") without splitting inside them.
  const sentences = text
    .split(/(?<!\.)\.(?!\.)\s+|[!?]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  sentences.forEach((sentence, index) => {
    const id = `n${index + 1}`;
    nodes.push({ id, label: sentence });
    if (index > 0) {
      edges.push({ from: `n${index}`, to: id });
    }
  });

  return { nodes, edges };
}

// If executed directly from the command line, read the arguments and output
// the generated chart as JSON. This allows you to run:
//   node dist/generateChart.js "Your text here. Another sentence."
// after compiling the TypeScript. When imported as a module, this does
// nothing.
if (require.main === module) {
  const textArg = process.argv.slice(2).join(" ") || "";
  const result = generateChart(textArg);
  // Pretty-print the JSON so it is easy to read or pipe into other tools
  console.log(JSON.stringify(result, null, 2));
}

export { generateChart, Node, Edge };
