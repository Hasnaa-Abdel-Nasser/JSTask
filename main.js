

let table = document.querySelector("tbody");
let inputs = document.querySelectorAll("input");
let text = document.querySelector("textarea");
let btn = document.querySelector("button");
let  updateButton= document.getElementsByClassName("update-btn")[0];
updateButton.style.display = "none";
let List = []
if(window.localStorage.getItem('Data')){
    List = JSON.parse(window.localStorage.getItem('Data'));
    main();
}

function main(){
    let table2 = document.createElement("tbody");
    for(let i=0;i< List.length;i++){
        table2.appendChild(Table(i));
    }
    table.innerHTML = table2.innerHTML;
}
function Table(i){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        td.innerHTML = List[i].index;
        td1.innerHTML = List[i].name;
        td2.innerHTML = List[i].price;
        td3.innerHTML = List[i].category;
        td4.innerHTML = List[i].Des;
        td5.innerHTML = List[i].icon1;
        td6.innerHTML = List[i].icon2;
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
       return tr;
}
btn.onclick = function(){
    List.push(
        {
            index: List.length+1,
            name: inputs[0].value,
            price: inputs[1].value,
            category: inputs[2].value,
            Des: text.value,
            icon1 :`<button class = "update" onclick = "updateTask(${List.length})"><i class="fa-solid fa-file-pen"></i></button>`,
            icon2 :`<button class = "delete" onclick = "deleteTask(${List.length})"><i class="fa-solid fa-trash"></i></button>`
        }
    );
    [inputs[0].value , inputs[1].value , inputs[2].value , text.value] = ['','','',''];
    Table(List.length-1);
    window.localStorage.setItem('Data' ,  JSON.stringify(List));
};


function deleteTask(i){
    List = List.filter((val)=>{return val.index !== i+1});
    window.localStorage.setItem('Data' ,  JSON.stringify(List));
    main();
};

let num = 0;
function updateTask(i){
    updateButton.style.display = "inline";
    window.scrollTo({
        top: screen.height,
        behavior: "smooth"
    });
    num = i+1;
    [inputs[0].value , inputs[1].value , inputs[2].value , text.value] = [List[i].name , List[i].price , List[i].category , List[i].Des];
}


updateButton.onclick =function(){
    updateButton.style.display = "none";
    let arr = {
            index: num,
            name: inputs[0].value,
            price: inputs[1].value,
            category: inputs[2].value,
            Des: text.value,
            icon1 :`<button class = "update" onclick = "updateTask(${num-1})"><i class="fa-solid fa-file-pen"></i></button>`,
            icon2 :`<button class = "delete" onclick = "deleteTask(${num-1})"><i class="fa-solid fa-trash"></i></button>`
    }
    List[num-1] = arr;
    [inputs[0].value , inputs[1].value , inputs[2].value , text.value] = ['','','',''];
    window.localStorage.setItem('Data' ,  JSON.stringify(List));
    main();
}
