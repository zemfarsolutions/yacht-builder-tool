<script setup>
import { ref, watch } from 'vue';
import html2pdf from "html2pdf.js";
import router from '../router';
import emailjs from '@emailjs/browser';

const props = defineProps({
    data:Object
})

const products = ref(true);
const summary = ref(false);
const currentTab = ref(0);

function changeMenu(tab) {
    if (tab == 'summary') {

        products.value = false;
        summary.value = true;
        currentTab.value = 1;

    }else{

        products.value = true
        summary.value = false
        currentTab.value = 0;
    }
}

const cardDetail = ref(false);

const productList = [
    {
        id: 1,
        path: 'single-jetski-dock.png',
        name: 'Single Jet Ski Dock',
        capacity: 10,
        size: '4x3m',
        cost: 4995,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 2,
        path: 'double-jetski-dock.png',
        name: 'Double Jet Ski Dock',
        capacity: 8,
        size: '5x3m',
        cost: 5199,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 3,
        path: '3x2-dock.png',
        name: '3x2 Dock',
        capacity: 5,
        size: '3x2m',
        cost: 3144,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 4,
        path: '4x2-dock.png',
        name: '4x2 Dock',
        capacity: 6,
        size: '4x2m',
        cost: 2599,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 5,
        path: 'doggy-dock.png',
        name: 'Doggy Dock',
        capacity: 7,
        size: '1.4x1m',
        cost: 4122,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 6,
        path: 'sea-pool.png',
        name: 'Sea Pool',
        capacity: 7,
        size: '5x4m',
        cost: 4122,
        rotate: ref(0),
        count: ref(0)
    }
];

const productDetail = ref({
    name: '',
    path: '',
    capacity: '',
    size: '',
    anchors: '',
    cost: ''
});

function showProductDetail(val) {
    cardDetail.value = true;

    productDetail.value.name = val.name;
    productDetail.value.path = val.path;
    productDetail.value.capacity = val.capacity;
    productDetail.value.size = val.size;
    productDetail.value.anchors = val.anchors;
    productDetail.value.cost = val.cost;
}

function hideProductDetail(val) {
    cardDetail.value = false;
}

// onClick add item into cart
function addToCart(val) {
    val.count.value++
    val['cartItemID'] = Math.random().toString(36).slice(2)
    console.log(val['cartItemID'])
    cart.value.push(val);
}

// dynamic cart items
const cart = ref([
])  

const cartCost = ref(0);
const cartCapacity = ref(0);
const invoice = ref("");
const decrement = ref(null)

// live summary info update
watch(
  () => cart,
  (newValue, oldValue) => {    
        cartCost.value = newValue.value.reduce((sum, item) => {
            return sum + item.cost
        }, 0);

        cartCapacity.value = newValue.value.reduce((sum, item) => {
            return sum + item.capacity
        }, 0);

  },
  { deep: true }
)


const opacity = ref(0)
const draggableComponent = ref(null)
const invoiceContent = ref(null)
var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');

function mousedown (e, index) {

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
    
    let prevX = e.clientX
    let prevY = e.clientY
    let currentIndex = index;
    const dom = draggableComponent.value;
    
    dom[currentIndex].children[1].style.opacity == 0 ? dom[currentIndex].children[1].style.opacity = 1 : dom[currentIndex].children[1].style.opacity = 0
    
    function mousemove (e) {
        // new x - where is the mouse now
        const newX = prevX - e.clientX
        const newY = prevY - e.clientY
        
        const rect = dom[currentIndex].getBoundingClientRect()
        
        dom[currentIndex].style.position = 'absolute';
        dom[currentIndex].style.zIndex = 1000;

        dom[currentIndex].style.left = rect.left - newX + 'px'
        dom[currentIndex].style.top = rect.top - newY + 'px'
        prevX = e.clientX
        prevY = e.clientY
    }

    function mouseup () { // remove event listener
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
    }
}

function removeCartItem(item, index) {
    
    item.count--

    if(cart.value[index] === item) { 
        cart.value.splice(index, 1)
    } else {
        let found = cart.value.indexOf(item)
        cart.value.splice(found, 1)
    }
      
}

function rotateComponent(event , draggable, index, action) {

    let currentDeg = parseInt(draggableComponent.value[index].children[0].style.transform.match(/\d+/g)[0]);
    
    if (action == 'increment') {

        let incrementRotation = currentDeg += 90;
        draggableComponent.value[index].children[0].style.transform = "rotate("+incrementRotation+"deg)";
    }
    
    if (action == 'decrement') {
        
        let incrementRotation = currentDeg -= 90;
        draggableComponent.value[index].children[0].style.transform = "rotate("+incrementRotation+"deg)";
    }

    let back = draggableComponent.value[index].children[1].querySelector('.backward');
    
    if (currentDeg > 0) {
        if (back !== null) {
            back.style.display = "block"
        }
    }
    
    if (currentDeg == 0) {
        if (back !== null) {
            back.style.display = "none"
        }
    }
}

const printcontent = ref(null)

// Delete Session Storage
function deleteSession() 
{
    sessionStorage.clear();
    router.push({name: 'Home'})
}

const form = ref(null)

async function enquireNow() {

    let actions = document.getElementsByClassName('actions');
    
    actions.forEach(element => {
        element.style.opacity = 0;
    });

    invoice.value = "<div class='text-white' style='background: #000;height:8vh'>\
                        <div style='display: flow-root;margin-left: 220px;font-weight: 500;margin-top: 10px;'>\
                            <div class='d-flex float-start'>\
                                <h5 class='' style='font-family: Oswald; font-size: 22px;  line-height: 22.1px; color: rgb(255, 255, 255);  letter-spacing: 1px;' >Name:</h5>\
                                <h5 class='text-code mx-2' style='color: #fff; font-family: Avenir Next;'>"+ props.data.name._value + "</h5>\
                            </div>\
                            <div class='d-flex float-end'>\
                                <h5 class='' style='font-family: Oswald; font-size: 22px;  line-height: 22.1px; color: rgb(255, 255, 255);  letter-spacing: 1px;'>Date Drawn:</h5>\
                                <h5 class='text-code mx-2' style='color: #fff; font-family: Avenir Next;'>"+ currentDateWithFormat + "</h5>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='' style='width: 160px;margin-left: 50px;position: absolute;border: 0; background: #000; padding: 15px;'>\
                        <div style='border-bottom: 2px solid rgb(0 112 188);margin-bottom:15px'>\
                            <img width='100px' src='/media/logo.jpg'>\
                        </div>\
                        <div style='margin-bottom:10px'>\
                            <div class='mb-1' style='font-family: Oswald; font-size: 16px;  line-height: 22.1px; color: rgb(255, 255, 255);  letter-spacing: 1px;'>Total Feature:</div>\
                            <div class='text-code' style='font-family: Avenir Next;font-size: 14px;font-weight: 800;line-height: 22.1px;color: rgb(255, 255, 255);letter-spacing: 1px;'>"+ cart.value.length + "</div>\
                        </div>\
                        <div style='margin-bottom:10px'>\
                            <div class='mb-1' style='font-family: Oswald; font-size: 16px;  line-height: 22.1px; color: rgb(255, 255, 255);  letter-spacing: 1px;'>Total Capacity:</div>\
                            <div class='text-code' style='font-family: Avenir Next;font-size: 14px;font-weight: 800;line-height: 22.1px;color: rgb(255, 255, 255);letter-spacing: 1px;'>"+ cartCapacity.value + "</div>\
                        </div>\
                        <div style='margin-bottom:10px'>\
                            <div class='mb-1' style='font-family: Oswald; font-size: 16px;  line-height: 22.1px; color: rgb(255, 255, 255);  letter-spacing: 1px;'>Total Cost:</div>\
                            <div class='text-code' style='font-family: Avenir Next;font-size: 14px;font-weight: 800;line-height: 22.1px;color: rgb(255, 255, 255);letter-spacing: 1px;'>$"+ cartCost.value + "</div>\
                        </div>\
                    \</div>";

    var opt = {
        margin:       1,
        filename:     'media/canvas.pdf',
        image:        { type: 'jpeg', quality: 1 },
    };

    html2pdf().set(opt).from(printcontent.value).save()
    
    const result = await html2pdf(printcontent.value, opt).output();
    
    invoice.value = ""

    const orderSummary = {
        project: props.data.name._value,
        user_email: props.data.email._value,
        user_phone: props.data.phone._value,
        totalProducts: cart.value.length,
        capacity: cartCapacity.value,
        cost: cartCost.value,
        products: cart.value
    }

    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));

    router.push({ name: 'enquire-now', params: { id: props.data['userId'] } });    
}
</script>


<template>
    <nav class="navbar navbar-dark navbar-expand-lg height--fixed">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <div class="main--logo--nav">
                    <img src="/public/media/logo/log2.png" alt="Aqua Club Logo">
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
                            <span class="statistics--text--nav">{{ cartCapacity }}</span>
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
                            <span class="statistics--text--nav">{{ Intl.NumberFormat().format(cartCost) }}</span>
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
                            <span class="statistics--text--nav">{{ props.data.name._value }}</span>
                        </div>
                    </li>
                </ul>
                <div class="d-flex">
                    <button @click="deleteSession()" class="btn btn--primary--custom--v2">
                        New Project
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <section class="main--canvas--body" style="width: 100vw;">
        <div class="main">
            <div class="draggableItems" ref="printcontent">

                <div class="row" v-html="invoice" ref="invoiceContent"> </div>

                <img src="/media/canvas-ship.png" alt="main-canvas-ship" class="main--canvas--ship">

                <div class="draggableItem" ref="draggableComponent" v-for="(draggable, index) in cart"
                    @mousedown="mousedown($event, index)">

                    <img :src="`/media/images/` + draggable.path" class="w-100" style="transform: rotate(0deg);">
                    <div class="actions">
                        <button class="btn btn-sm btn-light" @click="rotateComponent($event, draggable, index, 'increment')">
                            <font-awesome-icon icon="arrow-rotate-forward"/>
                        </button>
                        <button class="btn btn-sm btn-light backward" style="display: none" ref="decrement" @click="rotateComponent($event, draggable, index, 'decrement')">
                            <font-awesome-icon icon="arrow-rotate-backward"/>
                        </button>
                        <button class="btn btn-sm btn-light" @click="removeCartItem(draggable, index)">
                            <font-awesome-icon icon="trash" />
                        </button>
                        
                    </div>

                </div>
            </div>
        </div>

        <aside class="side--bar">
            <div class="menu">
                <button @click="changeMenu('products')"
                    :class="currentTab === 0 ? `btn sidebar--tab--selector--active` : 'btn sidebar--tab--selector'">
                    Products
                </button>
                <button @click="changeMenu('summary')"
                    :class="currentTab === 1 ? `btn sidebar--tab--selector--active` : 'btn sidebar--tab--selector'">
                    Summary
                </button>
            </div>

            <div v-show="products" class="products--bar">
                <div class="card-list">
                    <div class="cards-grid">
                        <div v-for="product in productList" @mouseover="showProductDetail(product)"
                            @mouseleave="hideProductDetail(product)" @click="addToCart(product)" class="card products--bar--card">
                            
                            <div class="card-img">
                                <img :src="`/media/images/` + product.path" alt="product-img">
                                <span v-if="product.count.value > 0"
                                    class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger mt-1">
                                    {{ product.count.value }}
                                </span>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title text-white">{{ product.name }}</h5>
                                <div class="d-flex justify-content-between align-content-center">
                                    <p class="text-white">{{ product.size }}</p>
                                    <p class="text-white">${{ Intl.NumberFormat().format(product.cost)}}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div v-show="summary" class="summary--bar">
                <div class="card-list summary--bar--card--list">
                    <!-- <div class="col-md-4"> -->
                    <div class="card summary--bar--card">
                        <div class="row g-0">
                            <div class="col-md-12">
                                <div class="card-body summary--bar--card--body">
                                    <div class="summary--bar--card--body--statistics">
                                        <div class="summary--bar--card--body--statistics--row">
                                            <h5>Products:</h5>
                                            <p>{{ cart.length }}</p>
                                        </div>
                                        <div class="summary--bar--card--body--statistics--row">
                                            <h5>CAPACITY:</h5>
                                            <p>{{ cartCapacity }}</p>
                                        </div>
                                        <div class="summary--bar--card--body--statistics--row">
                                            <h5>TOTAL COST:</h5>
                                            <p>
                                                $ {{Intl.NumberFormat().format(cartCost)}}
                                            </p>
                                        </div>
                                    </div>

                                    <div v-for="item in cart" class="card summary--bar--card--body--prod">
                                        <div class="row g-0">
                                            <div class="col-md-3">
                                                <div class="img--card">
                                                    <img :src="`/media/images/` + item.path" alt="selected-product">
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
                                <div class="card-footer summary--bar--card--footer">
                                    <button class="btn btn--primary--custom--v2" @click="enquireNow()">
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
            </div>

            <transition name="fade">
                <div v-show="cardDetail" class="card popUp--card">
                    <div class="card-detail popUp--card--detail">
                        <div class="row g-0">
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">{{ productDetail.name }}</h5>
                                    <div class="popUp--card--detail--stats">
                                        <p>Capacity:</p>
                                        <p>{{ productDetail.capacity }}</p>
                                    </div>
                                    <div class="popUp--card--detail--stats">
                                        <p>Size:</p>
                                        <p>{{ productDetail.size }}</p>
                                    </div>
                                    <!-- <div class="popUp--card--detail--stats">
                                        <p>Anchors:</p>
                                        <p>{{ productDetail.anchors }}</p>
                                    </div> -->
                                    <div class="popUp--card--detail--stats">
                                        <p>Cost:</p>
                                        <p>${{ productDetail.cost }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 card-detail-image">
                                <img :src="`/media/images/` + productDetail.path" width="100" class="img-fluid rounded-start"
                                    alt="...">
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </aside>
    </section>
</template>

<style scoped>
.draggableItems {
    /* height: 550px; */
    height: 90vh;
    background: url('/media/canvas-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    /* max-width: 800px; */
}
.draggableItem {
    position: absolute;
    color: #fff;
    cursor: move;
    display: flex;
    align-items: center;
    width: 100px;
}
.companyDetails {
    height: 200px;
    width: 120px;
    margin-left: 100px;
    position: absolute;
    border: 1px solid #878787;
    font-family: fantasy;
}
.project {
    display: flow-root;
    margin-left: 220px;
    font-family: fantasy;
    margin-top: 10px;
}
.text-code {
    color: #0070BC;
}
.fs-14 {
    font-size: 14px;
}
.actions {
    display: flex;
    position: sticky;
    flex-direction: column;
    z-index: 9999;
    opacity: v-bind(opacity);
}
/* .menu {
    z-index: 999;
    display: flex;
    justify-content: end;
    float: right
} */
.card-img-top {
    width: 135px;
    padding: 10px;
}
.card {
    /* width: 180px; */
    border: none;
    box-shadow: 1px 1px 8px #A1A1A1;
    position: sticky;
    margin: 5px;
}
/*
.card-title {
    font-size: 16px;
}
.card-text {
    font-size: 12px;
} */
/* .card-img {
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
} */
.card-body {
    padding-top: 0;
    padding-bottom: 0;
}
/* .card-list {
    justify-content: end;
    overflow-y: scroll;
    height: 500px;
    height: 90vh;
    position: absolute;
    right: 35px;
    top: 100px;
} */
.cards-grid {
    display: grid;
    /* grid-template-columns: 1fr 1fr; */
    grid-template-columns: 50% 50%;
}
/* .card-detail {
    width: 500px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 13px;
    z-index: auto;
    position: absolute;
    right: 450px;
    float: right;
    margin-top: 315px;
} */
.popUp--card {
    width: 40vw;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 13px;
    z-index: auto;
    position: absolute;
    right: 30vw;
    margin-top: 0;
    top: 11vh;
    border: 0;
    border-radius: 0;
    background: #000;
    box-shadow: none !important;
}
.card-detail-image {
    display: grid;
    justify-content: center;
    align-items: center;
}
.cart-item-body {
    display: flex;
    align-items: center;
}
.btn-tab {
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
    border-top: none;
    border-left: none;
    border-right: none;
}
/* .btn-tab-active {
    border-bottom: 1px solid #4FBBEE;
} */
.vdr.active:before {
    outline: 0px;
}
.fade-enter-from {
    opacity: 0;
    transform: translateY(-10px)
}
.fade-enter-to {
    opacity: 0;
    transform: translateY(0)
}
.fade-enter-active {
    transition: all 0.1s ease;
}
.transform-rotate {
    transform: v-bind(rotate)
}
/* width */
::-webkit-scrollbar {
    width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
    background: #F1F1F1;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #4FBBEE;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>