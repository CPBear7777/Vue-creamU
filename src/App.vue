<script setup></script>

<template>
  <header>
    <!--對應到fune-Router.js裡面的routes
    <router-link to="路徑"> 對應到 path:'路徑'
    <router-view> 對應到 component
    -->
    <router-link to="/">Go to Product Review</router-link> /
    <router-link to="/Message">Send Message</router-link> /
    <router-link to="/WebGL2">WebGL2</router-link> / 
  </header>

  <main>
    <h1>creamU</h1>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
