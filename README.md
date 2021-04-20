# Ia2-annotation-tool
> Annotation tool components library for IA² Project

## Install
`npm install https://github.com/instituciones-abiertas/ia2-annotation-tool.git`

## Available Components

### Editor

| Prop | Description |
:------------ |:---------------|
| **`style`** | Css styles to apply |
| **`annotations`** | Initial Annotations on text |
| **`tags`** | Valid Tags  |
| **`text`** | Document Text  |
| **`onAnnotationsChange`** | Function to get added and deleted annotations |

### Instructions

| Prop | Description |
:------------ |:---------------|
| **`title`** | String |
| **`subtitle`** | String |
| **`legends`** | Array with objects of color and description   |
| **`children`** | Children to be rendered  |

### Api
> Access to Ia2 API

| Prop | Description |
:------------ |:---------------|
| **`api_url`** | String |


#### Available functions
- userLogin
- userLogout
- refreshToken
- getAnonymizedDoc
- getDocAnalysis
- getSubjects
- selectSubject
- getEntities
- getDocToDownload
- getDocPublishedToDrive
- getDocPublished

## Development

### Build as library
`npm run build`

### Run example
`npm start`

## Licencia

[**GNU General Public License version 3**](LICENSE)

## Contribuciones

Por favor, asegúrese de leer los [lineamientos de contribución](CONTRIBUTING.md) antes de realizar Pull Requests.
