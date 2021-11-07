<template lang="">
  <div class="products">
    <product v-for="product in filteredProducts" 
            :key="product.id_product"
            :item="product"
            :img="product.imgPath">
    </product>
  </div>
</template>
<script>
import ProductItemVue from './ProductItem.vue';

export default {
  name: 'products',
  data(){
    return {
        catalogUrl: '/api/products',
        filteredProducts: [],
        products: [],
    }
  },
  components: {
    'product': ProductItemVue
  },
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
}
</script>
<style lang="">
  
</style>