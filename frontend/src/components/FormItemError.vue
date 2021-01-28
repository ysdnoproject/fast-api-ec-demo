<template>
  <div class="el-form-item__error">
    {{ $t(error) }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormItemError extends Vue {
  @Prop({ type: String, required: true }) readonly error!: string;
}
</script>
