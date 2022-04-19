<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <div class="admin-content__container d-inline-flex flex-column elevation-5">
      <CategoryForm :category="category" />
    </div>
  </div>
</template>

<script>
import CategoryForm from "@/components/Category/CategoryForm";

export default {
  props: {
    category: Object,
  },
  components: { CategoryForm },
};
</script>

