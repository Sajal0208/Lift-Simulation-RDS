class Store {
    constructor(floors, lifts) {
        this.floors = floors;
        this.lifts = lifts;
        this.state = new Map();
        for(let i=0; i<floors; i++) {
            this.state.set(i, {
                floor: 1,
                moving: false,
                open: false,
                reachFloor: null,
                direction: "up",
            });
        }
    }

    getLiftState(lift) {
        return this.state.get(lift);
    }

    getState() {
        return this.state;
    }

    getTotalFloors() {
        return this.floors;
    }

    getTotalLifts() {
        return this.lifts;
    }

    setState(lift, newState) {
        const currentState = this.getLiftState(lift);
        for(let key in newState) {
            currentState[key] = newState[key];
        }
        this.state.set(lift, currentState);
    }
}   

class LiftQueue {
    constructor() {
        this.queue = [];
        this.size = 0;
    }

    push(request) {
        this.queue.push(request);
        this.size++;
    }

    pop() {
        if(this.size === 0) {
            return null;
        }
        this.size--;
        return this.queue.shift();
    }

    top() {
        if(this.size === 0) {
            return null;
        }
        return this.queue[0];
    }

    empty() {
        return this.size === 0;
    }
}

let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");
let floors = document.getElementById("floors");
let lifts = document.getElementById("lifts");

let store = null;
let liftQueue = null;

startBtn.addEventListener("click", () => {
    let numFloors = floors.value;
    let numLifts = lifts.value;
    if(numFloors < 2) return;
    console.log("Creating floors", numFloors);
    console.log("Creating lifts", numLifts);
    startSimulation(numFloors, numLifts);
});

const startSimulation = function (numFloors, numLifts) {
    queueInit();
    initStore(numFloors, numLifts);
    createFloors(numFloors);
    createLifts(numLifts);
}

const queueInit = function () {
    if (liftQueue) {
        liftQueue = null;
    }
    liftQueue = new LiftQueue();
}

const initStore = function (floors, lifts) {
    if (store) {
      store = null;
    }
    store = new Store(floors, lifts);
};

const moveLift = function (e) {

}

const createFloors = function (floors) {
    let floorsContainer = document.getElementById("floors-container");
    for(let i=floors-1; i>=0; i--) {
        // Setting up the Floor Container
        let floor = document.createElement("div");
        floor.classList.add("floor");
        floor.id = `floor-${i + 1}`;

        let floorNumber = document.createElement("div");
        floorNumber.classList.add("floor-number");

        // Setting up the Up Button
        let upBtn = document.createElement("button");
        upBtn.classList.add("floor-btn");
        upBtn.innerText = "⬆️";
        upBtn.addEventListener("click", (e) => {
            moveLift(e);
        });
        if(i === floors-1) {
            upBtn.classList.add("hide-button");
        }
        floorNumber.appendChild(upBtn);

        // Setting up the Floor Number
        let floorText = document.createElement("h2");
        floorText.classList.add("floor-text");
        floorText.innerText = `Floor ${i+1}`;
        floorNumber.appendChild(floorText);

        // Setting up the Down Button
        let downBtn = document.createElement("button");
        downBtn.classList.add("floor-btn");
        downBtn.innerText = "⬇️";
        downBtn.addEventListener("click", (e) => {
            moveLift(e);
        });
        if(i === 0) {
            downBtn.classList.add("hide-button");
        }
        floorNumber.appendChild(downBtn);
        
        // Appending the Floor to the Floors Container
        floor.appendChild(floorNumber);
        floorsContainer.appendChild(floor);
    }
}


const createLifts = function (lifts) {
    let container = document.getElementById("floors-container");
    let containerChildNodes = container.childNodes;
    let containerChildNodesLength = containerChildNodes.length;
    let firstFloor  = containerChildNodes[containerChildNodesLength - 1];
    let leftSpace = 30;
    let bottomSpace = 10;
    let liftSpacing = 150;
    let distanceFromLeft = 10;
    let liftWidth = 40;

    for(let i=0; i<lifts; i++) {
        let liftElement = document.createElement("div");
        liftElement.classList.add("lift");
        liftElement.id = `lift-${i + 1}`;
        liftElement.style.left = leftSpace + distanceFromLeft + liftSpacing + "px";
        distanceFromLeft = distanceFromLeft + liftWidth + liftSpacing;
        liftElement.style.bottom = bottomSpace + "px";
        firstFloor.appendChild(liftElement);
    }
}