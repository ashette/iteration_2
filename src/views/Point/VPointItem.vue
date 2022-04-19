<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <div class="admin-content__container d-inline-flex flex-column elevation-5">
      <PointItem :point="point" />
    </div>
  </div>
</template>

<script>
import PointItem from "@/components/Point/PointItem";

export default {
  props: {
    point: Object,
  },
  components: { PointItem },
};
</script>

