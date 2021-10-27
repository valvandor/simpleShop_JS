'use strict';

Vue.component('basket', {
  props: ['basketItems', 'visibility', 'imgProduct'],
  template: `
              <div class="cart-block" v-show='visibility'>
                <p v-if='basketItems.length == 0'>Корзина&nbspпуста</p>
                <basket-item
                    v-for="item of basketItems" 
                    :img-product="imgProduct" 
                    :key="item.id_product"
                    :item="item">
                </basket-item>
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
                    <button class="del-btn" @click="$parent.$emit('remove-product', item)">&times;</button>
                </div>
              </div>
            `
})