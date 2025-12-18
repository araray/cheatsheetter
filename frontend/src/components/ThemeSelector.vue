<!-- src/components/ThemeSelector.vue -->

<template>
  <div class="theme-selector">
    <label for="themeSelect" class="form-label me-2">Theme:</label>
    <select
      id="themeSelect"
      class="form-select"
      @change="changeTheme"
      :value="selectedTheme"
    >
      <option v-for="theme in themes" :key="theme.value" :value="theme.value">
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ThemeSelector",
  data() {
    return {
      themes: [
        { name: "Default", value: "default" },
        { name: "Dark", value: "dark" },
      ],
      selectedTheme: localStorage.getItem("themeName") || "default", // Load selected theme
    };
  },
  methods: {
    changeTheme(event) {
      const themeName = event.target.value;
      this.selectedTheme = themeName;
      this.$emit("themeChange", themeName);
      localStorage.setItem("themeName", themeName); // Save theme name
    },
  },
  created() {
    // Emit the theme change event on component creation
    this.$emit("themeChange", this.selectedTheme);
  },
};
</script>

<style scoped>
.theme-selector {
  display: flex;
  align-items: center;
}
</style>
