'use strict';

Vue.component('search', {
  data () {
    return {
      userSearch: ''
    }
  },
  template: `
              <form action="#" class="search-form"  @submit.prevent='$parent.filterProducts(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <img src="static/image/search.svg" class="img-search"></img>
                </button>
              </form>
            `
});