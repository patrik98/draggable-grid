const draggableItemsContainer = document.querySelector('ul');

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

    console.log(index1, index2);
    swapItems(index1, index2);
});

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