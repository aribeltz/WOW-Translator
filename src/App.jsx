import { useState } from "react"
import { languages } from "../languages"

function getRandomArrIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function translateToWowLanguage(sentence, language) {
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

export default function App() {
  const [language, setLanguage] = useState("default")
  const [input, setInput] = useState("")
  const [translation, setTranslation] = useState("")

  const languageOptions = Object.keys(languages)
  const canSubmit = language !== "default" && input.length > 1
  const showTranslation = translation.length > 0

  function handleLanguageSelect(e) {
    setLanguage(e.target.value)
  }

  function handleUserInput(e) {
    setInput(e.target.value)
  }

  function handleSubmit() {
    const translated = translateToWowLanguage(input, language)
    setTranslation(translated)
  }

  return (
    <>
      <h1>WOW Language Translator</h1>

      <label htmlFor="language">Select a Language:</label>
      <select
        name="language"
        id="language"
        value={language}
        onChange={handleLanguageSelect}
      >
        <option value={"default"} disabled>
          -- select an option --
        </option>
        {languageOptions.map((option) => {
          return <option key={option}>{option}</option>
        })}
      </select>

      <textarea
        name="input"
        id="input"
        value={input}
        onChange={handleUserInput}
      />

      <button disabled={!canSubmit} onClick={handleSubmit}>
        Submit
      </button>

      {showTranslation && (
        <>
          <h2>Translated Text:</h2>
          <p>{translation}</p>
        </>
      )}
    </>
  )
}
