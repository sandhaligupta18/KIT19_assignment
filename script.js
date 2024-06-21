let conditions = [];
let editIndex = -1;

function addCondition() {
    const field = document.getElementById('field').value;
    const operator = document.getElementById('operator').value;
    const value = document.getElementById('value').value;
    const conjunction = document.getElementById('conjunction').value;

    if (field && operator && value) {
        if (editIndex === -1) {
            // Add new condition
            conditions.push({ field, operator, value, conjunction });
        } else {
            // Edit existing condition
            conditions[editIndex] = { field, operator, value, conjunction };
            document.getElementById('addBtn').innerText = 'Add';
            editIndex = -1;
        }
        resetForm();
        renderTable();
    } else {
        alert('Please fill all fields.');
    }
}

function editCondition(index) {
    const condition = conditions[index];
    document.getElementById('field').value = condition.field;
    document.getElementById('operator').value = condition.operator;
    document.getElementById('value').value = condition.value;
    document.getElementById('conjunction').value = condition.conjunction;
    document.getElementById('addBtn').innerText = 'Modify';
    editIndex = index;
}

function deleteCondition(index) {
    conditions.splice(index, 1);
    renderTable();
}

function resetForm() {
    document.getElementById('field').value = '';
    document.getElementById('operator').value = '';
    document.getElementById('value').value = '';
    document.getElementById('conjunction').value = 'And';
}

function renderTable() {
    const tableBody = document.querySelector('#conditionsTable tbody');
    tableBody.innerHTML = '';

    conditions.forEach((condition, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${condition.field}</td>
            <td>${condition.operator}</td>
            <td>${condition.value}</td>
            <td>${condition.conjunction}</td>
            <td>
                <button onclick="editCondition(${index})">Edit</button>
                <button onclick="deleteCondition(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function saveConditions() {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.textContent = JSON.stringify(conditions, null, 2);
}
