import { textNodesUnder } from './nodesUnder';

interface FindAndWrapOptions {
  findTextRegExp: RegExp;
  wrapWithTag: string;
  wrapWithClassName?: string;
  wrapIf?: (node: Text) => boolean;
}

export function findAndWrap(node: Node, options: FindAndWrapOptions) {
  if (!node) {
    throw new Error('Bad arguments: node is null');
  }
  if (!options) {
    throw new Error('Bad arguments: options is null');
  }

  const {
    findTextRegExp,
    wrapWithTag,
    wrapWithClassName,
    wrapIf = () => true
  } = options;

  if (!findTextRegExp) {
    throw new Error('Bad arguments: findTextRegExp is null');
  }
  if (!wrapWithTag) {
    throw new Error('Bad arguments: wrapWithTag is null');
  }

  const textNodes = textNodesUnder(node)
    .filter((text) => wrapIf(text));

  const getFilter = (regexp: RegExp, str: string) => {
    if (regexp.global) {
      return str.matchAll(regexp);
    } else {
      return str.match(regexp);
    }
  };

  const matchingNodes = textNodes
    .filter((node) => getFilter(findTextRegExp, node.nodeValue));

  for (const node of matchingNodes) {
    wrapText(node, {
      findTextRegExp: findTextRegExp,
      wrapWithTag: wrapWithTag,
      wrapWithClassName: wrapWithClassName,
    });
  }
}

interface WrapTextOptions {
  findTextRegExp: RegExp;
  wrapWithTag: string;
  wrapWithClassName?: string;
}

export function wrapText(node: Text, options: WrapTextOptions) {
  if (!node) {
    throw new Error('Bad arguments: node is null');
  }
  if (!options) {
    throw new Error('Bad arguments: options is null');
  }

  const {
    findTextRegExp,
    wrapWithTag,
    wrapWithClassName,
  } = options;

  if (!findTextRegExp) {
    throw new Error('Bad arguments: options.findTextRegExp is null');
  }
  if (!wrapWithTag) {
    throw new Error('Bad arguments: options.wrapWithTag is null');
  }

  const matches = findTextRegExp.global
    ? Array.from(node.nodeValue.matchAll(findTextRegExp))
    : [node.nodeValue.match(findTextRegExp)];

  const sorted = matches.sort((a, b) => b.index - a.index);

  for (let match of sorted) {
    wrapWord(node, match[0], match.index, {
      wrapWithTag,
      wrapWithClassName
    });
  }
}

interface WrapWordOptions {
  wrapWithTag: string;
  wrapWithClassName?: string;
}

export function wrapWord(node: Text, word: string, index: number, options: WrapWordOptions) {
  if (!node) {
    throw new Error('Bad arguments: node is null');
  }
  if (!word) {
    throw new Error('Bad arguments: word is null');
  }
  if (index == null) {
    throw new Error('Bad arguments: node is null');
  }
  if (!options) {
    throw new Error('Bad arguments: options is null');
  }

  const {
    wrapWithTag,
    wrapWithClassName
  } = options;

  if (!wrapWithTag) {
    throw new Error('Bad arguments: wrapWithTag is null');
  }

  let match = document.createElement(wrapWithTag);
  if (wrapWithClassName) {
    match.className = wrapWithClassName;
  }
  match.appendChild(document.createTextNode(word));

  var after = node.splitText(index);
  after.nodeValue = after.nodeValue.substring(word.length);
  node.parentNode.insertBefore(match, after);
}