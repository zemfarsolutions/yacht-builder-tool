<script setup>
import { computed, ref } from 'vue';
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

const images = [];

for (let index = 0; index < 86; index++) {

    if (index != 28 && index != 0) {

        const img = {
            path: 'image'+index+'.png'
        }

        images.push(img) 

    }
}

const items = ref(images);
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

</script>

<template>
    
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Summary</a>
        </div>
    </nav>

    <div class="container">
            
        <!-- <div class="d-flex"> -->
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
                                    <div class="card-body">
                                        <h5 class="card-title">Risky Business 30</h5>
                                        <ul style="list-style: none;">
                                            <li style="font-size: 12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                            <li style="font-size: 12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                            <li style="font-size: 12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img src="media/view.jpg" class="img-fluid rounded-start" alt="...">
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
                    <div class="col-md-2">
    
                        <div 
                        @mouseover="cardDetail = true" 
                        @mouseleave="cardDetail = false" 
                        class="card mt-2">
                            <img src="media/view.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Risky Buisness 30</h5>
                                <p class="card-text">30cm / 12 cm XYZ.</p>
                            </div>
                        </div>
    
                        <div 
                        @mouseover="cardDetail = true" 
                        @mouseleave="cardDetail = false" 
                        class="card mt-2">
                            <img src="media/view.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Risky Buisness 30</h5>
                                <p class="card-text">30cm / 12 cm XYZ.</p>
                            </div>
                        </div>
    
                        <div 
                        @mouseover="cardDetail = true" 
                        @mouseleave="cardDetail = false" 
                        class="card mt-2">
                            <img src="media/view.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Risky Buisness 30</h5>
                                <p class="card-text">30cm / 12 cm XYZ.</p>
                            </div>
                        </div>
    
                    </div>
                    <div class="col-md-2">
    
                        <div 
                        @mouseover="cardDetail = true" 
                        @mouseleave="cardDetail = false" 
                        class="card mt-2">
                            <img src="media/view.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Risky Buisness 30</h5>
                                <p class="card-text">30cm / 12 cm XYZ.</p>
                            </div>
                        </div>
    
                        <div 
                        @mouseover="cardDetail = true" 
                        @mouseleave="cardDetail = false" 
                        class="card mt-2">
                            <img src="media/view.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Risky Buisness 30</h5>
                                <p class="card-text">30cm / 12 cm XYZ.</p>
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
                                            <p class="float-end text-danger">1</p>
                                        </div>
                                        <div class="mt-2" style="display: flow-root">
                                            <p class="float-start fw-bold fs-6">CAPACITY:</p>
                                            <p class="float-end text-danger">10</p>
                                        </div>
                                        <div class="mt-2" style="display: flow-root">
                                            <p class="float-start fw-bold fs-6">ANCHORS:</p>
                                            <p class="float-end text-danger">3</p>
                                        </div>
                                        <div class="mt-2" style="display: flow-root">
                                            <p class="float-start fw-bold fs-6">TOTAL COST:</p>
                                            <p class="float-end text-danger">$ 5,135</p>
                                        </div>

                                        <hr>

                                        <div class="card mb-3" style="width: 370px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="media/view.jpg" class="img-fluid rounded-start" alt="...">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Risky Buisness 30</h5>
                                                        <p class="card-text">30' 0" - 10 - $ 5,995</p>
                                                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
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
        <!-- </div> -->

    </div>

</template>

<style scoped>

.container {
    padding: 0px;
    margin-top: 5px;
    margin: 0;
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

.card-list {
    justify-content: end;
    overflow-y: scroll;
    height: 500px;
    position: absolute;
    right: 35px;
    top: 100px;
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
    height: 500px;
    padding: 30px;
    background-color: skyblue;
    width: 830px;
    position: absolute;
}

.canvas {
    margin-top: 150px;
    display: flex;
    justify-content: center;
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