let duenioData = {};  // Stores Duenio info
let contactoEData = {};  // Stores ContactoEmergencia info
let perritoData = {}; 

document.getElementById("modifyBtn").addEventListener("click", function () {
  const formElements = document.querySelectorAll("#userForm input, #userForm select");
  formElements.forEach(function (element) {
    element.disabled = !element.disabled;
  });
});


document.addEventListener("DOMContentLoaded", function () {
  localStorage.setItem('idPerrito', 1);
  localStorage.setItem('idDuenio', 1);
  localStorage.setItem('idContactoDeEmergencia', 1);
  getInfoPerrito(); 
  getInfoDuenio();
  getInfoContactoE();

  // Disable form elements initially
  const formElements = document.querySelectorAll("#userForm input, #userForm select");
  formElements.forEach(function (element) {
    element.disabled = true; // Disable form elements
  });

});


/*CODIGO MITZ*/

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the "Guardar" button
  document.getElementById("saveBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the default way

    // Create the data you want to send

     const jsonDataDuenio = {
      nombre: document.getElementById('firstName').value,
      apellido: document.getElementById('lastName').value,
      telefono: document.getElementById('phoneNumber1').value,
      correo: duenioData.correo,
      contrasenia: duenioData.contrasenia,
      direccion: duenioData.direccion,
      urlFoto: document.getElementById('imageUsuario').value,
     };

     const jsonDataContactoE = {
      nombre: document.getElementById('firstName2').value,
      telefono: document.getElementById('phoneNumber2').value,
      apellido: document.getElementById('lastName2').value,
      correo: contactoEData.correo
    
     };

     const selectedGenero = document.querySelector('input[name="genero"]:checked');
     const generoValue = selectedGenero ? selectedGenero.value : null;
   
     // Get the selected value for "tamanios"
     const selectedTamanio = document.querySelector('input[name="tamanios"]:checked');
     const tamanioValue = selectedTamanio ? selectedTamanio.value : null;
    
    const jsonDataPerrito = {
      // Replace these with the actual values from the form or other sources
      nombre:  document.getElementById('petName').value,
      tamanio: tamanioValue,
      raza: document.getElementById("breed").value,
      anio:  document.getElementById("years").value,
      mes: document.getElementById("months").value,
      genero: generoValue,
      urlFoto: perritoData.urlFoto
    };
     

    // Convert the JavaScript object to a JSON string
    const jsonDataDuenioString = JSON.stringify(jsonDataDuenio);
    const jsonDataContactoEString = JSON.stringify(jsonDataContactoE);
    const jsonDataPerritoString = JSON.stringify(jsonDataPerrito);
    

    // Call the function to send the PUT request
    sendInfoPerrito(jsonDataPerritoString);
    sendInfoDuenio(jsonDataDuenioString);
    sendInfoContactoE(jsonDataContactoEString);
    // Disable form elements initially
  const formElements = document.querySelectorAll("#userForm input, #userForm select");
  formElements.forEach(function (element) {
    element.disabled = true; // Disable form elements
  });

  });
});

// PUT request function
function sendInfoPerrito(jsonDataPerrito) {
  const idPerrito = localStorage.getItem('idPerrito');
  const urlPerrito = `http://localhost:8081/api/safedog/perritos/perrito/${idPerrito}`;
  
  fetch(urlPerrito, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonDataPerrito,
    mode: 'cors'
  })
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
      console.log('Perrito Info Saved:', data); // Handle success
      // Optionally update your UI here
    })
    .catch(error => {
      console.error('Error saving Perrito:', error); // Handle errors
    });
}

// PUT request function
function sendInfoDuenio(jsonDataDuenio) {
  const idDuenio = localStorage.getItem('idDuenio');
  const urlDuenio  = `http://localhost:8081/api/safedog/duenios/duenio/${idDuenio }`;
  
  fetch(urlDuenio, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonDataDuenio,
    mode: 'cors'
  })
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
      console.log('Perrito Info Saved:', data); // Handle success
      // Optionally update your UI here
    })
    .catch(error => {
      console.error('Error saving Perrito:', error); // Handle errors
    });
}

// PUT request function
function sendInfoContactoE(jsonDataContactoE) {
  const idContactoE = localStorage.getItem('idContactoDeEmergencia');
  const urlContactoE = `http://localhost:8081/api/safedog/Contacto_Emergencia/contactoE/${idContactoE}`;
  
  fetch(urlContactoE , {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonDataContactoE,
    mode: 'cors'
  })
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
      console.log('Perrito Info Saved:', data); // Handle success
      // Optionally update your UI here
    })
    .catch(error => {
      console.error('Error saving Perrito:', error); // Handle errors
    });
}



function getInfoDuenio() {
  let idDuenio= localStorage.getItem('idDuenio');

  let urlDuenio = `http://localhost:8081/api/safedog/duenios/listado/${idDuenio}`;
  
  fetch(urlDuenio, {
    method: 'GET', // This can be omitted since GET is the default method
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "cors",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON from the response
    })
    .then(data => {

      duenioData = data;
      console.log('Dueño Info:', duenioData); // Handle the data returned from the server
      // You can update your UI here with the fetched data
      document.getElementById('firstName').value = duenioData.nombre;
      document.getElementById('lastName').value = duenioData.apellido;
      document.getElementById('phoneNumber1').value = duenioData.telefono;
      document.getElementById('imageUsuario').value = duenioData.urlFoto;
    })
    .catch(error => {
      console.error('Error fetching Dueño info:', error);
    });
}


function getInfoContactoE() {
  let idContactoE= localStorage.getItem('idContactoDeEmergencia');

  let urlContactoE = `http://localhost:8081/api/safedog/Contacto_Emergencia/listado/${idContactoE}`;
  
  
  fetch(urlContactoE, {
    method: 'GET', // This can be omitted since GET is the default method
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "cors",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON from the response
    })
    .then(data => {

      contactoEData = data;
      console.log('ContactoEmergencia Info:', contactoEData); // Handle the data returned from the server
      // You can update your UI here with the fetched data
      document.getElementById('firstName2').value = contactoEData.nombre;
      document.getElementById('lastName2').value = contactoEData.apellido;
      document.getElementById('phoneNumber2').value = contactoEData.telefono;
    })
    .catch(error => {
      console.error('Error fetching ConactoEmergencia info:', error);
    });
}


function getInfoPerrito() {
  let idPerrito = localStorage.getItem('idPerrito');

  let urlPerrito = `http://localhost:8081/api/safedog/perritos/listado/${idPerrito}`;
  
  fetch(urlPerrito, {
    method: 'GET', // This can be omitted since GET is the default method
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "cors",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON from the response
    })
    .then(data => {

      perritoData = data;
      console.log('Perrito Info:', data); // Handle the data returned from the server
      // You can update your UI here with the fetched data
      document.getElementById('petName').value = perritoData.nombre;
      document.getElementById("years").value = perritoData.anio || "";
      document.getElementById("months").value = perritoData.mes || "";
      document.getElementById("breed").value = perritoData.raza || "";
      const generoRadio = document.querySelector(`input[name="genero"][value="${perritoData.genero}"]`);
  if (generoRadio) {
    generoRadio.checked = true;
  }

  // Set the size radio button (tamanios)
  const tamanioRadio = document.querySelector(`input[name="tamanios"][value="${perritoData.tamanio}"]`);
  if (tamanioRadio) {
    tamanioRadio.checked = true;
  }
  
    })
    .catch(error => {
      console.error('Error fetching Perrito info:', error);
    });
}