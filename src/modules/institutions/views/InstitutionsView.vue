<template>
  <div class="institutions-container p-4">
    <h1 class="text-2xl font-bold mb-6">Instituciones Bancarias</h1>

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <p class="ml-2">Cargando instituciones...</p>
    </div>

    <div v-else-if="isError" class="text-center text-red-500">
      <p>Error al cargar las instituciones: {{ error?.message }}</p>
      <!-- <el-button @click="refetch" type="primary" class="mt-4">Reintentar</el-button> -->
    </div>

    <div
      v-else-if="institutions && institutions.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <InstitutionCard
        v-for="institution in institutions"
        :key="institution.id"
        :institution="institution"
        @select="handleSelectInstitution"
      />
    </div>

    <div v-else class="text-center text-gray-600">
      <p>No se encontraron instituciones.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useInstitutions } from "../composables/useInstitutions";
import InstitutionCard from "../components/InstitutionCard.vue";
import { ElButton } from "element-plus";

const router = useRouter();
const { institutions, isLoading, isError, error } = useInstitutions();

/**
 * Maneja la selección de una institución y redirige a la vista de cuentas.
 * @param institutionId El ID de la institución seleccionada.
 */
const handleSelectInstitution = (institutionId: number) => {
  console.log("Institución seleccionada:", institutionId);
  // Aquí puedes guardar el ID de la institución en Pinia si es necesario para filtrar cuentas,
  // o simplemente redirigir. Para este ejemplo, solo redirigimos.
  router.push({ name: "Accounts" });
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios, pero Element Plus y Tailwind CSS manejan la mayoría */
.institutions-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
