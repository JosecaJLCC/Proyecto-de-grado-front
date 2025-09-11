# copacabana-health

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### instalar axios

```sh
npm install axios -E
```

### instalar CoreUI

```sh

npm install @coreui/icons
npm install @coreui/icons-vue 

```

### instalar Sweet alert para alertas

``` sh
npm install sweetalert2
```

### instalar Pinia para utilizar variables globales

``` sh
npm install pinia

```

## Hacer lo siguiente en el main.js para usar Pinia en el main.js

``` js
import { createPinia } from 'pinia'
const pinia = createPinia();

createApp(App)
.use(pinia).mount('#app')
```

## Configuracion de commitlint + husky v9+

### Este proyecto usa **Commitlint** para validar los mensajes de commit

### 1. instalacion

``` bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
```

## 2. configurar commitlint

### Creamos el archivo commitlint.config.js en la raiz del proyecto con el sgte contenido

```js
module.exports ={
  extends: ['@commitlint/config-conventional']
}

```

## 3. Configurar husky manualmente

### Crear carpeta y archivo de hook

```bash
mkdir -p .husky
touch .husky/commit-msg
chmod +x .husky/commit-msg
```

### Edita .husky/commit-msg y agrega este contenido

```sh
  #!/bin/sh
  npx --no-install commitlint --edit "$1"

```

## 4. Probar configuracion

  ```bash
  git commit -m "feat: agregar funcionalidad X"
  ```

## oxlint

  ```sh
  npm install --save-dev oxlint
  ```

### Crear el archivo de configuración

  ```sh
  touch .oxlintrc.json
  ```

### Escribir lo siguiente en el archivo

  ```json
  {
  "rules": {
      "no-alert": "error",
      "oxc/approx-constant": "warn",
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
  }
  }
  ```

### Agregamos el siguiente script en package.json

  ``` json
  "scripts":{
      "lint": "oxlint"
  }
  ```

### Asi podras correr el siguiente comando

  ```sh
  npm run lint
  ```

### Me quede en FormEstablishment, se debe incorporar tabs para una mejor vision
