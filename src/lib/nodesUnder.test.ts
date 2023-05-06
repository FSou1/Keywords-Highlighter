import {
  nodesUnder,
  textNodesUnder
} from './nodesUnder';

describe('nodesUnder', () => {
  test('finds nodes under the root node', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div>' +
      '<p>World</p>' +
      '</div>' +
      '</div>';

    const nodes = nodesUnder(document.body);

    expect(nodes.length).toBe(6);
    expect(nodes[0].nodeName).toBe('DIV');
    expect(nodes[2].nodeValue).toBe('Hello');
    expect(nodes[4].nodeName).toBe('P');
    expect(nodes[5].nodeValue).toBe('World');
  })
});

describe('textNodesUnder', () => {
  test('finds text nodes under the root node', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '</div>';

    const nodes = textNodesUnder(document.body);

    expect(nodes.length).toBe(2);
    expect(nodes[0].nodeValue).toBe('Hello');
    expect(nodes[1].nodeValue).toBe('World');
  })
});