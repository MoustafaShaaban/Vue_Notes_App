<script setup>
import { ref } from "vue";
import { Dialog, date, Dark } from "quasar";

import NoteItemEditForm from "./NoteItemEditForm.vue";

const props = defineProps({
    title: { required: true, type: String },
    content: { required: true, type: String },
    id: { required: true, type: String },
    dateAdded: { required: true, }
});

function confirm () {
      Dialog.create({
        dark: true,
        title: 'Confirm',
        color:  'primary',
        message: 'Are you sure you want to delete this note?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        deleteNote()
      })
    }

const emit = defineEmits(['item-deleted', 'item-edited']);

function deleteNote() {
    emit('item-deleted');
};

const isEditing = ref(false);

function toggleEditForm() {
    isEditing.value = true;
};

function itemEdited(newNote) {
    emit('item-edited', newNote);
    isEditing.value = false;
};

function editCancelled() {
    isEditing.value = false;
};
</script>

<template>
    <div v-if="!isEditing">
        <div :class="Dark.isActive ? 'text-white' : 'text-dark'">
            <q-card class="my-card q-mt-md" flat bordered>
                <q-item>
                    <q-item-section>
                        <div class="text-h5">{{ props.title }}</div>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-card-section horizontal>
                    <q-card-section>
                        {{ props.content }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions vertical>
                    <q-btn size="sm" flat icon="event">
                        Added At: {{ date.formatDate(props.dateAdded, 'DD MMMM YYYY') }}
                    </q-btn>
                </q-card-actions>

                <q-separator />
                <q-card-actions>
                    <!-- <router-link :to="{ name: 'edit-note', params: { id: id } }">
              <q-btn flat color="primary">
                Edit
              </q-btn>
            </router-link> -->
                    <q-btn color="info" flat @click="isEditing = true">Edit</q-btn>
                    <!-- <q-btn color="info" flat @click="confirm(id)">Delete</q-btn> -->
                    <q-btn color="negative" flat @click="confirm">Delete</q-btn>
                </q-card-actions>
            </q-card>
            <!-- <h3>{{ props.title }}</h3>
            <p>{{ props.content }}</p>
            <button @click="toggleEditForm">Edit</button>
            <button @click="deleteNote">Delete</button> -->
        </div>
    </div>
    <NoteItemEditForm v-else :id="id" :title="props.title" :content="props.content" :isEditing="isEditing"
        @item-edited="itemEdited" @edit-cancelled="editCancelled" />
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  width: 300px
</style>