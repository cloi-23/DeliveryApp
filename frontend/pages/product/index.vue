<template>
  <div >
        <h1>Product</h1>
        {{$route.query}}
       <button @click="$route.meta.toggle =  !$route.meta.toggle">Add</button>
       <div v-if="$route.meta.toggle">
         <add-product />
       </div>
    <table>
        <tr>
            <th>#</th>
             <th>Image</th>
            <th>Name</th>
            <th>Establishment</th>
            <th>Unit Price</th>
        </tr>
        <tr v-for="(product,index) in productList" :key="index">
            <td>{{index+1}}</td>
              <td><img :src='product.image' :alt="product.name" width="150" height="100"> </td>
            <td>{{product.name}}</td>
             <td>{{product.establishment}}</td>
              <td>{{product.price}}</td>

        </tr>
    </table>
    <span v-if="page > 0 ">
    <nuxt-link @click="prev" :to="{name:'product',query:{page:page}}"> - </nuxt-link> 
    </span>
    {{page}}  
    <nuxt-link @click="next" :to="{name:'product',query:{page:page}}"> + </nuxt-link>
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
const offsetPage = ref(Number(route.query.page))
const page = ref(1)
const prev =async ()=>{
page.value--
offsetPage.value --
await load(limitPage.value,offsetPage.value)
}
const next = async ()=>{
page.value++
offsetPage.value ++
await load(limitPage.value,offsetPage.value)

}
console.log(`limit : ${limitPage.value} offset :${page.value  }`);
const productList = ref(null)
const load = async(limit=5,offset=1)=>{
  try {
    const res =  await axios.get(`http://localhost:3000/product?limit=${limit}&offset=${offset}`)
    productList.value = res.data
  } catch (error) {
    console.log(error);
  }

}




  await load()
</script>

<style scoped>
</style>