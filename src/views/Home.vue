<template>
    <h1>Hello from Home</h1>
    <h2>Deployed from local test</h2>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
 name: 'App',
 components: {
     HelloWorld,
 },
}
</script>

<style>

</style>