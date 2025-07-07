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