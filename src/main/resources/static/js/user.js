document.addEventListener("DOMContentLoaded", function () {
    getCurrentUser();
});

function getCurrentUser() {
    fetch("/api/user")
        .then( response => response.json())
        .then( user=> {

            document.getElementById("userEmail").textContent = user.username;
            document.getElementById("userRole").textContent = user.roles.map(role => role.name.replace('ROLE_', ' '));
            let tableUser = ""
            tableUser += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(role => role.name.replace('ROLE_', ' '))}</td>
                </tr>`

            document.getElementById("userInfo").innerHTML = tableUser
        })
}

