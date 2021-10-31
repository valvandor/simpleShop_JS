'use strict';

Vue.component('basket', {
  data(){
    return {
        cartUrl: '/api/cart',
        basketItems: [],
        imgProduct: 'image/logo.jpeg',
        isVisibleCart: false
    }
  },

  mounted(){
      this.$parent.getJson(this.cartUrl)
        .then(data => {
          this.basketItems = data.contents ? data.contents : [];
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
        this.$parent.delJson(this.cartUrl + '/'+ find.id_product, {id_product: item.id_product})
          .then( data => {
            if ( data.result ) {
              this.basketItems.splice(this.basketItems.indexOf(item), 1);
            }
          });
      }
    }
  },
  template: `
              <div class="cart">
                <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
                <div class="cart-block" v-show='isVisibleCart'>
                  <p v-if='basketItems.length == 0'>Корзина&nbspпуста</p>
                  <basket-item
                      v-for="item of basketItems" 
                      :img-product="imgProduct" 
                      :key="item.id_product"
                      :item="item">
                  </basket-item>
                </div>
              </div>

            `
});

Vue.component('basket-item', {
  props: ['imgProduct', 'item', ],
  template: ` 
              <div class="cart-items">
                <img class="product-cart__img" :src="imgProduct" alt="Some image">
                <div class="product-cart__desc">
                    <p class="product-title">{{ item.product_name }}</p>
                    <p class="product-quantity">Количество:&nbsp{{ item.quantity }}</p>
                    <p class="product-single-price">{{ item.price }} за шт.</p>
                </div>
                <div class="aside-cart">
                    <p class="product-price">{{ item.quantity * item.price }}</p>
                    <button class="del-btn" @click="$parent.removeProduct(item)">&times;</button>
                </div>
              </div>
            `
})