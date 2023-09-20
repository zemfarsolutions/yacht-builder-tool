<script setup>
import { ref, watch } from 'vue';
import html2pdf from "html2pdf.js";
import router from '../router';

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
        path: 'image39.png',
        name: 'Single Jet Ski Dock',
        capacity: 10,
        size: '4x3m',
        anchors: 3,
        cost: 4995,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 2,
        path: 'image40.png',
        name: 'Double Jet Ski Dock',
        capacity: 8,
        size: '5x3m',
        anchors: 5,
        cost: 5199,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 3,
        path: 'image41.png',
        name: '3x2 Dock',
        capacity: 5,
        size: '3x2m',
        anchors: 2,
        cost: 3144,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 4,
        path: 'image61.png',
        name: '4x2 Dock',
        capacity: 6,
        size: '4x2m',
        anchors: 3,
        cost: 2599,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 5,
        path: 'image57.png',
        name: 'Doggy Dock',
        capacity: 7,
        size: '1.4x1m',
        anchors: 4,
        cost: 4122,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 6,
        path: 'image58.png',
        name: 'Sea Pool',
        capacity: 7,
        size: '5x4m',
        anchors: 4,
        cost: 4122,
        rotate: ref(0),
        count: ref(0)
    },
    {
        id: 7,
        path: 'image47.png',
        name: 'Inflatable Lounger',
        capacity: 7,
        size: '2x2m',
        anchors: 4,
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
    cart.value.push(val);
}

// dynamic cart items
const cart = ref([
])  

const cartCost = ref(0);
const cartAnchor = ref(0);
const cartCapacity = ref(0);
const invoice = ref("");
// live summary info update
watch(
  () => cart,
  (newValue, oldValue) => {    
        cartCost.value = newValue.value.reduce((sum, item) => {
            return sum + item.cost
        }, 0);

        cartAnchor.value = newValue.value.reduce((sum, item) => {
            return sum + item.anchors
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

function rotateComponent(item, index, action) {

    let currentDeg = parseInt(draggableComponent.value[index].children[0].style.transform.match(/\d+/g)[0]);

    if (action == 'increment') {

        let incrementRotation = currentDeg += 10;
        draggableComponent.value[index].children[0].style.transform = "rotate("+incrementRotation+"deg)";
    }
    
    if (action == 'decrement') {

        let incrementRotation = currentDeg -= 10;
        draggableComponent.value[index].children[0].style.transform = "rotate("+incrementRotation+"deg)";
    }
}

const printcontent = ref(null)

async function printThis() {

    invoice.value = "<div class='text-white bg-white'>\
                        <div style='display: flow-root;margin-left: 220px;font-weight: 500;margin-top: 10px;'>\
                            <div class='d-flex float-start'>\
                                <h5 class='text-dark'>Name:</h5>\
                                <h5 class='text-code mx-2 fw-bold' style='color: #0070bc;'>"+props.data.name._value+"</h5>\
                            </div>\
                            <div class='d-flex float-end'>\
                                <h5 class='text-dark'>Date Drawn:</h5>\
                                <h5 class='text-code mx-2 fw-bold' style='color: #0070bc;'>"+currentDateWithFormat+"</h5>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='bg-white fw-bold' style='height: 220px;width: 130px;margin-left: 95px;position: absolute;border: 1px solid #878787;'>\
                        <div style='border-bottom: 2px solid rgb(0 112 188);'>\
                            <img width='100px' src='/media/logo.jpg'>\
                        </div>\
                        <div>\
                            <div class='text-dark  mb-1' style='font-size: 14px;'>Total Feature:</div>\
                            <div class='text-code' style='color: #0070bc;font-size: 14px;'>"+cart.value.length+"</div>\
                        </div>\
                        <div>\
                            <div class='text-dark  mb-1' style='font-size: 14px;'>Total Capacity:</div>\
                            <div class='text-code' style='color: #0070bc;font-size: 14px;'>"+cartCapacity.value+"</div>\
                        </div>\
                        <div>\
                            <div class='text-dark  mb-1' style='font-size: 14px;'>Total Cost:</div>\
                            <div class='mb-1 text-code' style='color: #0070bc;font-size: 14px;'>$"+cartCost.value+"</div>\
                        </div>\
                    \</div>";

    var opt = {
        margin:       1,
        filename:     'canvas.pdf',
        image:        { type: 'jpeg', quality: 1 },
    };

    html2pdf().set(opt).from(printcontent.value).save();
    
    await html2pdf(printcontent.value, opt);

    invoiceContent.value.style.display = "none";
    
}

// Delete Session Storage
function deleteSession() 
{
    sessionStorage.clear();
    router.push({name: 'Home'})
}

function sendEmail() {
    const client = new SMTPClient({
        user: 'developerzemfar@gmail.com',
        password: 'DDB1488E2BCEFF15AA1F33A489B25E19DC8A',
        host: 'smtp.elasticemail.com',
        ssl: true,
    });

    // send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: 'i hope this works',
            from: 'you <developerzemfar@gmail.com>',
            to: 'someone <developerzemfar@gmail.com>',
            subject: 'testing emailjs',
        },
        (err, message) => {
            console.log(err || message);
        }
    );
}
</script>


<template>
    
    <nav class="navbar navbar-light" style="background-color: white;display: block">
        <div style="display: flow-root">
            <div class="float-start">
                <span class="fw-bold mx-2"><font-awesome-icon icon="person" /> <span style="color: rgb(0 112 188);">{{ cartCapacity }}</span></span>
                <span class="fw-bold mx-2"><font-awesome-icon icon="anchor" /> <span style="color: rgb(0 112 188);">{{ cartAnchor }}</span></span>
                <span class="fw-bold mx-2"><font-awesome-icon icon="dollar" /> <span style="color: rgb(0 112 188);">{{ Intl.NumberFormat().format(cartCost) }}</span> </span>
                <span class="fw-bold mx-2"><font-awesome-icon icon="user" /> <span style="color: rgb(0 112 188);">{{ props.data.name._value }}</span></span>
            </div>
            <div class="float-end">
                <button @click="deleteSession()" class="btn btn-sm text-white mx-4" style="font-weight: 500;background: #0070bc;">
                    New Project
                </button>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="row">
            
            <div class="main">
                <div class="menu">
                    <button @click="changeMenu('products')" :class="currentTab === 0 ? `btn btn-outline-light text-secondary fw-bold mx-2 btn-tab btn-tab-active` : 'btn btn-outline-light text-secondary fw-bold mx-2 btn-tab'">
                        Products
                    </button>
                    <button @click="changeMenu('summary')" :class="currentTab === 1 ? `btn btn-outline-light text-secondary fw-bold mx-2 btn-tab btn-tab-active` : 'btn btn-outline-light text-secondary fw-bold mx-2 btn-tab'">
                        Summary
                    </button>
                </div>

                <div class="draggableItems" ref="printcontent">
                    
                    <div class="row" v-html="invoice" ref="invoiceContent">
                        
                    </div>

                    <img src="/media/image28.png" alt="" style="width: 400px;position: absolute;left: 200px;top: 235px;">
                    
                    <div class="draggableItem" 
                    ref="draggableComponent"
                    v-for="(draggable, index) in cart"
                    @mousedown="mousedown($event, index)"
                    >
                        <img :src="`/media/`+draggable.path" class="w-100" style="transform: rotate(0deg);">
                        <div class="actions">
                            <button class="btn btn-sm btn-light" @click="rotateComponent(draggable, index, 'increment')">
                                <font-awesome-icon icon="arrow-rotate-forward"/>
                            </button>
                            <button class="btn btn-sm btn-light">
                                <font-awesome-icon icon="arrow-rotate-backward" @click="rotateComponent(draggable, index, 'decrement')" />
                            </button>
                            <button class="btn btn-sm btn-light" @click="removeCartItem(draggable, index)">
                                <font-awesome-icon icon="trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
            
            <transition name="fade">
                <div v-show="cardDetail" class="card mb-3 card-detail">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body" style="padding: 20px;">
                                <h5 class="card-title fw-bold">{{ productDetail.name }}</h5>

                                <div style="display: flow-root">
                                    <p class="float-start">Capacity:</p>
                                    <p class="float-end">{{ productDetail.capacity }}</p>
                                </div>

                                <div style="display: flow-root">
                                    <p class="float-start">Size:</p>
                                    <p class="float-end">{{ productDetail.size }}</p>
                                </div>

                                <div style="display: flow-root">
                                    <p class="float-start">Anchors:</p>
                                    <p class="float-end">{{ productDetail.anchors }}</p>
                                </div>

                                <div style="display: flow-root">
                                    <p class="float-start">Cost:</p>
                                    <p class="float-end">${{ productDetail.cost }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 card-detail-image">
                            <img :src="`/media/`+productDetail.path" width="100" class="img-fluid rounded-start" alt="...">
                        </div>
                    </div>
                </div>
            </transition>

            <div v-show="products" class="row card-list">
                <div class="col-md-4 cards-grid">

                    <div 
                    v-for="product in productList"
                    @mouseover="showProductDetail(product)" 
                    @mouseleave="hideProductDetail(product)" 
                    @click="addToCart(product)"
                    class="card mt-2">
                        <div class="card-img">
                            <img :src="`/media/`+product.path" class="card-img-top" alt="...">
                            <span v-if="product.count.value > 0" class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger mt-1">
                                {{ product.count.value }}
                            </span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <div style="display: flow-root;font-family: inherit;">
                                <p class="card-text float-start">{{ product.size }}</p>
                                <p class="card-text float-end fw-bold">${{ Intl.NumberFormat().format(product.cost) }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div v-show="summary" class="row card-list">
                <div class="col-md-4">
                    <div class="card mt-2" style="width: 400px;box-shadow: none;">
                        <div class="row g-0">
                            <div class="col-md-12">
                                <div class="card-body">
                                    <div class="mt-2" style="display: flow-root">
                                        <p class="float-start fw-bold fs-6">FEATURE:</p>
                                        <p class="float-end text-danger fw-bold">{{ cart.length }}</p>
                                    </div>
                                    <div class="mt-2" style="display: flow-root">
                                        <p class="float-start fw-bold fs-6">CAPACITY:</p>
                                        <p class="float-end text-danger fw-bold">{{ cartCapacity }}</p>
                                    </div>
                                    <div class="mt-2" style="display: flow-root">
                                        <p class="float-start fw-bold fs-6">ANCHORS:</p>
                                        <p class="float-end text-danger fw-bold">{{ cartAnchor }}</p>
                                    </div>
                                    <div class="mt-2" style="display: flow-root">
                                        <p class="float-start fw-bold fs-6">TOTAL COST:</p>
                                        <p class="float-end text-danger fw-bold">$ {{ Intl.NumberFormat().format(cartCost) }}</p>
                                    </div>

                                    <hr>

                                    <div 
                                    v-for="item in cart"
                                    class="card mb-3" 
                                    style="width: 370px;">
                                        <div class="row g-0">
                                            <div class="col-md-4 p-3">
                                                <img :src="`/media/`+item.path" width="100" class="img-fluid rounded-start" alt="...">
                                            </div>
                                            <div class="col-md-8 cart-item-body">
                                                <div class="card-body">
                                                    <h5 class="card-title">{{ item.name }}</h5>
                                                    <div style="display: flow-root;font-family: inherit;">
                                                        <p class="card-text float-start">{{ item.size }}</p>
                                                        <p class="card-text float-end fw-bold">${{ Intl.NumberFormat().format(item.cost) }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer d-flex justify-content-center border-0 bg-white">
                                    <button class="btn text-white" style="font-weight: 500;background: #0070bc;" @click="printThis()">
                                        Print PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.container {
    padding: 0px;
    margin-top: 5px;
    margin: 0;
}

.draggableItems {
    height: 550px;
    background-color: #4fbbee;
    width: 100%;
    max-width: 800px;
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
    color: #0070bc;
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

.menu {
    z-index: 999;
    display: flex;
    justify-content: end;
    float: right
}
.card-img-top{
    width: 135px;
    padding: 10px;
}

.card {
    width: 180px;
    border: none;
    box-shadow: 1px 1px 8px #a1a1a1;
    position: sticky;
}

.card-title {
    font-size: 16px;
}
.card-text {
    font-size: 12px;
}

.card-img{
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-body{
    padding-top: 0;
    padding-bottom: 0;
}

.card-list {
    justify-content: end;
    overflow-y: scroll;
    height: 500px;
    position: absolute;
    right: 35px;
    top: 100px;
}

.cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.card-detail {
    width: 500px;
    font-family:sans-serif;
    font-weight: bold;
    font-size: 13px;
    z-index: auto;
    position: absolute;
    right: 450px;
    float: right;
    margin-top: 315px;
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
.btn-tab-active {
    border-bottom: 1px solid #4fbbee;
}

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


.transform-rotate{
    transform: v-bind(rotate)
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4fbbee;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>