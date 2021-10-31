'use strict';

Vue.component('products', {
  data(){
    return {
        catalogUrl: '/api/products',
        filteredProducts: [],
        products: [],
        imgDefault: 'image/logo.jpeg'
    }
  },

  mounted(){
    this.$parent.getJson(this.catalogUrl)
      .then(data => {
        this.products = data;
        this.filteredProducts = this.products;
      });
  },

  methods: {
    filterProducts(searchLine){
      if(searchLine != '\\'){
        let regexp = new RegExp(searchLine, 'i');
        this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
      }
    }
  },

  template: `
            <div class="products">
                  <product v-for="product in filteredProducts" 
                          :key="product.id_product"
                          :item="product"
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
              <button class="buy-btn" @click="$root.$refs.basket.addProduct(item)">Купить</button>
            </div>
            `
});