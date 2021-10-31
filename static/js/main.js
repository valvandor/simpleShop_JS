
new Vue({
  el: '#app',
  methods: {
    async getJson(url) {
      try {
        let response = await fetch(url);
        return await response.json(); // parses JSON response into native JavaScript objects
      } catch (err) {
          this.$refs.error.text = err;
      }
    },

    async postJson(url, data){
      try {
        const result = await fetch(url, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },

    async putJson(url, data){
        try {
        const result = await fetch(url, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },


    // addProduct(item){
    //   let exist = this.basketItems.find(el => el.id_product === item.id_product);
    //   if (exist){
    //     exist.quantity ++;
    //   } else {
    //     this.basketItems.push(Object.assign({quantity: 1}, item));
    //   }
    // },

    // removeProduct(item){
    //   if (item.quantity > 1){
    //     item.quantity--;
    //   } else {
    //     this.basketItems.splice(this.basketItems.indexOf(item), 1)
    //   }
    // }

  },

});
