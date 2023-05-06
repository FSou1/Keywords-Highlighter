export function findNodesRecursively(
  node: Node,
  { nodeTypes } = { nodeTypes: [3] }
) {
  var A = [];
  if (node) {
    node = node.firstChild;
    while (node != null) {
      if (nodeTypes.includes(node.nodeType)) A[A.length] = node;
      else A = A.concat(findNodesRecursively(node));
      node = node.nextSibling;
    }
  }
  return A;
}

export function findNodesWithTreeWalker(node: Node) {
  var n: Node,
    a = [],
    walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
  while ((n = walk.nextNode())) a.push(n);
  return a;
}
