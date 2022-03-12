<template>
  <div>
    <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </Head>

 <form @submit.prevent="add">
<div class="mb-3" >
    <label for="exampleFormControlInput1" class="form-label">Product: </label>
<select class="form-select" aria-label="Default select example" v-model="productId" required>
  <option selected  >Select Product</option>
  <option   v-for="(product,index) in productList" :key="index" :value="product._id">{{product.name}}</option>

</select>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Unit Price: </label>
  <input type="number" class="form-control"   v-model="unitPrice" placeholder="Enter Amount" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Quantity: </label>
  <input type="number" class="form-control"   v-model="quantity" placeholder="Enter Quantity" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Total Price: </label>
  <input type="number" class="form-control"   v-model="total" placeholder="0" readonly>
</div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Add</button>
  </div>
</form>

</div>
</template>

<script setup>
import axios from 'axios';

const {data: productList} = await axios.get(`http://localhost:3000/product`)
const productId = ref(null)
const unitPrice = ref(null)
const quantity = ref(null)
const total = computed(()=> unitPrice.value * quantity.value)
const add = async ()=>{
try {
      const purchase = {
      productId: productId.value,
      cost: unitPrice.value,
      quantity:quantity.value
  }
  const res = await axios.post(`http://localhost:3000/purchase`,purchase)
  console.log(res.status);
  productId.value = null
  unitPrice.value= null
  quantity.value= null

 location.reload()
} catch (error) {
    console.log(error);
}
}
</script>

<style>

</style>