import React from 'react'

import './NoteDisplay.scss'

import { useSelector } from 'react-redux'

import { State } from '../reducer/notes'
import { Note } from '../types/notes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
  remove(note: Note): void;
}

export const NoteDisplay: React.FC<Props> = ({ remove }) => {
  const notes = useSelector<State, State['notes']>((state) => state.notes)

  const click = (note: Note): void => {
    remove(note)
  }

  return (
    <div className='notes-display-container'>
      <ul>
        {notes.map((note, i) => (
          <li key={i}>
            <button onClick={() => click(note)}><FontAwesomeIcon icon={faTimes} /></button>
            {note.text}
            <span>{new Date(note.ts).toUTCString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
