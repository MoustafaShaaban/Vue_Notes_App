<script setup>
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore();

</script>

<template>
  <q-page class="flex flex-center column">

    <div v-if="notesStore.tags.length > 0">
      <q-card v-for="tag in notesStore.tags" :key="tag.id" class="tag-card q-mt-md" flat bordered>
        <q-card-section>
            <div class="text-h6">{{ tag.name }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <p>No tags Found, Click on the plus (+) sign to add a new note</p>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" :to="{ name: 'add-tag' }">
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<style lang="sass" scoped>
.tag-card
  width: 350px
</style>
