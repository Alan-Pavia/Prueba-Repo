// Seleccionar todos los elementos requeridos
const start_btn = document.querySelector(".start_btn button"); // Botón de inicio
const info_box = document.querySelector(".info_box"); // Contenedor de información
const exit_btn = info_box.querySelector(".buttons .quit"); // Botón de salida
const continue_btn = info_box.querySelector(".buttons .restart"); // Botón de continuar
const quiz_box = document.querySelector(".quiz_box"); // Contenedor del cuestionario
const result_box = document.querySelector(".result_box"); // Contenedor del resultado
const option_list = document.querySelector(".option_list"); // Lista de opciones
const time_line = document.querySelector("header .time_line"); // Línea de tiempo
const timeText = document.querySelector(".timer .time_left_txt"); // Texto de tiempo restante
const timeCount = document.querySelector(".timer .timer_sec"); // Contador de tiempo

// Función para manejar el clic en el botón de inicio
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // Agregar clase "activeInfo" al contenedor de información
};

// Función para manejar el clic en el botón de salida
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Eliminar clase "activeInfo" del contenedor de información
};

// Función para manejar el clic en el botón de continuar
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // Eliminar clase "activeInfo" del contenedor de información
  quiz_box.classList.add("activeQuiz"); // Agregar clase "activeQuiz" al contenedor del cuestionario
  showQuetions(0); // Mostrar la primera pregunta
  queCounter(1); // Actualizar el contador de preguntas
  startTimer(15); // Iniciar el temporizador con 15 segundos
  startTimerLine(0); // Iniciar la línea de tiempo
};

// Variables de control
let timeValue = 15; // Valor inicial del temporizador
let que_count = 0; // Contador de preguntas
let que_numb = 1; // Número de pregunta actual
let userScore = 0; // Puntaje del usuario
let counter; // Variable para almacenar el temporizador
let counterLine; // Variable para almacenar la línea de tiempo
let widthValue = 0; // Valor inicial de la línea de tiempo

// Función para reiniciar el cuestionario
const restart_quiz = result_box.querySelector(".buttons .restart");
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // Agregar clase "activeQuiz" al contenedor del cuestionario
  result_box.classList.remove("activeResult"); // Eliminar clase "activeResult" del contenedor del resultado
  timeValue = 15; // Restablecer el valor del temporizador
  que_count = 0; // Restablecer el contador de preguntas
  que_numb = 1; // Restablecer el número de pregunta actual
  userScore = 0; // Restablecer el puntaje del usuario
  widthValue = 0; // Restablecer el valor de la línea de tiempo
  showQuetions(que_count); // Mostrar la primera pregunta
  queCounter(que_numb); // Actualizar el contador de preguntas
  clearInterval(counter); // Limpiar el temporizador
  clearInterval(counterLine); // Limpiar la línea de tiempo
  startTimer(timeValue); // Iniciar el temporizador
  startTimerLine(widthValue); // Iniciar la línea de tiempo
  timeText.textContent = "Tiempo restante"; // Actualizar el texto de tiempo restante
  next_btn.classList.remove("show"); // Ocultar el botón de siguiente
};

// Función para salir del cuestionario y recargar la página
const quit_quiz = result_box.querySelector(".buttons .quit");
quit_quiz.onclick = () => {
  window.location.reload(); // Recargar la página
};

// Función para manejar el clic en el botón de siguiente pregunta
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    // Si no se ha alcanzado la última pregunta
    que_count++; // Incrementar el contador de preguntas
    que_numb++; // Incrementar el número de pregunta actual
    showQuetions(que_count); // Mostrar la siguiente pregunta
    queCounter(que_numb); // Actualizar el contador de preguntas
    clearInterval(counter); // Limpiar el temporizador
    clearInterval(counterLine); // Limpiar la línea de tiempo
    startTimer(timeValue); // Iniciar el temporizador
    startTimerLine(widthValue); // Iniciar la línea de tiempo
    timeText.textContent = "Tiempo"; // Actualizar el texto de tiempo
    next_btn.classList.remove("show"); // Ocultar el botón de siguiente
  } else {
    clearInterval(counter); // Limpiar el temporizador
    clearInterval(counterLine); // Limpiar la línea de tiempo
    showResult(); // Mostrar el resultado del cuestionario
  }
};

// Función para mostrar las preguntas y opciones
function showQuetions(index) {
  const que_text = document.querySelector(".que_text"); // Elemento que muestra la pregunta

  // Crear el contenido HTML de la pregunta y opciones
  let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>"; // Etiqueta HTML para la pregunta
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + "</span></div>" +
  '<div class="option"><span>' + questions[index].options[1] + "</span></div>" +
  '<div class="option"><span>' + questions[index].options[2] + "</span></div>" +
  '<div class="option"><span>' + questions[index].options[3] + "</span></div>"; // Etiquetas HTML para las opciones
  que_text.innerHTML = que_tag; // Asignar la pregunta al elemento correspondiente
  option_list.innerHTML = option_tag; // Asignar las opciones al elemento correspondiente
  
  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Crear los nuevos bloques div para los iconos
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>'; // Icono de marca de verificación
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>'; // Icono de cruz

// Función para manejar la selección de una opción
function optionSelected(answer) {
  clearInterval(counter); // Limpiar el temporizador
  clearInterval(counterLine); // Limpiar la línea de tiempo
  let userAns = answer.textContent.toLowerCase(); // Respuesta seleccionada por el usuario
  let correcAns = questions[que_count].answer.toLowerCase(); // Respuesta correcta para la pregunta actual
  const allOptions = option_list.children.length; // Número total de opciones

  if (userAns === correcAns) {
    // Si la respuesta es correcta
    userScore += 1; // Incrementar el puntaje del usuario
    answer.classList.add("correct"); // Agregar clase "correct" a la opción seleccionada
    answer.insertAdjacentHTML("beforeend", tickIconTag); // Agregar icono de marca de verificación
    console.log("Respuesta correcta");
    console.log("Puntaje: " + userScore);
  } else {
    // Si la respuesta es incorrecta
    answer.classList.add("incorrect"); // Agregar clase "incorrect" a la opción seleccionada
    answer.insertAdjacentHTML("beforeend", crossIconTag); // Agregar icono de cruz
    console.log("Respuesta incorrecta");

    for (let i = 0; i < allOptions; i++) {
      // Mostrar la respuesta correcta resaltada
      let option = option_list.children[i];
      let optionText = option.textContent.toLowerCase();
      if (optionText === correcAns) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", tickIconTag); // Agregar icono de marca de verificación
        console.log("Respuesta correcta: " + optionText);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); // Deshabilitar todas las opciones
  }

  next_btn.classList.add("show"); // Mostrar el botón de siguiente
}

// Función para mostrar el resultado del cuestionario
function showResult() {
  info_box.classList.remove("activeInfo"); // Eliminar clase "activeInfo" del contenedor de información
  quiz_box.classList.remove("activeQuiz"); // Eliminar clase "activeQuiz" del contenedor del cuestionario
  result_box.classList.add("activeResult"); // Agregar clase "activeResult" al contenedor del resultado
  const scoreText = result_box.querySelector(".score_text"); // Elemento que muestra el puntaje

  if (userScore > 3) {
    let scoreTag =
      "<span>¡Increíble! 🎉, obtuviste <p>" +
      userScore +
      "</p> de <p>" +
      questions.length +
      "</p></span>"; // Mensaje de felicitación para un puntaje alto
    scoreText.innerHTML = scoreTag; // Asignar el mensaje al elemento correspondiente
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Bastante bien 😎, obtuviste <p>" +
      userScore +
      "</p> de <p>" +
      questions.length +
      "</p></span>"; // Mensaje para un puntaje promedio
    scoreText.innerHTML = scoreTag; // Asignar el mensaje al elemento correspondiente
  } else {
    let scoreTag =
      "<span>Lo siento 😐, solo obtuviste <p>" +
      userScore +
      "</p> de <p>" +
      questions.length +
      "</p></span>"; // Mensaje para un puntaje bajo
    scoreText.innerHTML = scoreTag; // Asignar el mensaje al elemento correspondiente
  }
}

// Función para iniciar el temporizador
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Tiempo agotado";
      const allOptions = option_list.children.length;
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log(
            "Tiempo agotado: Respuesta correcta seleccionada automáticamente."
          );
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}

// Función para iniciar la línea de tiempo
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

// Función para actualizar el contador de preguntas
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> de <p>" +
    questions.length +
    "</p> Preguntas</span>"; // Texto que muestra el número de pregunta actual
  bottom_ques_counter.innerHTML = totalQueCounTag; // Asignar el texto al elemento correspondiente
}
