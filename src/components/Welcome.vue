<template>
  <v-container fluid class="presentation-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-8" elevation="2" rounded="xl">
          <div class="text-center mb-8">
            <v-img
              :src="require('../assets/logo.png')"
              max-width="80"
              class="mx-auto mb-6"
            />
            
            <h1 class="display-1 font-weight-light text--primary mb-2">
              Teste Felipe Mourão
            </h1>
            
            <p class="subtitle-1 text--secondary">
              Projeto de Desenvolvimento Frontend
            </p>
          </div>
          <div class="text-center mb-8">
            <p class="body-1 text--primary mb-6" style="line-height: 1.6;">
              Este projeto demonstra habilidades em desenvolvimento frontend moderno
              utilizando Vue.js e Vuetify, com foco em design responsivo e 
              boas práticas de desenvolvimento.
            </p>
            <div class="d-flex flex-wrap justify-center mb-6">
              <v-chip
                v-for="tech in technologies"
                :key="tech"
                class="ma-1"
                small
                outlined
                label
                color="primary"
              >
                <v-icon left small>{{ getTechIcon(tech) }}</v-icon>
                {{ tech }}
              </v-chip>
            </div>
            <v-btn
              color="purple"
              dark
              class="px-6"
              @click="redirectUsers"
            >
             <v-icon left dark>mdi-account-group</v-icon>  Módulo de Usuários 
            </v-btn>
          </div>

          <v-divider class="mb-4"></v-divider>
          <p class="text-center caption text--secondary mb-0">
            Desenvolvido com Vue.js • {{ currentYear }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Welcome',

    data: () => ({
      currentYear: new Date().getFullYear(),
      technologies: ['Vue.js', 'Vuetify', 'JavaScript', 'Vuex', 'VueRouter', 'Responsive Design']
    }),

    methods: {
      redirectUsers() {
        this.$router.push({ name: 'users' });
      },
      
      getTechIcon(tech) {
        const icons = {
          'Vue.js': 'mdi-vuejs',
          'Vuetify': 'mdi-material-design',
          'JavaScript': 'mdi-language-javascript',
          'Vuex': 'mdi-database',
          'VueRouter': 'mdi-routes',
          'Responsive Design': 'mdi-responsive'
        };
        return icons[tech] || 'mdi-code-tags';
      }
    }
  }
</script>