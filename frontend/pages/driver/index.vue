<template>
  <div >
        <h1>Driver</h1>
        {{$route.query}}{{$route.meta.toggle}}
       <button @click="$route.meta.toggle =  !$route.meta.toggle">Add</button>
       <div v-if="$route.meta.toggle == true">
         <add-driver />
       </div>
    <table>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Device</th>
        </tr>
        <tr v-for="(driver,index) in driverList" :key="index">
            <td>{{index+1}}</td>
             <td>{{driver.name}}</td>
             <td>{{driver.username}}</td>
             <td>{{driver.address}}</td>
            <td>{{driver.contact}}</td>
             <td>{{driver.device}}</td>

        </tr>
    </table>
    
      <span v-if="page != 1 ">
      <nuxt-link @click="prev" :to="{name:'driver',query:{page: page}}"> - </nuxt-link> 

      </span>
      {{page}} 
      <span  v-if="driverList.length !=0  ">
       <nuxt-link @click="next" :to="{name:'driver',query:{page: page + 1}}"> + </nuxt-link>
  </span>
  </div>
</template>

<script  setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()
    definePageMeta({
  toggle: false,
  reload: false
})
const limitPage = ref(5)
const page = ref(Number(route.query.page))
const prev =async ()=>{
page.value--
await load(limitPage.value,page.value)
}
const next = async ()=>{
page.value++
await load(limitPage.value,page.value)

}

const driverList = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
    const res =  await axios.get(`http://localhost:3000/driver?limit=${limit}&offset=${offset}`)
    driverList.value = res.data
  } catch (error) {
    console.log(error);
  }

}


  await load()
</script>

<style scoped>
</style>