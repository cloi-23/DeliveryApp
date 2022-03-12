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
    <td v-if="list.order.status === 'To ship'"><nuxt-link :to = "{ name: 'orders-userId',params: {userId: list.order.userId} }">{{ list.order.customerName }}</nuxt-link></td>
    <td v-else>{{ list.order.customerName }}</td>
    <td>{{ list.customer.address }}</td>    
    <td>{{ list.order.productName }}</td>
    <td>{{ list.order.quantity }}</td>
  </tr>
  </table>
  </div>
      <div  v-if="orders.length != 0">
    <span v-if="page != 1 ">
    <nuxt-link @click="prev" :to="{name:'orders',query:{page: page}}"> - </nuxt-link> 
    </span>
        {{page}} 
       <span  v-if="orders.length !=0 ">
       <nuxt-link @click="next" :to="{name:'orders',query:{page: page + 1}}"> + </nuxt-link>
  </span>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'

const limitPage = ref(10)
const route  = useRoute()
const page = ref(Number(route.query.page))
const prev =async ()=>{
page.value--
await load(limitPage.value,page.value)
}
const next = async ()=>{
page.value++
await load(limitPage.value,page.value)

}

const orders = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
    const res =  await axios.get(`http://localhost:3000/order?limit=${limit}&offset=${offset}`)
    orders.value = res.data
  } catch (error) {
    console.log(error);
  }

}


  await load()
</script>