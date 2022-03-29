<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
  
export default defineComponent({
	name: 'App',
	components: {
		HelloWorld,
	},
});
</script>

<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<style lang="scss">
  @import './assets/scss/themes/default-theme.scss';
@import './assets/scss/base.scss';
</style>
