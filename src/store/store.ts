import { createStore } from 'redux'
import { notes_reducer } from '../reducer/notes'

export const store = createStore(notes_reducer)
