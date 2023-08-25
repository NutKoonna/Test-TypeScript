function getQuestionPart(phrases:string[]):string[] {
  const commonWordArray: string[] = [];

  for (let currentIndex = 0; currentIndex < phrases.length; currentIndex++) {
    let currentWord = '';

    for (const char of phrases[currentIndex]) {
      let commonWordCount = 0;
      currentWord += char;

      for (let compareIndex = 0; compareIndex < phrases.length; compareIndex++) {
        if (compareIndex !== currentIndex) {
          if (phrases[compareIndex].includes(currentWord)) {
            commonWordCount += 1;
          }
        } else {
          continue;
        }
      }
      // If commonWordCount=2, then it is a common word among the three phrases.
      if (commonWordCount < phrases.length - 1) {
        currentWord = '';
      } else {
        commonWordArray.push(currentWord);
      }
    }
  }

  let longestCommonWord = '';

  for (const commonWord of commonWordArray) {
    if (commonWord.length >= longestCommonWord.length) {
      longestCommonWord = commonWord;
    }
  }

  for (let wordIndex = 0; wordIndex < phrases.length; wordIndex++) {
    phrases[wordIndex] = phrases[wordIndex].replace(longestCommonWord, '').trim();
  }

  return phrases;
}

console.log(getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]));  
console.log(getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"]));
