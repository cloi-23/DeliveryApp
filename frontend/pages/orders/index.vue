<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Product Name</th>
    <th>Unit</th>
  </tr>
  <tr v-for="(list,index) in orders" :key="index" >
    <td>{{ list.order.date }}</td>
    <td v-if="list.order.status === 'packaging'"><nuxt-link :to = "{ name: 'orders-userId',params: {userId: list.order.userId} }">{{ list.order.customerName }}</nuxt-link></td>
    <td v-else>{{ list.order.customerName }}</td>
    <td>{{ list.customer.address }}</td>    
    <td>{{ list.order.productName }}</td>
    <td>{{ list.order.quantity }}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'

const { data : orders } = await axios.get(`http://localhost:3000/order`)

</script>