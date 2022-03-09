<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Product ID</th>
    <th>Unit</th>
    <th>Unit Price</th>
    <th>Total</th>
    <th>Status</th>
  </tr>
  <tr v-for="data in orders">
    <th>{{data.productId}}</th>
    <th>{{}}</th>
    <th>Unit Price</th>
    <th>Total</th>
    <th>Status</th>
  </tr>
  </table>
  </div>
</div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

const orders:String = ref<Object>('')

const get = async() => {
  try {
    const res = await axios.get('http://localhost:3000/order')
    orders.value = res.data    
  } catch (error) {
    console.log(error);
  }
}
get()

</script>