<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Product Name</th>
    <th>Unit</th>
    <th>Status</th>
  </tr>
  <tr v-for="order in orders">
    <td>{{ order.date }}</td>
    <td><nuxt-link :to = "{ name: 'orders-userId',params: {userId: order.userId} }">{{ order.customerName }}</nuxt-link></td>
    <td>{{ order.productName }}</td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.status }}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { orderDto } from '../../dto/orderDto';

let orders = ref<orderDto>(null)
const getOrders = async() => {
  try {
    const orderRes = await axios.get(`http://localhost:3000/order`)
    orders.value = orderRes.data  
  } catch (error) {
    console.log(error);
  }
}
getOrders()



</script>