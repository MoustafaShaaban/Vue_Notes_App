<script setup>
import { ref } from "vue";
import { Notify } from 'quasar';

const noteCard = ref(false);

const title = ref("");
const content = ref("");

const emit = defineEmits(['note-added'])
function onSubmit() {
  if (!title.value || !content.value) {
    Notify.create({
        message: 'Note Title and content are required',
        type: "negative",
        actions: [
            { icon: 'close', color: 'white', round: true, }
        ]
    })
    return;
  };

  const newTitle = title.value;
  const newContent = content.value;

  emit('note-added', newTitle, newContent);

  // Clear form fields
  title.value = '';
  content.value = '';

  noteCard.value = false;
};

function onReset() {
  title.value = null
  content.value = null
};
</script>

<template>
  <!-- <h3>Add new note</h3>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" placeholder="Enter title..." v-model.laxy.trim="title" />
      </div>
      <div class="form-control">
        <label for="content">Content</label
        >
        <input
          type="text"
          id="content"
          placeholder="Enter content..."
          v-model.laxy.trim="content"
        />
      </div>
      <button type="submit" class="btn">Add note</button>
    </form> -->



  <q-dialog v-model="noteCard">
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add Note</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>


      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <q-input filled v-model.laxy.trim="title" label="Note Title" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Note Title is required']" />

          <q-input filled v-model.laxy.trim="content" type="textarea" required label="Note Content" lazy-rules
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
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  width: 300px
</style>