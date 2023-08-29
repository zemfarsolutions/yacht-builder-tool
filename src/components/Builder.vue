<script setup>
import { computed, ref } from 'vue';
import VueDragResize from 'vue3-drag-resize'

const width = ref(0)
const height = ref(0)
const top = ref(0)
const left = ref(0)
const num = ref(0)
const checkImages = ref([]);

const rotate = computed(function() {
    return `rotate(${num.value}deg)`
})

function dragResize(newRect) {
    console.log(newRect)
    width.value = newRect.width
    height.value = newRect.height
    top.value = newRect.top
    left.value = newRect.left
}

function check(e) {
    console.log(checkImages.value);
}

const images = [];
for (let index = 0; index < 86; index++) {
    if (index != 28 && index != 0) {
        const element = 'image'+index+'.png';
        images.push(element) 
    }
}

const items = ref(images);

</script>

<template>
    
    <div class="container">
        <div class="row">

            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                        <h5 class="fw-bold">Select Tools:</h5>
                    </div>
                </div>

                <div class="row" style="overflow-y: scroll;overflow-x: hidden; height: 500px">
                    
                    <div class="col-md-6 image-container" v-for="(image, index) in items" :key="index">
                        
                        <input type="checkbox" 
                        :id="`dessert-`+index" 
                        v-model="checkImages"
                        @change="check($event)"/>

                        <label :for="`dessert-`+index">
                            <img :src="`media/`+image" />
                        </label>
                    </div>

                </div>
            </div>

            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                        <h5 class="fw-bold">Tools:</h5>
                    </div>
                </div>

                <div class="row"> 
                    <div class="col-md-6" v-for="(image, index) in items" :key="index">
                        
                        <VueDragResize
                        :is-active="false"
                        :w="100"
                        :h="90"
                        v-if="image == 'image1.png'"
                        style="position: relative;"
                        class="bg-primary-100 dark:bg-gray-800"
                        @resizing="dragResize"
                        @dragging="dragResize"
                        >
                            <img :src="`media/`+image" alt="" class="w-50">
                        </VueDragResize>

                    </div>
                </div>
            </div>
           
            <div class="col-md-8">
                <div class="content">
                    <div class="canvas">
                        <img src="/media/image28.png" alt="" style="width: 400px">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.image-container {
    height: 100px;
    background-color: #ffffff;
    box-shadow: 0 0 25px rgba(17, 1, 68, 0.08);
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
}

.image-container img {
    width: 70%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  cursor: pointer;
}
input[type="checkbox"]:after {
  position: relative;
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: "\f111";
  font-size: 18px;
  color: #478bfb;
  z-index: 999;
  right: 5px;
  top: -1px;
}
input[type="checkbox"]:checked:after {
  font-weight: 900;
  content: "\f058";
  color: #478bfb;
}

.aside {
    top: 0;
    left: 0;
    width: 250px;
    height: 500px;
    position: relative;
}

.content {
    height: 500px;
    width: 1000px;
    padding: 30px;
    background-color: skyblue;
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