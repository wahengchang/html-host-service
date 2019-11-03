<template>
  <div class="container">
    <div class="row" :style="{ display: flex }">
      <a class="subtitle" href="/me">Hi {{ _user.displayName }}</a>
      <button @click="onClickAddTemplate" class="addButton flexPush">
        Create
      </button>
    </div>

    <ul v-if="roomList" class="roomListWrapper">
      <li v-for="(item, index) in roomList" :key="index" class="listItem">
        <a :href="`/detail/${item.id}`">{{ item.name }}</a>

        <a
          class="viewButton flexPush"
          :href="`/views/${item.id}`"
          target="blank"
        >
          View
        </a>
        <button @click="onClickRemoveRoom(item.id)" class="">X</button>
      </li>
    </ul>
    <div v-else>
      Loading ...
    </div>
  </div>
</template>

<script>
import requiredLogin from '~/mixins/requiredLogin'

import RoomDao from '~/utils/dao/Room'
const { DEFAULT_ROOM } = RoomDao
const roomDao = new RoomDao()

export default {
  components: {},
  mixins: [requiredLogin],
  data: function() {
    return {
      roomList: null
    }
  },
  computed: {
    _user() {
      return this.user
    }
  },
  mounted: async function() {
    await this.initData()
  },
  methods: {
    onClickAddTemplate: async function() {
      const name = `peter-room-${new Date().getTime()}`
      const creator = this.user.email
      const payload = { ...DEFAULT_ROOM, name, creator }
      await roomDao.create(payload)
      await this.initData()
    },
    onClickRemoveRoom: async function(id) {
      if (!id) console.log('[ERROR] room id is null')
      await roomDao.remove(id)
      await this.initData()
    },
    initData: async function() {
      await Promise.all([this.fetchRoomList()])
    },
    fetchRoomList: async function() {
      const roomList = await roomDao.list()
      this.roomList = roomList
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  border: lightgray 1px solid;
  padding: 20px 30px;
}

.subtitle {
  font-weight: 300;
  font-size: 16px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.addButton {
  margin-left: 20px;
}

.links {
  padding-top: 15px;
}

.roomListWrapper {
  margin-top: 20px;
  width: 100%;
}
.listItem {
  display: flex;
  margin: 10px 0;
}
.flexPush {
  margin-left: auto;
}

.viewButton {
  text-decoration: none;
  color: gray;
  font-style: italic;
  font-size: 12px;
  padding: 0 12px;
}
</style>
