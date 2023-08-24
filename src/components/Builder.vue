<script setup>
import { computed, ref } from 'vue';
import VueDragResize from 'vue3-drag-resize'
const width = ref(0)
const height = ref(0)
const top = ref(0)
const left = ref(0)
const num = ref(0)


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

function onRotate() {
    num.value++
}

const images = [];
for (let index = 0; index < 86; index++) {
    if (index != 28) {
        const element = 'image'+index+'.png';
        images.push(element) 
    }
}

const items = ref(images);

</script>

<template>
    
    <div class="container">
        <div class="d-flex">
            
            <div class="row">
                <h5 class="fw-bold">Tools:</h5>
            </div>
            <div class="aside" >

                <div class="row">
                    <div class="col-md-6" v-for="image in items">
                        <VueDragResize
                        :is-active="false"
                        :w="200"
                        :h="140"
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
    
            <div class="content">
                <div class="canvas">
                    <img src="/media/image28.png" alt="" style="width: 400px">
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

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
</style>