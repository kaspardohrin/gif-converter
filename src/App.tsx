import React from 'react'
import './App.scss'

import { useDispatch } from 'react-redux'

import { NoteInput } from './components/NoteInput'
import { NoteDisplay } from './components/NoteDisplay'
import { Converter } from './components/Converter'
import { QuestionDisplay } from './components/QuestionDisplay'

import { Note } from './types/notes'
import { faQuestionCircle, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [note_toggle, note_toggle_set] = React.useState<boolean>(false)
  const [question_toggle, question_toggle_set] = React.useState<boolean>(false)

  const dispatch = useDispatch()

  const add = (note: Note): void => {
    dispatch({type: 'ADD_NOTE', payload: note})
  }

  const remove = (note: Note): void => {
    dispatch({type: 'REMOVE_NOTE', payload: note})
  }

  const click_note = (): void => {
    note_toggle_set(!note_toggle)
    question_toggle_set(false)
  }

  const click_question = (): void => {
    question_toggle_set(!question_toggle)
    note_toggle_set(false)
}

  return (
    <div className='App'>
      <div className='side-panel-container'>
        <button className='sticky-note' title='Notes' onClick={click_note}><FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon></button>
        <button className='question-mark' title='Info' onClick={click_question}><FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon></button>
      </div>
      <div className={`notes-container ${(note_toggle) ? '' : 'hidden'}`}>
        <NoteInput add={add}></NoteInput>
        <NoteDisplay remove={remove}></NoteDisplay>
      </div>
      <div className={`questions-container ${(question_toggle) ? '' : 'hidden'}`}>
        <QuestionDisplay />
      </div>
      <div className='converter-container'>
        <Converter />
      </div>
    </div>
  )
}

export default App
