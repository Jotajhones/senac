//FUNCAO CARROSSEL versao 1

// const controls = document.querySelectorAll('.control');
// let currentItem = 0;
// const items = document.querySelectorAll('.item');
// const maxItems = items.length;

// controls.forEach((control) =>{
//     control.addEventListener('click',(e)=>{
//         const isleft = e.target.classList.contains('arrow-left')
//         if(isleft){
//             currentItem -= 1;
//         }else{
//             currentItem += 1;
//         }
        
//         if(currentItem >= maxItems){
//             currentItem = 0;
//         }
//         if(currentItem < 0){
//             currentItem = maxItems - 1;
//         }
//         items.forEach((item)=>item.classList.remove('current-item'));
//         items[currentItem].scrollIntoView({
//             behavior:'smooth',
//             inline:'center'
//         });
//         items[currentItem].classList.add("current-item")
//     });
// });

// Slider

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(()=>{
    nextImage();
},4000)

function nextImage(){
    count++;
    if(count >= 4){
        count = 1;
    }
    document.getElementById(`radio${count}`).checked = true;
}

let count2 = 1;
document.getElementById("mradio1").checked = true;

setInterval(()=>{
    nextImageM();
},4000)

function nextImageM(){
    count2++;
    if(count2 >= 4){
        count2 = 1;
    }
    document.getElementById(`mradio${count}`).checked = true;
}

let count3 = 1;
document.getElementById("kradio1").checked = true;

setInterval(()=>{
    nextImageK();
},4000)

function nextImageK(){
    count3++;
    if(count3 >= 4){
        count3 = 1;
    }
    document.getElementById(`kradio${count}`).checked = true;
}

