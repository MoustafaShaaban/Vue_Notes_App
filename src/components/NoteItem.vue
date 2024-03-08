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

function confirm() {
    Dialog.create({
        dark: true,
        title: 'Confirm',
        color: 'primary',
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

                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{ props.title }}</div>
                            <div class="text-subtitle2">{{ date.formatDate(props.dateAdded, 'DD MMMM YYYY') }}</div>
                        </div>

                        <!--<div class="col-auto">
				<q-btn color="grey-7" round flat icon="more_vert">
				  <q-menu cover auto-close>
					<q-list :class="Dark.isActive ? 'text-white' : 'text-dark'">
					  <q-item clickable>
						<q-item-section>Remove Card</q-item-section>
					  </q-item>
					  <q-item clickable>
						<q-item-section>Send Feedback</q-item-section>
					  </q-item>
					  <q-item clickable>
						<q-item-section>Share</q-item-section>
					  </q-item>
					</q-list>
				  </q-menu>
				</q-btn>
			  </div>-->
                    </div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section horizontal>
                    <q-card-section>
                        {{ props.content }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <!-- <router-link :to="{ name: 'edit-note', params: { id: id } }">
              <q-btn flat color="primary">
                Edit
              </q-btn>
            </router-link> -->
                    <q-btn color="info" flat @click="isEditing = true">Edit</q-btn>
                    <q-btn color="negative" flat @click="confirm">Delete</q-btn>
                </q-card-actions>
            </q-card>
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
