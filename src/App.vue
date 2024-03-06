<script setup>
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { Dark, Notify } from 'quasar';
import { nanoid } from 'nanoid'

import NoteForm from './components/NoteForm.vue';
import NoteItem from './components/NoteItem.vue';

const notesList = ref([]);
const drawerLeft = ref(false);

const state = useStorage('notes', notesList)

const searchInput = ref("");

const searchResult = computed(() => {
  return notesList.value.filter((note) => {
    return (
      note.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
    );
  });
});


const darkQuery = '(prefers-color-scheme: dark)';
const queryList = window.matchMedia(darkQuery);
Dark.set(queryList.matches);
queryList.addEventListener('change', (event) => {
  Dark.set(event.matches);
});

function toggleDarkMode() {
  Dark.toggle();
};

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
  <div class="">
    <q-layout view="hHh lpR fFf">

      <q-header reveal elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat icon="menu" @click="drawerLeft = !drawerLeft" />
          <q-toolbar-title>
            <q-breadcrumbs active-color="white" style="font-size: 16px">
              <q-breadcrumbs-el label="Home" icon="home" to="/" />
              <q-breadcrumbs-el label="About" icon="info" to="/about" />
            </q-breadcrumbs>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerLeft" :width="200" :breakpoint="700" side="left" bordered>
        <q-scroll-area class="fit">
          <q-list padding class="menu-list" :class="Dark.isActive ? 'text-white' : 'text-dark'">
            <q-item exact clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item exact clickable v-ripple to="/about">
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>

              <q-item-section>
                About
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="toggleDarkMode">
              <q-item-section avatar>
                <q-icon name="dark_mode" />
              </q-item-section>

              <q-item-section>
                Toggle Dark Mode
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <h1>Note List</h1>
        <NoteForm @note-added="addNote" />
        <q-input v-model="searchInput" filled type="search" hint="Search" class="q-my-lg">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div v-if="notesList.length > 0">
          <NoteItem v-for="note in searchResult" :key="note.id" :title="note.title" :content="note.content" :id="note.id"
            :dateAdded="note.date_added" @item-deleted="deleteNote(note.id)" @item-edited="editNote(note.id, $event)" />
        </div>
        <div v-else>
          <p>No Notes Found, Click on the plus (+) sign to add a new note</p>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
