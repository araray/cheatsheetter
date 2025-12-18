<!-- src/App.vue -->

<template>
  <div :class="currentTheme">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Cheat Sheet Tool</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create"
                >Create Cheat Sheet</router-link
              >
            </li>
          </ul>
          <ThemeSelector @themeChange="setTheme" />
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import ThemeSelector from "./components/ThemeSelector.vue";

export default {
  name: "App",
  components: {
    ThemeSelector,
  },
  data() {
    return {
      currentTheme: localStorage.getItem("theme") || "default-theme", // Load theme from localStorage or set default
    };
  },
  methods: {
    setTheme(themeName) {
      this.currentTheme = `${themeName}-theme`;
      localStorage.setItem("theme", this.currentTheme);
    },
  },
  created() {
    // Ensure the theme is set on app initialization
    this.setTheme(this.currentTheme.replace("-theme", ""));
  },
};
</script>

<style>
/* Global styles using CSS variables */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.navbar,
.btn-primary {
  background-color: var(--primary-color);
  color: #ffffff;
}

body,
.navbar,
.btn-primary {
  transition: background-color 0.3s, color 0.3s;
}
</style>
