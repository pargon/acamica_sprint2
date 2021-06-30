// Aqui declaro la promesa (se crea la instancia)
let miPromesa = new Promise((resolve, reject) => {
    // let users = null;
    let users = [
      {
        nombre: 'El Efra',
        rol: 'Profe',
        email: 'efra@acamica.com'
      },
      {
        nombre: 'El Gonza',
        rol: 'Estudiante',
        email: 'gonza@acamica.com'
      },
    ]
    if (users) {
      resolve(users);
    }
    else {
      reject('El usuario no existe')
    }
  });
  // Aqui llamo mi promesa
  miPromesa
  .then(elResultado => {
    console.log(elResultado);
  })
  .catch((elError) => {
    console.error(elError);
  });