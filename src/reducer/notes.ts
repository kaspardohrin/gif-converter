import { Note } from '../types/notes'

export interface State {
    notes: Array<Note>
}

const notes_initial = {
    notes: storage_get('notes')
        ?? [{ text: 'Welkom! Dit is je eerste notitie :) Type in het invoerveld om nieuwe notities toe te voegen!', ts: Date.now(), id: '1', }]
}

type Action = {
    type: 'ADD_NOTE' | 'REMOVE_NOTE',
    payload: Note,
}

export const notes_reducer = (state: State = notes_initial, action: Action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            storage_set('notes', action.payload)

            return { ...state, notes: [action.payload, ...state.notes] }
        case 'REMOVE_NOTE':
            storage_unset('notes', action.payload)

            return { ...state, notes: [...state.notes?.filter(x => x.id !== action.payload.id)] }
        default:
            return state
    }
}

function storage_get(key: string,) {
    const storage: Array<Note> = JSON.parse(localStorage.getItem(key)!)

    return (storage?.length !== 0) ? storage : null
}

function storage_set(key: string, data: Note,) {
    const storage_old: Array<Note> = JSON?.parse(localStorage.getItem(key)!)

    if (!storage_old) {
        const storage_new: string = JSON.stringify([data])

        return localStorage.setItem(key, storage_new)
    } else {
        const storage_new: string = JSON.stringify([data, ...storage_old])

        return localStorage.setItem(key, storage_new)
    }
}

function storage_unset(key: string, data: Note,) {
    const storage_old: Array<Note> = JSON.parse(localStorage.getItem(key)!)

    const filter: Array<Note> = storage_old?.filter(x => x.id !== data.id)

    if (!filter) return null

    const storage_new: string = JSON.stringify([...filter])

    localStorage.setItem(key, storage_new)
}
