<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Delivery Table</h2>
  <div>
  <table>
  <tr>
    <th>Driver Name </th>
    <th>Contact # </th>
    <th>Order</th>
    <th>Item in total</th>
  </tr>
  <tr v-for="(delivery,index) in deliveries" :key="index" >
    <td>{{ delivery.driverName }}</td>
    <td>{{ delivery.driverContact }}</td>
    <td> <nuxt-link :to = "{ name: 'delivery-id',params: {id: delivery['_id']} }">Details</nuxt-link></td>    
    <td>{{ delivery.total }}</td>
  </tr>
  </table>
  </div>
   
    <span v-if="page != 1 ">
    <nuxt-link @click="prev" :to="{name:'delivery',query:{page: page}}"> - </nuxt-link> 
    </span>
    <span v-show = "page == 1 && deliveries.length !=0 ">
      {{page}} 
    </span>
    <nuxt-link @click="next" :to="{name:'delivery',query:{page: page + 1}}"> + </nuxt-link>
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

const deliveries = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
    const res =  await axios.get(`http://localhost:3000/delivery?limit=${limit}&offset=${offset}`)
    deliveries.value = res.data
  } catch (error) {
    console.log(error);
  }

}


  await load()
</script>