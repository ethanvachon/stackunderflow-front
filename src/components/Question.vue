<template>
  <div class="bg-white rounded shadow p-3 flex">
    <div class="rating">
      <i class="fas fa-sort-up"></i>
      <i class="fas fa-sort-down"></i>
    </div>
    {{question}}
  </div>
</template>
<script>
export default {
  props: ['question']
}
</script>

