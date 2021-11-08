<template lang="">
  <div class="product-item">
    <h3>{{ item.product_name }}</h3>
    <p>Цена: {{ item.price }}&nbspруб </p>
    <img class="product__image" :src="img" alt="product_image">
    <button class="buy-btn" @click="$root.$refs.basket.addProduct(item)">Купить</button>
  </div>
</template>
<script>
export default {
  name: 'product',
  props: {
    img: String, 
    item: {
      type: Object,
      required: true
    } 
  },
}
</script>
<style lang="">
  
</style>