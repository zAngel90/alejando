// Sistema de niveles y puntajes
const userLevels = [
  { level: 1, points: 0, title: "Novato", icon: "👶" },
  { level: 2, points: 100, title: "Aprendiz", icon: "🐣" },
  { level: 3, points: 250, title: "Investigador", icon: "🔥" },
  { level: 4, points: 500, title: "Cazador", icon: "💧" },
  { level: 5, points: 800, title: "Maestro", icon: "👑" },
]

// Variables globales
let currentCategory = 0
let currentLesson = 0
let currentQuestion = 0
let userPoints = 0
let score = 0 // Declare the score variable here
const progress = {
    categories: {
        phishing: { completed: false, score: 0 },
        vishing: { completed: false, score: 0 },
        smishing: { completed: false, score: 0 },
    pretexting: { completed: false, score: 0 },
  },
  totalScore: 0,
  currentLevel: 1,
}

// Variables de autenticación
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

// Categorías y lecciones
const categories = [
    {
    id: "phishing",
    name: "Phishing",
    icon: "phishing.png",
        lessons: [
            {
                title: "¿Qué es el Phishing?",
                content: "El phishing es un método de engaño en línea que utiliza técnicas de ingeniería social para hacer que las personas entreguen información personal, financiera o confidencial. Los atacantes se hacen pasar por organizaciones legítimas a través de correos electrónicos, sitios web, mensajes o plataformas digitales.",
                steps: [
                    "Email Phishing: Es el tipo más tradicional. Se basa en enviar correos electrónicos falsos.",
                    "Ortografía o gramática deficiente",
                    "Solicitudes de información sensible (contraseñas, tarjetas)",
                    "Ofertas demasiado buenas para ser verdad",
                    "Remitente extraño o con errores",
                    "Urgencia o amenazas implícitas"
                ],
            },
            {
                title: "Ejemplo de Phishing",
                content: "De: soporte@micr0soft-servicio.com\nAsunto: Acción urgente requerida\nCuerpo: Estimado cliente, detectamos actividad sospechosa. Haga clic en el siguiente enlace para verificar su cuenta.",
                steps: [
                    "El dominio es falso (con un 0 en vez de 'o')",
                    "Se crea urgencia",
                    "Se pide hacer clic en un enlace no verificado",
                ],
            },
        ],
        questions: [
            {
                question: "¿Cuál es el objetivo principal del phishing por correo electrónico?",
                options: [
                    "Instalar software legítimo",
                    "Robar datos personales o financieros",
                    "Eliminar archivos del sistema",
                    "Bloquear correos legítimos"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Qué archivo adjunto es más probable que contenga malware en un correo de phishing?",
                options: [
                    ".png",
                    ".docm",
                    ".txt",
                    ".mp3"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál de los siguientes es un indicio común de un correo electrónico de phishing?",
                options: [
                    "Un diseño profesional",
                    "Un mensaje urgente que pide acción inmediata",
                    "Un remitente conocido con dirección válida",
                    "Ortografía y gramática perfectas"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Qué técnica consiste en falsificar la dirección del remitente para que parezca confiable?",
                options: [
                    "Ingeniería inversa",
                    "Spoofing",
                    "Whaling",
                    "Ransomware"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Qué se recomienda hacer antes de hacer clic en un enlace dentro de un correo?",
                options: [
                    "Descargar primero el archivo",
                    "Confirmar con el remitente",
                    "Pasar el cursor sobre el enlace para ver la URL real",
                    "Actualizar el navegador"
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: "vishing",
        name: "Vishing",
        icon: "https://cdn-icons-png.flaticon.com/512/126/126341.png",
        lessons: [
            {
                title: "¿Qué es el Vishing?",
                content: "El vishing (voice phishing) es una forma de ingeniería social en la que el atacante utiliza llamadas telefónicas para engañar a la víctima y obtener información confidencial, como contraseñas, datos bancarios o códigos de verificación.",
                steps: [
                    "El atacante llama haciéndose pasar por una figura de autoridad",
                    "Utiliza el miedo, la urgencia o la confianza",
                    "Pide información privada o dirige a acciones inseguras",
                    "Nunca proporciones datos personales por teléfono si no iniciaste la llamada"
                ]
            },
            {
                title: "Ejemplo de Vishing",
                content: "Recibes una llamada de un supuesto representante del banco: 'Hola, le llamamos del Departamento de Seguridad del Banco Nacional. Hemos detectado un intento sospechoso de retiro de dinero desde su cuenta.'",
                steps: [
                    "Tono de urgencia: te hacen sentir que tu dinero está en peligro",
                    "Suplantación de entidad: dicen ser del banco",
                    "Solicitud de datos sensibles: piden información confidencial",
                    "Desconfía de llamadas inesperadas que pidan información urgente"
                ]
            }
        ],
        questions: [
            {
                question: "¿Qué es el vishing?",
                options: [
                    "Un ataque por mensajes SMS",
                    "Una técnica de hackeo físico",
                    "Un intento de obtener información personal mediante llamadas telefónicas",
                    "Un ataque informático mediante virus"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Qué técnica común se utiliza en el vishing?",
                options: [
                    "Enviar enlaces maliciosos",
                    "Suplantar números de teléfono para parecer legítimos",
                    "Escanear redes WiFi",
                    "Enviar archivos adjuntos peligrosos"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál de estas frases es típica en una llamada de vishing?",
                options: [
                    "¿Cómo está su día hoy?",
                    "Su cuenta será suspendida si no verifica sus datos ahora mismo.",
                    "Gracias por su compra.",
                    "Nos gustaría hacerle una encuesta."
                ],
                correctAnswer: 1
            },
            {
                question: "¿Qué debes hacer si sospechas que una llamada es fraudulenta?",
                options: [
                    "Proporcionar información solo si el número es local",
                    "Seguir las instrucciones rápidamente",
                    "Colgar y llamar a la institución por sus canales oficiales",
                    "Grabar la llamada y subirla a redes sociales"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Por qué el vishing es efectivo?",
                options: [
                    "Porque utiliza malware avanzado",
                    "Porque explota vulnerabilidades de software",
                    "Porque utiliza la voz para generar confianza y presión psicológica",
                    "Porque requiere altos conocimientos técnicos"
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: "smishing",
        name: "Smishing",
        icon: "texto.png",
        lessons: [
            {
                title: "¿Qué es el Smishing?",
                content: "El smishing (SMS phishing) es una técnica de ingeniería social en la que los atacantes envían mensajes de texto (SMS) falsos con el fin de engañar al usuario para que proporcione datos personales, acceda a enlaces maliciosos o descargue software malicioso.",
                steps: [
                    "El atacante envía un SMS simulando ser una entidad confiable",
                    "El mensaje contiene enlaces maliciosos o solicitudes de información",
                    "Si el usuario cae, puede entregar información privada o descargar malware",
                    "No hagas clic en enlaces de mensajes sospechosos"
                ]
            },
            {
                title: "Ejemplo de Smishing",
                content: "BBVA: Detectamos actividad sospechosa en tu cuenta. Por seguridad, verifica tu identidad aquí: http://bbva-seguridad-info.com",
                steps: [
                    "El dominio web es falso (no es el sitio oficial de BBVA)",
                    "Usa lenguaje urgente y te presiona a actuar",
                    "El mensaje llegó por SMS, canal que el banco normalmente no utiliza",
                    "Nunca proporciones datos personales por SMS"
                ]
            }
        ],
        questions: [
            {
                question: "¿Qué es el smishing?",
                options: [
                    "Un ataque por llamada telefónica",
                    "Un tipo de malware que borra archivos",
                    "Un intento de fraude a través de mensajes SMS",
                    "Un ataque mediante correo electrónico"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Cuál es una señal típica de un mensaje de smishing?",
                options: [
                    "Enlace con dominio oficial",
                    "Redacción profesional",
                    "Enlace acortado o sospechoso",
                    "Mensaje enviado desde tu propio número"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Qué buscan obtener los atacantes con el smishing?",
                options: [
                    "Archivos multimedia",
                    "Información personal o financiera",
                    "Acceso a redes WiFi",
                    "Licencias de software"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Qué acción NO se recomienda ante un mensaje sospechoso?",
                options: [
                    "Eliminar el mensaje",
                    "Contactar a la empresa desde su sitio oficial",
                    "Hacer clic en el enlace para verificar",
                    "Reportar el número como spam"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Qué medida ayuda a prevenir el smishing?",
                options: [
                    "Ignorar todos los SMS",
                    "Descargar todo lo que se reciba",
                    "Usar apps de detección de SMS maliciosos",
                    "Responder con 'NO' al mensaje"
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: "pretexting",
        name: "Pretexting",
        icon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
        lessons: [
            {
                title: "¿Qué es el Pretexting?",
                content: "El pretexting es una técnica de ingeniería social en la que el atacante crea una historia falsa (pretexto) para engañar a la víctima y hacer que revele información confidencial o realice una acción específica. A diferencia del phishing o smishing, el pretexting se basa más en la construcción de confianza y en la manipulación psicológica mediante una historia convincente.",
                steps: [
                    "Suplantación de identidad profesional",
                    "Pretextos legales o administrativos",
                    "Falsas situaciones de emergencia",
                    "Uso de datos reales para parecer creíbles"
                ]
            },
            {
                title: "Ejemplo de Pretexting",
                content: "Un empleado recibe una llamada: 'Hola, soy Javier del equipo de tecnología. Estamos haciendo mantenimiento al sistema de acceso remoto. ¿Podrías confirmarme tu usuario y contraseña para verificar la configuración?'",
                steps: [
                    "El pretexto suena técnico y creíble",
                    "No se debería solicitar contraseñas por teléfono",
                    "Usa lenguaje profesional para ganar confianza",
                    "Se presenta como alguien interno de la organización"
                ]
            }
        ],
        questions: [
            {
                question: "¿Qué es el pretexting?",
                options: [
                    "Un tipo de malware oculto",
                    "El uso de un pretexto para obtener información confidencial",
                    "Un tipo de suplantación web",
                    "Una forma de cifrado inseguro"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál es una técnica común usada en pretexting?",
                options: [
                    "Falsos archivos adjuntos",
                    "Correos con enlaces falsos",
                    "Suplantación de un empleado o proveedor",
                    "Malware por Bluetooth"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Qué hace que el pretexting sea efectivo?",
                options: [
                    "Que usa redes sociales",
                    "Que se basa en la confianza y una historia creíble",
                    "Que se transmite por SMS",
                    "Que utiliza virus automatizados"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál de estas acciones es incorrecta si sospechas de pretexting?",
                options: [
                    "Validar la identidad del remitente",
                    "Compartir tu contraseña por teléfono",
                    "Reportar el intento al departamento de seguridad",
                    "Cortar la comunicación y verificar internamente"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál es una medida para prevenir el pretexting?",
                options: [
                    "Compartir claves con compañeros",
                    "Tener contraseñas simples",
                    "Verificar cualquier solicitud inusual directamente con la fuente oficial",
                    "Instalar cualquier programa que te pidan"
                ],
                correctAnswer: 2
            }
        ]
    }
]

// Función para mostrar una pantalla y ocultar las demás
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen")
  screens.forEach((screen) => {
    screen.style.display = "none"
  })
  document.getElementById(screenId).style.display = "flex"

  // Mostrar u ocultar el botón de atrás según la pantalla
  const backButton = document.getElementById("back-button")
  if (screenId === "home-screen") {
    backButton.style.visibility = "hidden"
  } else {
    backButton.style.visibility = "visible"
  }
}

// Función para mostrar el menú
function showMenu() {
  showScreen("menu-screen")
  updateNavTitle("Menú")
  const menuScreen = document.getElementById("menu-screen")
  menuScreen.innerHTML = `
        <h2>Menú Principal</h2>
        <div class="menu-options">
            <button class="menu-btn" onclick="showCategories()">
                <img src="https://cdn-icons-png.flaticon.com/512/2490/2490396.png" alt="Lecciones">
                Lecciones
            </button>
            <button class="menu-btn" onclick="showTests()">
                <img src="https://cdn-icons-png.flaticon.com/512/3078/3078941.png" alt="Cuestionarios">
                Cuestionarios
            </button>
            <button class="menu-btn" onclick="showProgress()">
                <img src="https://cdn-icons-png.flaticon.com/512/3281/3281307.png" alt="Progreso">
                Ver Progreso
            </button>
        </div>
        <div id="progress-section"></div>
    `
  updateProgress()
}

// Función para mostrar las categorías
function showCategories() {
  showScreen("categories-screen")
  updateNavTitle("Categorías")
  displayCategories()
}

// Función para mostrar las lecciones de una categoría
function showLessons(categoryId) {
  showScreen("lessons-screen")
  const category = categories.find((cat) => cat.id === categoryId)
  updateNavTitle(`Lección: ${category.name}`)
  currentCategory = categories.findIndex((cat) => cat.id === categoryId)
  currentLesson = 0
  displayCurrentLesson()
}

// Función para mostrar la siguiente lección
function displayCurrentLesson() {
  const lessonContent = document.querySelector(".lesson-content")
  const category = categories[currentCategory]
  const lesson = category.lessons[currentLesson]
    
    lessonContent.innerHTML = `
        <img src="${category.icon}" alt="${category.name} Icon" class="category-icon">
        <h3>${lesson.title}</h3>
        <p>${lesson.content}</p>
        <ul class="lesson-steps">
            ${lesson.steps.map((step) => `<li>${step}</li>`).join("")}
        </ul>
    `
}

// Función para completar una lección
function completeLesson() {
  const category = categories[currentCategory]
  currentLesson++
    
    if (currentLesson >= category.lessons.length) {
    progress.categories[category.id].completed = true
    showTest(category.id)
    } else {
    displayCurrentLesson()
    }
}

// Función para mostrar la prueba de una categoría
function showTest(categoryId) {
  showScreen("test-screen")
  const category = categories.find((cat) => cat.id === categoryId)
  updateNavTitle(`Prueba: ${category.name}`)
  currentCategory = categories.findIndex((cat) => cat.id === categoryId)
  currentQuestion = 0
  score = 0 // Reset score to 0 before starting a new test
  displayCurrentQuestion()
}

// Función para mostrar la pregunta actual
function displayCurrentQuestion() {
  const questionContainer = document.querySelector(".question-container")
  const category = categories[currentCategory]
  const question = category.questions[currentQuestion]
    
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="options">
            ${question.options
              .map(
                (option, index) => `
                <button class="option-btn" onclick="checkAnswer(${index})">${option}</button>
            `,
              )
              .join("")}
        </div>
    `
}

// Función para verificar la respuesta
function checkAnswer(selectedIndex) {
  const category = categories[currentCategory]
  const question = category.questions[currentQuestion]

    if (selectedIndex === question.correctAnswer) {
    // Otorgar 20 puntos por respuesta correcta
    userPoints += 20
    progress.categories[category.id].score += 20
    progress.totalScore += 20
    updateUserLevel()

    // Mostrar mensaje de respuesta correcta
    showMessage("¡Correcto! +20 puntos", "success")
    } else {
    showMessage("Incorrecto. Intenta de nuevo", "error")
  }

  // Actualizar el progreso
  updateProgress()

  // Continuar con la siguiente pregunta o finalizar
  if (currentQuestion < category.questions.length - 1) {
    currentQuestion++
    displayCurrentQuestion()
        } else {
    completeTest(category.id)
        }
}

// Función para completar la prueba
function completeTest(categoryId) {
  const category = categories.find((cat) => cat.id === categoryId)
  progress.categories[categoryId].score = score
  progress.totalScore += score
  updateProgress()
  showMenu()
}

// Función para actualizar el progreso
function updateProgress() {
  const progressSection = document.getElementById("progress-section")
  const currentLevel = userLevels[progress.currentLevel - 1]
  const nextLevel = userLevels[progress.currentLevel] || userLevels[userLevels.length - 1]

  // Calcular el progreso hacia el siguiente nivel
  const currentLevelPoints = currentLevel.points
  const nextLevelPoints = nextLevel.points
  const pointsNeeded = nextLevelPoints - currentLevelPoints
  const pointsProgress = userPoints - currentLevelPoints
  const progressPercentage = Math.min((pointsProgress / pointsNeeded) * 100, 100)

  const progressHTML = `
        <div class="level-info">
            <div class="level-header">
                <h3>Nivel ${currentLevel.level} - ${currentLevel.title} ${currentLevel.icon}</h3>
            </div>
            <div class="level-progress">
                <div class="level-progress-bar" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="level-details">
                <span>${userPoints} puntos</span>
                <span>${nextLevel.points - userPoints} puntos para el siguiente nivel</span>
            </div>
        </div>
    `

  progressSection.innerHTML = progressHTML
}

// Función para actualizar el nivel del usuario
function updateUserLevel() {
  const previousLevel = progress.currentLevel
  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (userPoints >= userLevels[i].points) {
      progress.currentLevel = userLevels[i].level
      break
    }
  }

  // Si el usuario subió de nivel, mostrar una felicitación
  if (progress.currentLevel > previousLevel) {
    const newLevel = userLevels[progress.currentLevel - 1]
    showLevelUpMessage(newLevel)
  }
}

// Función para mostrar mensaje de subida de nivel
function showLevelUpMessage(newLevel) {
  const message = `
        <div class="level-up-message">
            <h3>¡Felicitaciones! ${newLevel.icon}</h3>
            <p>Has alcanzado el nivel ${newLevel.level}</p>
            <p>Ahora eres un ${newLevel.title}</p>
        </div>
    `

  const messageDiv = document.createElement("div")
  messageDiv.className = "level-up-overlay"
  messageDiv.innerHTML = message
  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

// Función para mostrar mensajes
function showMessage(text, type) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = text
  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 2000)
}

// Función para mostrar la pantalla de selección de cuestionarios
function showTests() {
  showScreen('categories-screen');
  updateNavTitle("Cuestionarios");
  const categoriesScreen = document.getElementById('categories-screen');
  categoriesScreen.innerHTML = `
        <h2>Cuestionarios Disponibles</h2>
        <div class="categories-grid">
            ${categories.map(category => `
                <div class="category-card" onclick="showTest('${category.id}')">
                    <img src="${category.icon}" alt="${category.name}">
                    <h3>${category.name}</h3>
                    <p>Prueba tus conocimientos</p>
                </div>
            `).join('')}
        </div>
    `
}

// Asegurarse de que la pantalla de inicio se muestre al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  showScreen("home-screen")
  updateNavTitle("Inicio")
})

// Añadir la función para el botón de navegación hacia atrás
function goBack() {
  const currentScreen = document.querySelector('.screen[style="display: flex;"]').id

  switch (currentScreen) {
    case "home-screen":
      // Ya estamos en la pantalla de inicio, no hacemos nada
      break
    case "menu-screen":
      showScreen("home-screen")
      updateNavTitle("Inicio")
      break
    case "categories-screen":
      showScreen("menu-screen")
      updateNavTitle("Menú")
      break
    case "lessons-screen":
      showScreen("categories-screen")
      updateNavTitle("Categorías")
      break
    case "test-screen":
      showScreen("categories-screen")
      updateNavTitle("Categorías")
      break
    case "progress-screen":
      showScreen("menu-screen")
      updateNavTitle("Menú")
      break
    default:
      showScreen("home-screen")
      updateNavTitle("Inicio")
  }
}

// Función para actualizar el título de la barra de navegación
function updateNavTitle(title) {
  document.getElementById("current-screen-title").textContent = title
}

// Función para mostrar las categorías
function displayCategories() {
  const categoriesScreen = document.getElementById("categories-screen")
  categoriesScreen.innerHTML = `
    <h2>CATEGORÍAS</h2>
    <div class="categories-grid">
      <div class="category-card" onclick="showLessons('phishing')">
        <img src="phishing.png" alt="Phishing">
        <h3>Phishing</h3>
        <p>Ataques por correo electrónico</p>
      </div>
      <div class="category-card" onclick="showLessons('vishing')">
        <img src="https://cdn-icons-png.flaticon.com/512/126/126341.png" alt="Vishing">
        <h3>Vishing</h3>
        <p>Ataques por llamada telefónica</p>
      </div>
      <div class="category-card" onclick="showLessons('smishing')">
        <img src="texto.png" alt="Smishing">
        <h3>Smishing</h3>
        <p>Ataques por mensaje de texto</p>
      </div>
      <div class="category-card" onclick="showLessons('pretexting')">
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Pretexting">
        <h3>Pretexting</h3>
        <p>Creación de escenarios falsos</p>
      </div>
    </div>
  `
}

// Añadir más contenido a las categorías existentes
// Añadir una lección adicional a Phishing
categories[0].lessons.push({
  title: "Phishing Avanzado",
  content: "Técnicas avanzadas de phishing y cómo los atacantes evolucionan sus métodos.",
  steps: [
    "Spear phishing: ataques dirigidos a personas específicas",
    "Whaling: phishing dirigido a ejecutivos de alto nivel",
    "Clone phishing: duplicación de mensajes legítimos",
    "Uso de dominios similares a los legítimos (typosquatting)",
  ],
})

// Añadir preguntas adicionales a Phishing
categories[0].questions.push({
  question: "¿Qué es el spear phishing?",
  options: [
    "Un ataque dirigido a una persona específica",
    "Un ataque masivo a muchas personas",
    "Un ataque a sistemas de pesca",
    "Un tipo de malware",
  ],
  correctAnswer: 0,
})

// Añadir una lección adicional a Vishing
categories[1].lessons.push({
  title: "Vishing en la Era Digital",
  content: "Cómo los atacantes combinan vishing con otras técnicas en la era digital.",
  steps: [
    "Uso de tecnología de falsificación de ID de llamadas",
    "Combinación de vishing con ataques de phishing",
    "Uso de información de redes sociales para hacer llamadas más creíbles",
    "Vishing automatizado usando sistemas de IA y voz sintética",
  ],
})

// Añadir una lección adicional a Smishing
categories[2].lessons.push({
  title: "Smishing y Aplicaciones de Mensajería",
  content: "Cómo los atacantes utilizan aplicaciones de mensajería para realizar ataques de smishing.",
  steps: [
    "Ataques a través de WhatsApp, Telegram y otras apps",
    "Uso de mensajes que parecen provenir de contactos conocidos",
    "Enlaces a aplicaciones falsas o maliciosas",
    "Mensajes que explotan eventos actuales o emergencias",
  ],
})

// Añadir una lección adicional a Pretexting
categories[3].lessons.push({
  title: "Defensa contra el Pretexting",
  content: "Estrategias avanzadas para defenderse contra ataques de pretexting.",
  steps: [
    "Establecer protocolos de verificación en tu organización",
    "Capacitación regular para empleados sobre estos ataques",
    "Implementar políticas de 'verificación de dos personas' para solicitudes sensibles",
    "Usar canales seguros para la comunicación de información confidencial",
  ],
})

// Función para iniciar sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('logout-button').style.display = 'block';
        showMenu();
        showMessage('¡Bienvenido ' + username + '!', 'success');
    } else {
        showMessage('Usuario o contraseña incorrectos', 'error');
    }
}

// Función para registrar usuario
function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
        showMessage('Por favor, completa todos los campos', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden', 'error');
        return;
    }

    if (users.some(u => u.username === username)) {
        showMessage('El usuario ya existe', 'error');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        username,
        email,
        password,
        progress: {
            categories: {
                phishing: { completed: false, score: 0 },
                vishing: { completed: false, score: 0 },
                smishing: { completed: false, score: 0 },
                pretexting: { completed: false, score: 0 },
            },
            totalScore: 0,
            currentLevel: 1
        }
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Iniciar sesión automáticamente
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Mostrar botón de cerrar sesión
    document.getElementById('logout-button').style.display = 'block';
    
    // Mostrar mensaje y redireccionar al menú
    showMessage('¡Registro exitoso! Bienvenido ' + username, 'success');
    setTimeout(() => {
        showMenu();
    }, 1000);
}

// Función para cerrar sesión
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('logout-button').style.display = 'none';
    showScreen('home-screen');
    updateNavTitle('Inicio');
    showMessage('Sesión cerrada', 'success');
}

// Función para alternar entre login y registro
function toggleAuthForm() {
    const homeScreen = document.getElementById('home-screen');
    const registerScreen = document.getElementById('register-screen');
    
    if (homeScreen.style.display !== 'none') {
        homeScreen.style.display = 'none';
        registerScreen.style.display = 'flex';
        updateNavTitle('Registro');
    } else {
        homeScreen.style.display = 'flex';
        registerScreen.style.display = 'none';
        updateNavTitle('Inicio');
    }
}

// Verificar si hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('logout-button').style.display = 'block';
        showMenu();
    } else {
    showScreen('home-screen');
    }
    updateNavTitle('Inicio');
}); 
