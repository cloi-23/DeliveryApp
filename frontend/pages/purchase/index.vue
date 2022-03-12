<template>
<div>
      <h1>Purchase</h1>
     <button @click="$route.meta.toggle =  !$route.meta.toggle">Add</button>
       <div v-if="$route.meta.toggle">
       <add-purchase/>
       </div>
   

    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Quantity</th>
        <th scope="col">Total Price</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(list,index) in purchaseList" :key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{list.product.name}}</td>
      <td>{{list.purchase.cost}}</td>
      <td>{{list.purchase.quantity}}</td>
      <td>{{getTotal(list)}}</td>
    </tr>

  </tbody>
</table>
    <span v-if="page != 1 ">
    <nuxt-link @click="prev" :to="{name:'purchase',query:{page: page}}"> - </nuxt-link> 
    </span>
      {{page}} 
      <span  v-if="purchaseList.length !=0 ">
       <nuxt-link @click="next" :to="{name:'purchase',query:{page: page + 1}}"> + </nuxt-link>
  </span>
  
</div>

</template>

<script setup>
import axios from 'axios';
const product = ref(null)
    definePageMeta({
  toggle: false,
  reload: false
})

const getTotal = (list)=>{
    const unitPrice = list.purchase.cost
    const quantity = list.purchase.quantity
    return unitPrice * quantity
}
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

const purchaseList = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
    const res =  await axios.get(`http://localhost:3000/purchase?limit=${limit}&offset=${offset}`)
    purchaseList.value = res.data
  } catch (error) {
    console.log(error);
  }

}


  await load()

</script>

<style>

</style>