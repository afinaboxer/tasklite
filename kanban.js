let boardData = {
    "to-do": [],
    "in-progress": [],
    "done": []
}

let draggedItem = null;
let draggedIndex = null;
let sourceStatus = null;

function escapeHtml(str) {
    return String(str)
    .replace(/&/g, '&amp')
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt');
}

function updateAllCounters() {
    document.querySelectorAll('.column').forEach(column => {
        const status = column.dataset.status;
        const count = boardData[status] ? boardData[status].length : 0;
        const counterSpan = column.querySelector('.column__count');
        if (counterSpan) {
            counterSpan.textContent = count;
        }
    });
}



function addDragEvents(el, index) {
    el.addEventListener('dragstart', e => {
        draggedItem = el;
        draggedIndex = index;
        sourceStatus = el.closest('.column').dataset.status;
        el.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('dragend', () => {
        if (draggedItem) draggedItem.classList
        .remove('dragging');
        draggedItem = null;
        draggedIndex = null;
        sourceStatus = null;
        document.querySelectorAll('.column')
        .forEach(col => col.classList
          .remove('drag-over'));
    });
}

function initDropZones() {
    document.querySelectorAll('.column').forEach(column => {
        const taskList = column.querySelector('.task-list');

        taskList.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('drag-over');
        });

        taskList.addEventListener('dragleave', e => {
            if (!taskList.contains(e.relatedTarget)) {
                column.classList.remove('drag-over');
            }
        });

        taskList.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('drag-over');

            if (!draggedItem || draggedIndex === null || !sourceStatus) return;
            
            const targetStatus = column.dataset.status;
            if (targetStatus === sourceStatus) return;
            
            const [movedTask] = boardData[sourceStatus]
            .splice(draggedIndex, 1);
            boardData[targetStatus].push(movedTask);
            
            draggedItem = null;
            draggedIndex = null;
            sourceStatus = null;
            
            renderBoard();
        });
    });
}

function renderBoard() {
    document.querySelectorAll('.column').forEach(column => {
        const status = column.dataset.status;
        const taskList = column.querySelector('.task-list');
        const tasks = boardData[status] || [];

        const existingTask = taskList.querySelectorAll('.task.kanban');
        existingTask.forEach(task => task.remove());

        const addBtn = taskList.querySelector('.add-task');

        tasks.forEach((task,index) => {
            const taskEl = document.createElement('article');
            taskEl.classList.add('task', 'kanban');
            taskEl.draggable = true;
            
            let priorityText = 'Средний';
            let priorityClass = 'medium';

            switch(task.priority){
                case 'high':
                    priorityText = 'Высокий';
                    priorityClass = 'high';
                    break
                    case 'low':
                        priorityText = 'Низкий';
                        priorityClass = 'low';
                        break
                        default:
                            priorityText = 'Средний';
                            priorityClass = 'medium'
            }
            
            taskEl.innerHTML = `
            <h3 class="task___title">${escapeHtml(task.title)}</h3>
            ${task.desc ? `<p class="task__desc">${escapeHtml(task.desc)}</p>` : ''}
            <footer class="task__footer">
            <span class="task__label ${priorityClass}">${priorityText}</span>
            <time class="task__date">${task.deadline ? escapeHtml(task.deadline) : ''}</time>
            </footer>
            `;
            addDragEvents(taskEl, index);
            taskList.insertBefore(taskEl, addBtn);
    });
    });
    uptadeAllCounters();
}

document.querySelectorAll('.add-task').forEach(btn =>{
    btn.addEventListener('click', () => {
        const column = btn.closest('.column');
        const status = column.dataset.status;

        const title = prompt('Введите название задачи:') || '';
        const desc = prompt('Описание (по желанию):') || '';
        const prioretyInput = prompt('Приоритет (Высокий / Средний / Низкий):') || 'Средний';
        const deadline = prompt('Срок (напиример: lj 12.11):') || '';

        const cleanTitle = title.trim();
        const cleanDesc = desc.trim();
        const cleanDeadline = deadline.trim();

        if (cleanTitle === '') return;

        function normalizePriority(value) {
           const v = String(value || '').trim().toLowerCase();
           
           if (['высокий', 'выс', 'в', 'high', 'h'].includes(v)) return 'high';
           if (['средний', 'сред', 'с', 'medium', 'med' , 'm'].includes(v)) return 'medium';
           if (['низкий', 'низ', 'н', 'low', 'l'].includes(v)) return 'low';

           return 'medium';
        }

        const level = normalizePriority(prioretyInput);

        const newTask = {
            title: cleanTitle,
            desc: cleanDesc,
            priority: level,
            deadline: cleanDeadline
        };

        boardData[status].push(newTask);

        renderBoard();
        })
    })

initDropZones();
renderBoard();
