<template lang="">
  <div class="cart-items">
    <img class="product-cart__img" :src="imgProduct" alt="Some image">
    <div class="product-cart__desc">
        <p class="product-title">{{ item.product_name }}</p>
        <p class="product-quantity">Количество:&nbsp{{ item.quantity }}</p>
        <p class="product-single-price">{{ item.price }} за шт.</p>
    </div>
    <div class="aside-cart">
        <p class="product-price">{{ item.quantity * item.price }}</p>
        <button class="del-btn" @click='removeProductClicked'>&times;</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'basket-item',
  props: {
    imgProduct: String, 
    item: Object, 
  },
  
  methods: {
    removeProductClicked(){
      this.$root.$refs.basket.removeProduct(this.item);
    }
  }
}
</script>
<style lang="">
  
</style>