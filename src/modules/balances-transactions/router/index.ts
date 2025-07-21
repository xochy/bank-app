/**
 * Rutas para el módulo de Balances y Transacciones.
 */
const balancesTransactionsRoutes = [
  {
    path: "/balances-transactions",
    name: "BalancesTransactions",
    component: () => import("../views/BalancesTransactionsView.vue"),
    meta: {
      title: "Balances y Transacciones",
    },
  },
];

export default balancesTransactionsRoutes;
