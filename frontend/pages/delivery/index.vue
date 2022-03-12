<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Delivery Table</h2>
  <div>
  <table>
  <tr>
    <th>Driver Name </th>
    <th>Customer Name</th>
    <th>Item in total</th>
    <th>Status</th>
  </tr>
  <tr v-for="(delivery,index) in deliveries" :key="index" >
    <td>{{ delivery.driverName }}</td>
    <td>{{ delivery.customerName }}</td>    
    <td>{{ delivery.total }}</td>
    <td>{{delivery.status}}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'

const { data : deliveries } = await axios.get(`http://localhost:3000/delivery`)

</script>