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
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

let username=ref('');
let password=ref('');
const login = async() => {
  axios.post('http://localhost:3000/manager/login',{
    username: username.value,
    password: password.value
  })
  
}


</script>