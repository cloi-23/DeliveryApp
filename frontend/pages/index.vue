<template>
  <div>
      Manager
    <form @submit.prevent="login">
    <div>
      username <input type="text" v-model="username" />
    </div>
    <div>
      password <input type="password" v-model="password" />
    </div>
    <button>login</button>
    </form>
    {{ response }}
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
<<<<<<< HEAD
definePageMeta({layout:'login'})
const router = useRouter()
=======
>>>>>>> 3be3092a42ea89c56278aad39e6139e5555a2392


let username=ref('');
let password=ref('');
let response=ref('');

const login = async() => {
try {
  const res = await axios.post('http://localhost:3000/manager/login',{
    username: username.value,
    password: password.value
  })
    username.value = ''
    password.value = ''
    if (res.status !== 201) {}
    
  } catch (e) {
    response.value = 'username or password is not correct'
  }
}


</script>