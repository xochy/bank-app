/**
 * Rutas para el módulo de Cuentas.
 */
const accountRoutes = [
  {
    path: "/accounts",
    name: "Accounts",
    component: () => import("../views/AccountsView.vue"),
    meta: {
      title: "Cuentas Bancarias",
    },
  },
];

export default accountRoutes;
