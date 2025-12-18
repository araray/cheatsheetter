<!-- src/components/Editor.vue -->

<template>
  <div>
    <h1>Edit Cheat Sheet</h1>
    <!-- Cheat Sheet Title -->
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input type="text" v-model="cheatsheet.title" class="form-control" />
    </div>

    <!-- Number of Columns -->
    <div class="mb-3">
      <label class="form-label">Number of Columns</label>
      <input
        type="number"
        v-model.number="cheatsheet.columns"
        min="1"
        class="form-control"
      />
    </div>

    <!-- Categories -->
    <div
      v-for="(category, cIndex) in cheatsheet.categories"
      :key="cIndex"
      class="card mb-3"
    >
      <div class="card-body">
        <!-- Category Name -->
        <div class="mb-3">
          <label class="form-label">Category Name</label>
          <input type="text" v-model="category.name" class="form-control" />
        </div>

        <!-- Category Column -->
        <div class="mb-3">
          <label class="form-label">Column Number</label>
          <input
            type="number"
            v-model.number="category.column"
            :min="1"
            :max="cheatsheet.columns"
            class="form-control"
          />
        </div>

        <!-- Custom Component for Category (Optional) -->
        <div class="mb-3">
          <label class="form-label">Custom Component (optional)</label>
          <input
            type="text"
            v-model="category.component"
            class="form-control"
            placeholder="e.g., shortcut-table"
          />
        </div>

        <!-- Items -->
        <div
          v-for="(item, iIndex) in category.items"
          :key="iIndex"
          class="mb-3"
        >
          <!-- Command -->
          <div class="mb-3">
            <label class="form-label">Command</label>
            <input type="text" v-model="item.command" class="form-control" />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label">Description</label>
            <input
              type="text"
              v-model="item.description"
              class="form-control"
            />
          </div>

          <!-- Custom Component for Item (Optional) -->
          <div class="mb-3">
            <label class="form-label">Custom Component (optional)</label>
            <input
              type="text"
              v-model="item.component"
              class="form-control"
              placeholder="Specify custom component"
            />
          </div>

          <!-- Remove Item Button -->
          <button class="btn btn-danger" @click="removeItem(cIndex, iIndex)">
            Remove Item
          </button>
        </div>

        <!-- Add Item Button -->
        <button class="btn btn-secondary" @click="addItem(cIndex)">
          Add Item
        </button>

        <!-- Remove Category Button -->
        <button class="btn btn-danger mt-3" @click="removeCategory(cIndex)">
          Remove Category
        </button>
      </div>
    </div>

    <!-- Add Category Button -->
    <button class="btn btn-primary" @click="addCategory">Add Category</button>

    <!-- Save Button -->
    <button class="btn btn-success mt-3" @click="saveCheatsheet">
      Save Cheat Sheet
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Editor",
  data() {
    return {
      cheatsheet: {
        title: "",
        columns: 1,
        categories: [],
      },
    };
  },
  methods: {
    addCategory() {
      this.cheatsheet.categories.push({
        name: "",
        column: 1,
        component: "",
        items: [
          {
            command: "",
            description: "",
            component: "",
          },
        ],
      });
    },
    removeCategory(index) {
      this.cheatsheet.categories.splice(index, 1);
    },
    addItem(categoryIndex) {
      this.cheatsheet.categories[categoryIndex].items.push({
        command: "",
        description: "",
        component: "",
      });
    },
    removeItem(categoryIndex, itemIndex) {
      this.cheatsheet.categories[categoryIndex].items.splice(itemIndex, 1);
    },
    saveCheatsheet() {
      if (!this.cheatsheet || !this.cheatsheet.title) {
        alert("Please enter a title for the cheat sheet.");
        return;
      }
      const name = this.cheatsheet.title
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      axios
        .post(`/api/cheatsheets/${name}`, this.cheatsheet)
        .then(() => {
          this.$router.push(`/cheatsheet/${name}`);
        })
        .catch((error) => {
          console.error("Error saving cheat sheet:", error);
        });
    },
    fetchCheatsheet() {
      const name = this.$route.params.name;
      if (name) {
        axios
          .get(`/api/cheatsheets/${name}`)
          .then((response) => {
            this.cheatsheet = response.data;
            if (!this.cheatsheet.title) {
              this.cheatsheet.title = name.replace("_", " ").title();
            }
          })
          .catch((error) => {
            console.error("Error fetching cheat sheet:", error);
          })
          .catch((error) => {
            console.error("Error fetching cheat sheet:", error);
          });
      } else {
        // Initialize a new cheat sheet
        this.cheatsheet = {
          title: "",
          columns: 1,
          categories: [],
        };
      }
    },
  },
  created() {
    this.fetchCheatsheet();
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
}
.card-body {
  padding: 16px;
}
</style>
