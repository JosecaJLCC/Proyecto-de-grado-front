<template>
  <main class="container-homeview">
    <table>
        <thead>
            <tr>
                <th>Year</th>
                <th>Champion</th>
                <th>Runner Up</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-title="Year">2022</td>
                <td data-title="Champion">Argentina</td>
                <td data-title="Runner Up">Francia</td>
            </tr>
            <tr>
                <td data-title="Year">2018</td>
                <td data-title="Champion">Francia</td>
                <td data-title="Runner Up">Crocia</td>
            </tr>
            <tr>
                <td data-title="Year">2014</td>
                <td data-title="Champion">Alemania</td>
                <td data-title="Runner Up">Argentina</td>
            </tr>
            <tr>
                <td data-title="Year">2010</td>
                <td data-title="Champion">España</td>
                <td data-title="Runner Up">Holanda</td>
            </tr>
        </tbody>
    </table>
  </main>
</template>

<script setup>
  import { Usuario } from '@/services/Usuario.js';
  import { onMounted } from 'vue';
  onMounted(async() => {
    let usuario = new Usuario();
    let data = await usuario.obtenerUsuario();
    console.log("data", data[0])

  })
</script>

<style scoped>
.container-homeview{
    color: black;
    border: 3px solid green;
    transition: width 0.3s ease;
    width: 100%;
    max-width: 100%;
}

table{
    border-collapse: collapse;
    margin: 0;
    width: 100%;
    box-shadow: 0 0 5px rgba(0,0,0,-25);
}

table tr{
    padding: .45em;
}

thead tr{
    background-color: brown;
}

tbody   tr:nth-child(even){
    background-color: azure;
}

table th, table td{
    font-size: 1em;
    padding: 1em;
    text-align: center;
}

thead th{
    color: white;
    font-size: 1.15em;
}

@media (max-width:500px){
    table{
        border: 3px solid #6e0737;
    }

    table thead tr{
        display: none;
    }

    table tr{
        display: block;
    }
    table th, table td{
        padding: .5em
    }
    table td{
        text-align: right;
        display: block;
        font-size: 1em;
    }
    table td::before{
        content: attr(data-title)": ";
        float: left;
    }

    tbody tr:nth-child(even){
        background-color: #6e0737;
        color: white;
    }
}

</style>
