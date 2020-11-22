
import React, { ChangeEvent, KeyboardEvent } from 'react'

import { v4 } from 'uuid'

import './NoteInput.scss'

import { Note } from '../types/notes'

interface Props {
  add(note: Note): void
}

export const NoteInput: React.FC<Props> = ({ add }) => {
  const [note, note_set] = React.useState('')

  const update = (event: ChangeEvent<HTMLTextAreaElement>) => {
    note_set(event.target.value.replace(/^\W$/g, ''))
  }
  const enter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || !note) return; create()
  }
  const click = () => {
    if (!note) return; create()
  }
  const create = () => {
    add({ text: note, ts: Date.now(), id: v4() }); note_set('')
  }

  return (
    <div className="note-input-container">
      <textarea
        onChange={update}
        onKeyPress={enter}
        value={note}
        name='note'
        placeholder='Type here'
      />
      <button onClick={click}>Add</button>
    </div>
  )
}
