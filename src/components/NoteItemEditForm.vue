<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  title: { required: true, type: String },
  content: { required: true, type: String },
});

const emit = defineEmits(['item-edited', 'edit-cancelled']);

const newNote = ref({
  title: "",
  content: ""
});

onMounted(() => {
  newNote.value.title = props.title
  newNote.value.content = props.content
})

function onSubmit() {
  emit('item-edited', newNote.value)
};

function onCancel() {
  emit('edit-cancelled')
}
</script>

<template>
  <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Edit Note</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="onCancel" />
    </q-card-section>


    <q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-input filled v-model.laxy.trim="newNote.title" label="Note Title" required lazy-rules
          :rules="[val => val && val.length > 0 || 'Note Title is required']" />

        <q-input filled v-model.laxy.trim="newNote.content" type="textarea" required label="Note Content" lazy-rules
          :rules="[val => val && val.length > 0 || 'Note Content is required']" />
        <q-separator />
        <div class="q-pa-sm q-mt-md">
          <q-btn label="Edit Note" type="submit" color="primary" />
          <q-btn label="Cancel" @click="onCancel" class="bg-grey-8 text-white q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
