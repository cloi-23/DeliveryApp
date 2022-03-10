<template>
  <div >
        <h1>Product</h1>
        <nuxt-link :to="{name:'product-add'}">Add</nuxt-link>
    <table>
        <tr>
            <th>#</th>
             <th>Image</th>
            <th>Name</th>
            <th>Establishment</th>
            <th>Unit Price</th>
        </tr>
        <tr v-for="(product,index) in productList" :key="index">
            <td>{{index+1}}</td>
              <td><img :src='product.image' :alt="product.name" width="150" height="100"> </td>
            <td>{{product.name}}</td>
             <td>{{product.establishment}}</td>
              <td>{{product.price}}</td>

        </tr>
    </table>
  </div>
</template>

<script  setup>
import axios from 'axios'
const {data: productList} = await axios.get(`http://localhost:3000/product`)

</script>

<style scoped>
</style>