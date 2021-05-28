# IA² | Annotation tool

<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="220px" src="public/images/ia2-logo.png" alt="IA²" />
  </a>
</p>
<br/>
<h4 align="center">Annotation tool for the IA² desktop app</h4>

---

<p align="center" style="margin-top: 14px;">
  <a
    href="https://github.com/instituciones-abiertas/ia2-annotastion-tool/blob/main/LICENSE"
  >
    <img
      src="https://img.shields.io/badge/License-GPL%20v3-blue.svg"
      alt="License" height="20"
    >
  </a>
  <a
    href="https://github.com/instituciones-abiertas/ia2-annotastion-tool/blob/main/CODE_OF_CONDUCT.md"
  >
    <img
      src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg"
      alt="Contributor Covenant" height="20"
    >
  </a>
</p>

## About

The `ia2-annotation-tool` is a react library that provides the a annotation feature for the IA² project. This library wraps up the API calls to the IA² server.

## Pre-requisites

- Node `12.18.2`

## Install library in your application

```bash
npm install https://github.com/instituciones-abiertas/ia2-annotation-tool.git
```

## Components

### Editor

| Prop                      | Description                             | Type        | Example                                                                                                                                             |
| ------------------------- | --------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`style`**               | Editor css styles                       | `Object`    | `{ backgroundColor: 'var(--contrast-color)', lineHeight: 2, fontSize: 'large', padding: '3em' }`                                                    |
| **`annotations`**         | Initial text annotations                | `Array`     | `[{ id: 1, start: 18, end: 28, tag: 'PERSON', should_anonymized: true, human_marked_ocurrency: false }]`                                            |
| **`tags`**                | Annotation tags/entities                | `Array`     | `[{ id: 1, name: 'PERSON', description: 'Una persona', should_anonimyzation: true, enable_multiple_selection: false }]`                             |
| **`text`**                | Document Text                           | `String`    | `'On Monday night, Mr. Fallon will have a co-host for the first time: The rapper Cardi B, who just released her first album, Invasion of Privacy'`  |
| **`onAnnotationsChange`** | Function to acces the annotations state | `Function`  | `(deleteAnnotations, newAnnotations) => console.log(deleteAnnotations, newAnnotations)`                                                             |

### Instructions

Instructions is a visual component, similar to a header, that is placed above the text annotator.

| Prop            | Description                         | Type      | Example                                                                                                         |
| --------------- | ----------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| **`title`**     | The instructions title              | `String`  | `'Select a label'`                                                                                              |
| **`subtitle`**  | The isntructions subtitle           | `String`  | `'Then delete, add or change identified entities.`                                                              |
| **`legends`**   | References to the coloured entities | `Array`   | `[{color: '#00D6A1', description: 'Anonymized' }, { color: '#ffca00', description: 'Not anonymized' }]`         |
| **`children`**  | Children nodes to be rendered       | `Array`   | `<div><ul><li>I'm a child</li><li>I'm another child</li></ul></div>`                                            |

### Api

#### Props

| Prop          | Description                   | Type      | Example                   |
| ------------- | ----------------------------- | --------- | --------------------------|
| **`api_url`** | The url for the API services  | `String`  | `'http://localhost:8000'` |

#### Access functions to the IA² API

| Function                      | Description                                                   | Params                                                                                                                                                                                      | Response                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`userLogin`**               | Authenticates a user                                          | `{"email": "demo@mydomain.coop", "password": "123456"}`                                                                                                                                     | `{"refresh": "token", "access": "token"}`                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`userLogout`**              | Terminates a user session                                     |                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`refreshToken`**            | Renews a user session                                         | `{"refresh": "token"}`                                                                                                                                                                      | `{"access": "token"}`                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`getSubjects`**             | Returns the available subjects                                |                                                                                                                                                                                             | `[{"name_subject": "Penal", "last_update": "2020-10-06T11:45:03.328000-03:00"}]`                                                                                                                                                                                                                                                                                                                                                                      |
| **`getEntities`**             | Returns the available labeling entities                       |                                                                                                                                                                                             | `[{"id": 29, "name": "PER", "description": "Una persona", "should_anonimyzation": false, "enable_multiple_selection": false}]`                                                                                                                                                                                                                                                                                                                        |
| **`getDocAnalysis`**          | Uploads a file and returns a list of detected entities        | `{ "file": <A valid file as a multipart request>}`                                                                                                                                          | `{"text": "On Monday night, Mr. Fallon will have a co-host for the first time: The rapper Cardi B, who just released her first album, Invasion of Privacy", "ents": [{"id": 420, "start": 17, "end": 26, "tag": "PER", "should_anonymized": true, "human_marked_ocurrency": false}], "id": 1}`                                                                                                                                                        |
| **`getAnonymizedDoc`**        | Takes added and deleted annotations and returns new entities  | `{"newOcurrencies": [{ "start": 27, "end": 33, "tag": "PER", "should_anonymized": true }], "deleteOcurrencies": [{ "start": 141, "end": 143, "tag": "MISC", "should_anonymized": true }]}`  | `{"anonymous_text": "On Monday night, Mr. Fallon will have a co-host for the first time: The rapper Cardi B, who just released her first album, Invasion of Privacy", "data_visualization": {"entitiesResult": [{"id": 29, "name": "PER", "description": "Una persona", "should_anonimyzation": false, "enable_multiple_selection": false}], "total": {"model_total_ent": 63, "model_wrong_ent": 1, "human_total_ent": 2, "percent_total": 95.38}}}`  |
| **`getDocToDownload`**        | Downloads an anonymized document                              |                                                                                                                                                                                             |
| **`getDocPublishedToDrive`**  | Publishes an anonymized document to Google Drive              |                                                                                                                                                                                             |
| **`getDocPublished`**         | Publishes an anonymized document to Dropbox                   |                                                                                                                                                                                             |
| **`selectSubject`**           | Tells the server what subject to use                          |                                                                                                                                                                                             |
| **`getHechoStats`**           | Return hecho stats                                            | `{"start": "2000-01-20", "end": "2001-01-20"}`                                                                                                                                              | `{"otros": 2 , "total": 5 , "violencia": 3 , "violencia_genero": 3}`
| **`getEdadStats`**           | Return edad stats                                            | `{"start": "2000-01-20", "end": "2001-01-20"}`                                                                                                                                              | `{"promedio_acusadx": 30 , "promedio_victima": 30}`
 | **`getLugarStats`**         | Return lugar stats                                            | `{"start": "2000-01-20", "end": "2001-01-20"}`                                                                                                                                              | [`{"nombre": "John Doe" , "cantidad": 30}, {"nombre": "Jane Doe", "cantidad": 30}]`

## Development

### Build as library

```bash
npm run build
```

### Run example

```bash
npm start
```

## Contributing

Please, make sure to read our [contribution guidelines](CONTRIBUTING.md) before opening a pull request.

## License

[**GNU General Public License version 3**](LICENSE)
