<template>
  <section v-if="appList && !isLoading" class="container">
    <div class="infoContainer">
      setting

      <button class="addButton flexPush" @click="onClickAddApp">
        Create
      </button>
    </div>
    <ul v-if="appList" class="appListWrapper">
      <li v-for="(item, index) in appList" :key="index" class="listItem">
        <a :href="`#`">{{ item.name }}</a>
        <button @click="onClickRemoveApp(item.id)" class="">X</button>
      </li>
    </ul>
  </section>
  <section v-else>Loading ...</section>
</template>

<script>
import requiredLogin from '~/mixins/requiredLogin'
import AppDao from '~/utils/dao/App'
// import { timestampToDateFormat } from '~/utils/time'
const appDao = new AppDao()

export default {
  components: {},
  mixins: [requiredLogin],
  data: function() {
    return {
      isLoading: true,
      appList: null,
      appName: null,
      appContent: ''
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
    onClickAddApp: async function() {
      const name = `peter-room-${new Date().getTime()}`
      const creator = this.user.email
      const token = `${new Date().getTime()}`
      const payload = { name, creator, token }
      await appDao.create(payload)
      await this.initData()
    },
    onClickRemoveApp: async function(id) {
      if (!id) console.log('[ERROR] app id is null')
      await appDao.remove(id)
      await this.initData()
    },
    initData: async function() {
      const appList = await appDao.list()
      this.appList = appList
      this.isLoading = false
    }
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
