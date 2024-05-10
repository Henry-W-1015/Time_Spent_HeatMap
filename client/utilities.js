


export class HeatMap {
    constructor(){
        //if I have 
        if (localStorage.getItem('heatArray') !== null) {
            this.data = localStorage.getItem('heatArray');
        }
        else{
            this.data = [];
        }
    }
    reset(){ 
        //
    };
    render(element){
        if (localStorage.getItem('heatArray') !== null) {
            this.data = JSON.parse(localStorage.getItem('heatArray'));
        }
        
        element.innerHTML = '';
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        // Generate cells for each day and time
        for (let day = 0; day < 7; day++) { // Adjust loop count for 7 days
            // Add day labels
            const rowLabel = document.createElement('div');
            rowLabel.classList.add('row-label');
            rowLabel.textContent = daysOfWeek[day];
            element.appendChild(rowLabel);

            for (let time = 0; time < 24; time++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.day = day;
                cell.dataset.time = time;
                if (this.data.length !== 0 ) {

                    if(this.data[(day)*24 + time].level !==0 &&
                    this.data[(day)*24 + time].notes !== ''){
                        addTaskNote(cell, this.data[(day)*24 + time].notes)
                        cell.dataset.day = this.data[(day)*24 + time].day;
                        cell.dataset.time = this.data[(day)*24 + time].time;
                        cell.classList.add(`level-${this.data[(day)*24 + time].level}`)
                    }
                }
                element.appendChild(cell);
            }
        }   

        // Add time labels
        for (let time = 0; time < 25; time++) {
            const label = document.createElement('div');
            label.classList.add('column-label');
            if(time === 0){label.textContent = '';}
            else{label.textContent = `${time-1}:00`;}
        
            element.appendChild(label);
        }
    }
}



export function addTaskNote(cell, task){
        let note = document.createElement('div')
        note.classList.add('note');
        note.textContent = task;
        cell.appendChild(note);
    }

export function generateArrayFromHTML() {
    const data = [];
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        const day = cell.dataset.day;
        const time = cell.dataset.time;
        const level = getIntensityLevel(cell.classList);
        const notes = getNotes(cell);

        data.push({ day, time, level, notes });
    });

    return data;
}

export function getIntensityLevel(classList) {
    const levelClass = Array.from(classList).find((className) => className.startsWith('level-'));
    return levelClass ? parseInt(levelClass.replace('level-', ''), 10) : 0;
}

export function getNotes(cell) {
    const noteContainer = cell.querySelector('.note');
    let notes = '';
    if (noteContainer !== null){
         notes = noteContainer.innerHTML;
    }
    return notes;
}

  