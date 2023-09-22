<template>
    <Nav />

    <div class="welcome--screen">
        <div class="container" ref="el">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="welcome--screen--card">
                        <div class="card border-0">
                            <div class="card-header">
                                <h5 class="card-title text-code">User Information</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="saveDataToSessionStorage" class="project--details">
                                    <div class="row mb-4 g-3">
                                        <div class="col-sm-12">
                                            <label for="project-name" class="form-label">Project Name</label>
                                            <input required type="text" v-model="name" class="form-control" id="project-name">
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="user-email" class="form-label">Email</label>
                                            <input required type="email" v-model="email" class="form-control" id="user-email">
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="user-phone" class="form-label">Phone</label>
                                            <input required type="text" v-model="phone" class="form-control" id="user-phone">
                                        </div>
                                        <div class="col-sm-6">
                                            <a href="https://www.aquaclub.com.au/pages/custom-creations" class="btn btn--primary--custom">Back to Website</a>
                                        </div>
                                        <div class="col-sm-6">
                                            <button type="submit" class="btn btn--primary--custom">Continue</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Nav from '../components/Nav.vue'
import router from '../router';
import CryptoJS from 'crypto-js';

const el = ref();
const name = ref();
const email = ref();
const phone = ref();

onMounted(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        router.push({ name: 'yatch-builder', params: { id: userData['userId'] } })
    }
})

function saveDataToSessionStorage() {
    const userInput = {
        userId: CryptoJS.AES.encrypt(email.value, 'password').toString(),
        name: name,
        email: email,
        phone: phone
    }

    sessionStorage.setItem('userData', JSON.stringify(userInput));

    const data = JSON.parse(sessionStorage.getItem('userData'));

    if (data) {
        router.push({ name: 'yatch-builder', params: { id: data['userId'] } })
    } else {
        console.log('Something went wrong. please try again.')
    }
}
</script>
