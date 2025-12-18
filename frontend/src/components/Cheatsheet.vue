<!-- src/components/Cheatsheet.vue -->

<template>
  <div>
    <h1>{{ cheatsheet.data.title }}</h1>
    <div class="row">
      <div v-for="column in columnsArray" :key="column" class="col">
        <div
          v-for="category in categoriesByColumn[column]"
          :key="category.name"
        >
          <h3>{{ category.name }}</h3>
          <ul class="list-group mb-3">
            <li
              v-for="item in category.items"
              :key="item.command"
              class="list-group-item"
            >
              <strong>{{ item.command }}</strong
              >: {{ item.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-link
      :to="`/cheatsheet/${cheatsheet.name}/edit`"
      class="btn btn-primary"
    >
      Edit
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cheatsheet",
  props: ["name"],
  data() {
    return {
      cheatsheet: {
        name: "",
        columns: 1,
        categories: [],
        data: {
          title: "",
          categories: [],
        },
      },
      categoriesByColumn: {},
      columnsArray: [],
    };
  },
  methods: {
    fetchCheatsheet() {
      axios
        .get(`/api/cheatsheets/${this.name}`)
        .then((response) => {
          this.cheatsheet = response.data;
          this.processCategories();
        })
        .catch((error) => {
          console.error("Error fetching cheat sheet:", error);
        });
    },
    processCategories() {
      const columns = this.cheatsheet.columns || 1;
      this.columnsArray = Array.from({ length: columns }, (_, i) => i + 1);
      this.categoriesByColumn = {};

      // Initialize categoriesByColumn
      this.columnsArray.forEach((col) => {
        this.categoriesByColumn[col] = [];
      });

      // Assign categories to columns
      this.cheatsheet.categories.forEach((category) => {
        const column = category.column || 1;
        if (!this.categoriesByColumn[column]) {
          this.categoriesByColumn[column] = [];
        }
        this.categoriesByColumn[column].push(category);
      });
    },
  },
  created() {
    this.fetchCheatsheet();
  },
};
</script>

<style scoped>
.row {
  display: flex;
}
.col {
  flex: 1;
  margin-right: 10px;
}
.col:last-child {
  margin-right: 0;
}
</style>
