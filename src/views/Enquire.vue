<template>
    <nav class="navbar navbar-dark navbar-expand-lg height--fixed">
        <div class="container-fluid">
            <a class="navbar-brand" href="http://yachtbuilder.wetestlink.com">
                <div class="main--logo--nav">
                    <img src="/media/logo/log2.png" alt="Aqua Club Logo">
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto">
                    <!-- <li class="fw-bold mx-2 nav-item">
                        <font-awesome-icon icon="person" class="statistics--icon--nav" />
                        <span class="statistics--text--nav">{{ cartCapacity }}</span>
                    </li> -->
                    <li class="fw-bold mx-2 nav-item">
                        <!-- <font-awesome-icon icon="anchor" class="statistics--icon--nav" /> -->
                        <div class="statistics--summary">
                            <span class="statistics--icon--nav">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 220 220"
                                    fill="none" aria-hidden="true" focusable="false" class="icon icon-account">
                                    <path
                                        d="M178.749 123.75H151.249C150.034 123.75 148.868 124.233 148.008 125.092C147.149 125.952 146.666 127.118 146.666 128.333C146.666 129.549 147.149 130.715 148.008 131.574C148.868 132.434 150.034 132.917 151.249 132.917H174.001C172.898 148.311 166.284 162.792 155.371 173.705C144.458 184.618 129.977 191.232 114.583 192.335V100.833H132.916C134.132 100.833 135.297 100.35 136.157 99.4909C137.016 98.6314 137.499 97.4656 137.499 96.25C137.499 95.0345 137.016 93.8687 136.157 93.0091C135.297 92.1496 134.132 91.6667 132.916 91.6667H114.583V72.875C120.98 71.7975 126.789 68.4917 130.983 63.5427C135.177 58.5936 137.486 52.3205 137.499 45.8334C137.499 38.5399 134.602 31.5452 129.445 26.3879C124.288 21.2307 117.293 18.3334 109.999 18.3334C102.706 18.3334 95.7112 21.2307 90.5539 26.3879C85.3967 31.5452 82.4994 38.5399 82.4994 45.8334C82.5058 52.3225 84.8113 58.5995 89.0067 63.55C93.202 68.5005 99.0158 71.8044 105.416 72.875V91.6667H87.0827C85.8671 91.6667 84.7013 92.1496 83.8418 93.0091C82.9822 93.8687 82.4994 95.0345 82.4994 96.25C82.4994 97.4656 82.9822 98.6314 83.8418 99.4909C84.7013 100.35 85.8671 100.833 87.0827 100.833H105.416V192.262C74.0752 190.053 48.3077 165.165 45.9977 132.917H68.7494C69.9649 132.917 71.1307 132.434 71.9903 131.574C72.8498 130.715 73.3327 129.549 73.3327 128.333C73.3327 127.118 72.8498 125.952 71.9903 125.092C71.1307 124.233 69.9649 123.75 68.7494 123.75H41.2493C40.0338 123.75 38.868 124.233 38.0084 125.092C37.1489 125.952 36.666 127.118 36.666 128.333C36.6903 147.775 44.4242 166.414 58.1716 180.161C71.9191 193.908 90.5576 201.642 109.999 201.667C129.441 201.642 148.08 193.908 161.827 180.161C175.574 166.414 183.308 147.775 183.333 128.333C183.333 127.118 182.85 125.952 181.99 125.092C181.131 124.233 179.965 123.75 178.749 123.75ZM91.666 45.8334C91.666 40.9711 93.5976 36.3079 97.0357 32.8697C100.474 29.4316 105.137 27.5 109.999 27.5C114.862 27.5 119.525 29.4316 122.963 32.8697C126.401 36.3079 128.333 40.9711 128.333 45.8334C128.333 50.6957 126.401 55.3588 122.963 58.797C119.525 62.2352 114.862 64.1667 109.999 64.1667C105.137 64.1667 100.474 62.2352 97.0357 58.797C93.5976 55.3588 91.666 50.6957 91.666 45.8334Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="statistics--text--nav">{{ orderSummary.totalProducts }}</span>
                        </div>
                    </li>
                    <li class="fw-bold mx-2 nav-item">
                        <!-- <font-awesome-icon icon="dollar" class="statistics--icon--nav" /> -->
                        <div class="statistics--summary">
                            <span class="statistics--icon--nav">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" fill="none" aria-hidden="true"
                                    focusable="false" class="icon icon-account" height="1.5rem" width="1.5rem">
                                    <g clip-path="url(#clip0_521_20)">
                                        <path
                                            d="M158.888 129.25C156.052 124.217 152.213 119.82 147.609 116.33C143.005 112.84 137.733 110.332 132.121 108.961C126.855 107.381 121.511 106.076 116.11 105.05V49.6222C126.848 50.774 137.092 54.7368 145.81 61.1111C146.412 61.6447 147.113 62.0546 147.873 62.3174C148.634 62.5801 149.438 62.6905 150.241 62.6422C151.044 62.594 151.83 62.3881 152.553 62.0362C153.277 61.6844 153.924 61.1935 154.457 60.5916C154.991 59.9897 155.401 59.2886 155.664 58.5283C155.926 57.768 156.037 56.9634 155.989 56.1604C155.94 55.3575 155.734 54.5718 155.383 53.8485C155.031 53.1251 154.54 52.4781 153.938 51.9444C143.001 43.5208 129.867 38.4287 116.11 37.2777V18.3333C116.11 16.7125 115.466 15.1581 114.32 14.0121C113.174 12.866 111.62 12.2222 109.999 12.2222C108.378 12.2222 106.824 12.866 105.678 14.0121C104.532 15.1581 103.888 16.7125 103.888 18.3333V36.6666C76.999 37.2777 62.149 50.6611 57.6268 62.2111C54.61 69.6486 54.3234 77.9139 56.8178 85.5425C59.3122 93.1711 64.4265 99.6704 71.2546 103.889C81.1937 109.948 92.3263 113.784 103.888 115.133V171.111C87.9337 170.308 72.6503 164.443 60.2546 154.367C59.7014 153.708 59.0155 153.174 58.2418 152.799C57.468 152.424 56.6238 152.216 55.7643 152.19C54.9049 152.163 54.0495 152.318 53.2541 152.645C52.4587 152.972 51.7412 153.463 51.1485 154.086C50.5558 154.709 50.1012 155.45 49.8145 156.26C49.5278 157.071 49.4154 157.933 49.4847 158.79C49.554 159.647 49.8033 160.48 50.2165 161.234C50.6297 161.988 51.1973 162.647 51.8824 163.167C66.4997 175.473 84.7953 182.568 103.888 183.333V201.667C103.888 203.287 104.532 204.842 105.678 205.988C106.824 207.134 108.378 207.778 109.999 207.778C111.62 207.778 113.174 207.134 114.32 205.988C115.466 204.842 116.11 203.287 116.11 201.667V183.333C133.343 182.172 153.205 176.672 160.721 154.244C162.081 150.164 162.619 145.854 162.305 141.564C161.99 137.274 160.829 133.089 158.888 129.25ZM78.1602 93.6222C73.6978 90.9659 70.3293 86.805 68.6603 81.8874C66.9912 76.9698 67.131 71.6181 69.0546 66.7944C69.7268 64.9611 76.5713 49.6222 103.888 48.8888V102.667C94.7716 101.494 86.0051 98.4117 78.1602 93.6222ZM149.11 150.089C144.71 163.167 134.932 169.461 116.11 170.867V117.517C120.021 118.372 124.055 119.35 128.332 120.633C132.373 121.551 136.185 123.281 139.537 125.719C142.888 128.156 145.709 131.249 147.827 134.811C150.224 139.543 150.684 145.023 149.11 150.089Z"
                                            fill="currentColor" />
                                    </g>
                                </svg>
                            </span>
                            <span class="statistics--text--nav">{{ orderSummary.cost }}</span>
                        </div>
                    </li>
                    <li class="fw-bold mx-2 nav-item">
                        <!-- <font-awesome-icon icon="user" class="statistics--icon--nav" /> -->
                        <div class="statistics--summary">
                            <span class="statistics--icon--nav">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" fill="none" aria-hidden="true"
                                    focusable="false" class="icon icon-account" height="1.5rem" width="1.5rem">
                                    <path
                                        d="M159.848 201.089H60.151C54.0732 201.089 48.2442 198.675 43.9465 194.377C39.6488 190.079 37.2344 184.25 37.2344 178.173V170.592C37.2344 134.209 69.8769 104.592 109.999 104.592C150.122 104.592 182.764 134.191 182.764 170.592V178.173C182.764 184.25 180.35 190.079 176.052 194.377C171.755 198.675 165.926 201.089 159.848 201.089ZM109.999 113.777C74.9277 113.777 46.401 139.26 46.401 170.61V178.191C46.401 181.838 47.8497 185.335 50.4283 187.914C53.007 190.492 56.5043 191.941 60.151 191.941H159.848C163.494 191.941 166.992 190.492 169.57 187.914C172.149 185.335 173.598 181.838 173.598 178.191V170.592C173.598 139.26 145.071 113.777 109.999 113.777ZM109.999 90.8508C102.885 90.8527 95.9295 88.7446 90.013 84.7933C84.0966 80.8419 79.4848 75.2248 76.7609 68.6523C74.037 62.0798 73.3234 54.8472 74.7103 47.8691C76.0971 40.891 79.5222 34.4809 84.5523 29.4495C89.5825 24.418 95.9917 20.9913 102.969 19.6027C109.947 18.214 117.18 18.9258 123.753 21.648C130.326 24.3702 135.945 28.9806 139.898 34.896C143.85 40.8115 145.96 47.7663 145.96 54.8808C145.953 64.4169 142.162 73.5604 135.42 80.3042C128.678 87.048 119.535 90.8411 109.999 90.8508ZM109.999 28.0867C104.697 28.0849 99.514 29.6555 95.1048 32.6C90.6956 35.5445 87.2587 39.7305 85.2289 44.6286C83.1991 49.5266 82.6675 54.9166 83.7014 60.1168C84.7354 65.317 87.2883 70.0938 91.0374 73.8428C94.7865 77.5919 99.5632 80.1448 104.763 81.1788C109.964 82.2127 115.354 81.6811 120.252 79.6513C125.15 77.6215 129.336 74.1846 132.28 69.7754C135.225 65.3662 136.795 60.1828 136.794 54.8808C136.786 47.7768 133.961 40.9659 128.938 35.9425C123.914 30.9192 117.103 28.094 109.999 28.0867Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="statistics--text--nav">{{ orderSummary.username }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="welcome--screen--test" style="background: #000; padding: 50px 0">
        <div class="container" ref="el">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="welcome--screen--card--test">
                        <div class="card border-0">
                            <div class="card-header">
                                <h5 class="card-title text-code">Enquire Now</h5>
                            </div>
                            <div class="card-body">
                                <div class="project--details">
                                    <div class="row mb-4 g-3">
                                        <div class="col-sm-12">
                                            <label for="project-name" class="form-label">Project Name</label>
                                            <input required type="text" v-model="project_name" class="form-control" id="project-name">
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="name" class="form-label">Name</label>
                                            <input required type="text" v-model="name" class="form-control" id="name">
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="user-email" class="form-label">Email</label>
                                            <input required type="email" v-model="email" class="form-control" id="user-email">
                                        </div>
                                        <div class="col-sm-6">
                                            <label for="user-phone" class="form-label">Phone</label>
                                            <input required type="text" v-model="phone" class="form-control" id="user-phone">
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="enquiry-details" class="form-label">Enquiry</label>
                                            <textarea required class="form-control" v-model="enquiry" id="enquiry-details" cols="30" rows="5"></textarea>
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="attachment" class="form-label">Attachment</label>
                                            <input type="file" class="form-control" id="attachment" ref="attachment">
                                            <div id="attachment" class="form-text text-white">Select the PDF just downloaded on your device.</div>
                                        </div>
                                        <div class="col-sm-6">
                                            <button @click="goBack()" class="btn btn--primary--custom">Cancel Order</button>
                                        </div>
                                        <div class="col-sm-6">
                                            <button @click="sendEmail()" class="btn btn--primary--custom">Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="summary--bar">
                    <div class="card-list summary--bar--card--list">
                        <!-- <div class="col-md-4"> -->
                        <div class="card summary--bar--card">
                            <div class="row g-0">
                                <div class="col-md-12">
                                    <div class="card-body summary--bar--card--body">
                                        <div class="summary--bar--card--body--statistics">
                                            <div class="summary--bar--card--body--statistics--row">
                                                <h5>Products:</h5>
                                                <p>{{ orderSummary.totalProducts }}</p>
                                            </div>
                                            <div class="summary--bar--card--body--statistics--row">
                                                <h5>CAPACITY:</h5>
                                                <p>{{ orderSummary.capacity }}</p>
                                            </div>
                                            <div class="summary--bar--card--body--statistics--row">
                                                <h5>TOTAL COST:</h5>
                                                <p>
                                                    $ {{ Intl.NumberFormat().format(orderSummary.cost) }}
                                                </p>
                                            </div>
                                        </div>

                                        <div v-for="(item) in orderSummary.products" :key="item.id" class="card summary--bar--card--body--prod">
                                            <div class="row g-0">
                                                <div class="col-md-3">
                                                    <div class="img--card">
                                                        <img :src="`/media/images/`+item.path" alt="selected-product">
                                                    </div>
                                                </div>
                                                <div class="col-md-9 cart-item-body">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{{ item.name }}</h5>
                                                        <span class="d-flex justify-content-between align-content-center">
                                                            <p class="card-text">{{ item.size }}</p>
                                                            <p class="card-text">${{ Intl.NumberFormat().format(item.cost) }}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import  emailjs  from '@emailjs/browser';
import router from '../router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const orderSummary = JSON.parse(sessionStorage.getItem('orderSummary'));

const el = ref();
const name = ref();
const project_name = ref(orderSummary.project);
const email = ref(orderSummary.user_email);
const phone = ref(orderSummary.user_phone);
const enquiry = ref();
const attachment = ref();

async function sendEmail() {
    
    if (name.value == null || project_name.value == null || email.value == null 
    || phone.value == null || enquiry.value == null) {

        toast.error("Some fields are missing. Please check and try again!", {
            autoClose: 1000,
        });

    }else{
        let img_base64  = await convertImageToBase64(attachment.value.files[0])
        var params = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            enquiry: enquiry.value,
            project_name: project_name.value,
            number_of_products: orderSummary.totalProducts,
            capacity: orderSummary.capacity,
            total_cost: orderSummary.cost,
            attachment: img_base64
        };
        
        toast("Great! Thanks for your order.", {
            autoClose: 1000,
        });

        await emailjs.send('service_mur4r3c', 'template_ku0wlun', params, 'wnlr_jL0yvvoQfRH7')
                .then((result) => {
                    console.log('SUCCESS!', result.text);
                }, (error) => {
                    console.log('FAILED...', error.text);
                });

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        router.push({ name: 'yatch-builder', params: { id: userData['userId'] } }); 
        
    }
} 

function goBack(){
    sessionStorage.clear();
    router.push({ name: 'Home'}); 
}

const convertImageToBase64 = async (image) => {
  return await imageToBase64(image);
}

const imageToBase64 = image => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
</script>