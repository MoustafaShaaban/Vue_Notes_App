import { ref, computed, readonly } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: useStorage("notesStorage", []),
    tags: useStorage("tagsStorage", []),
    searchQuery: "",
  }),
  getters: {
    getNoteById: (state) => {
      return (id) => state.notes.find((note) => note.id === id);
    },
    getTagById: (state) => {
      return (id) => state.tags.find((tag) => tag.id === id);
    },
    // Source: https://stackoverflow.com/a/53028615
    getNotesByTag: (state) => {
      return (id) =>
        state.notes.filter((note) => {
          return note.tags.find((tag) => tag.id === id);
        });

      // const note = this.notes.filter((note) => {
      //     console.log(note.tags)
      //     return note.tags.find((tag) => tag.id === id)
      // })
      // return note
    },
  },
  actions: {
    addNote(note) {
      this.notes.push(note);
    },

    updateNote(id, newNote) {
      const noteToEdit = this.notes.find((note) => note.id === id);
      noteToEdit.title = newNote.title;
      noteToEdit.content = newNote.content;

      console.log(noteToEdit.title);
    },

    deleteNote(id) {
      const noteToDelete = this.notes.findIndex((note) => note.id === id);
      this.notes.splice(noteToDelete);
    },

    addTag(tag) {
      this.tags.push(tag);
    },

    updateTag(id, newTag) {
      const tagToEdit = this.tags.find((tag) => tag.id === id);
      tagToEdit.name = newTag.name;

      console.log(tagToEdit.name);
    },

    deleteTag(id) {
      const note = this.notes.filter((note) => {
        note.tags.find((tag) => tag.id === id);

        note.tags = note.tags.filter((tag) => {
          return tag.id !== id;
        });

        this.tags = this.tags.filter((tag) => {
          return tag.id !== id;
        });
      });
    },
  },
});
