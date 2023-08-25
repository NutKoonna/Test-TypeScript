function getHandScore(input: string): number {
  const cards: string[] = input.split(' ');
  const suitSum: { [suit: string]: number } = {C: 0, D: 0, H: 0, S: 0};
  const rankCount: { [rank: string]: number } = {};

  for (const card of cards) {
    const suit: string = card[0];
    const rank: string = card.substring(1);
    let cardValue: number = 0;

    if (rank === 'A') {
      cardValue = 11;
    } else if (['K', 'Q', 'J'].includes(rank)) {
      cardValue = 10;
    } else {
      cardValue = parseInt(rank);
    }

    suitSum[suit] += cardValue;

    if (rankCount[rank]) {
      rankCount[rank]++;
    } else {
      rankCount[rank] = 1;
    }
  }

  const maxSuitValue: number = Math.max(...Object.values(suitSum));
  let score: number = maxSuitValue;
    // check hand of three cards with the same rank
    for (const rank in rankCount) {
        const count = rankCount[rank];
        if (count === 3 && rank === 'A') {
            score = 35;      
        }
        else if (count === 3){
            score = 32.5
        }
    }
    return score;
}
console.log(getHandScore("S8 S10 CA")); 
