<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Date </th>
<<<<<<< HEAD
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
=======
    <th>User ID</th>
    <th>Product ID</th>
    <th>Unit</th>
  </tr>
  <tr v-for="order in orders">
    <th>{{ order.date }}</th>
    <th>{{ order.userId }}</th>
    <th>{{ order.productId }}</th>
    <th>{{ order.quantity }}</th>
>>>>>>> e4623418d3a38cfe6db2614d2ade30e1fce0fe29
  </tr>
  </table>
  </div>
</div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { orderDto } from '../../dto/orderDto';
<<<<<<< HEAD
=======
import { driverDto } from '../../dto/driverDto';
import { customerDto } from '../../dto/customerDto';
>>>>>>> e4623418d3a38cfe6db2614d2ade30e1fce0fe29

let orders = ref<orderDto>(null)
const getOrders = async() => {
  try {
<<<<<<< HEAD
    const orderRes = await axios.get(`http://localhost:3000/order`)
=======
    const orderRes = await axios.get('http://localhost:3000/order')
>>>>>>> e4623418d3a38cfe6db2614d2ade30e1fce0fe29
    orders.value = orderRes.data  
  } catch (error) {
    console.log(error);
  }
}
getOrders()

<<<<<<< HEAD
=======
const drivers = ref<driverDto[]|null>(null)
const getDrivers = async() => {
  try {
    const res = await axios.get('http://localhost:3000/driver')
    drivers.value = res.data  
  } catch (error) {
    console.log(error);
  }
}
getDrivers()
>>>>>>> e4623418d3a38cfe6db2614d2ade30e1fce0fe29

</script>