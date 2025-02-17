document.addEventListener("DOMContentLoaded", function () {
    getCurrentAdmin()
    getAllUsers()

});
function getCurrentAdmin() {
    fetch("/api/currentAdmin")
        .then( response => response.json())
        .then( user=> {
            document.getElementById("adminEmail").textContent = user.username;
            document.getElementById("adminRole").textContent = user.roles.map(role => role.name.replace('ROLE_', ' '));
            let tableAdmin = ""
            tableAdmin += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(role => role.name.replace('ROLE_', ' '))}</td>
                </tr>`

            document.getElementById("UserAdmin").innerHTML = tableAdmin
        })
}
function getAllUsers() {
    fetch("/api/allUser")
        .then( response => response.json())
        .then( response => {
            let tableUser = ""
            response.forEach(user => {
                tableUser += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(role => role.name.replace('ROLE_', ' '))}</td>
                    <td>
                        <button 
                                type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="setModalValue('${user.id}','${user.firstName}', '${user.lastName}',
                                 '${user.age}', '${user.username}')">Edit</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="if (confirmDelete()){userDelete('${user.id}')}" >Delete</button>
                    </td>
                </tr>`
            })
            document.getElementById("allUsers").innerHTML = tableUser
        })
}
function setModalValue(id,firstName,lastName,age,username) {
    document.getElementById("editUserId1").value = id;
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editAge").value = age;
    document.getElementById("editEmail").value =username;
}
function confirmDelete() {
    return confirm('Вы уверены, что хотите удалить этого пользователя?');
}
function userDelete(userId) {
    fetch(`/api/delete/${userId}`).then(() => {
        getAllUsers()
        this.reset()
        document.getElementById('adminTable').click()
    })
}
document.getElementById('formCreateNewUser').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const rolesSelected = Array.from(document.getElementById('new_role').selectedOptions).map(option => ({
        id: option.value,
        name: option.text
    }))

    let newUser = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        username: formData.get('username'),
        password: formData.get('password'),
        roles: rolesSelected
    }
    fetch('/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(() => {
            getAllUsers()
            this.reset()
            document.getElementById('adminTable').click()
        })
})