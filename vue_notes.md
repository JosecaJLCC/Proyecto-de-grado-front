## el v-bind directive se utiliza para actualizar reactivamente un atributo HTML:

### <a v-bind:href="url"> ... </a>

<!-- shorthand -->
### <a :href="url"> ... </a>

## Otro ejemplo es el v-on directiva, que escucha los eventos DOM:

### <a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
### <a @click="doSomething"> ... </a>

## Los modificadores son correcciones posteriores especiales indicadas por un punto, que indican que una directiva debe estar vinculada de alguna manera especial. Por ejemplo, el .prevent el modificador le dice al v-on directiva para llamar event.preventDefault() en el evento activado:

### <form @submit.prevent="onSubmit">...</form>

## En la API de composición, la forma recomendada de declarar el estado reactivo es utilizando el ref() función:

### import { ref } from 'vue' 
### const count = ref(0)


## Si flex-grow: 1 no hace nada

### Esto solo funciona si el header está dentro de un contenedor flexible que le permite crecer.