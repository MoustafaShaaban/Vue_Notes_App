import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import NoteForm from "../components/NoteForm.vue";
import NoteDetail from "../components/NoteDetail.vue";
import NotesListByTag from "../components/NotesListByTag.vue";
import TagForm from "../components/TagForm.vue";
import TagList from "../components/TagList.vue";
import TagDetail from "../components/TagDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/add-note',
      name: 'add-note',
      component: NoteForm,
    },
    {
      path: '/note-detail/:id',
      name: 'note-detail',
      component: NoteDetail,
    },
    {
      path: '/notes-by-tag/:id',
      name: 'notes-by-tag',
      component: NotesListByTag,
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagList,
    },
    {
      path: '/add-tag',
      name: 'add-tag',
      component: TagForm,
    },
    {
      path: '/tag-detail/:id',
      name: 'tag-detail',
      component: TagDetail,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
