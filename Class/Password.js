"use strict";
const Yup = require("yup");
require("yup-password")(Yup);

/* Una clase que se utiliza para validar una contraseña. */
const Password = class {
  /**
   * La función constructora es una función especial que se llama cuando se crea una nueva instancia de la clase.
   * creado
   * @param [password] - La contraseña a generar.
   * @param [length=8] - La longitud de la contraseña.
   */
  constructor(password = "", length = 8) {
    this.length = length;
    this.password = password;
  }

  /**
   * GetLength() devuelve la longitud de la cadena.
   * @returns La longitud.
   */
  getLength() {
    return this.length;
  }

  /**
   * Esta función establece la longitud.
   * @param length - La longitud.
   */
  setLength(length) {
    this.length = length;
  }

  /**
   * Devuelve el valor de la propiedad de la contraseña.
   * @returns La contraseña
   */
  getPassword() {
    return this.password;
  }

  /**
   * Esta función toma una cadena como argumento y establece la propiedad de contraseña del objeto en el
   * argumento
   * @param password - La contraseña.
   */
  setPassword(password) {
    this.password = password;
  }

  /**
   * Valida el campo de contraseña del objeto de esquema, y ​​si es válido, llama a la callback
   * función con verdadero y el objeto validado. Si no es válido, llama a la función de callback.
   * con false y los errores
   * @param call - La función de callback que se llamará cuando se complete la validación.
   */
  async isStrong(callback) {
    const schema = Yup.object().shape({
      password: Yup.string()
        .minUppercase(
          2,
          "La contraseña debe contener al menos 2 letras mayúsculas"
        )
        .minLowercase(
          1,
          "La contraseña debe contener al menos 1 letra minúscula"
        )
        .minNumbers(5, "La contraseña debe contener al menos 5 números"),
    });

    try {
      const res = await schema.validate(
        {
          password: this.password,
        },
        { abortEarly: false }
      );
      callback(true, res);
    } catch (e) {
      callback(false, e.errors);
    }
  }

  /**
   * La función genera una contraseña aleatoria basada en la longitud de la contraseña
   */
  generatePassword() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = this.length;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    this.password = password;
  }
};

module.exports = Password;
