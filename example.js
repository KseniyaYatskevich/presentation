function main() {
  console.log('A');

  setTimeout(function exec() {
    console.log('B');
  }, 0);

  console.log('C');
}

main();