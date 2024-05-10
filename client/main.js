import * as utils from './utilities.js' ;
import * as connect from './connect.js';
//import { json } from 'sequelize';


//localStorage.clear();

const nameText = document.getElementById('name');
const weekNumber = document.getElementById('week');
const createButton = document.getElementById('create');
const readButton = document.getElementById('read');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const resetButton = document.getElementById('reset');


const taskElement = document.getElementById('task');
const dayElement = document.getElementById('day');
const timeFromElement = document.getElementById('timeFrom');
const timeToElement = document.getElementById('timeTo');
const densityElement = document.getElementById('density');
const addTaskElement = document.getElementById('add-task');


const heatmapElement = document.getElementById('heatmap');

const heatMap = new utils.HeatMap();

function restoreMap(){
    heatMap.render(heatmapElement);
}
// utils.generateArrayFromHTML();
restoreMap();
resetButton.addEventListener('click', ()=>{
    localStorage.clear();
    restoreMap();
    location.reload();
})


createButton.addEventListener('click', async (e) => {
    const name = nameText.value; 
    const week = weekNumber.value;
    const data = utils.generateArrayFromHTML();
    const json = await connect.createUser(name, week, JSON.stringify(data))
    
    window.alert(JSON.stringify(json));
    //    await readAllData();
});

readButton.addEventListener('click', async (e) => {
    localStorage.clear();
    const name = nameText.value;
    const week = weekNumber.value;
    const json = await connect.readUser(name, week);
    try {
        localStorage.setItem('heatArray', (eval(json)[0].mapdata));
    } catch (error) {
        window.alert(error);
    }
    

    // console.log(json);
    heatMap.render(heatmapElement);
});

updateButton.addEventListener('click', async (e) => {
    const name = nameText.value;
    const week = weekNumber.value;
    const data = utils.generateArrayFromHTML();
    const json = await connect.updateData(name, week, JSON.stringify(data));
    console.log(json['status']) 
    window.alert(json['status']);  
    localStorage.setItem('heatArray', JSON.stringify(data));
    heatMap.render(heatmapElement);
});

deleteButton.addEventListener('click', async (e) => {
    const name = nameText.value;
    const week = weekNumber.value;
    const json = await connect.deleteData(name, week);
    console.log(json);
    window.alert(JSON.stringify(json));
    localStorage.clear();
    restoreMap();
    location.reload();
});




//keep the webpage consistent
nameText.addEventListener('keyup', ()=>{
    localStorage.setItem('username', nameText.value);})
weekNumber.addEventListener('keyup', ()=>{
    localStorage.setItem('weeknumber', weekNumber.value);})
taskElement.addEventListener('keyup', ()=>{
    localStorage.setItem('task-input', taskElement.value);})
dayElement.addEventListener('keyup', ()=>{
    localStorage.setItem('day', dayElement.value);})
timeFromElement.addEventListener('keyup', ()=>{
    localStorage.setItem('timeFrom', timeFromElement.value);})
timeToElement.addEventListener('keyup', ()=>{
    localStorage.setItem('timeTo', timeToElement.value);})
densityElement.addEventListener('keyup', ()=>{
    localStorage.setItem('density', densityElement.value);})

function loader() {
    taskElement.value = localStorage.getItem('task-input');
    dayElement.value = localStorage.getItem('day');
    timeFromElement.value = localStorage.getItem('timeFrom');
    timeToElement.value = localStorage.getItem('timeTo');
    densityElement.value = localStorage.getItem('density');
    nameText.value = localStorage.getItem('username');
    weekNumber.value = localStorage.getItem('weeknumber');
}

loader();

function clearTaskArea(){
    localStorage.setItem('task-input', '');
    localStorage.setItem('day', '');
    localStorage.setItem('timeFrom', '');
    localStorage.setItem('timeTo', '');
    localStorage.setItem('density', '');

    taskElement.value = localStorage.getItem('task-input');
    dayElement.value = localStorage.getItem('day');
    timeFromElement.value = localStorage.getItem('timeFrom');
    timeToElement.value = localStorage.getItem('timeTo');
    densityElement.value = localStorage.getItem('density');
}




addTaskElement.addEventListener('click', ()=>{
    try {
        if ((timeToElement.value - timeFromElement.value+1) < 0) {
            window.alert('Sorry, please make time interval valid');
        }
        for (let time = 0; time < timeToElement.value - timeFromElement.value+1; time++) {
            let selecttime = parseInt(timeFromElement.value)+parseInt(time);
            const cell = document.querySelector(`.cell[data-day="${dayElement.value}"][data-time="${selecttime}"]`);
            if (cell !== null) {
                cell.innerHTML = '';
            }
            utils.addTaskNote(cell, taskElement.value);
            for (let d = 1; d < 6; d++) {
                cell.classList.remove(`level-${d}`);
            }
            cell.classList.add(`level-${densityElement.value}`)
        }

        const data = utils.generateArrayFromHTML();
        localStorage.setItem('heatArray', JSON.stringify(data));
    } catch (error) {
        window.alert(error);
    }
     clearTaskArea();
     loader();
})



restoreMap();




