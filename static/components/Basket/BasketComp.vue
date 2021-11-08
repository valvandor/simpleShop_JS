<template lang="">
  <div class="cart">
    <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
    <div class="cart-block" v-show='isVisibleCart'>
      <p v-if='basketItems.length == 0'>Корзина&nbspпуста</p>
      <basket-item
          v-for="item of basketItems" 
          :img-product="item.imgPath" 
          :key="item.id_product"
          :item="item">
      </basket-item>
    </div>
  </div>
</template>
<script>
import BasketItemVue from './BasketItem.vue';

export default {
  name: 'basket',
  data(){
    return {
        cartUrl: '/api/cart',
        basketItems: [],
        imgProduct: 'image/logo.jpeg',
        isVisibleCart: false
    }
  },
  components: {
    'basketItem': BasketItemVue
  },

  mounted(){
      this.$parent.getJson(this.cartUrl)
        .then(data => {
          for (let item of data.contents){
            // forming paths of images for products
            item.imgPath = this.$root.pathToImgProd + item.id_product + '.jpeg';

            this.basketItems.push(item);
          }
        });
  },
  methods: {
    addProduct(item){
      let find = this.basketItems.find(el => el.id_product === item.id_product);
      if(find){
        this.$parent.putJson(this.cartUrl + '/'+ find.id_product, {quantity: 1})
          .then(data => {
            if(data.result){
              find.quantity++
            }
          })
      } else {
        const prod = Object.assign({quantity: 1}, item);
        this.$parent.postJson(this.cartUrl, prod)
          .then(data => {
            if(data.result){
              this.basketItems.push(prod)
            }
          });
      }
    },
    removeProduct(item){
      let find = this.basketItems.find(el => el.id_product === item.id_product);
      if (item.quantity > 1){
        this.$parent.putJson(this.cartUrl + '/'+ find.id_product, {quantity: -1})
          .then(data => {
            if(data.result ){
              item.quantity--;
            }
          });
      } else { // (item.quantity == 1)
        this.$parent.delJson(this.cartUrl + '/'+ find.id_product)
          .then( data => {
            if ( data.result ) {
              this.basketItems.splice(this.basketItems.indexOf(item), 1);
            }
          });
      }
    }
  }
}
</script>
<style lang="">
  
</style>