'use strict';

const product = {
  props: {
    img: String, 
    item: {
      type: Object,
      required: true
    } 
  },
  
  template: `
            <div class="product-item">
              <h3>{{ item.product_name }}</h3>
              <p>Цена: {{ item.price }}&nbspруб </p>
              <img class="product__image" :src="img" alt="product_image">
              <button class="buy-btn" @click="$root.$refs.basket.addProduct(item)">Купить</button>
            </div>
            `
};

const products = {
  data(){
    return {
        catalogUrl: '/api/products',
        filteredProducts: [],
        products: [],
    }
  },

  components: {product},

  mounted(){
    this.$parent.getJson(this.catalogUrl)
      .then(data => {
        for (let item of data){
          // forming paths of images for products
          item.imgPath = this.$root.pathToImgProd + item.id_product + '.jpeg';

          this.products.push(item);
          this.filteredProducts.push(item);
        }
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
                          :img="product.imgPath">
                  </product>
            </div>
            `
};

