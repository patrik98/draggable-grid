const draggableItemsContainer = document.querySelector('ul');

draggableItemsContainer.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragged');
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
});

draggableItemsContainer.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragged');
});

draggableItemsContainer.addEventListener('dragenter', (e) => {
    if (e.target.dataset && e.target.dataset.index) {
        e.target.classList.add('dragover');
    }
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
    console.log(e.dataTransfer.getData('text/plain'));
    console.log(e.target.dataset.index);
});