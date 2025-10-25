# Proyecto: Suma de Polinomios (Página Web)

## 📘 Descripción General

Este proyecto es una aplicación web desarrollada para alumnos de preparatoria de segundo grado, con el objetivo de facilitar el aprendizaje de operaciones con polinomios, específicamente la **suma de polinomios**. La interfaz es **intuitiva, educativa y adaptable a dispositivos móviles** (enfoque *mobile first*).

## 🎯 Propósito

Brindar a los estudiantes una herramienta interactiva que les permita ingresar polinomios, observar el proceso de suma paso a paso y obtener el resultado final, fomentando la comprensión del tema.

## 🧩 Características Principales

* Interfaz amigable y educativa.
* Entrada de polinomios mediante campos separados.
* Visualización del resultado en formato matemático.
* Diseño **responsive** optimizado para dispositivos móviles.
* Código fuente limpio y modular utilizando **HTML, CSS y JavaScript puro**.

## 🏗️ Arquitectura del Software

El sistema sigue una arquitectura **basada en capas**:

* **Capa de Presentación (Frontend):** HTML + CSS → interfaz de usuario.
* **Capa de Lógica (JavaScript):** Procesamiento de la suma de polinomios y validaciones.
* **Capa de Datos (Modelo):** Estructura temporal en memoria para almacenar los polinomios ingresados.

## 🧮 Procesos Principales

1. Captura de polinomios por el usuario.
2. Validación de la sintaxis de entrada.
3. Separación de términos y agrupamiento de coeficientes semejantes.
4. Cálculo y despliegue del resultado final.

## 🎨 Diseño de Interfaz

El diseño sigue el principio **Mobile First**:

* Paleta moderna con tonos azules y morados suaves.
* Botones grandes y accesibles.
* Tipografía clara y contrastante.
* Layout flexible usando **flexbox**.

## ⚙️ Herramientas Utilizadas

* **Visual Studio Code**: entorno de desarrollo.
* **GitHub & GitHub Pages**: control de versiones y despliegue.
* **Draw.io / Figma**: diseño de diagramas e interfaz.

## 🧪 Casos de Prueba

| Caso | Descripción                 | Datos de Entrada           | Resultado Esperado     |
| ---- | --------------------------- | -------------------------- | ---------------------- |
| 1    | Suma de polinomios simples  | x² + 2x + 3 + 2x² + x + 1  | 3x² + 3x + 4           |
| 2    | Suma con términos negativos | x² - 2x + 1 + -x² + 3x - 5 | x - 4                  |
| 3    | Entrada inválida            | x^ + 2                     | Mensaje de error       |
| 4    | Campos vacíos               | (vacío)                    | Mensaje de advertencia |

## 🧠 Evaluación de Calidad

La calidad se evaluó según las métricas ISO/IEC 25010:

* **Usabilidad:** interfaz clara y responsiva.
* **Fiabilidad:** validaciones evitan errores de entrada.
* **Mantenibilidad:** código modular y documentado.
* **Portabilidad:** diseño adaptable a cualquier dispositivo.

## ✅ Cómo Ejecutar el Proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/usuario/suma-polinomios.git
   ```
2. Abrir el archivo `index.html` en un navegador.
3. También puede visualizarse en GitHub Pages:

   ```
   https://usuario.github.io/suma-polinomios
   ```

## 📈 Cómo se Alcanza la Calidad

* Aplicación de buenas prácticas en el desarrollo web.
* Pruebas funcionales en distintos dispositivos.
* Validaciones exhaustivas de entrada de datos.
* Retroalimentación de usuarios (alumnos) para futuras mejoras.

---

👨‍💻 **Autor:** Mario Alexis Silva Escalera
📅 **Materia:** Ingeniería de Software
🏫 **Institución:** Centro universitario UTEG
