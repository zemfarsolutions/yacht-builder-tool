<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

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
const num = ref(0)
const checkImages = ref([{
        path: 'image1.png'
    }]);
const checkedImages = ref([]);
const result = ref([{
        path: 'image1.png'
    }]);

const rotate = computed(function() {
    return `rotate(${num.value}deg)`
})


function check(e) {
    
    for (let index = 0; index < checkImages.value.length; index++) {

        const check = checkedImages.value.includes(checkImages.value[index]);
        
        if (!check) {

            const obj = {
                path: checkImages.value[index]
            }

            checkedImages.value.push(obj)

            var props = ['path'];
        
            console.log(checkedImages.value)

            result.value = checkImages.value.filter(function(o1){

                // filter out (!) items in result2
                return !checkedImages.value.some(function(o2){
                    return o1.path === o2.path;          // assumes unique id
                });

            }).map(function(o){

                // use reduce to make objects with only the required properties
                // and map to apply this to the filtered array as a whole
                return props.reduce(function(newo, path){
                    newo[path] = o[path];
                    return newo;
                }, {});

            });
        }
    } 

    console.log(result.value)
}

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
  
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
                        :value="image"
                        :disabled="image.path == 'image1.png'"
                        v-model="checkImages"
                        @change="check($event)"/>

                        <label :for="`dessert-`+index">
                            <img :src="`media/`+image.path" />
                        </label>
                    </div>

                </div>
            </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
