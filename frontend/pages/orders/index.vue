<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>User ID</th>
    <th>Product ID</th>
    <th>Unit</th>
  </tr>
  <tr v-for="order in orders">
    <th>{{ order.date }}</th>
    <th>{{ order.userId }}</th>
    <th>{{ order.productId }}</th>
    <th>{{ order.quantity }}</th>
  </tr>
  </table>
  </div>
</div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { orderDto } from '../../dto/orderDto';
import { driverDto } from '../../dto/driverDto';
import { customerDto } from '../../dto/customerDto';

let orders = ref<orderDto>(null)
const getOrders = async() => {
  try {
    const orderRes = await axios.get('http://localhost:3000/order')
    orders.value = orderRes.data  
  } catch (error) {
    console.log(error);
  }
}
getOrders()

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

</script>