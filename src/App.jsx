import { useState } from "react"
import { languages } from "src/data/languages"
import { translateToWowLanguage } from "src/utils/translateToWowLanguage"

const THEME_OPTIONS = ["default", "lich king", "burning crusade"]

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

  function handleSetTheme(e) {
    document.body.setAttribute("data-theme", e.target.value)
  }

  return (
    <div className="container">
      <header>
        <label htmlFor="theme">Choose a Theme:</label>
        <select id="theme" name="theme" onChange={handleSetTheme}>
          {THEME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </header>
      <main className="content-box flex-container--column">
        <section className="intro">
          <h1>World of Warcraft Language Translator</h1>
          <p>
            Are you tired of being in a party with your friends and not being
            able to see each other speaking in different languages? Well, worry
            no more! This translator mimics the logic of the in-game translation
            system, to the best of my current knowledge. Simply pick a language,
            enter your text, and receive an instant translation!
          </p>
        </section>

        <div>
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
        </div>

        <textarea
          rows="5"
          cols="50"
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
      </main>
      <footer className="flex-container--row">
        <div className="disclaimer">
          <p>
            DISCLAIMER: This site is not affiliated, associated, authorized,
            endorsed by, or in any way officially connected with Blizzard
            Entertainment, or any of its subsidiaries or its affiliates. The
            official World of Warcraft website can be found at{" "}
            <a href="https://worldofwarcraft.blizzard.com/en-us/">
              worldofwarcraft.blizzard.com
            </a>
            .
          </p>
          <p>
            The name World of Warcraft, as well as related names, marks,
            emblems, and images are registered trademarks of their respective
            owners.
          </p>
        </div>
      </footer>
    </div>
  )
}
