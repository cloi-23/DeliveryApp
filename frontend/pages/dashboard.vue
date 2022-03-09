<template>
<div>
  Dashboard
  <button @click="$router.push({ name: 'orders' })">Orders</button>
  <button>Delivery</button>
 <div>Chart</div>
<h2>Sales Table</h2>

<table>
  <tr>
    <th>Date</th>
    <th>Order ID</th>
    <th>Total</th>
    <th>Status</th>
  </tr>
</table>
</div>
</template>
<script lang="ts" setup>
import '~/assets/css/table.css'
</script>
