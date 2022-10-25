//визначаємо розмір сторінки
/*const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
//підключаємо Canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let  n = 16;
let width = pageWidth *0.4;//задаємо значення сторони вікна Canvas
let numberStr;//визначаємо розмірність
let widthNumber;//визначаємо значення сторони клітинки
let arrN = [];//масив чисел 
let arr = [];// масив данних
let arrEtalon = [];
let k = 0;//зберігаємо позицію цифри в масиві
let zeroNum;//позиція пустої клітинки
let x = 0;
let y = 0;
let f = 0;//цифра
let clickXY;//координати кліку
let clickNum;//цифра кліку
let m; //попередня кількість клітин
let numClick = 0;//кількість кліків за гру*/


let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let pageWidth = document.documentElement.scrollWidth;  

//загружаємо збережені дані або початкові
const data = JSON.parse(localStorage.getItem('data')) || {   
    n : 16,
    width : pageWidth *0.4,
    numberStr :0,
    widthNumber:0,
    arrN : [],
    arr : [],
    arrEtalon : [],
    progres : [0],
    k : 0,
    zeroNum:0,
    x : 0,
    y : 0,
    f : 0,
    clickXY:0,
    clickNum:0,
    m:0,
    numClick : 0,
}

document.getElementById("myCanvas").width= data.width;//задаємо ширину поля
document.getElementById("myCanvas").height= data.width;//задаємо висоту поля
document.getElementById("textarea").value = data.numClick;//показуємо кількість кліків
let tex = document.getElementById('textarea');

//продовжуєм гру
if (localStorage.getItem('data')) {
    start(); 
}

                                        //НОВА ГРА ПРИ ЗМІНІ РОЗМІРНОСТІ//
// визначення розмірності
document.getElementById("input").addEventListener('input', (event) => {
    const value = +event.target.value;
    if (+value) {       
       data.n = value;              
       begin();    
    }   
})
// формуємо дошку
function begin() {
    data.m = data.n;
    data.f = 0;
    data.x = 0;
    data.y = 0;
    data.k = 0;
    data.numClick = 0;
   //затираємо масиви
   for (let i = 0; i < data.m; i++) {
    data.arrN.pop(); 
    data.arr.pop(); 
    data.arrEtalon=[]; 
    ctx.clearRect(0,0, data.width, data.width);   
}
    data.numberStr = Math.trunc(Math.sqrt(data.n)); //визначаємо розмірність
    data.widthNumber = Math.floor(data.width/data.numberStr);//визначаємо значення сторони клітинки
//створюємо масив чисел
for (let i = 1; i < data.n; i++) {
    data.arrN.push(i); 
    data.arrEtalon.push(i);    
}
data.arrEtalon.push('');
data.arrN.sort(() => Math.random() - 0.5);//сортуємо масив чисел
//створюємо масив данних
for (let i = 1; i <= data.numberStr; i++) {
    for (let j = 1; j <= data.numberStr; j++) {       
        data.arr.push([data.x, data.y, data.arrN[data.f]]); 
       data.f++;        
       data.x = j * data.widthNumber;           
    } 
    data.x = 0;
    data.y = i * data.widthNumber;     
}
data.zeroNum = data.n-1;
data.arr[data.zeroNum][2]='';//видаляємо цифру останного елемента,  пустого квадрату
//малюємо дошку
data.arr.map(discribe);
document.getElementById("textarea").value = '';
}

//ГРА
c.addEventListener('click', function(event) {
    let clickX = Math.floor(event.offsetX/data.widthNumber)*data.widthNumber;
    let clickY = Math.floor(event.offsetY/data.widthNumber)*data.widthNumber;    
    data.clickXY = [clickX, clickY]; //визначаємо координати кліку    
    //визначаємо цифру кліку
    for (let i = 0; i < data.arr.length; i++) {
        if (data.clickXY[0] === data.arr[i][0] && data.clickXY[1] === data.arr[i][1]) {
            data.clickNum = data.arr[i][2];
            data.k = i;// зберігаємо позицію цифри в масиві
            break;
        }               
    }     
  
if ((data.clickXY[0] + data.widthNumber === data.arr[data.zeroNum][0] && data.clickXY[1]  === data.arr[data.zeroNum][1]) || 
    (data.clickXY[0] - data.widthNumber === data.arr[data.zeroNum][0] && data.clickXY[1]  === data.arr[data.zeroNum][1]) ||
    (data.clickXY[1] - data.widthNumber === data.arr[data.zeroNum][1] && data.clickXY[0]  === data.arr[data.zeroNum][0]) ||
    (data.clickXY[1] + data.widthNumber === data.arr[data.zeroNum][1] && data.clickXY[0]  === data.arr[data.zeroNum][0])){
      game();        
}
document.getElementById("textarea").value = data.numClick; 

localStorage.setItem ('data', JSON.stringify(data));        //зберігаємо дані гри
if(JSON.stringify(data.arrEtalon) === JSON.stringify(data.arrN)){ //перевіряемо перемогу  
   
    if (data.progres.length < 10) {
        data.progres.push(data.numClick);
    } else {
        data.progres[10] = data.numClick;
    }
    data.progres.sort((a, b) => a - b); 

    //задаємо правило запису нової операції з нової строки в полі виводу

  document.getElementById('textarea').value += "\n";// перенос на новую строку
  tex.scrollTop = tex.scrollHeight;// виставляем фокус на последней строке    
    alert('end');
}
});

function game() {
    data.arr[data.zeroNum][2] = data.clickNum;//записуємо цифру кліку в пусту клітинку
    data.arrN[data.zeroNum]= data.clickNum;
    discribe(data.arr[data.zeroNum]);//перемальовуємо клітинку
    ctx.clearRect(data.arr[data.k][0],data.arr[data.k][1], data.widthNumber, data.widthNumber);//стираємо стару клітинку     
    data.arr[data.k][2]=''; 
    data.arrN[data.k]='';  
    data.zeroNum = data.k;             
    data.clickXY = 0; 
    data.numClick++;  
}

function discribe(e) {   
    ctx.fillStyle = 'black';
    ctx.strokeStyle = "white";
    ctx.strokeRect(e[0], e[1], data.widthNumber, data.widthNumber,tag='133');
    ctx.font = '18px serif';   
    ctx.fillText(e[2], e[0]+(data.widthNumber/2), e[1]+(data.widthNumber/2));    
 }

function start() {
data.arr.map(discribe);     
}



