<template>
  <v-card color="primary" class="mx-auto mt-4" max-width="300">
    <v-card-title>
      <v-container>
        <v-row align="baseline">
          <v-text-field
            v-model="newRoom"
            background-color="white"
            label="New Room"
            @change="add"
          />
          <!-- @change allows vuetify to accept input when the enter key is pressed -->
          <v-btn color="secondary" @click="add">Add</v-btn>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-subheader>
          Rooms Available:
        </v-subheader>

        <v-list-item
          v-for="room in rooms"
          :key="room.id"
          :to="`room/${room.id}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="room.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
// import database element
import { db } from "../plugins/firebase.js"; // Allows us to have Real-Time Implementation to DB

export default {
  name: "Home",
  data() {
    return {
      newRoom: "",
      rooms: [],
    };
  },
  // whenever the application gets rendered
  mounted() {
    this.bind();
  },
  methods: {
    async add() {
      // // the new Room is different and something (!= "")
      // // If empty, do nothing
      // this.newRoom != ""
      //   ? this.rooms.push({ id: this.rooms.length + 1, name: this.newRoom })
      //   : null;
      // // after a room is added, the v-text-field is cleared
      // this.newRoom = "";
      if (this.newRoom != "") {
        await db.collection("rooms").add({
          name: this.newRoom,
          createdAt: new Date(),
        });
        this.newRoom = "";
      }
    },
    async bind() {
      await this.$bind("rooms", db.collection("rooms").orderBy("createdAt")); // Allows us to have Real-Time Implementation to DB
    },
  },
};
</script>
