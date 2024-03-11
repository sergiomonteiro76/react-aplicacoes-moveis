var storage = [];
var liId = 0;
var spanId = 0;
var noteBtnClicked = 0;

// self invoke function to get elements from local store
(function () {
    if (getItemOnLocalStorage('tasks')) {
        var parsed = JSON.parse(getItemOnLocalStorage('tasks'));
        var max = 0;
        for (var i = 0; i < parsed.length; i++) {
            creatElement(parsed[i]);
            if (parsed[i].id > max) {
                max = parsed[i].id;
            }
        }
        storage = parsed;
        liId = max;
        spanId = max * -1;
    }
})();

// sections events
var domSections = document.getElementsByClassName('tasksSection');
for (var i = 0; i < domSections.length; i++) {
    addEventsTosection(domSections[i]);
}

function addEventsTosection(section) {
    section.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    section.addEventListener('drop', function (event) {
        if (event.target.className == 'tasksSection') {
            event.target.appendChild(document.getElementById(event.dataTransfer.getData('text')));
            var liSpanId = ((parseInt(event.dataTransfer.getData('text'))) * -1) + '';
            // to change the parent of the element in data
            var elementObj = {
                id: parseInt(event.dataTransfer.getData('text')),
                value: document.getElementById(liSpanId).innerText,
                parent: event.target.id
            }
            storage.push(elementObj);
            // to store data in local storage
            setItemOnLocalStorage('tasks', JSON.stringify(storage));
        }
    });
}

// submite btn function
document.getElementById('submit').addEventListener('click', function (e) {
    if (document.getElementById('userInput').value) {
        e.preventDefault();
        var objData = {
            id: ++liId,
            value: document.getElementById('userInput').value,
            parent: 'inProgress'
        }
        creatElement(objData); // this function create new element and push its data into storage array
        setItemOnLocalStorage('tasks', JSON.stringify(storage));
        document.getElementById('userInput').value = '';
    } else {
        alert('There is no data to be added');
    }
});

// functions to create new element (task)
function creatElement(objData) {
    var obj = {
        id: objData.id,
        value: objData.value,
        parent: objData.parent
    }
    var list = document.createElement('li');
    document.getElementById(obj.parent).appendChild(list);
    createListChildren(list, objData.id);
    document.getElementById(spanId + '').innerText = obj.value;
    list.id = objData.id;
    list.setAttribute('draggable', true);
    list.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text', event.target.id);
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].id == event.target.id) {
                storage.splice(i, 1);
            }
        }
    })
    storage.push(obj);
}

function createListChildren(list, id) {
    //create elements
    var paragraph = document.createElement('p');
    var spanCreated = document.createElement('span');
    var icon = document.createElement('i');
    var uList = document.createElement('ul');
    var note = document.createElement('button');
    note.innerText = 'Notes';
    var del = document.createElement('button');
    del.innerText = 'Delete';

    // set IDs and Classes to them
    spanCreated.id = --spanId;
    icon.className = 'fas fa-angle-down';
    icon.id = 'i' + id;
    uList.className = 'listOptionsWrapper';
    note.className = 'notes';
    del.className = 'delete';

    // add event listener to them
    icon.addEventListener('click', handleIconClick);
    note.addEventListener('click', handleNoteBtnClick);
    del.addEventListener('click', handleDeleteBtnClick);

    // appent each one to parent
    list.appendChild(paragraph);
    list.appendChild(uList);
    paragraph.appendChild(spanCreated);
    paragraph.appendChild(icon);
    uList.appendChild(note);
    uList.appendChild(del);
}

// functions to set and get elements from local store

function setItemOnLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemOnLocalStorage(key) {
    return localStorage.getItem(key)
}

// ----------------------------------------------------------------
// note and delete functions
// ----------------------------------------------------------------

// function to display ul list or hide it (togle)
function handleIconClick(e) {
    var uList = document.getElementById(e.target.id).parentElement.nextSibling;
    if (e.target.className == 'fas fa-angle-down') {
        e.target.className = 'fas fa-angle-up';
        uList.style.display = 'block';
        uList.style.zIndex = '1';
    } else {
        e.target.className = 'fas fa-angle-down';
        uList.style.display = 'none';
        uList.style.zIndex = '0';
    }
}

// ------------------------------------------------------
// ------------------------------------------------------

function handleNoteBtnClick(e) {
    // close the ul of buttons 
    var icon = e.target.parentElement.parentElement.children[0].children[1];
    icon.className = 'fas fa-angle-down';
    var uList = e.target.parentElement;
    uList.style.display = 'none';
    uList.style.zIndex = '0';

    // save which element clicked
    noteBtnClicked = e.target.parentElement.parentElement.id;

    // if this element has previous note --> display it
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].id == noteBtnClicked && storage[i].note) {
            document.getElementById('description').value = storage[i].note;
        }
    }

    // make note section appear and be stable after that
    document.getElementById('descrpContainer').style.animationName = 'show';
    setTimeout(function () {
        document.getElementById('descrpContainer').style.maxHeight = '90vh';
    }, 1800);

    // gave the background grey overlay
    document.getElementsByTagName('main')[0].className = 'mainAfter';
}

// ------------------------------------------------------
// ------------------------------------------------------

function handleDeleteBtnClick(e) {
    var confirmation = confirm('Do you want to delete this task?')
    if (confirmation) {
        var targetId = e.target.parentElement.parentElement.id;
        var newStorage = [];

        // delete from storage array
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].id != targetId) {
                newStorage.push(storage[i]);
            }
        }
        storage = newStorage;
        // delete from local storage
        setItemOnLocalStorage('tasks', JSON.stringify(storage));

        // delete from dom tree
        document.getElementById(targetId).remove();
    }
}

// ------------------------------------------------------
// save and cancel btns listeners
// ------------------------------------------------------

document.getElementById('cancel').addEventListener('click', cancelNoteHandler);
document.getElementById('save').addEventListener('click', saveNoteHandler);

function cancelNoteHandler() {

    // empty the note text area
    setTimeout(function () {
        document.getElementById('description').value = '';
    }, 2000);

    // make note section disapear
    document.getElementById('descrpContainer').style.animationName = 'hide';
    setTimeout(function () {
        document.getElementById('descrpContainer').style.maxHeight = '0';
    }, 1800);

    // remove the background grey overlay
    document.getElementsByTagName('main')[0].className = '';
}

function saveNoteHandler() {
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].id == noteBtnClicked) {
            storage[i].note = document.getElementById('description').value;
        }
    }
    setItemOnLocalStorage('tasks', JSON.stringify(storage));

    // empty the note text area and close it
    cancelNoteHandler();
}