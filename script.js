//визначаємо розмір сторінки
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

//підключаємо Canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let  n = 16;
 



//задаємо значення сторони вікна Canvas
let width = pageWidth *0.4;
document.getElementById("myCanvas").width= width;
document.getElementById("myCanvas").height= width;


let lastEl;
let numberStr = Math.sqrt(n); //визначаємо розмірність
let widthNumber = Math.floor(width/numberStr);//визначаємо значення сторони клітинки
let arrN = [];//масив чисел 
let arr = [];// масив данних
let arrEtalon = [];
let arrF = [];
let k = 0;//зберігаємо позицію цифри в масиві
let x = 0;
let y = 0;
let f = 0;//цифра
let clickXY;//координати кліку
let clickNum;//цифра кліку
let m; //попередня кількість клітин
let numClick = 0;//кількість кліків за гру
let p = n-1;
document.getElementById("textarea").value = numClick;

begin();

// визначення розмірності
document.getElementById("input").addEventListener('input', (event) => {
    const value = +event.target.value;
    if (+value) { 
       m = n;
       f = 0;
       x = 0;
       y = 0;
       k = 0;
       numClick = 0;
       //затираємо масиви
       for (let i = 0; i < m; i++) {
        arrN.pop(); 
        arr.pop();    
    }
       n = value; 
       ctx.clearRect(0,0, width, width);       
       begin()    
    }   
})

// формуємо дошку
function begin() {
numberStr = Math.trunc(Math.sqrt(n)); //визначаємо розмірність
widthNumber = Math.floor(width/numberStr);//визначаємо значення сторони клітинки

//створюємо масив чисел
for (let i = 1; i < n; i++) {
    arrN.push(i); 
    arrEtalon.push(i);    
}
arrN.sort(() => Math.random() - 0.5);//сортуємо масив чисел

//створюємо масив данних
for (let i = 1; i <= numberStr; i++) {
    for (let j = 1; j <= numberStr; j++) {       
       arr.push([x,y,arrN[f]]); 
       f++;        
       x = j * widthNumber;           
    } 
    x = 0;
    y = i * widthNumber;     
}
lastEl = arr.pop();//видаляємо останній елемент, координати пустого квадрату

//малюємо дошку
arr.map(discribe);
//малюємо пусту клітинку
discribeZero();
}

function discribeZero() {   
    ctx.fillStyle = 'bisque';
    ctx.fillRect(lastEl[0], lastEl[1], widthNumber, widthNumber);     
}

function discribe(e) {   
   ctx.fillStyle = 'black';
   ctx.strokeStyle = "white";
   ctx.strokeRect(e[0], e[1], widthNumber, widthNumber,tag='133');
   ctx.font = '24px serif';   
   ctx.fillText(e[2], e[0]+(widthNumber/2), e[1]+(widthNumber/2));    
}


//гра
c.addEventListener('click', function(event) {
    let clickX = Math.floor(event.offsetX/widthNumber)*widthNumber;
    let clickY = Math.floor(event.offsetY/widthNumber)*widthNumber;    
    clickXY = [clickX, clickY]; //визначаємо координати кліку    
    //визначаємо цифру кліку
    for (let i = 0; i < arr.length; i++) {
        if (clickXY[0] == arr[i][0] && clickXY[1] == arr[i][1]) {
            clickNum = arr[i][2];
            k = i;// зберігаємо позицію цифри в масиві
            break;
        }               
    } 
    
  /*  if (clickXY[0] - widthNumber > 0 && clickXY[1]- widthNumber > 0 && clickXY[0] + widthNumber < width  && clickXY[y] + widthNumber < width) {}*/
if (clickXY[0] + widthNumber === lastEl[0] && clickXY[1]  === lastEl[1]){
    lastEl[2] = clickNum;//записуємо цифру кліку в пусту клітинку
    discribe(lastEl);//перемальовуємо клітинку
    arr[k][0]=lastEl[0];
    arr[k][1]=lastEl[1];   
    //arr[k][2]=''; 
   // arr[k][2]=clickNum;        
    lastEl[0] = clickXY[0];
    lastEl[1] = clickXY[1];
    lastEl[2] = '';
    ctx.clearRect(lastEl[0],lastEl[1], widthNumber, widthNumber);//стираємо стару клітинку            
    clickXY = 0; 
    numClick++;                
}
if (clickXY[0] - widthNumber === lastEl[0] && clickXY[1]  === lastEl[1]){
    lastEl[2] = clickNum;
    discribe(lastEl);
    arr[k][0]=lastEl[0];
    arr[k][1]=lastEl[1];       
    lastEl[0] = clickXY[0];
    lastEl[1] = clickXY[1];
    ctx.clearRect(lastEl[0],lastEl[1], widthNumber, widthNumber);
    clickXY = 0;   
    numClick++;          
}
if (clickXY[1] - widthNumber === lastEl[1] && clickXY[0]  === lastEl[0]){
    lastEl[2] = clickNum;
    discribe(lastEl);
    arr[k][0]=lastEl[0];
    arr[k][1]=lastEl[1];        
    lastEl[0] = clickXY[0];
    lastEl[1] = clickXY[1];
    ctx.clearRect(lastEl[0],lastEl[1], widthNumber, widthNumber);
    clickXY = 0;     
    numClick++;     
}
if (clickXY[1] + widthNumber === lastEl[1] && clickXY[0]  === lastEl[0]){
    lastEl[2] = clickNum;
    discribe(lastEl);
    arr[k][0]=lastEl[0];
    arr[k][1]=lastEl[1];      
    lastEl[0] = clickXY[0];
    lastEl[1] = clickXY[1];
    ctx.clearRect(lastEl[0],lastEl[1], widthNumber, widthNumber);
    clickXY = 0;  
    numClick++;        
}
document.getElementById("textarea").value = numClick;
arrF[p] = clickNum;
p = k;

//

  
    
     if(JSON.stringify(arrEtalon) === JSON.stringify(arrF)){
        alert('end');
     };

//

});









/*
document.addEventListener('click', function(event) {
let c= event.target.context;
    if (event.target.ctx.tag != undefined) { // якщо атрибут існує...
        ctx.font = '24 serif';
    }

  });*/