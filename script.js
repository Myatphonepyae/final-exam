const baseUrl = 'http://localhost:3000/api/customers'; // Replace with actual backend URL

// Fetch and display all customers
function fetchCustomers() {
    axios.get(baseUrl)
        .then(response => {
            const customers = response.data;
            const tableBody = document.querySelector("#customerTable tbody");
            tableBody.innerHTML = ''; // Clear previous data

            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="customer-detail.html?id=${customer._id}">${customer.name}</a></td>
                    <td>${new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                    <td>${customer.memberNumber}</td>
                    <td>${customer.interests}</td>
                    <td class="actions">
                        <button onclick="deleteCustomer('${customer._id}')">Delete</button>
                        <button class="update" onclick="prepareUpdate('${customer._id}', '${customer.name}', '${customer.interests}')">Update</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.log(error));
}

// Add new customer
document.getElementById("addCustomerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const newCustomer = {
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        memberNumber: document.getElementById('memberNumber').value,
        interests: document.getElementById('interests').value
    };

    axios.post(baseUrl, newCustomer)
        .then(() => {
            fetchCustomers();
            this.reset(); // Reset the form
        })
        .catch(error => console.log(error));
});

// Prepare to update customer
function prepareUpdate(id, name, interests) {
    document.getElementById('updateCustomerId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateInterests').value = interests;
}

// Update customer
document.getElementById("updateCustomerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById('updateCustomerId').value;
    const updatedCustomer = {
        name: document.getElementById('updateName').value,
        interests: document.getElementById('updateInterests').value
    };

    axios.put(`${baseUrl}/${id}`, updatedCustomer)
        .then(() => {
            fetchCustomers();
            this.reset(); // Reset the form
        })
        .catch(error => console.log(error));
});

// Delete customer
function deleteCustomer(id) {
    axios.delete(`${baseUrl}/${id}`)
        .then(() => fetchCustomers())
        .catch(error => console.log(error));
}

// Load customers when the page loads
window.onload = fetchCustomers;
