"use strict";

/* Importando el archivo Class/Password.js */
const Password = require("./Class/Password");

/* Una serie de preguntas que se le harán al usuario. */
const questions = [
  "¿Cuántas contraseñas desea ingresar?",
  "Ingrese la longitud que tendran las contraseñas",
];

/* Crear una matriz vacía para las respuestas. */
const answers = [];

/* Crear una matriz vacía para las contraseñas. */
const passwords = [];

/**
 * Toma una clave como argumento y luego escribe el valor de esa clave en la terminal
 * @param key - La clave del objeto de pregunta que queremos hacer al usuario.
 */
function question(key) {
  process.stdout.write(questions[key]);
}

/**
 * Escribe la cadena "El valor tiene que ser un número" en la salida estándar
 */
function notInteger() {
  process.stdout.write("El valor tiene que ser un número");
}

/* Una función que escucha los datos que se ingresan en la consola. */
process.stdin.on("data", function (data) {
  if (isNaN(data.toString().trim())) {
    notInteger();
  } else {
    answers.push(data.toString().trim());
    if (answers.length < questions.length) {
      question(answers.length);
    } else {
      /* Desestructurando el arreglo `answers` y asignando los valores a las variables `quantity` y
      `length`. */
      const [quantity, length] = answers;
      const promises = [];

      /* Creando un bucle que se ejecutará tantas veces como el usuario quiera. */
      for (let index = 0; index < quantity; index++) {
        const pass = new Password();
        pass.setLength(length);
        pass.generatePassword();
        promises.push(
          pass.isStrong((strong) => {
            passwords.push({
              [`contraseña${index}`]: pass.password,
              [`valor_booleano_${index}`]: strong,
            });
          })
        );
      }

      /* Esperar a que se resuelvan todas las promesas antes de imprimir la matriz de contraseñas y salir
      el programa. */
      Promise.all(promises).then((values) => {
        console.log(passwords);
        process.exit();
      });
    }
  }
});

/* Llamar a la función `question` y pasar el valor `0` como argumento. */
question(0);
