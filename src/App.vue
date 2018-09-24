<template>
  <div id="app">

    <NavMenu/>
    <router-view/>
  </div>
</template>

<script>
// import '../assets/my.css'
import NavMenu from "./components/NavMenu.vue";
export default {
    name: "App",
    data() {
        return {};
    },
    components: {
        NavMenu
    }
};
</script>

<style>
body {
    background-color: #ccc;
}
#app {
    width: 100%;
    background-color: #f5f5f5;
}
</style>
