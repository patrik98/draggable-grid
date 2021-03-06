const draggableItemsContainer = document.querySelector('ul');

// Drag events (for desktop)
function initDragAndDrop() {
    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragged');
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
    });
    
    draggableItemsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragged');
    });
    
    draggableItemsContainer.addEventListener('dragenter', (e) => {
        // if (e.target.dataset && e.target.dataset.index) {
        //     e.target.classList.add('dragover');
        // }
    });
    
    draggableItemsContainer.addEventListener('dragleave', (e) => {
        if (e.target.dataset && e.target.dataset.index) {
            e.target.classList.remove('dragover');
        }
    });
    
    draggableItemsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    draggableItemsContainer.addEventListener('drop', (e) => {
        e.target.classList.remove('dragover');
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
    
        if (index1 && index2) {
            swapItems(index1, index2);
        }
    });
}

function initTouch() {
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    draggableItemsContainer.addEventListener('touchstart', (e) => {
        if (e.target.hasAttribute('draggable')) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            e.target.classList.add('dragged');
        }        
    });

    draggableItemsContainer.addEventListener('touchmove', (e) => {
        if (e.target.hasAttribute('draggable')) {
            const x = e.touches[0].clientX - initialX;
            const y = e.touches[0].clientY - initialY; 
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'; 
    
            const elementList = document.elementsFromPoint(lastX, lastY);

            // default elementList: [li.dragged, ul, body, html]
            // we want this elementList: [li.dragged, li.dragover, ul, body, html] - length 5
            if (elementList.length > 4) {
                const draggedOverElement = elementList[1]; // this is the li.dragover element in the elementList at index 1

                if (draggedOverElement.hasAttribute('draggable') && !draggedOverElement.classList.contains('dragover') && draggedOverElement != e.target) {
                    draggedOverElement.classList.add('dragover');
                }
            }
            
            const dragoverElements = document.getElementsByClassName('dragover');
            
            if (dragoverElements.length > 0) {
                Array.from(dragoverElements).map(elem => {
                    // remove dragover class from all elments that have it, except for the current draggedOverElement
                    if (elementList.indexOf(elem) != 1) {
                        elem.classList.remove('dragover');
                    }
                });
            }
        }
    });

    draggableItemsContainer.addEventListener('touchend', (e) => {
        if (e.target.hasAttribute('draggable')) {
            const elementList = document.elementsFromPoint(lastX, lastY)
            if (elementList.length > 1 && elementList[1].hasAttribute('draggable')) {
                // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt
                swapItems(e.target.dataset.index, elementList[1].dataset.index);
            }        
            e.target.style.transform = 'translate(0px, 0px)';
            e.target.classList.remove('dragged');

            // remove dragover class from all elements containing it
            elementList.map(elem => {
                if (elem.hasAttribute('draggable')) {
                    elem.classList.remove('dragover');
                }
            })
        }
    });
}

function swapItems(index1, index2) {
    const elem1 = document.querySelector(`li[data-index='${index1}'`);
    const elem2 = document.querySelector(`li[data-index='${index2}'`);

    const sib1 = elem1.previousElementSibling;
    const sib2 = elem2.previousElementSibling;

    if (sib1 == null) {
        const par = elem1.parentElement;
        elem2.insertAdjacentElement('afterend', elem1);
        par.insertAdjacentElement('afterbegin', elem2);
    }

    else if (sib2 == null) {
        const par = elem2.parentElement;
        elem1.insertAdjacentElement('afterend', elem2);
        par.insertAdjacentElement('afterbegin', elem1);
    }
    
    else {
        if (sib1 == elem2) {
            elem1.insertAdjacentElement('afterend', elem2);
        }
    
        else if (sib2 == elem1) {
            elem2.insertAdjacentElement('afterend', elem1);
        }
    
        else {
            elem1.insertAdjacentElement('afterend', elem2);
            sib2.insertAdjacentElement('afterend', elem1);
        }
    }
}

// use navigator object to get information about platform from user-agent header
if (navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)) {
     initTouch();
 } else {
     initDragAndDrop();
 }