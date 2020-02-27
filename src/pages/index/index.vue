<template>
  <card :text="motto"></card>
</template>

<script>
import card from "@/components/card";
export default {
  data() {
    return {
      motto: 12345
    };
  },

  components: {
    card
  },

  methods: {},

  created() {
    this.$http
      .get(url)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {});
  }
};
</script>

<style scoped></style>
