import { RouteRecordRaw } from "vue-router";

/**
 * Rutas para el módulo de Instituciones.
 */
const institutionRoutes: RouteRecordRaw[] = [
  {
    path: "/institutions",
    name: "Institutions",
    component: () => import("../views/InstitutionsView.vue"),
    meta: {
      title: "Instituciones Bancarias",
    },
  },
];

export default institutionRoutes;
