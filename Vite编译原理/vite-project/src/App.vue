<script setup></script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>Vite + Vue</h1>
  <router-link tag="el-button" to="/">
    <el-button type="primary" plain>home</el-button>
  </router-link>
  <router-link tag="el-button" to="/about">
    <el-button type="primary" plain>about</el-button>
  </router-link>
  <router-link tag="el-button" to="/prebuild">
    <el-button type="primary" plain>prebuild</el-button>
  </router-link>
  <br />
  <br />
  <router-view></router-view>
</template>

<style scoped>
.el-button {
  margin-right: 8px;
}
</style>
