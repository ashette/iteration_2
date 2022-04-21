<template>
  <Error :errorCode="404" />
</template>
<script>
import Error from "@/components/Error.vue";
export default {
  components: { Error },
};
</script>