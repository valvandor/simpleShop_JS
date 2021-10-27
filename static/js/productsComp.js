'use strict';

Vue.component('products', {
  props: ['products', 'imgDefault'],
  template: `
            <div class="products">
                  <product v-for="item in products" 
                          :key="item.id_product"
                          :item="item"
                          :img="imgDefault">
                  </product>
            </div>
            `
});

Vue.component('product', {
  props: ['item', 'img'],
  template: `
            <div class="product-item">
              <h3>{{ item.product_name }}</h3>
              <p>Цена: {{ item.price }}&nbspруб </p>
              <img class="product__image" :src="img" alt="product_image">
              <button class="buy-btn" @click="$parent.$emit('add-product', item)">Купить</button>
            </div>
            `
});