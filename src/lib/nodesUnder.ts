export function nodesUnder(root: Node, whatToShow?: number) {
  var n: Node, a = [], walk = document.createTreeWalker(root, whatToShow, null);
  while (n = walk.nextNode())
    a.push(n);
  return a;
}

export function textNodesUnder(root: Node): Text[] {
  return nodesUnder(root, NodeFilter.SHOW_TEXT);
}