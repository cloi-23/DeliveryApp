<template>
<div>
    <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </Head>

 <form @submit.prevent="register">
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">Name:</label>
  <input type="text" class="form-control" v-model="name" placeholder="Enter Name" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Address: </label>
  <input type="text" class="form-control"   v-model="address" placeholder="Enter Address" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Contact: </label>
  <input type="number" class="form-control"   v-model="contact" placeholder="Enter Contact" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Device: </label>
  <input type="text" class="form-control"   v-model="device" placeholder="Enter Device" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Username: </label>
  <input type="text" class="form-control"   v-model="username" placeholder="Enter Username" required>
</div>
<div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">Password: </label>
  <input type="password" class="form-control"   v-model="password" placeholder="Enter Password" required>
</div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Add</button>
  </div>
</form>

</div>
</template>

<script  setup>
import axios from 'axios';
const name = ref(null)
const address = ref(null)
const contact = ref(null)
const device = ref(null)
const username = ref(null)
const password = ref(null)
const register =  async () =>{
try {
    const driver = {
      name : name.value,
      address : address.value,
      contact : contact.value,
      device : device.value,
      username : username.value,
      password : password.value,
  }
  const res = await axios.post(`http://localhost:3000/driver`,driver)
     name.value =null
     address.value =null
     contact.value =null
     device.value =null
     username.value =null
     password.value =null
  console.log(res.data);
  location.reload()
} catch (error) {
  console.log(error);
}
}


</script>

<style>

</style>