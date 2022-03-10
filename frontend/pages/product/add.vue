<template>
<div>
    <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </Head>
 <h1>Product / Add</h1>
 <form @submit.prevent="add">
 <div class="mb-3">
  <label for="formFile" class="form-label">Default file input example</label>
  <input class="form-control" type="file" id="formFile" name="file"  ref="fileData" @change="imgUpload" required>
</div>
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">Product Name:</label>
  <input type="text" class="form-control" v-model="name" placeholder="Enter Product" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Establishment </label>
  <input type="text" class="form-control"   v-model="establishment" placeholder="Enter Establishment" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Unit Price </label>
  <input type="number" class="form-control"   v-model="price" placeholder="Enter Amount" required>
</div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Add</button>
  </div>
</form>

</div>
</template>

<script  setup>
import axios from 'axios'
const name = ref(null)
const establishment = ref(null)
const fileData = ref(null)
const image = ref(null)
const price = ref(null)
const router  =  useRouter()

 const imgUpload = ()=>{
  image.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }
 const add = async ()=>{
   try {
        const formData = new FormData();
         formData.append('file', image.value);
         const uploadResponse = await axios.post(`http://localhost:3000/upload/image`,formData)
         image.value =uploadResponse.data
         const product ={
         name: name.value,
         establishment:establishment.value,
          image: `http://localhost:3000/upload/${image.value}`,
          price: price.value
     }
     console.log(product);
     const res = await axios.post(`http://localhost:3000/product`,product)
      console.log(res.status); 
      name.value = null
      establishment.value = null
      price.value = null
     router.push({name:'product'})
   } catch (error) {
       console.log(error);
       
   }
 }




</script>

<style>

</style>