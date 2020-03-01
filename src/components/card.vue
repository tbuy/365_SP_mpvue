<template>
  <div class="card">
    <div class="card-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  height: 100px;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.card-item {
  box-shadow: 2px 2px 5px #f5f5f5;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  padding: 8px 15px;
}
</style>
