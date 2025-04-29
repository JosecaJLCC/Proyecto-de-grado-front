<template>
    <div class="container-tableattention" >
      <div class="header-tableattention">

        <section class="search-tableattention">
          <section class="input-tableattention">
            <input type="text" placeholder="INGRESE SU CI" class="input-text-search">
            <CIcon :icon="cilSearch" class="icon-tableattention"/>
          </section>
          <button class="btn-search">BUSCAR</button>
        </section>
      </div>
      <table class="table-attention">
        <thead>
            <tr>
                <th>N°</th>
                <th>CI</th>
                <th>PATERNO</th>
                <th>MATERNO</th>
                <th>NOMBRES</th>
                <th>ACCIONES</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, Nro) of datos" v-bind:key="data.cedula">
              <!--  -->
                <td data-title="N°">{{ Nro + 1 }}</td>
                <td data-title="cedula">{{ data.cedula }}</td>
                <td data-title="paterno">{{ data.paterno }}</td>
                <td data-title="materno">{{ data.materno }}</td>
                <td data-title="nombre">{{ data.nombre }}</td>
                <td><button>VER</button><button>ATENDER</button></td>

            </tr>

        </tbody>
    </table>
    </div>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebar.js';
import { computed, onMounted, ref } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import { cilUser, cilLockLocked, cilLowVision, cilLockUnlocked, cilSearch } from '@coreui/icons';
import axios from 'axios';

let sidebarStore = useSidebarStore();
let tamanioSidebar = computed(()=>sidebarStore.tamanioSidebar)
let datos = ref([]);
onMounted(async()=>{
  const resultado = await axios.get('http://localhost:3000/api/v1/people/show');
  console.log("myres", resultado.data.resultado);
  datos.value=resultado.data.resultado
})

</script>

<style scoped>
.container-tableattention{
  color: black;
  border: 3px solid green;
  transition: width 0.3s ease;
}

.header-tableattention{
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  padding: 10px;
}

.search-tableattention{
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
}

.input-tableattention{
  display: flex;
  position: relative;

  align-items: center;


}
.icon-tableattention{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5px;

}

.btn-search{
  background-color: rgb(0, 128, 128);
  color: white;
  width: 150px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-weight: bold;
}

.input-text-search{
  padding-left: 25px;
  border-radius: 20px;
}

.btn-search, .input-text-search{
  font-size: 1.3em;
  height: 35px;
}

.date-tableattention{
  background-color: rgb(0, 128, 128);
  color: white;
  padding: 5px;
  border-radius: 20px;
}

/*  */
table{
    border-collapse: collapse;
    margin: 0;
    width: 100%;
    box-shadow: 0 0 5px rgba(0,0,0,-25);
    border: 3px solid white;

}

table tr{
    padding: .45em;
}

thead tr{
    background-color: rgb(0, 128, 128);
}

tbody   tr:nth-child(even){
    background-color: rgba(0, 128, 128, .1);
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
  .container-tableattention{
    border: 3px solid red;
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
        background-color: 0 0 5px rgba(0,0,0,-25);;
        /* color: white; */
    }
}
</style>
