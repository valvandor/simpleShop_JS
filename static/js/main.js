
new Vue({
  el: '#app',
  data: {
    pathToImgProd: 'image/products/'
  },
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
    async delJson(url){
      try {
        const result = await fetch(url, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          },
        });
        return await result.json();
      } catch (error) {
        this.$refs.error.text = error;
      }
    },

  },

});
