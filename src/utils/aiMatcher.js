export function calculateMatch(itemA, itemB) {
  if (itemA.type === itemB.type) return 0;

  const textA = (itemA.title + ' ' + itemA.description).toLowerCase();
  const textB = (itemB.title + ' ' + itemB.description).toLowerCase();

  const wordsA = textA.split(' ');
  const wordsB = textB.split(' ');

  let matches = 0;
  wordsA.forEach((word) => {
    if (wordsB.includes(word) && word.length > 3) {
      matches++;
    }
  });

  const score = Math.min(100, matches * 20);
  return score;
}
