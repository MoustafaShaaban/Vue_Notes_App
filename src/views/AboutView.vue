<template>
  <q-page class="flex flex-center" :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5">Vue 3 Composition API Notes App</div>
            <div class="text-subtitle2 q-my-md">by Moustafa Shaaban</div>
            Contact me on:
            <a :class="$q.dark.isActive ? 'text-white' : 'text-dark'" href="https://github.com/moustafashaaban/"
              target="_blank">Github</a>
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pt-none">
        <p class="q-my-md">A notes app built using</p>
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <a :class="$q.dark.isActive ? 'text-white' : 'text-dark'" href="https://vuejs.org/" target="_blank">Vue.js
              3</a>
          </q-item>
          <q-item clickable v-ripple>
            <a :class="$q.dark.isActive ? 'text-white' : 'text-dark'" href="https://vueuse.org/"
              target="_blank">VueUse</a>
          </q-item>
          <q-item clickable v-ripple>
            <a :class="$q.dark.isActive ? 'text-white' : 'text-dark'" href="https://quasar.dev/" target="_blank">Quasar
              Framework</a>
          </q-item>
          <q-item clickable v-ripple>
            <a :class="$q.dark.isActive ? 'text-white' : 'text-dark'" href="https://vue-multiselect.js.org/" target="_blank">Vue-Multiselect</a>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>