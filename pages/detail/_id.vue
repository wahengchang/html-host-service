<template>
  <section v-if="roomData && !isLoading" class="container">
    <div class="infoContainer">
      <h2
        class="mainTitle"
        contenteditable
        @input="onInputName"
        v-text="roomData.name"
      />
      <span class="subInfo flexPush">
        Created At: {{ timestampToDateFormat(roomData.createdAt) }}
      </span>
      <a class="viewButton" :href="`/views/${roomData.id}`" target="blank">
        View
      </a>
      <button class="" @click="onClickSave">Save</button>
    </div>
    <textarea v-model="roomContent" class="textEditor" />
  </section>
  <section v-else>Loading ...</section>
</template>

<script>
import requiredLogin from '~/mixins/requiredLogin'
import RoomDao from '~/utils/dao/Room'
import { timestampToDateFormat } from '~/utils/time'
const roomDao = new RoomDao()

export default {
  components: {},
  mixins: [requiredLogin],
  data: function() {
    return {
      isLoading: true,
      roomData: null,
      roomName: null,
      roomContent: ''
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
    initData: async function() {
      await Promise.all([this.fetchRoomDetail()])
      this.isLoading = false
    },
    fetchRoomDetail: async function() {
      const id = this.$route.params.id
      const roomData = await roomDao.getById(id)
      this.roomData = roomData
      this.roomName = (roomData && roomData.name) || ''
      this.roomContent = (roomData && roomData.content) || ''
    },
    onClickSave: async function() {
      this.isLoading = true
      const { roomContent, roomName } = this
      const id = this.$route.params.id
      await roomDao.update(id, {
        content: roomContent,
        name: roomName
      })
      this.isLoading = false
    },
    onInputName: function(e) {
      this.roomName = e.target.innerText
    },
    timestampToDateFormat
  }
}
</script>

<style>
.container {
  height: 100%;
}
.textEditor {
  height: 100%;
  width: 100%;
}
.infoContainer {
  display: flex;
  line-height: 30px;
}
.viewButton {
  text-decoration: none;
  color: gray;
  font-style: italic;
  font-size: 12px;
  padding: 0 12px;
}
.mainTitle {
  font-size: 14px;
  color: gray;
}
.subInfo {
  font-size: 11px;
  color: gray;
  margin-right: 20px;
}
.flexPush {
  margin-left: auto;
}
[contenteditable='true'].single-line {
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
}
[contenteditable='true'].single-line br {
  display: none;
}
[contenteditable='true'].single-line * {
  display: inline;
  white-space: nowrap;
}
</style>
