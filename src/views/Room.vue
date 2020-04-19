<template>
  <div>
    <v-navigation-drawer app permanent clipped color="teal lighten-4">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ room.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Current Room
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item
          v-for="room in rooms"
          :key="room.id"
          :to="`/room/${room.id}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ room.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- -->
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <v-card class="mb-2" v-for="message in messages" :key="message.id">
        <v-card-subtitle
          ><span class="font-weight-bold">{{ message.author }}</span> on
          {{ message.createdAt.toLocaleString() }}</v-card-subtitle
        >
        <v-card-text>
          {{ message.text }}
        </v-card-text>
      </v-card>
    </v-container>
    <v-footer absolute color="teal lighten-4"
      ><v-text-field
        v-model="newMessage"
        color="blue darken-4"
        label="New Message"
        @change="add"
      />

      <v-btn color="success" @click="add">Send</v-btn></v-footer
    >
  </div>
</template>

<script>
// vuex-persistedstate always keeps user stored
// yarn add vuex-persistedstate
export default {
  name: "Room",
  data() {
    return {
      newMessage: "",
      room: {
        id: 123,
        name: "First",
        createdAt: new Date(),
      },
      rooms: [
        { id: 1, name: "Amazing Second" },
        { id: 2, name: "Deja Vu I have been in this time before" },
      ],
      messages: [
        {
          id: 1,
          text: "First message",
          author: "Rodolfo Roman",
          createdAt: new Date(),
        },
        {
          id: 2,
          text: "Second message",
          author: "Rodolfo Roman",
          createdAt: new Date(),
        },
      ],
    };
  },
  methods: {
    add() {},
  },
};
</script>
