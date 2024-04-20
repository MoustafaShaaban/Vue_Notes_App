<script setup>
import { ref } from 'vue';
import { Dark } from 'quasar';
import { useNotesStore } from './stores/notes';

const drawerLeft = ref(false);
const darkQuery = '(prefers-color-scheme: dark)';
const queryList = window.matchMedia(darkQuery);
Dark.set(queryList.matches);
queryList.addEventListener('change', (event) => {
    Dark.set(event.matches);
});

function toggleDarkMode() {
  Dark.toggle();
};

const notesStore = useNotesStore();

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" :class="Dark.isActive ? 'text-white' : 'text-dark'">

      <q-header reveal elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat icon="menu" @click="drawerLeft = !drawerLeft" />
          <q-toolbar-title>
            <q-breadcrumbs active-color="white" style="font-size: 16px">
              <q-breadcrumbs-el label="Home" class="text-white" icon="home" to="/" />
              <q-breadcrumbs-el label="About" class="text-white" icon="info" to="/about" />
            </q-breadcrumbs>
          </q-toolbar-title>

          <q-input dark dense standout v-model="notesStore.searchQuery" type="search" hint="Search by Title or Content" class="q-my-xs">
          <template v-slot:append>
            <q-icon v-if="notesStore.searchQuery === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="notesStore.searchQuery = ''" />
          </template>
        </q-input>
        
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerLeft" :width="200" :breakpoint="700" side="left" behavior="desktop" bordered>
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

            <q-item exact clickable v-ripple to="/tags">
              <q-item-section avatar>
                <q-icon name="menu" />
              </q-item-section>

              <q-item-section>
                All Tags
              </q-item-section>
            </q-item>

            <q-item v-if="!Dark.isActive" clickable v-ripple @click="toggleDarkMode">
              <q-item-section avatar>
                <q-icon name="dark_mode" />
              </q-item-section>

              <q-item-section>
                Toggle Dark Mode
              </q-item-section>
            </q-item>

            <q-item v-else clickable v-ripple @click="toggleDarkMode">
              <q-item-section avatar>
                <q-icon name="light_mode" />
              </q-item-section>

              <q-item-section>
                Toggle Light Mode
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>