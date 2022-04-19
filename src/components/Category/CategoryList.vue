<template>
  <v-container class="table-container px-0 flex-grow-1" fluid>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Название</th>
            <th class="text-left">Описание</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            @mouseover="mouseOverRow(category)"
            @mouseleave="mouseLeaveRow()"
          >
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td class="text-right" width="30%">
              <ControlButtons v-show="hoverItem === category" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import ControlButtons from "@/components/ControlButtons";
export default {
  props: {
    categories: Array,
  },
  components: { ControlButtons },
  data: () => ({
    hoverItem: false,
  }),
  methods: {
    mouseOverRow(item) {
      this.hoverItem = item;
    },
    mouseLeaveRow() {
      this.hoverItem = false;
    },
  },
};
</script>