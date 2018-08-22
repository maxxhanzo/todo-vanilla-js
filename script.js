var dragIndex = "";
var dropIndex = "";
var dragNode;



var items = [];
// localStorage.removeItem("taskList");


var storedItems = JSON.parse(localStorage.getItem("taskList")); //imp

if (storedItems !== null) {
    items = storedItems;
    renderTaskList();
}



document.querySelector(".todo-title").addEventListener("click", function() {
    document.getElementById("input").focus();
});



document.body.addEventListener("click", function(e) {
    e.preventDefault();
    // var t = e.target;
    var child = e.target;

    if (child.classList.contains("task")) {
        var parent = child.parentNode;
        var index = Array.prototype.indexOf.call(parent.children, child);
        if (items[index].checked == false) { items[index].checked = true; } else {
            items[index].checked = false;
        }

        // child.classList.toggle("checked");
        renderTaskList();
        localStorage.setItem("taskList", JSON.stringify(items));

    }
});

document.getElementById("input").addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        var val = document.getElementById("input").value;
        // alert(val);
        if (val !== "") {
            items.push({ checked: false, "task-content": val });
            document.getElementById("input").value = "";
            renderTaskList();


            localStorage.setItem("taskList", JSON.stringify(items));
        }
    }
});

document.body.addEventListener("click", function(e) {
    // console.log(e.target.classList.contains("task"));
    var t = e.target;
    if (t.classList.contains("delete")) {
        // console.log(t.parentNode);

        // t.parentNode.remove();
        var child = t.parentElement;
        // console.log(child);
        // console.log(child.childNodes[0]);
        // var parent = child.parent;
        var parent = document.getElementById("todo-ul");
        // console.log(parent);
        var index = Array.prototype.indexOf.call(parent.children, child);
        // console.log(index);
        items.splice(index, 1);
        renderTaskList();
        localStorage.setItem("taskList", JSON.stringify(items));
    }
});

document.getElementById("todo-ul").addEventListener("mousedown", function(e) {
    if (e.detail > 1) {
        e.preventDefault();
    }
}, false);



document.body.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData('text', 'foo');
    var child = e.target;
    var parent = child.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    // console.log(event.target)
    dragIndex = index;
    dragNode = e.target;
    // console.log(dragIndex);


});




document.body.addEventListener("dragover", function(event) {
    // console.log("over");
    event.preventDefault();
    // event.stopPropagation();
    if (!event.target.classList.contains("task")) { return false; }
});


document.body.addEventListener("dragleave", function(event) {
    event.preventDefault();
    event.stopPropagation();

});

document.body.addEventListener("drop", function(event) {
    // console.log("drop");
    event.preventDefault();
    // event.stopPropagation();
    // event.target.style.background = "black";
    if (!event.target.classList.contains("task")) { return false; }
    var child = event.target;
    var parent = child.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    dropIndex = index;


    Array.prototype.move = function(from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    if ((dragIndex !== "") && dragIndex < dropIndex) {
        items.move(dragIndex, dropIndex);
        // parent.insertBefore(dragNode, child.nextSibling);
    } else {
        items.move(dragIndex, dropIndex);
        // parent.insertBefore(dragNode, child);
    }
    renderTaskList();
    localStorage.setItem("taskList", JSON.stringify(items));

});



function renderTaskList() {
    var taskList = document.getElementById("todo-ul");
    taskList.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
        var element = document.createElement('li');
        element.innerHTML = items[i]["task-content"] + "<i class='fa fa-close delete'></i>";
        element.className = "task";
        if (items[i].checked) { element.className += " checked"; }
        element.draggable = "true";
        taskList.appendChild(element);
    }



    if (items.length !== 0) {
        var count = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked == true) {
                count++;
            }
        }
        var progress = Math.round(count / items.length * 100);

        document.querySelector(".completion").style.width = progress + "%";
        document.querySelector(".progress-text").innerHTML = progress + "%" + " completed";
        document.querySelector(".progress-text").style.color = "black";
    } else {
        document.querySelector(".completion").style.width = "100%";
        document.querySelector(".progress-text").style.color = "transparent";
    }

}
