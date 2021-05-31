export function shuffleArray<T>(oldArray: Array<T>): Array<T> {
  console.log(oldArray);
  const array = [...oldArray];
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  // var currentIndex = array.length;
  // var temporaryValue: T;
  // var randomIndex: number;

  // // While there remain elements to shuffle...
  // while (0 !== currentIndex) {
  //   // Pick a remaining element...
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex -= 1;

  //   // And swap it with the current element.
  //   temporaryValue = array[currentIndex];
  //   array[currentIndex] = array[randomIndex];
  //   array[randomIndex] = temporaryValue;
  // }

  console.log(array);

  return array;
}
