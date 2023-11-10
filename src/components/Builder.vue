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
        rotate: ref(180),
        count: ref(0),
        width: ref(80)
    },
    {
        id: 2,
        path: 'double-jetski-dock.png',
        name: 'Double Jet Ski Dock',
        capacity: 8,
        size: '5x3m',
        cost: 5199,
        rotate: ref(0),
        count: ref(0),
        width: ref(90)
    },
    {
        id: 3,
        path: '3x2-dock.png',
        name: '3x2 Dock',
        capacity: 5,
        size: '3x2m',
        cost: 3144,
        rotate: ref(0),
        count: ref(0),
        width: ref(63)
    },
    {
        id: 4,
        path: '4x2-dock.png',
        name: '4x2 Dock',
        capacity: 6,
        size: '4x2m',
        cost: 2599,
        rotate: ref(0),
        count: ref(0),
        width: ref(67)
    },
    {
        id: 5,
        path: 'doggy-dock.png',
        name: 'Doggy Dock',
        capacity: 7,
        size: '1.4x1m',
        cost: 4122,
        rotate: ref(0),
        count: ref(0),
        width: ref(38)
    },
    {
        id: 6,
        path: 'sea-pool.png',
        name: 'Sea Pool',
        capacity: 7,
        size: '5x4m',
        cost: 4122,
        rotate: ref(90),
        count: ref(0),
        width: ref(120)
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
  (newValue) => {    
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
    
    await html2pdf(printcontent.value, opt);
    
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
    <nav class="navbar probdone navbar-dark navbar-expand-lg height--fixed">
        <div class="container-fluid">
            <a class="navbar-brand" href="https://yachtbuilder.wetestlink.com">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 220 199"
                                    fill="none" aria-hidden="true" focusable="false" class="icon icon-account">
                                    <path
                                        d="M180.47 55.22C179.82 56.25 179.3 57.41 178.49 58.29C177.53 59.32 176.13 59.51 174.75 59.51C171.19 59.51 167.62 59.52 164.06 59.5C163.51 59.5 163.16 59.57 163.06 60.22C162.16 65.89 159.92 71.01 156.39 76.02C156.83 76.33 157.36 76.61 157.77 77.02C160.23 79.45 162.7 81.88 165.11 84.37C166.93 86.25 167.13 88.94 165.72 91.04C164.31 93.13 161.72 94.08 159.45 93.17C158.61 92.84 157.81 92.26 157.16 91.62C154.41 88.94 151.72 86.2 148.96 83.43C148.62 83.65 148.3 83.85 148 84.06C143.59 87.05 138.79 89.08 133.5 89.9C132.78 90.01 132.62 90.33 132.63 90.99C132.66 94.55 132.66 98.12 132.64 101.68C132.62 105.1 130.3 107.44 127.1 107.34C124.52 107.26 122.3 105.39 122.11 102.81C121.91 100.16 122.01 97.49 121.98 94.82C121.97 93.47 122.01 92.12 121.95 90.77C121.94 90.49 121.64 90.02 121.41 89.99C115.68 89.04 110.49 86.81 105.65 83.39C104.95 84.12 104.26 84.85 103.56 85.55C101.61 87.51 99.5804 89.4 97.7104 91.44C95.1604 94.21 91.6604 93.94 89.6104 91.91C87.5704 89.9 87.2104 86.38 90.0704 83.74C92.5604 81.44 94.8904 78.96 97.2804 76.56C97.5204 76.32 97.7504 76.07 98.0104 75.8C97.2504 74.58 96.4604 73.4 95.7704 72.18C93.6604 68.48 92.2204 64.54 91.5804 60.32C91.4804 59.67 91.2104 59.48 90.5704 59.48C87.2804 59.51 83.9904 59.49 80.7104 59.49C76.8504 59.49 75.6004 58.67 74.1504 55.2C74.1504 54.51 74.1504 53.82 74.1504 53.12C75.6004 49.65 76.8504 48.83 80.7004 48.83C83.9504 48.83 87.2004 48.81 90.4604 48.84C91.1704 48.85 91.4504 48.66 91.6204 47.92C92.0604 45.9 92.5404 43.88 93.1804 41.91C94.2804 38.55 96.0004 35.47 98.1904 32.38C97.8604 32.14 97.5104 31.96 97.2404 31.69C94.7104 29.18 92.1904 26.66 89.6804 24.14C88.1904 22.65 87.6404 20.85 88.2104 18.82C89.3404 14.82 94.1504 13.49 97.1604 16.37C99.8104 18.91 102.36 21.54 104.96 24.13C105.22 24.39 105.5 24.63 105.76 24.88C110.51 21.51 115.62 19.25 121.3 18.39C121.96 18.29 122.02 17.93 122.02 17.38C122.01 13.82 122.02 10.25 122.01 6.68997C122.01 5.22997 122.25 3.77997 123.37 2.78997C124.22 2.02997 125.32 1.55997 126.31 0.969971C127 0.969971 127.69 0.969971 128.39 0.969971C131.86 2.41997 132.68 3.66997 132.68 7.51997C132.68 10.77 132.7 14.02 132.67 17.27C132.66 17.98 132.83 18.3 133.6 18.42C137.53 19.04 141.23 20.35 144.71 22.25C146.16 23.04 147.55 23.94 149.13 24.89C149.34 24.63 149.55 24.32 149.82 24.05C152.33 21.52 154.85 19 157.38 16.49C158.87 15 160.66 14.45 162.7 15.02C166.7 16.15 168.03 20.96 165.14 23.97C162.6 26.62 159.97 29.17 157.38 31.76C157.12 32.02 156.88 32.29 156.63 32.56C159.88 37.1 162.08 41.98 162.99 47.39C163.19 48.6 163.62 48.86 164.75 48.84C168.1 48.77 171.46 48.82 174.82 48.81C176.44 48.81 177.97 49.16 179.03 50.45C179.67 51.22 180.05 52.21 180.55 53.11C180.47 53.83 180.47 54.52 180.47 55.22ZM125.14 12.81C125.14 14.96 125.15 17.1 125.13 19.25C125.12 20.53 124.55 21.18 123.28 21.32C117.14 22.03 111.7 24.4 106.83 28.16C105.69 29.04 105.09 28.98 104.04 27.93C101.17 25.07 98.3104 22.2 95.4504 19.34C95.1804 19.07 94.9204 18.79 94.6104 18.57C93.7904 17.97 92.6604 18.06 91.9404 18.74C91.1904 19.45 91.0604 20.63 91.6704 21.48C91.8704 21.76 92.1304 22 92.3704 22.24C95.1804 25.06 98.0004 27.87 100.81 30.69C102.18 32.06 102.2 32.49 101.03 34.03C97.4204 38.78 95.1504 44.09 94.4404 50.04C94.2704 51.46 93.6504 52.01 92.1604 52.02C88.1804 52.03 84.2004 52.02 80.2204 52.03C79.8404 52.03 79.4504 52.02 79.0804 52.08C78.0604 52.23 77.2604 53.16 77.2504 54.16C77.2404 55.16 78.0404 56.11 79.0504 56.27C79.4604 56.33 79.8804 56.32 80.2904 56.32C84.2704 56.32 88.2504 56.32 92.2304 56.33C93.6004 56.33 94.2604 56.88 94.4104 58.17C95.1204 64.31 97.4804 69.75 101.25 74.62C102.13 75.75 102.07 76.36 101.03 77.41C98.1504 80.3 95.2604 83.19 92.3704 86.08C92.1304 86.32 91.8704 86.56 91.6704 86.84C91.0804 87.66 91.1604 88.79 91.8304 89.51C92.5404 90.26 93.7204 90.39 94.5704 89.79C94.8504 89.59 95.0904 89.33 95.3304 89.09C98.1504 86.28 100.96 83.46 103.78 80.65C105.11 79.32 105.63 79.29 107.15 80.44C111.76 83.95 116.91 86.16 122.65 86.97C124.77 87.27 125.11 87.62 125.11 89.74C125.11 93.62 125.1 97.49 125.12 101.37C125.12 101.88 125.15 102.42 125.32 102.89C125.65 103.79 126.7 104.33 127.58 104.16C128.68 103.96 129.38 103.11 129.39 101.84C129.41 97.65 129.39 93.46 129.4 89.28C129.4 87.83 129.93 87.18 131.28 87.02C137.38 86.3 142.8 83.97 147.64 80.23C148.84 79.3 149.42 79.34 150.51 80.42C153.4 83.3 156.29 86.2 159.18 89.08C159.45 89.35 159.72 89.63 160.03 89.84C160.83 90.37 161.93 90.24 162.61 89.58C163.32 88.89 163.46 87.75 162.91 86.92C162.7 86.61 162.42 86.34 162.15 86.07C159.31 83.23 156.48 80.39 153.64 77.55C152.37 76.28 152.35 75.83 153.46 74.37C157.1 69.59 159.39 64.26 160.1 58.27C160.26 56.89 160.88 56.32 162.29 56.32C166.27 56.31 170.25 56.32 174.23 56.31C174.64 56.31 175.07 56.32 175.47 56.26C176.48 56.11 177.28 55.16 177.28 54.16C177.27 53.16 176.47 52.22 175.45 52.08C175.08 52.03 174.69 52.03 174.31 52.03C170.29 52.03 166.28 52.04 162.26 52.02C160.9 52.02 160.25 51.46 160.1 50.15C159.38 44.01 157.02 38.57 153.25 33.71C152.39 32.61 152.44 32 153.43 31C156.34 28.08 159.25 25.17 162.16 22.26C162.4 22.02 162.66 21.78 162.86 21.5C163.44 20.68 163.35 19.54 162.67 18.83C161.95 18.09 160.78 17.97 159.92 18.58C159.64 18.78 159.4 19.04 159.16 19.28C156.32 22.12 153.48 24.96 150.64 27.8C149.37 29.07 148.91 29.09 147.47 27.99C142.7 24.34 137.36 22.06 131.37 21.35C129.95 21.18 129.4 20.56 129.4 19.07C129.39 14.95 129.4 10.83 129.39 6.70997C129.39 5.17997 128.51 4.16997 127.26 4.15997C126 4.14997 125.12 5.16997 125.11 6.68997C125.13 8.72997 125.14 10.77 125.14 12.81Z"
                                        fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" />
                                    <path
                                        d="M126.101 80.39C111.681 79.64 100.741 68.1101 101.021 54.0001C101.341 38.0601 113.481 27.7601 127.381 27.9301C143.191 28.1201 153.691 40.2401 153.551 54.3101C153.381 70.4801 140.171 81.01 126.101 80.39ZM112.171 36.69C115.351 39.88 118.451 42.9901 121.561 46.0801C121.691 46.2101 122.021 46.2601 122.181 46.1901C123.311 45.7101 124.431 45.1901 125.551 44.6801C125.551 40.2101 125.551 35.7001 125.551 31.1401C120.501 31.5801 116.111 33.37 112.171 36.69ZM136.771 52.4301C141.261 52.4301 145.771 52.4301 150.331 52.4301C149.881 47.3501 148.091 42.94 144.731 39.01C141.571 42.19 138.501 45.2801 135.451 48.3801C135.301 48.5301 135.261 48.9401 135.351 49.1601C135.781 50.2501 136.271 51.3101 136.771 52.4301ZM109.911 69.2201C113.011 66.1301 116.111 63.0301 119.201 59.9101C119.321 59.7801 119.381 59.4601 119.311 59.2901C118.831 58.1501 118.311 57.0401 117.801 55.9101C113.341 55.9101 108.821 55.9101 104.301 55.9101C104.411 60.3901 107.111 66.8301 109.911 69.2201ZM125.591 63.6301C124.641 63.2501 123.631 63.0001 122.811 62.4701C122.001 61.9501 121.581 62.1801 121.001 62.7701C118.561 65.2701 116.081 67.7301 113.601 70.1901C113.141 70.6501 112.631 71.06 112.071 71.56C116.111 74.97 120.521 76.7901 125.601 77.1901C125.591 72.5801 125.591 68.0901 125.591 63.6301ZM142.421 36.7201C138.531 33.3601 134.091 31.5801 129.011 31.1301C129.011 35.7101 129.011 40.23 129.011 44.67C130.141 45.17 131.231 45.6801 132.341 46.1201C132.551 46.2001 132.961 46.1401 133.111 45.9801C136.191 42.9601 139.251 39.9001 142.421 36.7201ZM117.821 52.4801C118.241 51.4601 118.551 50.42 119.081 49.51C119.471 48.84 119.321 48.5101 118.831 48.0301C116.291 45.5301 113.771 43.0001 111.261 40.4801C110.801 40.0201 110.401 39.51 109.901 38.94C106.471 42.99 104.651 47.4001 104.251 52.4801C108.881 52.4801 113.371 52.4801 117.821 52.4801ZM150.321 55.8901C145.721 55.8901 141.201 55.8901 136.771 55.8901C136.241 57.1801 135.741 58.4201 135.321 59.4501C138.541 62.6801 141.721 65.8801 144.941 69.1101C148.091 65.3501 149.911 60.9501 150.321 55.8901ZM129.031 63.64C129.031 68.15 129.031 72.6601 129.031 77.2201C134.101 76.7601 138.521 74.9801 142.251 71.7901C138.991 68.5301 135.801 65.34 132.641 62.19C131.501 62.64 130.291 63.13 129.031 63.64ZM133.541 54.1801C133.531 50.5701 130.871 47.9201 127.241 47.9301C123.711 47.9301 121.031 50.6301 121.041 54.1801C121.041 57.7401 123.721 60.44 127.241 60.44C130.871 60.43 133.551 57.7701 133.541 54.1801Z"
                                        fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" />
                                    <path
                                        d="M201.57 32.19C194.11 32.15 186.64 32.09 179.18 32.23C180.26 35.99 180.93 39.92 181.16 43.97H188.52C192.64 43.97 196.77 43.96 200.89 43.97C206.78 43.99 209.17 46.9 207.86 52.63C204.29 68.3 200.66 83.96 197.05 99.62C195.86 104.78 194.72 109.94 193.47 115.09C192.5 119.11 190.68 120.57 186.67 120.57C147.3 120.59 107.95 120.59 68.5898 120.57C64.5698 120.57 62.7398 119.09 61.7898 115.08C56.8598 94.19 51.9498 73.29 47.0798 52.4C45.8298 47.02 48.2298 44.01 53.6898 43.99C60.1098 43.97 66.5298 44 72.9398 44.02C73.1598 39.95 73.8398 36.01 74.9198 32.23C64.8398 32.14 54.7498 32.17 44.6798 32.23C42.9398 32.25 42.0698 31.85 41.6998 29.98C40.9398 26.14 39.9598 22.33 38.8998 18.56C36.6998 10.85 30.1198 5.80995 22.1598 5.68995C16.9498 5.60995 11.7498 5.63995 6.53981 5.67995C2.56981 5.70995 -0.0801904 8.19995 -0.000190423 11.68C0.0798096 15.05 2.65981 17.38 6.49981 17.43C10.9098 17.48 15.3398 17.45 19.7498 17.45C25.4698 17.45 26.8898 18.62 28.2198 24.25C35.5298 55.35 42.8498 86.46 50.1798 117.56C52.4698 127.27 58.9698 132.33 69.0098 132.34C88.5498 132.35 108.08 132.34 127.62 132.34C147.35 132.34 167.09 132.36 186.83 132.33C196.18 132.31 202.86 126.95 204.95 117.81C209.79 96.79 214.6 75.77 219.41 54.75C222.27 42.4 214.24 32.24 201.57 32.19Z"
                                        fill="currentColor" />
                                    <path
                                        d="M73.1695 148.26C59.2595 148.21 47.7995 159.52 47.7095 173.38C47.6195 187.42 59.0495 198.92 73.0495 198.91C86.9495 198.9 98.3395 187.53 98.3595 173.64C98.3895 159.73 87.0595 148.31 73.1695 148.26ZM73.0795 187.13C65.5495 187.15 59.4095 180.96 59.4995 173.41C59.5895 166 65.7195 160 73.1495 160.05C80.5695 160.1 86.6095 166.2 86.5895 173.62C86.5595 181.04 80.4995 187.1 73.0795 187.13Z"
                                        fill="currentColor" />
                                    <path
                                        d="M175.131 148.26C161.101 148.19 149.611 159.62 149.641 173.64C149.661 187.52 161.061 198.9 174.951 198.91C188.851 198.92 200.251 187.56 200.291 173.67C200.321 159.76 189.021 148.33 175.131 148.26ZM174.861 187.13C167.441 187.08 161.411 180.98 161.421 173.56C161.441 166.14 167.501 160.07 174.921 160.05C182.471 160.03 188.591 166.22 188.511 173.77C188.421 181.16 182.281 187.18 174.861 187.13Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="statistics--text--nav">{{ cart.length }}</span>
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

    <section class="main--canvas--body probdone" style="width: 100vw;">
        <div class="main">
            <div class="draggableItems" ref="printcontent">

                <div class="row" v-html="invoice" ref="invoiceContent"> </div>
                <div class="image--table">
                    <div class="image--table--row">
                        <img src="/media/canvas-ship.png" alt="main-canvas-ship" class="main--canvas--ship">

                <div class="draggableItem" ref="draggableComponent" v-for="(draggable, index) in cart"
                    @mousedown="mousedown($event, index)">

                    <img 
                    :src="`/media/images/` + draggable.path" 
                    class="" 
                    :style="'transform: rotate('+draggable.rotate+'deg);width:'+draggable.width+'px;'">

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
            </div>
        </div>

        <aside class="side--bar probdone">
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

            <div v-show="products" class="products--bar probdone">
                <div class="card-list">
                    <div class="cards-grid">
                        <div v-for="product in productList" @mouseover="showProductDetail(product)"
                            @mouseleave="hideProductDetail(product)" @click="addToCart(product)" class="card products--bar--card">
                            
                            <div class="card-img">
                                <img 
                                :src="`/media/images/` + product.path" alt="product-img" 
                                :style="'transform: rotate('+product.rotate.value+'deg)'">
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

            <div v-show="summary" class="summary--bar probdone">
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
    background: url('/media/canvas-bg.webp');
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