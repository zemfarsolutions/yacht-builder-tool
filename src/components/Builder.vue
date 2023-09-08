<script setup>
import { computed, ref, watch } from 'vue';
import VueDragResize from 'vue3-drag-resize'

const width = ref(0)
const height = ref(0)
const top = ref(0)
const left = ref(0)

function dragResize(newRect) {
    width.value = newRect.width
    height.value = newRect.height
    top.value = newRect.top
    left.value = newRect.left
}

const draggables = ref([
    {
        id: 1,
        path: 'image39.png'
    },
    {
        id: 3,
        path: 'image41.png'
    }
]);

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
        cost: 4995
    },
    {
        id: 2,
        path: 'image40.png',
        name: 'Double Jet Ski Dock',
        capacity: 8,
        size: '5x3m',
        anchors: 5,
        cost: 5199
    },
    {
        id: 3,
        path: 'image41.png',
        name: '3x2 Dock',
        capacity: 5,
        size: '3x2m',
        anchors: 2,
        cost: 3144
    },
    {
        id: 4,
        path: 'image61.png',
        name: '4x2 Dock',
        capacity: 6,
        size: '4x2m',
        anchors: 3,
        cost: 2599
    },
    {
        id: 5,
        path: 'image57.png',
        name: 'Doggy Dock',
        capacity: 7,
        size: '1.4x1m',
        anchors: 4,
        cost: 4122
    },
    {
        id: 6,
        path: 'image58.png',
        name: 'Sea Pool',
        capacity: 7,
        size: '5x4m',
        anchors: 4,
        cost: 4122
    },
    {
        id: 7,
        path: 'image47.png',
        name: 'Inflatable Lounger',
        capacity: 7,
        size: '2x2m',
        anchors: 4,
        cost: 4122
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

function addToCart(val) {
    cart.value.push(val);
}

const cart = ref([
])

const cartCost = ref(0);
const cartAnchor = ref(0);
const cartCapacity = ref(0);

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
</script>

<template>
    
    <nav class="navbar navbar-light" style="background-color: white;">
        <div class="container-fluid justify-content-start">
            <span class="fw-bold mx-2"><font-awesome-icon icon="person" /> <span style="color: rgb(37 182 200);">{{ cartCapacity }}</span></span>
            <span class="fw-bold mx-2"><font-awesome-icon icon="anchor" /> <span style="color: rgb(37 182 200);">{{ cartAnchor }}</span></span>
            <span class="fw-bold mx-2"><font-awesome-icon icon="dollar" /> <span style="color: rgb(37 182 200);">{{ Intl.NumberFormat().format(cartCost) }}</span> </span>
        </div>
    </nav>

    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <div class="content">
                    <div class="canvas">
                        <img src="/media/image28.png" alt="" style="width: 400px;">
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
                                <img :src="`media/`+productDetail.path" width="100" class="img-fluid rounded-start" alt="...">
                            </div>
                        </div>
                    </div>
                </transition>

            </div>

            <div class="col-md-3">
                <button @click="changeMenu('products')" :class="currentTab === 0 ? `btn btn-outline-light text-secondary mx-2 btn-tab btn-tab-active` : 'btn btn-outline-light text-secondary mx-2 btn-tab'">
                    Products
                </button>
                <button @click="changeMenu('summary')" :class="currentTab === 1 ? `btn btn-outline-light text-secondary mx-2 btn-tab btn-tab-active` : 'btn btn-outline-light text-secondary mx-2 btn-tab'">
                    Summary
                </button>
            </div>
            
            <div v-show="products" class="row card-list">
                <div class="col-md-4 cards-grid">

                    <div 
                    v-for="product in productList"
                    @mouseover="showProductDetail(product)" 
                    @mouseleave="hideProductDetail(product)" 
                    @click="addToCart(product)"
                    class="card mt-2">
                        <div class="card-img">
                            <img :src="`media/`+product.path" class="card-img-top" alt="...">
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
                                                <img :src="`media/`+item.path" width="100" class="img-fluid rounded-start" alt="...">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="draggableItems">
            <div class="draggableItem" v-for="draggable in draggables">
                <VueDragResize 
                :w="180" 
                :h="120" 
                v-on:resizing="dragResize" 
                v-on:dragging="dragResize"
                :isResizable="false">
                    <img :src="`media/`+draggable.path" class="w-50" alt="">
                </VueDragResize>
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
    z-index: 9999;
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
    border-bottom: 1px solid skyblue;
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


.content {
    height: 550px;
    background-color: skyblue;
    width: 100%;
    max-width: 800px;
    position: absolute;
    display: grid;
    place-items: center center;
}

.canvas {
    transform: rotate(180deg);
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
  background: skyblue;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>