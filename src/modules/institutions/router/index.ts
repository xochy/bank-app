/**
 * Rutas para el módulo de Instituciones.
 */
const institutionRoutes = [
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
