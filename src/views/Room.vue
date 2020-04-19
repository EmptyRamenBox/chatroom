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
        <v-list-item v-for="r in rooms" :key="r.id" :to="`/room/${r.id}`">
          <v-list-item-content>
            <v-list-item-title>{{ r.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- -->
      </v-list>
    </v-navigation-drawer>
    <v-container v-if="messages">
      <v-card class="mb-2" v-for="message in messages" :key="message.id">
        <v-card-subtitle
          ><span class="font-weight-bold">{{ message.author }}</span> on
          {{ message.createdAt.toLocaleString() }}</v-card-subtitle
        >
        <v-card-text>
          {{ message.message }}
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
import { db } from "../plugins/firebase";
import { mapGetters } from "vuex";

export default {
  name: "Room",
  data() {
    return {
      newMessage: "",
      room: {},
      rooms: [],
      messages: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  watch: {
    // watcher
    // will pay attention when something in particular happens
    // IN THIS Case, the watcher will watch out when the route changes
    "$route.params.id": async function() {
      this.bind();
      // to prevent list of chat rooms, the following line was added
      await this.$bind(
        "room",
        db.collection("rooms").doc(this.$route.params.id)
      );
      await this.$bind(
        "messages",
        db
          .collection("messages")
          .where("roomId", "==", this.$route.params.id)
          .orderBy("createdAt")
      );
    },
  },
  mounted() {
    this.bind();
  },
  methods: {
    async add() {
      if (this.newMessage != "") {
        await db.collection("messages").add({
          roomId: this.$route.params.id,
          author: this.user.displayName,
          message: this.newMessage,
          createdAt: new Date(),
        });
        this.newMessage = "";
      }
    },
    async bind() {
      // 3 different things to bind
      // handles current room
      await this.$bind(
        "room",
        db.collection("rooms").doc(this.$route.params.id)
      );
      // handles other rooms
      // watcher, function that pays attention when something in particular happens
      // in this case, we want to bind the room id when the route changes
      await this.$bind("rooms", db.collection("rooms").orderBy("createdAt"));
      // binding messages
      await this.$bind(
        "messages",
        db
          .collection("messages")
          .where("roomId", "==", this.$route.params.id)
          .orderBy("createdAt")
      );
    },
  },
};
</script>
