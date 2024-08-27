const draggables = document.querySelectorAll('.draggable');
const fixedBoxes = document.querySelectorAll('.fixed-box');
const livesDisplay = document.getElementById('lives');
let lives = 3; // Número de vidas iniciales

function updateLives() {
    livesDisplay.textContent = `Vidas: ${lives}`;
    if (lives <= 0) {
        alert('¡Game Over! No tienes más vidas.');
        // Desactivar el arrastre
        draggables.forEach(draggable => {
            draggable.draggable = false; // Desactivar el arrastre
            draggable.classList.remove('dragging');
        });
        // Opcional: puedes desactivar el arrastre también para cajas si es necesario
        fixedBoxes.forEach(box => {
            box.removeEventListener('dragover', handleDragOver);
            box.removeEventListener('dragleave', handleDragLeave);
            box.removeEventListener('drop', handleDrop);
        });
    }
}

function handleDragStart() {
    if (lives > 0) {
        this.classList.add('dragging');
    }
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('over');
}

function handleDragLeave() {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (this.textContent.trim().toLowerCase() === draggable.querySelector('img').alt.toLowerCase()) {
        this.textContent = '';
        this.appendChild(draggable);
    } else {
        lives--; // Restar vida si la colocación es incorrecta
        updateLives(); // Actualizar el conteo de vidas
    }
    this.classList.remove('over');
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
});

fixedBoxes.forEach(box => {
    box.addEventListener('dragover', handleDragOver);
    box.addEventListener('dragleave', handleDragLeave);
    box.addEventListener('drop', handleDrop);
});
