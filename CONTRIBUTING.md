# Guía de contribución de IA²-annotation-tool

¡Hola! Estamos muy emocionadxs de que estes interesadx en contribuir a IA²-annotation-tool. Antes de enviar Pull Requests, asegurate de tomarte un momento y leer las siguientes pautas:

- [Código de conducta](https://github.com/instituciones-abiertas/ia2-annotation-tool/blob/master/.github/CODE_OF_CONDUCT.md)
- [Pautas para la apertura de issues](#pautas-para-la-apertura-de-issues)
- [Pautas para la apertura de Pull Requests](#pautas-para-la-apertura-de-pull-requests)
- [Configuración de desarrollo](#configuración-de-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)

## Pautas para la apertura de issues

- Utiliza siempre nuestros templates de issue para [**bugs**](url-del-template) o para [**features**](url-del-template) para crear issues.

## Pautas para la apertura de Pull Requests

- La rama `main` es solo un snapshot de la última versión estable. Todo el desarrollo debe realizarse en ramas dedicadas que apunten a la rama `develop`. **No envíes PRs contra la rama `main`.**

- Siempre realizar un checkout partiendo de la rama en cuestión, ej: `develop` y realizar el merge contra esa misma rama al finalizar. Siga esta convención para la nueva rama: `númeroDeIssue-usuarioDeGithub-títuloDeCommit`.

- Esta bien realizar varios commit pequeños mientras trabajas en el PR. Podemos realizar un squash antes de mergear la rama, si es necesario.

- Si agregas una nueva característica:

  - Agrega un caso de prueba
  - Proporciona una razón convincente para agregar esta función. Idealmente, primero debes abrir un issue comentando la sugerencia y aguardar que se apruebe antes de trabajar en él.

- Si arreglas un bug:
  - Si estas resolviendo un caso especial sigue la convención de nomenclatura de ramas mencionada anteriormente.
  - Proporciona una descripción detallada de la resolución del bug en el PR. Se prefiere una demostración en vivo.

## Configuración de desarrollo

Necesitarás **Node**, preferentemente versión **12.18.2** o **posterior**.

Después de clonar el repositorio forkeado, sigue las instrucciones de desarrollo en [README.md](README.md)

### Escritura de commits

No esperamos ninguna convención estricta, pero agradeceríamos que resumieras de qué trata el contenido de tus modificaciones al escribir un commit.

## Estructura del proyecto

- **`src/lib`**: `<DIR>` contiene los componentes que se exportan para utilización en otra aplicación.
- **`src/index.js`**: `<FILE>` Archivo de ejemplo de uso de componentes
