<script setup>
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { Dark, Notify } from 'quasar';
import { nanoid } from 'nanoid'

import NoteForm from '../components/NoteForm.vue';
import NoteItem from '../components/NoteItem.vue';

const notesList = ref([]);
const noteTitle = ref("");
const noteContent = ref("");
const noteCard = ref(false);


const state = useStorage('notes', notesList)

const searchInput = ref("");

const searchResult = computed(() => {
  return notesList.value.filter((note) => {
    return (
      note.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
    );
  });
});


function addNote() {
  notesList.value.push({
    id: nanoid(),
    title: noteTitle.value,
    content: noteContent.value,
    date_added: Date.now(),
  });

  noteTitle.value = "";
  noteContent.value = "";
  noteCard.value = false;

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

function onReset() {
  noteTitle.value = null
  noteContent.value = null
};
</script>

<template>
  <q-page class="flex content-center items-center column">
    <!-- <NoteForm @note-added="addNote" /> -->
    <q-input v-model="searchInput" filled type="search" hint="Search by Title" class="search-input q-my-sm">
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

    <q-dialog v-model="noteCard" :class="Dark.isActive ? 'text-white' : 'text-dark'">
      <q-card flat bordered class="my-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Note</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="noteCard = false" />
        </q-card-section>


        <q-card-section>
          <q-form @submit.prevent="addNote" @reset="onReset">
            <q-input filled v-model.laxy.trim="noteTitle" label="Note Title" required lazy-rules
              :rules="[val => val && val.length > 0 || 'Note Title is required']" />

            <q-input filled v-model.laxy.trim="noteContent" type="textarea" required label="Note Content" lazy-rules
              :rules="[val => val && val.length > 0 || 'Note Content is required']" />
            <q-separator />
            <div class="q-pa-sm q-mt-md">
              <q-btn label="Add Note" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="noteCard = true">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<style lang="sass" scoped>
.search-input
  width: 100%
  max-width: 300px
</style>
