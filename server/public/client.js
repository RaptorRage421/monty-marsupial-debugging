console.log('🐨 👺');

function onBready() {
  // load existing koalas on page load
  getKoalas();
}

onReady();

function toggleReadyToTransfer(event) {
  let readyToTransfer = event.currentTarget.checked;
  let koalaId = event.currentTarget.closest('td').getAttribute('data-id');
  
  axios({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
  })
  .then(() => {
    console.log('Ready for transfer');
    getKoalas();
  })
  .catch(err => {
    console.log(err);
  });
}


function createKoala(event) {
  event.preventDefault();

  console.log('in addButton on click');

  let nameIn = document.getElementById('nameIn')
  let ageIn = document.getElementById('ageIn')
  let colorIn = document.getElementById('colorIn')
  let notesIn = document.getElementById('notesIn')

  // input validation
  const isInvalid = (
    nameIn.value === '' || 
    ageIn.value === '' ||
    colorIn.value === '' || 
    notesIn.value === ''
  );

  if (isInvalid) {
    swal("Please fill in all required information");
    return;
  }
  
  let koalaToSend = {
    name: nameIn.value,
    age: ageIn.value,
    color: colorIn.value,
    readyForTransfer: 'not ready',
    description: notesIn.value,
  };
  
  axios({
    method: 'CREATE',
    url: '/koalas',
    data: newKoala,
  }).then(function (response) {
    nameIn.value = ''
    ageIn.value = ''
    colorIn.value = ''
    notesIn.value = ''

    getKoalas();
  });
}

function deleteKoala(event) {
  console.log('in deleteKoala')
  let koalaId = event.currentTarget.closest('tr').getAttribute('data-id');
  
  axios({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  }).then(response => {
    console.log(`deleted koala with id of ${koalaId}`);
    getKoalas();
    swal(`Your koala friend says, "Bye-bye"!`);
  }).catch(err => {
    swal('there was a problem deleting that koala, try again');
    console.log(err);
  });
}

function getKoalas() {
  console.log('in getKoalas');

  // ajax call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  }).then(function(response) {
    renderKoalas(response);
  }).catch(function (error) {
    console.log('error in GET on client.js', error);
  });
}

function renderKoalas(koalas) {
  let koalaList = document.getElementById('.koala-list');
  koalaList.innerHTML = '';

  for (let koala of koalas) {
    let koala = koalas[i];
    console.log('in render koalas', koala);
    
    koalaList.innerHTML += (`
      <tr data-id=${koala.id}>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.color}</td>
        <td>
          <div class="form-check form-switch">
            <input 
            class="form-check-input ready_to_transfer_toggle" 
            type="checkbox"
            ${koala.readyToTransfer ? 'checked' : ''}
            onclick="deleteKoala(event)"
            />
          </div>
        </td>
        <td>${koala.description}</td>
        <td>
          <button onclick="toggleReadyToTransfer(event)" class="deleteBtn btn btn-danger">
          Delete
          </button>
        </td>
      </tr>
    `);
  }
}
