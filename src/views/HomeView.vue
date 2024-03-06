<script setup>
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { Dark, Notify } from 'quasar';
import { nanoid } from 'nanoid'

import NoteForm from '../components/NoteForm.vue';
import NoteItem from '../components/NoteItem.vue';

const notesList = ref([]);


const state = useStorage('notes', notesList)

const searchInput = ref("");

const searchResult = computed(() => {
    return notesList.value.filter((note) => {
        return (
            note.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
        );
    });
});


function addNote(noteTitle, noteContent) {
    notesList.value.push({
        id: nanoid(),
        title: noteTitle,
        content: noteContent,
        date_added: Date.now(),
    });

    Notify.create({
        message: 'Note Added Successfully',
        type: "positive",
        actions: [
            { icon: 'close', color: 'white', round: true, }
        ]
    })
};

function deleteNote(noteId) {
    const itemIndex = notesList.value.findIndex((item) => item.id === noteId);
    notesList.value.splice(itemIndex, 1);

    Notify.create({
        message: 'Note Deleted Successfully',
        type: "positive",
        actions: [
            { icon: 'close', color: 'white', round: true, }
        ]
    })
};

function editNote(noteId, newNote) {
    const noteToEdit = notesList.value.find((item) => item.id === noteId);
    noteToEdit.title = newNote.title;
    noteToEdit.content = newNote.content;

    Notify.create({
        message: 'Note Updated Successfully',
        type: "positive",
        actions: [
            { icon: 'close', color: 'white', round: true, }
        ]
    })
};
</script>

<template>
    <main>
        <h4>Notes List</h4>
        <NoteForm @note-added="addNote" />
        <q-input v-model="searchInput" filled type="search" hint="Search" class="q-my-lg">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-input>
        <div v-if="notesList.length > 0">
            <NoteItem v-for="note in searchResult" :key="note.id" :title="note.title" :content="note.content"
                :id="note.id" :dateAdded="note.date_added" @item-deleted="deleteNote(note.id)"
                @item-edited="editNote(note.id, $event)" />
        </div>
        <div v-else>
            <p>No Notes Found, Click on the plus (+) sign to add a new note</p>
        </div>
    </main>
</template>