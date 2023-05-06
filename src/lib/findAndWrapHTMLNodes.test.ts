import {
  findAndWrap,
  wrapText,
  wrapWord,
} from './findAndWrapHTMLNodes';

describe('findAndWrap', () => {
  test('finds and wraps a text node', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em'
    };

    findAndWrap(document.body, options);

    const container = document.getElementsByTagName('b')[0];
    expect(container.outerHTML).toBe('<b><em>World</em></b>');
  });

  test('finds and wraps a text node with a tag and a class name', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'small',
      wrapWithClassName: 'class2'
    };

    findAndWrap(document.body, options);

    const container = document.getElementsByTagName('b')[0];
    expect(container.outerHTML).toBe('<b><small class="class2">World</small></b>');
  });

  test('finds and wraps one match in each text node', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '<div><p>World</p></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/i,
      wrapWithTag: 'em'
    };

    findAndWrap(document.body, options);

    const firstContainer = document.getElementsByTagName('b')[0];
    expect(firstContainer.outerHTML).toBe('<b><em>World</em></b>');

    const secondContainer = document.getElementsByTagName('p')[0];
    expect(secondContainer.outerHTML).toBe('<p><em>World</em></p>');
  });

  test('finds and wraps all matches in each text node', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World is your world</b></div>' +
      '<div><p>World Map: A clickable map of world countries</p></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em'
    };

    findAndWrap(document.body, options);

    const firstContainer = document.getElementsByTagName('b')[0];
    expect(firstContainer.outerHTML).toBe('<b><em>World</em> is your <em>world</em></b>');

    const secondContainer = document.getElementsByTagName('p')[0];
    expect(secondContainer.outerHTML).toBe('<p><em>World</em> Map: A clickable map of <em>world</em> countries</p>');
  });

  test('finds and wraps a text node on every call', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'small',
      wrapWithClassName: 'class2'
    };

    findAndWrap(document.body, options);
    findAndWrap(document.body, options);
    findAndWrap(document.body, options);

    const container = document.getElementsByTagName('b')[0];
    expect(container.outerHTML).toBe('<b>' +
      '<small class="class2">' +
      '<small class="class2">' +
      '<small class="class2">World</small>' +
      '</small>' +
      '</small>' +
      '</b>');
  });

  test('finds and wraps a text node only once if filter element is defined', () => {
    document.body.innerHTML = '<div>' +
      '<h1>Hello</h1>' +
      '<div><b>World</b></div>' +
      '</div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'small',
      wrapWithClassName: 'highlighted',
      wrapIf: (node: Text) => {
        return !node.parentElement.classList.contains('highlighted');
      }
    };

    findAndWrap(document.body, options);
    findAndWrap(document.body, options);
    findAndWrap(document.body, options);

    const container = document.getElementsByTagName('b')[0];
    expect(container.outerHTML).toBe('<b>' +
      '<small class="highlighted">World</small>' +
      '</b>');
  });

  test('throws an error if the node parameter is missing', () => {
    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em'
    };

    expect(() => {
      findAndWrap(null, options);
    }).toThrow('Bad arguments: node is null');
  });

  test('throws an error if the options parameter is missing', () => {
    document.body.innerHTML = '<div></div>';

    const options = null;

    expect(() => {
      findAndWrap(document.body, options);
    }).toThrow('Bad arguments: options is null');
  });

  test('throws an error if the option.findTextRegExp is missing', () => {
    document.body.innerHTML = '<div></div>';

    const options = {
      findTextRegExp: null,
      wrapWithTag: 'em'
    };

    expect(() => {
      findAndWrap(document.body, options);
    }).toThrow('Bad arguments: findTextRegExp is null');
  });

  test('throws an error if the wrapWithTag is missing', () => {
    document.body.innerHTML = '<div></div>';

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: null
    };

    expect(() => {
      findAndWrap(document.body, options);
    }).toThrow('Bad arguments: wrapWithTag is null');
  });
});

describe('wrapText', () => {
  test('throws an error if node is missing', () => {
    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em'
    };

    expect(() => {
      wrapText(null, options);
    }).toThrow('Bad arguments: node is null');
  });

  test('throws an error if options is missing', () => {
    const node = document.createTextNode('hello');

    const options = null;

    expect(() => {
      wrapText(node, options);
    }).toThrow('Bad arguments: options is null');
  });

  test('throws an error if options.findTextRegExp is missing', () => {
    const node = document.createTextNode('hello');

    const options = {
      findTextRegExp: null,
      wrapWithTag: 'em'
    };

    expect(() => {
      wrapText(node, options);
    }).toThrow('Bad arguments: options.findTextRegExp is null');
  });

  test('throws an error if options.wrapWithTag is missing', () => {
    const node = document.createTextNode('hello');

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: null
    };

    expect(() => {
      wrapText(node, options);
    }).toThrow('Bad arguments: options.wrapWithTag is null');
  });

  test('wraps a single matching word in a text node with a tag', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    const options = {
      findTextRegExp: /World/i,
      wrapWithTag: 'em',
    };

    wrapText(node, options);

    expect(container.outerHTML).toBe('<div><em>World</em> hello world</div>');
  });

  test('wraps a matching word in a text node with a tag', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('Hello World');
    container.appendChild(node);

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em',
    };

    wrapText(node, options);

    expect(container.outerHTML).toBe('<div>Hello <em>World</em></div>');
  });

  test('wraps each matching word in a text node with a tag', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'em',
    };

    wrapText(node, options);

    expect(container.outerHTML).toBe('<div><em>World</em> hello <em>world</em></div>');
  });

  test('wraps a matching word in a text node with a tag and a class name', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('Hello World');
    container.appendChild(node);

    const options = {
      findTextRegExp: /World/gi,
      wrapWithTag: 'b',
      wrapWithClassName: 'class1'
    };

    wrapText(node, options);

    expect(container.outerHTML).toBe('<div>Hello <b class="class1">World</b></div>');
  });
});

describe('wrapWord', () => {
  test('throws an error when node is null', () => {
    expect(() => wrapWord(null, null, null, null))
      .toThrow('Bad arguments: node is null');
  });

  test('throws an error when word is null', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    expect(() => wrapWord(node, null, null, null))
      .toThrow('Bad arguments: word is null');
  });

  test('throws an error when index is null', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    expect(() => wrapWord(node, 'hello', null, null))
      .toThrow('Bad arguments: node is null');
  });

  test('throws an error when options is null', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    expect(() => wrapWord(node, 'hello', 0, null))
      .toThrow('Bad arguments: options is null');
  });

  test('throws an error when wrapWithTag is null', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    expect(() => wrapWord(node, 'hello', 0, { wrapWithTag: null }))
      .toThrow('Bad arguments: wrapWithTag is null');
  });

  test('wraps a word in a text node', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    wrapWord(node, 'hello', 6, { wrapWithTag: 'em' });

    expect(container.outerHTML).toBe('<div>World <em>hello</em> world</div>');
  });

  test('wraps several words in a text node', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    wrapWord(node, 'world', 12, { wrapWithTag: 'em' });
    wrapWord(node, 'World', 0, { wrapWithTag: 'em' });

    expect(container.outerHTML).toBe('<div><em>World</em> hello <em>world</em></div>');
  });

  test('wraps several words in a text node with different ', () => {
    const container = document.createElement('div');

    const node = document.createTextNode('World hello world');
    container.appendChild(node);

    const options1 = {
      wrapWithTag: 'em',
      wrapWithClassName: 'class1'
    };
    wrapWord(node, 'world', 12, options1);

    const options2 = {
      wrapWithTag: 'em',
      wrapWithClassName: 'class2 class3'
    };
    wrapWord(node, 'World', 0, options2);

    expect(container.outerHTML)
      .toBe('<div><em class="class2 class3">World</em> hello <em class="class1">world</em></div>');
  });
});