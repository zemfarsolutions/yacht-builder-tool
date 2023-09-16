<template>

    <div class="container" ref="el">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card" style="top: 100px">
                    <div class="card-header bg-white">
                        <h5 class="card-title">User Information</h5>
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
                            <button type="submit" class="btn btn-primary btn-sm float-end">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router  from '../router';

const el = ref();
const name = ref();
const email = ref();

onMounted(() => {


    const data = JSON.parse(sessionStorage.getItem('userData'));

    if (data) {
        router.push('/yatch-builder-tool')
    }
})

function saveDataToSessionStorage() {
    const data =  {
        name: name,
        email: email
    }
    
    sessionStorage.setItem('userData', JSON.stringify(data));
    router.push('/yatch-builder-tool')
}
</script>
