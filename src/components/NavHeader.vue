<template>
  <div class="nav-header-container">
    <el-menu
      :default-active="route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/community" style="font-size: 23px"
        >社区论坛</el-menu-item
      >
      <el-menu-item
        index="/manageTea"
        style="font-size: 23px"
        v-if="userInfo.usertype == 'admin'"
        >审核教师申请</el-menu-item
      >
      <el-menu-item class="logout-btn" index="/" style="font-size: 23px"
        >退出登录</el-menu-item
      >
      <el-menu-item style="font-size: 23px;float: right;font-size:20px" class="user">{{
        userInfo.username
      }}</el-menu-item>
      <el-menu-item index="/information" class="msg">
        <i class="el-icon-message"
          ><el-badge
            v-if="messageNum != 0"
            :value="messageNum"
            class="item"
          ></el-badge
        ></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>
const index = new Set(['/community'])
<script>
import {
  computed,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "NavHeader",
  setup() {
    const { ctx } = getCurrentInstance();
    const axios = ctx.axios;
    const route = useRoute();
    // const $route = unref(ctx.$router.currentRoute);
    const store = useStore();

    const data = reactive({ activeIndex: "1", search_inf: "", infNum: 0 });

    const userInfo = computed(() => store.state.userInfo);

    const messageNum = computed(() => store.state.messageNum);

    onMounted(() => {
      axios({
        method: "post",
        url: "/getmessagenum",
        headers: { token: userInfo.token },
      }).then((res) => {
        if (res.data.code == 1001) {
          data.infNum = res.data.data;
          store.commit("setMessageNum", res.data.data);
        } else {
          store.commit("setMessageNum", 0);
        }
      });
    });

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      ...toRefs(data),
      handleSelect,
      messageNum,
      userInfo,
      route,
      axios,
      store,
      ctx,
    };
  },
};
</script>

<style scoped>
.nav-header-container {
  background-color: #606266;
  font-family: KaiTi;
  font-size: 1em;
  font-weight: bold;
}
.logout-btn {
  /* float: right; */
  left: 75%;
}

.user{
  left: 75%;
}

.msg{
  left: 75%;
}

</style>
