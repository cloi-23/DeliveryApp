<template>
<div>
  <button @click="$router.go(-1)">Back</button>
  <div>
  <h2>Order by customer</h2>
  <div>
  <button @click="forDelivery">send</button> to
  <select >
    <option v-for="driver in drivers" value="driver.name">{{driver.name}}</option>
  </select>
  </div>
  <table>
  <tr>
    <th>Product Name </th>
    <th>Unit </th>
    <th>Sub Total</th>
  </tr>
  <tr v-for="order in orders">
    <td>{{ order.productName }}</td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.price }}</td>
  </tr>
  </table>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'

const route = useRoute()

const { data: customers } = await axios.get('http://localhost:3000/customer')
const { data: orders } = await axios.get(`http://localhost:3000/order/customer/${route.params.userId}`)
const { data: drivers } = await axios.get('http://localhost:3000/driver')
const total = orders.map(x=>x.price).reduce((x,y) => x+y)
const forDelivery = () => axios.post('http://localhost:3000/delivery',{
      userId: route.params.userId,
      driverId:'62283bfd9202d7d7c7117d63',
      total: total
  })

</script>