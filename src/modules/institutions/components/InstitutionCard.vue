<template>
  <el-card class="institution-card" shadow="hover" @click="selectInstitution">
    <div class="card-content">
      <el-avatar class="institution-logo">
        {{ institution.display_name.charAt(0) }}
      </el-avatar>
      <div class="institution-info">
        <h3>{{ institution.display_name }}</h3>
        <p class="text-sm text-gray-500">
          {{ institution.type }}
        </p>
        <el-tag
          :type="institution.status === 'healthy' ? 'success' : 'warning'"
          size="small"
        >
          {{ institution.status }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Institution } from "@/types/belvo"; // Asegúrate de que la ruta sea correcta
import { ElCard, ElTag } from "element-plus";

const props = defineProps<{
  institution: Institution;
}>();

const emit = defineEmits(["select"]);

/**
 * Emite un evento cuando la tarjeta de la institución es seleccionada.
 */
const selectInstitution = () => {
  emit("select", props.institution.id);
};
</script>

<style scoped>
.institution-card {
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

.institution-card:hover {
  transform: translateY(-3px);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.institution-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 15px;
  border-radius: 4px;
}

.institution-info {
  flex-grow: 1;
}

h3 {
  margin: 0 0 5px 0;
  font-size: 1.1em;
}

p {
  margin: 0;
  line-height: 1.3;
}
</style>
