function Node(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

export class BST {
  #root;

  constructor(array) {
    let clean = [];
    for (const num of array) {
      if (clean.includes(num)) continue;
      clean.push(num);
    }
    clean = this.#sortArray(clean);
    this.#root = this.#buildTree(clean);
  }

  #sortArray(array) {
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = this.#sortArray(array.slice(0, mid));
    const right = this.#sortArray(array.slice(mid));
    const result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) result.push(left.shift());
      else result.push(right.shift());
    }
    if (left.length) result.push(...left);
    if (right.length) result.push(...right);
    return result;
  }

  #buildTree(array) {
    if (array.length === 0) return null;
    if (array.length === 1) return Node(array[0]);
    const mid = Math.floor(array.length / 2);
    const root = Node(array[mid]);
    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));
    return root;
  }

  #prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) return;

    this.#prettyPrint(
      node.right,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    this.#prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };

  print() {
    this.#prettyPrint(this.#root);
  }

  includes(value) {
    let current = this.#root;
    while (current) {
      if (current.value === value) return true;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return false;
  }

  insert(value) {
    let current = this.#root;
    while (current) {
      if (current.value === value) return;
      if (value < current.value) {
        if (current.left) current = current.left;
        else {
          current.left = Node(value);
          return;
        }
      } else {
        if (current.right) current = current.right;
        else {
          current.right = Node(value);
          return;
        }
      }
    }
  }

  delete(value) {
    let current = this.#root,
      previous;
    while (current) {
      if (current.value !== value) {
        if (value < current.value) {
          previous = [current, 1];
          current = current.left;
        } else {
          previous = [current, 2];
          current = current.right;
        }
        continue;
      }

      if (!current.left && !current.right) {
        if (previous[1] === 1) previous[0].left = null;
        else previous[0].right = null;
        return;
      }

      if (!current.left !== !current.right) {
        if (current.left) {
          if (previous[1] === 1) previous[0].left = current.left;
          else previous[0].right = current.left;
        } else {
          if (previous[1] === 1) previous[0].left = current.right;
          else previous[0].right = current.right;
        }
        return;
      }

      let smallest = current.right,
        last = [current, 2];
      while (smallest) {
        if (smallest.left) {
          last = [smallest, 1];
          smallest = smallest.left;
          continue;
        }

        current.value = smallest.value;
        if (last[1] === 1) last[0].left = null;
        else last[0].right = null;
        return;
      }
    }
  }

  levelOrderForEach(callback) {
    if (!callback) throw Error("callback argument required");
    if (!this.#root) return;
    const queue = [];
    queue.push(this.#root);
    while (queue.length) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      callback(node.value);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw Error("callback argument required");
    this.#inOrderForEachRecursive(this.#root, callback);
  }

  #inOrderForEachRecursive(root, callback) {
    if (!root) return;
    this.#inOrderForEachRecursive(root.left, callback);
    callback(root.value);
    this.#inOrderForEachRecursive(root.right, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw Error("callback argument required");
    this.#preOrderForEachRecursive(this.#root, callback);
  }

  #preOrderForEachRecursive(root, callback) {
    if (!root) return;
    callback(root.value);
    this.#preOrderForEachRecursive(root.left, callback);
    this.#preOrderForEachRecursive(root.right, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw Error("callback argument required");
    this.#postOrderForEachRecursive(this.#root, callback);
  }

  #postOrderForEachRecursive(root, callback) {
    if (!root) return;
    this.#postOrderForEachRecursive(root.left, callback);
    this.#postOrderForEachRecursive(root.right, callback);
    callback(root.value);
  }

  height(value) {
    let current = this.#root;
    while (current) {
      if (current.value !== value) {
        if (value < current.value) current = current.left;
        else current = current.right;
        continue;
      }
      return Math.max(this.#height(current.left), this.#height(current.right));
    }
    return undefined;
  }

  #height(node) {
    if (!node) return 0;
    return 1 + Math.max(this.#height(node.left), this.#height(node.right));
  }

  depth(value) {
    let current = this.#root,
      depth = 0;
    while (current) {
      if (current.value === value) return depth;
      if (value < current.value) current = current.left;
      else current = current.right;
      depth++;
    }
    return undefined;
  }

  isBalanced() {
    return this.#isBalanced(this.#root);
  }

  #isBalanced(root) {
    if (!root) return true;
    return (
      Math.abs(this.#height(root.left) - this.#height(root.right)) <= 1 &&
      this.#isBalanced(root.left) &&
      this.#isBalanced(root.right)
    );
  }

  rebalance() {
    let values = [];
    this.inOrderForEach((value) => {
      values.push(value);
    });
    this.#root = this.#buildTree(values);
  }
}
