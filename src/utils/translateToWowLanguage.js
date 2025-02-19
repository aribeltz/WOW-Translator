import { languages } from "src/data/languages"

export function translateToWowLanguage(sentence, language) {
  function getRandomArrIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const languageData = languages[language]

  function processSingleWord(word) {
    const length = word.length
    return languageData[length] ? getRandomArrIndex(languageData[length]) : word
  }

  function preserveCase(oldWord, newWord) {
    if (oldWord === newWord) return oldWord

    return newWord
      .split("")
      .map((char, index) =>
        oldWord[index] === oldWord[index].toUpperCase()
          ? char.toUpperCase()
          : char.toLowerCase()
      )
      .join("")
  }

  function translateWord(word) {
    const nonLetterRegex = /[^a-zA-Z\s]+/

    // Exclude words with non-letters.
    if (nonLetterRegex.test(word)) {
      return word
    }

    // Check if the word exists in the dictionary.
    const lowerCaseWord = word.toLowerCase()
    if (languageData?.dictionary && languageData?.dictionary[lowerCaseWord]) {
      return preserveCase(word, languageData.dictionary[lowerCaseWord])
    }

    const translatedWord = processSingleWord(word)
    return preserveCase(word, translatedWord)
  }

  // Split the sentence into words, punctuation, and spaces.
  const tokens = sentence.trim().match(/\w+|\s+|[^\w\s]/g) || []

  // Translate one word at a time while preserving punctuation and spacing.
  const translatedTokens = tokens.map((token) => {
    if (/^\s+$/.test(token)) {
      // Spacing
      return token
    } else if (/^[^\w\s]+$/.test(token)) {
      // Punctuation
      return token
    } else {
      return translateWord(token)
    }
  })

  return translatedTokens.join("")
}
