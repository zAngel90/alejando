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
    baiting: { completed: false, score: 0 },
  },
  totalScore: 0,
  currentLevel: 1,
}

// Categorías y lecciones
const categories = [
  {
    id: "phishing",
    name: "Phishing",
    icon: "https://cdn-icons-png.flaticon.com/512/2138/2138508.png",
    lessons: [
      {
        title: "Introducción al Phishing",
        content:
          "El phishing es un tipo de ataque donde los criminales intentan engañarte para que reveles información sensible a través de correos electrónicos.",
        steps: [
          "Los atacantes suelen hacerse pasar por empresas legítimas",
          "Utilizan tácticas de urgencia para presionar",
          "Solicitan información personal o financiera",
          "Pueden incluir enlaces maliciosos",
        ],
      },
      {
        title: "Señales de Advertencia",
        content: "Aprende a identificar las señales comunes de un correo de phishing.",
        steps: [
          "Errores gramaticales y ortográficos",
          "Direcciones de correo sospechosas",
          "Solicitudes urgentes de acción",
          "Ofertas demasiado buenas para ser verdad",
        ],
      },
    ],
    questions: [
      {
        question: "¿Cuál es una señal de advertencia de un correo electrónico de phishing?",
        options: [
          "Uso de un lenguaje urgente",
          "Dirección de correo confiable",
          "Gramática y ortografía perfectas",
          "Enlaces a sitios web oficiales",
        ],
        correctAnswer: 0,
      },
      {
        question: "¿Qué debes hacer si recibes un correo sospechoso?",
        options: [
          "Hacer clic en los enlaces para verificar",
          "Responder pidiendo más información",
          "Reportar como spam y eliminar",
          "Reenviar a todos tus contactos",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "vishing",
    name: "Vishing",
    icon: "https://cdn-icons-png.flaticon.com/512/126/126341.png",
    lessons: [
      {
        title: "¿Qué es el Vishing?",
        content: "El vishing es una forma de phishing que utiliza llamadas telefónicas para engañar a las víctimas.",
        steps: [
          "Los atacantes se hacen pasar por representantes de empresas",
          "Utilizan números de teléfono falsificados",
          "Crean un sentido de urgencia",
          "Solicitan información sensible por teléfono",
        ],
      },
      {
        title: "Protección contra Vishing",
        content: "Aprende a protegerte de las llamadas fraudulentas.",
        steps: [
          "Nunca des información personal por teléfono",
          "Verifica la identidad del llamante",
          "No confíes en el ID de llamada",
          "Reporta las llamadas sospechosas",
        ],
      },
    ],
    questions: [
      {
        question: "¿Qué es una característica común del vishing?",
        options: [
          "Uso de correos electrónicos",
          "Llamadas telefónicas fraudulentas",
          "Mensajes de texto",
          "Redes sociales",
        ],
        correctAnswer: 1,
      },
      {
        question: "¿Qué debes hacer si recibes una llamada sospechosa?",
        options: [
          "Proporcionar la información solicitada",
          "Colgar y reportar el número",
          "Transferir la llamada a un compañero",
          "Grabar la conversación",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "smishing",
    name: "Smishing",
    icon: "https://cdn-icons-png.flaticon.com/512/3059/3059518.png",
    lessons: [
      {
        title: "Entendiendo el Smishing",
        content: "El smishing es el phishing a través de mensajes de texto (SMS).",
        steps: [
          "Mensajes que parecen de empresas legítimas",
          "Enlaces acortados o sospechosos",
          "Solicitudes de información personal",
          "Ofertas o alertas urgentes",
        ],
      },
      {
        title: "Prevención de Smishing",
        content: "Cómo protegerte de los mensajes de texto fraudulentos.",
        steps: [
          "No hagas clic en enlaces de SMS desconocidos",
          "Verifica el número del remitente",
          "No respondas a mensajes sospechosos",
          "Reporta los mensajes fraudulentos",
        ],
      },
    ],
    questions: [
      {
        question: "¿Qué caracteriza al smishing?",
        options: [
          "Correos electrónicos fraudulentos",
          "Mensajes de texto maliciosos",
          "Llamadas telefónicas",
          "Mensajes en redes sociales",
        ],
        correctAnswer: 1,
      },
      {
        question: "¿Qué debes hacer con un SMS sospechoso?",
        options: [
          "Hacer clic en el enlace para verificar",
          "Responder al mensaje",
          "Eliminar y reportar",
          "Reenviar a tus contactos",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "pretexting",
    name: "Pretexting",
    icon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    lessons: [
      {
        title: "¿Qué es el Pretexting?",
        content: "El pretexting implica crear un escenario falso para obtener información.",
        steps: [
          "Creación de una identidad falsa",
          "Construcción de una historia creíble",
          "Ganar la confianza de la víctima",
          "Solicitud gradual de información",
        ],
      },
      {
        title: "Identificación del Pretexting",
        content: "Cómo reconocer y evitar el pretexting.",
        steps: [
          "Desconfía de historias elaboradas",
          "Verifica la identidad de las personas",
          "No compartas información sensible",
          "Reporta situaciones sospechosas",
        ],
      },
    ],
    questions: [
      {
        question: "¿Qué caracteriza al pretexting?",
        options: ["Envío de correos masivos", "Creación de escenarios falsos", "Uso de malware", "Ataques DDoS"],
        correctAnswer: 1,
      },
      {
        question: "¿Cómo puedes protegerte del pretexting?",
        options: [
          "Compartiendo información personal",
          "Verificando la identidad de las personas",
          "Confiar en todas las historias",
          "No hacer preguntas",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "baiting",
    name: "Baiting",
    icon: "https://cdn-icons-png.flaticon.com/512/1548/1548682.png",
    lessons: [
      {
        title: "¿Qué es el Baiting?",
        content:
          "El baiting o cebo es una técnica de ingeniería social donde los atacantes utilizan un señuelo para despertar la curiosidad o codicia de la víctima.",
        steps: [
          "Uso de dispositivos USB infectados dejados en lugares públicos",
          "Ofertas demasiado buenas para ser verdad",
          "Descargas gratuitas de software, música o películas",
          "Regalos o premios falsos que requieren información personal",
        ],
      },
      {
        title: "Cómo protegerse del Baiting",
        content: "Aprende a identificar y evitar las trampas de baiting.",
        steps: [
          "Nunca conectes dispositivos USB desconocidos",
          "Desconfía de ofertas demasiado buenas para ser verdad",
          "Descarga software solo de fuentes oficiales",
          "No proporciones información personal a cambio de regalos o premios",
        ],
      },
      {
        title: "Casos reales de Baiting",
        content: "Ejemplos de ataques de baiting que han tenido éxito en el mundo real.",
        steps: [
          "Operación Buckshot Yankee: ataque al Pentágono mediante USB infectados",
          "Campaña 'Free Movie Download' que distribuía malware",
          "Falsos cupones de descuento que robaban datos personales",
          "USBs infectados distribuidos en conferencias de seguridad",
        ],
      },
    ],
    questions: [
      {
        question: "¿Cuál es una táctica común de baiting?",
        options: [
          "Llamadas telefónicas fraudulentas",
          "Dejar dispositivos USB infectados en lugares públicos",
          "Enviar correos electrónicos de phishing",
          "Crear perfiles falsos en redes sociales",
        ],
        correctAnswer: 1,
      },
      {
        question: "¿Qué debes hacer si encuentras una memoria USB desconocida?",
        options: [
          "Conectarla para ver su contenido",
          "Llevarla a un técnico para que la revise",
          "No conectarla y desecharla o entregarla a seguridad",
          "Formatearla antes de usarla",
        ],
        correctAnswer: 2,
      },
      {
        question: "¿Por qué el baiting es efectivo?",
        options: [
          "Porque utiliza tecnología avanzada",
          "Porque explota la curiosidad o codicia humana",
          "Porque es difícil de detectar técnicamente",
          "Porque los atacantes son muy persistentes",
        ],
        correctAnswer: 1,
      },
    ],
  },
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
            <h3>Nivel ${currentLevel.level} - ${currentLevel.title} ${currentLevel.icon}</h3>
            <div class="level-progress">
                <div class="level-progress-bar" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="level-details">
                <span>${userPoints} puntos</span>
                <span>${nextLevel.points - userPoints} puntos para el siguiente nivel</span>
            </div>
        </div>
        <div class="categories-progress">
            <h3>Progreso por categoría:</h3>
            ${Object.entries(progress.categories)
              .map(
                ([category, data]) => `
                <div class="category-progress">
                    <span>${categories.find((c) => c.id === category).name}</span>
                    <span>${data.score} puntos</span>
                </div>
            `,
              )
              .join("")}
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
  showScreen("categories-screen")
  updateNavTitle("Cuestionarios")
  const categoriesScreen = document.getElementById("categories-screen")
  categoriesScreen.innerHTML = `
        <h2>Cuestionarios Disponibles</h2>
        <div class="categories-grid">
            ${categories
              .map(
                (category) => `
                <div class="category-card" onclick="showTest('${category.id}')">
                    <img src="${category.icon}" alt="${category.name}">
                    <h3>${category.name}</h3>
                    <p>Prueba tus conocimientos</p>
                </div>
            `,
              )
              .join("")}
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

// Añadir la función displayCategories que faltaba
function displayCategories() {
  const categoriesScreen = document.getElementById("categories-screen")
  categoriesScreen.innerHTML = `
    <h2>CATEGORÍAS</h2>
    <div class="categories-grid">
      <div class="category-card" onclick="showLessons('phishing')">
        <img src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png" alt="Phishing">
        <h3>Phishing</h3>
        <p>Ataques por correo electrónico</p>
      </div>
      <div class="category-card" onclick="showLessons('vishing')">
        <img src="https://cdn-icons-png.flaticon.com/512/126/126341.png" alt="Vishing">
        <h3>Vishing</h3>
        <p>Ataques por llamada telefónica</p>
      </div>
      <div class="category-card" onclick="showLessons('smishing')">
        <img src="https://cdn-icons-png.flaticon.com/512/3059/3059518.png" alt="Smishing">
        <h3>Smishing</h3>
        <p>Ataques por mensaje de texto</p>
      </div>
      <div class="category-card" onclick="showLessons('pretexting')">
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Pretexting">
        <h3>Pretexting</h3>
        <p>Creación de escenarios falsos</p>
      </div>
      <div class="category-card" onclick="showLessons('baiting')">
        <img src="https://cdn-icons-png.flaticon.com/512/1548/1548682.png" alt="Baiting">
        <h3>Baiting</h3>
        <p>Ataques con señuelos</p>
      </div>
    </div>
  `
}

// Modificar la función showProgress para actualizar el título
function showProgress() {
  showScreen("progress-screen")
  updateNavTitle("Progreso")

  const progressScreen = document.getElementById("progress-screen")
  const detailedProgress = document.getElementById("detailed-progress")

  // Calcular estadísticas
  const completedCategories = Object.values(progress.categories).filter((cat) => cat.completed).length
  const totalCategories = Object.keys(progress.categories).length
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100)

  // Mostrar nivel actual
  const currentLevel = userLevels[progress.currentLevel - 1]

  detailedProgress.innerHTML = `
    <div class="progress-overview">
      <h3>Nivel ${currentLevel.level}: ${currentLevel.title} ${currentLevel.icon}</h3>
      <p>Has completado ${completedCategories} de ${totalCategories} categorías (${completionPercentage}%)</p>
      <p>Puntos totales: ${progress.totalScore}</p>
    </div>
    
    <h3 class="progress-subtitle">Progreso por categoría:</h3>
    <div class="categories-progress-detail">
      ${Object.entries(progress.categories)
        .map(([categoryId, data]) => {
          const category = categories.find((c) => c.id === categoryId)
          const maxScore = category.questions.length * 20
          const percentage = Math.round((data.score / maxScore) * 100) || 0

          return `
          <div class="category-progress-item">
            <div class="category-progress-header">
              <img src="${category.icon}" alt="${category.name}" class="category-mini-icon">
              <h4>${category.name}</h4>
              <span class="category-status ${data.completed ? "completed" : "pending"}">
                ${data.completed ? "Completado" : "Pendiente"}
              </span>
            </div>
            <div class="category-progress-bar">
              <div class="category-progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="category-progress-stats">
              <span>${data.score} puntos</span>
              <span>${percentage}% completado</span>
            </div>
          </div>
        `
        })
        .join("")}
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
