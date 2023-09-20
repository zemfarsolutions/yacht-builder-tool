<template>

    <div class="container" ref="el">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0" style="top: 100px;box-shadow: 1px 1px 8px rgb(179, 179, 179)">
                    <div class="card-header bg-white">
                        <h5 class="card-title text-code" style="color: rgb(0, 112, 188)">User Information</h5>
                    </div>
                    <div class="card-body">
                        <form @submit="saveDataToSessionStorage">
                            <div class="row mb-3">
                                <label for="inputName3" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                <input required type="text" v-model="name" class="form-control" id="inputName3">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input required type="email" v-model="email" class="form-control" id="inputEmail3">
                                </div>
                            </div>
                            <button type="submit" style="background: rgb(0, 112, 188)" class="btn text-white btn-sm float-end fw-bold">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref,onMounted } from 'vue';
import router  from '../router';
import CryptoJS from 'crypto-js';

const el = ref();
const name = ref();
const email = ref();

onMounted(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData) {
        router.push({ name: 'yatch-builder', params: { id: userData['userId'] } })
    }
})  

function saveDataToSessionStorage() {
    const userInput =  {
        userId: CryptoJS.AES.encrypt(email.value, 'password').toString(),
        name: name,
        email: email
    }
    
    sessionStorage.setItem('userData', JSON.stringify(userInput));

    const data = JSON.parse(sessionStorage.getItem('userData'));

    if (data) {
        router.push({ name: 'yatch-builder', params: { id: data['userId'] } })
    }else{
        console.log('Something went wrong. please try again.')
    }
}
</script>
