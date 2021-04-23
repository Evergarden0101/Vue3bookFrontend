<template>
  <div class="container">
    <div>
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @ready="playerReadied"
      >
      </video-player>
    </div>
    <div class="white-board">
      <div class="header">
        <h2>视频列表:</h2>
        <br />
      </div>
      <div class="videolist" v-for="(item, i) in videos" :key="i">
        <p :class="{ container1: !isShow[i], container2: isShow[i] }">
          <el-button type="text" @click="play_the_video(i)"
            ><h3>{{ item.name }}</h3></el-button
          >
          <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Player",
  setup() {
    const { ctx } = getCurrentInstance();
    const axios = ctx.axios;
    const route = useRoute();
    const router = useRouter();
    // const $route = unref(ctx.$router.currentRoute);
    const store = useStore();

    const data = reactive({
      beginTime: "",
      endTime: "",
      timber: "",
      paused: true,
      learningDuration: {
        id: "",
        userId: "",
        type: "0",
        examinationId: "",
        finishFlag: "0",
        durations: "",
      },
      isShow: [],
      lecture: {
        id: "",
        name: "",
        detail: "",
        date: "",
      },
      videos: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            type: "video/ogg",
            type: "video/webm",
            src: "", // url地址
          },
        ],
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
      },
    });

    const userInfo = computed(() => store.state.userInfo);

    onBeforeMount(() => {
      data.lecture.id = window.localStorage.getItem("courseid");
      data.lecture.date = window.localStorage.getItem("coursetime");
      data.lecture.detail = window.localStorage.getItem("coursedetail");
      data.lecture.name = window.localStorage.getItem("coursename");
      axios({
        method: "post",
        url: "/getvideos",
        data: {
          courseid: data.lecture.id,
        },
        headers: {
          token: userInfo.token,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          data.videos = res.data.data;
          for (var i = 0; i < data.videos.length; i++) {
            if (data.videos[i].id == window.localStorage.getItem("videoid")) {
              data.isShow[i] = true;
            } else {
              data.isShow[i] = false;
            }
          }
        } else {
        }
      });
    });

    onMounted(() => {
      submit();
      putLearningObj();
    });

    const play_the_video = (i) => {
      window.localStorage.setItem("videoid", data.videos[i].id);
      location.reload();
    };
    const submit = () => {
      let id = window.localStorage.getItem("videoid");
    };
    const putLearningObj = () => {
      if (!data.paused) {
        axios({
          method: "post",
          url: "/setwatchtime",
          data: {
            videoid: window.localStorage.getItem("videoid"),
            watchtime: data.learningDuration.durations,
          },
          headers: {
            token: userInfo.token,
          },
        }).then((res) => {});
      }
    };

    const onPlayerPlay = (player) => {
      data.paused = false;
      var moment = require("moment");
      data.beginTime = moment(new Date());
    };
    const onPlayerPause = (player) => {
      var moment = require("moment");
      data.paused = true;
      data.endTime = moment(new Date());
      axios({
        method: "post",
        url: "/giveStudyTime",
        data: {
          courseid: data.lecture.id,
          id: window.localStorage.getItem("videoid"),
          StudyTime: data.endTime.diff(data.beginTime, "second"),
        },
        headers: {
          token: userInfo.token,
        },
      }).then((res) => {});
    };
    const onPlayerEnded = (player) => {
      data.paused = false;
      if (data.timer) {
        clearInterval(data.timer);
      }
    };
    const onPlayerTimeupdate = (player) => {
      data.learningDuration.durations = player.cache_.currentTime;
    };
    const playerReadied = (player) => {
      axios({
        method: "post",
        url: "/getwatchtime",
        data: {
          videoid: window.localStorage.getItem("videoid"),
        },
        headers: {
          token: userInfo.token,
        },
      })
        .then((res) => {
          if (res.data.data == null) data.learningDuration.durations = 0;
          else data.learningDuration.durations = res.data.data[0].watchtime;
          player.currentTime(data.learningDuration.durations);
        })
        .catch(() => {
          alert("获取进度失败");
        });
    };

    return {
      ...toRefs(data),
      putLearningObj,
      onPlayerTimeupdate,
      playerReadied,
      play_the_video,
      submit,
      onPlayerEnded,
      onPlayerPause,
      onPlayerPlay,
      userInfo,
      route,
      axios,
      store,
      ctx,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  color: black;
}
.container {
  padding: 100px 5% 10px 5%;
  min-width: 100px;
  min-height: 600px;
  overflow: auto; //内容的显示模式（如果超出框，则显示滚轮）
  background-color: #d9ecff;
  .video-js .vjs-icon-placeholder {
    width: 80%;
    height: 80%;
    display: block;
  }
  .video-player {
    width: 70%;
    height: 80%;
    float: left;
  }
  .white-board {
    overflow: auto; //内容的显示模式（如果超出框，则显示滚轮）
    width: 25%;
    max-height: 480px;
    float: right;
    min-width: 100px;
    background-color: white;
    box-shadow: 10px 10px 12px 0 rgba(0, 0, 0, 0.1); //阴影
    text-align: left;
    padding: 30px 20px 30px 20px;
    border-radius: 20px;
    .header {
      border-bottom: 1px solid #dcdfe6;
    }
    .videolist {
      border-bottom: 1px solid #dcdfe6;
      .container1 {
        width: 100%;
        text-align: left;
        font-size: 15px;
        background-color: white;
      }
      .container2 {
        width: 100%;
        text-align: left;
        font-size: 15px;
        background-color: whitesmoke;
      }
    }
  }
}
</style>
