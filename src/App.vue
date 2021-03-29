<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
      title: 'Agrifamily',
      titleTemplate: '%s - Cambodia Community',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
  components: {

  },

  data: () => ({
    
  })
};
</script>
