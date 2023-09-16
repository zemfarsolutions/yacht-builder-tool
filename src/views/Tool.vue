<template>
    <Builder :data="userData"/>
</template>

<script setup>
import Builder from '../components/Builder.vue'

const userData = JSON.parse(sessionStorage.getItem('userData'));

</script>