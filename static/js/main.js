// import Vue from 'vue'
// import App from './App.vue'

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

new Vue({
  el: '#app',
  data: {
    products: [],
    filteredProducts: [],
    basketItems: [],
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    imgProduct: 'static/image/logo.jpeg',
    imgBasketProduct: 'static/image/logo.jpeg',
    isVisibleCart: false
  },
  methods: {
    async getJson(url) {
      try {
        let response = await fetch(url);
        return await response.json(); // parses JSON response into native JavaScript objects
      } catch (err) {
        console.log(err);
      }
    },

    filterProducts (searchLine){
      let regexp = new RegExp(searchLine, 'i');
      this.filteredProducts =  this.products.filter(el => regexp.test(el.product_name));
    },

    addProduct(item){
      let exist = this.basketItems.find(el => el.id_product === item.id_product);
      if (exist){
        exist.quantity ++;
      } else {
        this.basketItems.push(Object.assign({quantity: 1}, item));
      }
    },

    removeProduct(item){
      if (item.quantity > 1){
        item.quantity--;
      } else {
        this.basketItems.splice(this.basketItems.indexOf(item), 1)
      }
    }

  },

  mounted() {
    this.getJson(API_URL.concat(this.catalogUrl))
      .then(data => {
        this.products = data;
        this.filteredProducts = this.products;
      });

    this.getJson(API_URL.concat(this.basketUrl))
      .then(data => {
        this.basketItems = data.contents;
      });
  },

  // render: h => h(App)

});
