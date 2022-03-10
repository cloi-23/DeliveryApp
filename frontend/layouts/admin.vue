<template>
  <div>
      <head>
        <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
           
     
      </head>
    <navbar-list/>


  <main>
    <NuxtPage/>
       <p class="copyright">
      &copy; 2021 - <span>Aqumex</span> All Rights Reserved.
    </p>
  </main>
  
  </div>
</template>

<script lang="ts" setup>
import "../assets/css/style.css"

</script>

<style scoped>
main {
  flex: 1;
  padding: 2rem;
  color: #1f2027;
  display: flex;
  flex-direction: column;
  border: 5px solid red;
  margin-top: -100vh;
  margin-left: 250px;
  height: 100vh;

  
}

main h1 {
  margin-bottom: 1rem;
}

main .copyright {
  margin-top: auto;
  font-size: 0.9rem;
}

main .copyright span {
  color: var(--main-color);
  font-weight: 500;
  cursor: pointer;
}

</style>