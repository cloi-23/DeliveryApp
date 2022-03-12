<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Delivery Details</h2>
  <div>
  <table>
  <tr>
    <th>Product Name </th>
    <th>Unit </th>
    <th>Price</th>
    <th>Sub Total</th>
    <th>Status</th>
  </tr>
  <!-- <tr v-for="(order,index) in eachDrivers" :key="index" >
    <td>{{ order.productName }}</td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.price }}</td>
    <td>{{ order.quantity * order.price }}</td>
    <td>{{ order.quantity * order.price }}</td>
  </tr> -->
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
const route = useRoute()
const { data : drivers } = await axios.get(`http://localhost:3000/driver/`)
const { data : deliveries } = await axios.get(`http://localhost:3000/delivery/`)
const { data : orders } = await axios.get(`http://localhost:3000/order/`)
const orderId = orders.map(x => x.order['_id'])
const eachDrivers =[]
const delivery = drivers.filter(x => x.name === 'driver1')
for (let id of orderId) {
 console.log(deliveries.map(x => x.driverName )); 
  
}


</script>