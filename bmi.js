const bmiUrl = 'https://bmiappbe.azurewebsites.net/calculate';
const userUrl = 'https://bmiappbe.azurewebsites.net/users';

function calculateBMI(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    console.log(name, height, weight);

    fetch(bmiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            height: height,
            weight: weight
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                console.error('Error adding BMI:', response.statusText);
                throw new Error('Error adding BMI');
            }
        })
        .then(data => {
            console.log(data);
            fetchUsers();
        })
        .catch(error => console.error('Error adding BMI:', error));
}

function fetchUsers() {
    fetch(userUrl)
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error('Error fetching BMIs');
            }
        })
        .then(data => {
            const bmiListDiv = document.getElementById('users');
            bmiListDiv.innerHTML = data.map(bmi => `<tr><td>${bmi.name}</td><td>${bmi.height}</td><td>${bmi.weight}</td><td>${parseFloat(bmi.bmiValue*10000).toFixed(2)}</td></tr>`).join('');
        })
        .catch(error => console.error('Error fetching BMIs:', error));
}

fetchUsers();
