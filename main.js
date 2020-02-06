var canvas = document.getElementById("main-Canvas");
var ctx = canvas.getContext("2d");
var canvasObjects = [];
var Nodes = [];
var isDragging = false;
var mouseStruct = { x: 0, y:0 }
var currentObject = 0;
var currentLeadNode = 0;

const rect = canvas.getBoundingClientRect();

// classes

class Box {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        
        this.width = width;
        this.height = height;
        
        this.x2 = x + width;
        this.y2 = y + height;
        this.text = text
        
    }
    
    updateCoord(newX,newY) {
        this.x = newX;
        this.y = newY;
        this.x2 = newX + this.width;
        this.y2 = newY + this.height;
    }
    
    
}

class Node {
    constructor(box, mother, canvasIndex) {
        this.box = box;
        this.mother = mother;
        this.nodes = [];
        this.canvasIndex = canvasIndex;
    }
    
    addNode(node) {
        this.nodes.push(node);
    }
    
    sliceNode(number) {
        this.nodes.slice(number);
    }
}


// functions 

function addNode(event) {
    console.log("added node");
    
    var pushbox = new Box(event.offsetX,event.offsetY,200,100, "Sexy");
    canvasObjects.push(pushbox);
    for(var i = 0; i < canvasObjects.length;i++) {
        console.log(canvasObjects[i]);
    }
    var index = canvasObjects.length;
    mainNode.addNode(new Node(canvasObjects[index - 1]), mainNode, 3);
    drawBox(canvasObjects[index - 1]);
    canvas.removeEventListener("click", addNode);
}

function inputText(event) {
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.attr
}

function useTool(toolType) {
    switch(toolType) {
        case "addNode":
            canvas.addEventListener("click", addNode);
    }
}

function setAddNode() {
    useTool("addNode");
}

function drawBox(boxObject) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(boxObject.x, boxObject.y, boxObject.width, boxObject.height);
   
    ctx.font = "30px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(boxObject.text, boxObject.x + boxObject.width / 2 - boxObject.text.length * 8, boxObject.y + boxObject.height / 2 +10 );
     ctx.stroke();
    ctx.closePath();
}

function chainNodes(node) {
    for(var i = 1;  i <= node.nodes.length; i++) {
        connectNodes(canvasObjects[0], canvasObjects[i]);
    }
}

// returns index of current canvas object or -1 if mousePos doesnt overlap with anything
function findObject(event) {
    for( var i = 0; i < canvasObjects.length; i++) {
        var _tmpOb = canvasObjects[i];
        if(event.offsetX > _tmpOb.x && event.offsetX < _tmpOb.x2) {
            if(event.offsetY > _tmpOb.y && event.offsetY < _tmpOb.y2) {
                console.log(i);
                return i;
            }
        } 
    }
    console.log("Nothing found");
    return -1;
}



function drawCanvas() {
    for(var i = 0; i < canvasObjects.length; i++) {
            chainNodes(mainNode);
            
            
        }
    
    for(var i = 0; i < canvasObjects.length; i++) {
           
            drawBox(canvasObjects[i]);
            
        }
}

function startDragObject(event) {
    if(findObject(event) != -1) {
        currentObject = findObject(event);
        isDragging = true;
        mouseStruct.x = event.offsetX - canvasObjects[currentObject].x;
        mouseStruct.y = event.offsetY - canvasObjects[currentObject].y;
        
        
    } }

function dragObject(event) {
    if(isDragging) {
        clearCanvas();
        canvasObjects[currentObject].updateCoord(event.offsetX - mouseStruct.x, event.offsetY - mouseStruct.y);
        drawCanvas();
        
    }
    
}
    
function endDrag(event) {
        mouseStruct.x = 0;
        mouseStruct.y = 0;
        currentObject = -1;
        isDragging = false;
    }

function drawAt(event) {
    var mcX = event.offsetX;
    var mcY = event.offsetY;
    ctx.beginPath();
    ctx.rect(mcX, mcY, 10, 15);
    ctx.stroke();


}
    
    

function clearCanvas() {
    ctx.beginPath();
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function connectNodes(node1, node2) {
    ctx.beginPath();
    ctx.moveTo(node1.x + node1.width / 2, node1.y +( node1.width / 4));
    ctx.lineTo(node2.x + node2.width / 2, node2.y +(node2.width / 4));
    ctx.stroke();
    ctx.closePath();
}

// create nodes, for testing purposes 

firstNode = new Box(20, 30, 200, 100, "Hellosios");
secondNode = new Box(300, 70, 200, 100, "Icarus");
thirdNode = new Box(90, 300, 200, 100, "Thelios");
var mainNode = new Node(firstNode, null, 0);

mainNode.addNode(new Node(secondNode, mainNode, 1));
mainNode.addNode(new Node(thirdNode, mainNode, 2));

canvasObjects.push(firstNode);
canvasObjects.push(secondNode);
canvasObjects.push(thirdNode);


//init drawCanvas 
drawCanvas();

// add eventlistners
canvas.addEventListener("mousedown", startDragObject);
canvas.addEventListener("mousemove", dragObject);
canvas.addEventListener("mouseup", endDrag);

document.getElementById("add-node").addEventListener("click", setAddNode);


