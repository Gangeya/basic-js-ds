const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.r = null;
  }

  root() {
    return this.r;
  }

  add(data) {
    this.r = addWithin(this.r, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.value === data) {
        return node;
      }

      if (data < node.value) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.r, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.value === data) {
        return true;
      }

      return data < node.value
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    return searchWithin(this.r, data);

    function searchWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.value === data) {
        return node;
      }

      return data < node.value
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  remove(data) {
    this.r = removeNode(this.r, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.value) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.value < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
        }
        if (!node.right) {
          node = node.left;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.value = minFromRight.value;
        node.right = removeNode(node.right, minFromRight.value);

        return node;
      }
    }
  }

  min() {
    if (!this.r) {
      return;
    }

    let node = this.r;
    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  max() {
    if (!this.r) {
      return;
    }

    let node = this.r;
    while (node.right) {
      node = node.right;
    }

    return node.value;
  }
}

module.exports = {
  BinarySearchTree,
};
