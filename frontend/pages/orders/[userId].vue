<template>
<div>
  <button @click="routeBack">Back</button>
  <div>
  <h2>Order by customer</h2>
  <div>
  <button @click="data">send</button> to driver
  <select v-model="selectedDriver">
    <option v-for="driver in drivers" :value="driver.name" >{{driver.name}}</option>
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
  <strong v-if="total">Total {{ total }}</strong>
  </table>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()

onBeforeUnmount(() => {
location.reload()
})

const routeBack = () => {
  router.push('/orders')
}

const selectedDriver = ref('')
const orderList = []
const { data: customer } = await axios.get(`http://localhost:3000/customer/${route.params.userId}`)
const { data: orders } = await axios.get(`http://localhost:3000/order/customer/${route.params.userId}`)
const { data: drivers } = await axios.get('http://localhost:3000/driver')

  const total = (orders.map(x=>x.price).reduce((x,y) => x+y, 0))
  for (let order in orders) {
    order = {
      orderId: orders[order]['_id'],
      total: orders[order].price,
      customerAddr: customer.address,
    }
    orderList.push(order)
  }
console.log(orders);
  const forDelivery = async() => await axios.post('http://localhost:3000/delivery', orderList)
  const forStatus = async() => await axios.patch('http://localhost:3000/order/status', {
   status: 'shipping'
 }) 

  const data = () => {
  const driver = drivers.filter(x => x.name === selectedDriver.value); 
    const other = { 
      userId: route.params.userId,
      driverName: driver[0].name,
      driverContact: driver[0].contact,
      customerName: customer.name,
    }
    for (let order in orderList) {
      Object.assign(orderList[order], other)
    }
  forDelivery()
  forStatus()
  routeBack()
}
</script>