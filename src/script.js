import { BST } from "./bst.js";

const randomArray = (length, mult) => {
  let result = [];
  for (let i = 0; i < length; i++) {
    let num = Math.ceil(Math.random() * mult);
    result.push(num);
  }
  return result;
};

const tree = new BST(randomArray(11, 10));
tree.print();

console.log();

console.log("Is balanced? ", tree.isBalanced());

process.stdout.write("\n Level Order: ");
tree.levelOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n In Order: ");
tree.inOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n Pre Order: ");
tree.preOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n Post Order: ");
tree.postOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

console.log("\n");

for (const num of randomArray(10, 20)) {
  tree.insert(num);
}

tree.print();

console.log();

console.log("Is balanced? ", tree.isBalanced());

console.log();

tree.rebalance();
tree.print();

console.log();

console.log("Is balanced? ", tree.isBalanced());

process.stdout.write("\n Level Order: ");
tree.levelOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n In Order: ");
tree.inOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n Pre Order: ");
tree.preOrderForEach((value) => {
  process.stdout.write(`${value} `);
});

process.stdout.write("\n Post Order: ");
tree.postOrderForEach((value) => {
  process.stdout.write(`${value} `);
});
