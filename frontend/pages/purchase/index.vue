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
      <!-- {{purchase}} {{product}} -->
    <tr v-for="(list,index) in purchaseList" :key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{list.product.name}}</td>
      <td>{{list.purchase.cost}}</td>
      <td>{{list.purchase.quantity}}</td>
      <td>{{getTotal(list)}}</td>
    </tr>

  </tbody>
</table>
</div>

</template>

<script setup>
import axios from 'axios';
const product = ref(null)
    definePageMeta({
  toggle: false,
  reload: false
})
const {data: purchaseList} = await axios.get(`http://localhost:3000/purchase`)

const getTotal = (list)=>{
    const unitPrice = list.purchase.cost
    const quantity = list.purchase.quantity
    return unitPrice * quantity
}

</script>

<style>

</style>