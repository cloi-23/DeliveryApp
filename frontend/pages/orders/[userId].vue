<template>
<div>
  <button @click="$router.go(-1)">Back</button>
  <div>
  <h2>Order by customer</h2>
  <table>
  <tr>
    <th>Product Name </th>
    <th>Unit </th>
    <th>Unit Price</th>
    <th>Sub Total</th>
  </tr>
  <tr v-for="order in orders">
    <td>{{ order.productName }}</td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.price }}</td>
    <td>{{ order.quantity * order.price }}</td>
  </tr>
  </table>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const route = useRoute()

let orders = ref(null)
const getOrders = async() => {
  try {
    const orderRes = await axios.get(`http://localhost:3000/order/customer/${route.params.userId}`)
    orders.value = orderRes.data  
  } catch (error) {
    console.log(error);
  }
}
getOrders()

const drivers = ref('')
const getDrivers = async() => {
  try {
    const res = await axios.get('http://localhost:3000/driver')
    drivers.value = res.data  
  } catch (error) {
    console.log(error);
  }
}
getDrivers()

const removeOrder = async() => {
    await axios.delete(`http://localhost:3000/order/customer/${route.params.userId}`)
}
</script>