<template>
  <v-container class="table-container px-0 flex-grow-1" fluid>
    <v-simple-table :mobile-breakpoint="$vuetify.breakpoint">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Название</th>
            <th class="text-left">Город</th>
            <th class="text-left">Адрес</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="point in points"
            :key="point.id"
            @mouseover="mouseOverRow(point)"
            @mouseleave="mouseLeaveRow()"
          >
            <td>{{ point.name }}</td>
            <td>{{ point.cityId.name }}</td>
            <td>{{ point.address }}</td>
            <td class="text-right" width="30%">
              <ControlButtons v-show="hoverItem === point" />
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
    points: Array,
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