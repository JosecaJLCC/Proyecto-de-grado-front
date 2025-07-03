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

## HAcer lo siguiente en el main.js para usar Pinia en el main.js

``` js
import { createPinia } from 'pinia'
const pinia = createPinia();

createApp(App)
.use(pinia).mount('#app')
```

## Se instalo commitlint para el mejoramiento del git log

``` sh
npm install -D @commitlint/cli @commitlint/config-conventional

```

## Configurar commitlint para utilizar la configuración convencional

```js
export default {
  extends: ['@commitlint/config-conventional']
}

```

## Usando un administrador de hooks git instalamos Husky para emitir funciones antes y despues de eventos de git

### antes del siguiente comando se debe tener un repositorio git

```sh
npm install --save-dev husky
```

## El init El comando simplifica la configuración de husky en un proyecto

```sh
npm husky init
```

## Para adicionar hooks ponemos el siguiente comando

```sh
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```