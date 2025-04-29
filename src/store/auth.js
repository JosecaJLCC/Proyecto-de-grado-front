import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authUser: null
        }
    },
    getters:{
      user: (state) => {
        return state.authUser
      }
    },
    actions:{
      async getToken(){
         await axios.get("http://localhost:3000/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token.value}` }
        });
      },
      asyncUser(){
        
      }
    }


});
