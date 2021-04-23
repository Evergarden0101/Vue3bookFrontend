import { createRouter, createWebHashHistory } from "vue-router";
import Community from "../components/community/community.vue"
import InCircle from "../components/community/InCircle.vue"
import Player from '../components/Record/Player'


const routes = [
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: "/community",
    name: "Community",
    component: Community,
  },
  {
    path: "/incircle",
    name: "inCircle",
    component: InCircle,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
