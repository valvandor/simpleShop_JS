<template lang="">
  <form action="#" class="search-form"  @submit.prevent='$parent.$refs.products.filterProducts(userSearch)'>
    <input type="text" class="search-field" v-model="userSearch">
    <button type="submit" class="btn-search">
        <img src="image/search.svg" class="img-search"></img>
    </button>
  </form>
</template>
<script>
export default {
  data () {
    return {
      userSearch: ''
    }
  }
}
</script>
<style lang="">
  
</style>