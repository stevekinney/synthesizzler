import { writable } from 'svelte/store';

const store = writable<Note[]>([]);

const add = (note: Note) => {
  store.update((notes) => {
    if (notes.includes(note)) return notes;
    return [...notes, note];
  });
};

const remove = (note: Note) => {
  store.update((notes) => {
    const index = notes.indexOf(note);
    if (index === -1) return notes;
    return [...notes.slice(0, index), ...notes.slice(index + 1)];
  });
};

const clear = () => {
  store.set([]);
};

export const currentNotes = {
  subscribe: store.subscribe,
  add,
  remove,
  clear,
};

export type CurrentNotes = typeof currentNotes;
