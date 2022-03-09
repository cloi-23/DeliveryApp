<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders Table</h2>
  <div>
  <table>
  <tr>
    <th>Date</th>
    <th>Product ID</th>
    <th>Unit</th>
    <th>Unit Price</th>
    <th>Total</th>
    <th>Status</th>
    <th>Driver</th>
  </tr>
  <tr v-for="order in orders">
    <th>{{new Date().toLocaleDateString()}}</th>
    <th>{{ order.productId }}</th>
    <th>{{ order.quantity }}</th>
    <th>{{ order.price }}</th>
    <th>{{order.price * order.quantity }}</th>
    <th>{{ order.status }}</th>
    <th> <select>
    <option v-for="driver in drivers" value="driver.name">{{ driver.name }}</option>
    </select>
    <button @click="toDelivery">send</button></th>
  </tr>
  </table>
  </div>
</div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { ref} from 'vue'
import { orderDto } from '../../dto/orderDto';
import { driverDto } from '../../dto/driverDto';

const orders = ref<orderDto[]|null>(null)
const getOrders = async() => {
  try {
    const res = await axios.get('http://localhost:3000/order')
    orders.value = res.data    
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

const toDelivery = () => {

}

</script>