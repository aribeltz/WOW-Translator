import { useState } from "react"
import { languages } from "src/languages"
import { translateToWowLanguage } from "src/utils/translateToWowLanguage"

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
