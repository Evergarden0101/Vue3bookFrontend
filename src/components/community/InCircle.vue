<template>
  <navbar />
  <div
    style="padding-left: 10%;padding-right: 10%;background-color: #d9ecff;"
    class="wraper"
  >
    <template>
      <el-backtop>
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          UP
        </div>
      </el-backtop>
    </template>
    <el-tabs
      :tab-position="tabPosition"
      @tab-click="handleClick"
      tyle="card"
      v-model="tabName"
      style=";min-height: 680px;"
      class="myel-tabs"
    >
      <el-tab-pane label="课程" name="first">
        <videoList />
      </el-tab-pane>
      <el-tab-pane label="圈子" name="second" lazy="true" style="height: auto">
        <div style="margin: 0 5%">
          <el-row style="height: 50px"></el-row>
          <el-card
            class="box-card"
            shadow="always"
            style="margin-bottom: 10px;background-color: white"
          >
            <el-row>
              <el-col
                :span="24"
                style="padding-left:15px;height:40px;text-align: left"
              >
                <span
                  style="font-size: 30px;font-weight: bolder;color:rgba(0,0,0,1)"
                  >{{ circle.name }}</span
                >
                <span
                  style="font-size: 30px;font-weight: bolder;color: black"
                ></span>
                <!-- &nbsp&nbsp&nbsp -->
                <el-tooltip
                  content="加入课程"
                  placement="top"
                  effect="dark"
                  style="margin-left:20px"
                >
                  <el-button
                    size="medium"
                    class="add"
                    style="display: none"
                    id="addbtn"
                    @click="addClass"
                    round
                  >
                    加入
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  content="已申请课程"
                  placement="top"
                  effect="dark"
                  style="margin-left:20px"
                >
                  <el-button
                    size="medium"
                    class="applied"
                    id="appliedbtn"
                    disabled
                    round
                    style="display: none"
                  >
                    已申请
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  content="已加入课程"
                  placement="top"
                  effect="dark"
                  style="margin-left:20px"
                >
                  <el-button
                    size="medium"
                    class="added"
                    id="addedbtn"
                    disabled
                    round
                    style="display: none"
                  >
                    已加入
                  </el-button>
                </el-tooltip>
              </el-col>
            </el-row>

            <el-row style="">
              <el-col :span="24" style="height:18px;"> </el-col>
            </el-row>

            <el-row style="">
              <el-col :span="24" style="height:25px;text-align: left">
                <!-- .native -->
                <span style="margin-left: 15px"
                  ><span
                    class="switch"
                    :underline="false"
                    @click="seeposts()"
                    style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                    >讨论</span
                  ></span
                >
                <span v-if="addOrNot === 3" style="margin-left: 15px"
                  ><span
                    class="switch"
                    :underline="false"
                    @click="seemanage()"
                    style="font-size: 16px;font-weight: bolder;rgba(0,0,0,0.7);"
                    >成员管理</span
                  ></span
                >
              </el-col>
            </el-row>
          </el-card>
          <el-row>
            <el-col :span="17" style="min-height: 200px;border-radius: 6px;">
              <div id="postlist">
                <div
                  v-if="addOrNot == 3 || addOrNot == 2"
                  style="border-radius: 10px;overflow: hidden;margin-bottom: 20px;text-align: center;font-size:20px;
            "
                >
                  <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item name="1" style="border-radius: 6px">
                      <template style="text-align: center" #title>
                        <el-col
                          :span="24"
                          style="text-align: center;font-weight:bold;font-size:20px;color:#2C8DF4;"
                          >创建新帖子
                        </el-col>
                      </template>
                      <el-row
                        style="border-top-left-radius: 6px;border-top-right-radius: 6px;padding-top:15px;height: 60px;text-align: center;font-size: 20px;font-weight: bolder;color: rgba(0,0,0,0.7)"
                      >
                        <el-col
                          :span="3"
                          :offset="1"
                          style="height: inherit;padding-top: 5px"
                        >
                          标题
                        </el-col>
                        <el-col :span="18" :offset="1" style=";height: inherit">
                          <el-input
                            type="text"
                            placeholder="请输入标题"
                            v-model="newTitle"
                            maxlength="30"
                            show-word-limit
                          >
                          </el-input>
                        </el-col>
                      </el-row>

                      <el-row style="height: 10px;"></el-row>

                      <el-row
                        style="text-align: center;font-size: 20px;font-weight: bolder;color:rgba(0,0,0,0.7)"
                      >
                        <el-col
                          :span="3"
                          :offset="1"
                          style="height: 45px;padding-top: 5px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;"
                        >
                          正文
                        </el-col>
                        <el-col
                          :span="18"
                          :offset="1"
                          style=";min-height: 120px;"
                        >
                          <el-input
                            type="textarea"
                            :rows="8"
                            placeholder="请输入内容"
                            v-model="newContent"
                            maxlength="500"
                            show-word-limit
                            style="margin-bottom: 15px"
                          >
                          </el-input>
                        </el-col>
                      </el-row>
                      <el-row
                        style="margin-top:5px;background-color: white;height: 45px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px"
                      >
                        <el-button
                          type="primary"
                          round
                          class="newPost"
                          style="position: absolute;right: 30px;bottom: 3px"
                          @click="post"
                        >
                          提交
                        </el-button>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <div
                  class="infinite-list-wrapper"
                  style="overflow:auto;min-height: 400px;rgba(0,0,0,0.58)"
                >
                  <ul
                    class="list"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="30"
                    style="border-radius: 6px;"
                  >
                    <el-card
                      shadow="always"
                      style="background-color: white;height:180px;margin-bottom: 15px;border-radius: 6px;padding-top: 5px;margin-left:-40px"
                      v-for="(item, index) in posts"
                      :key="index"
                      class="list-item box-card"
                    >
                      <el-row
                        style="height:25px;margin-bottom: 10px;margin-top: -17px"
                      >
                        <el-col
                          v-if="item.istop === true"
                          class="outside"
                          :span="2"
                          style="color: #ffbb00;font-weight: bolder;font-size: 13px;overflow: hidden"
                        >
                          <el-tag
                            v-if="item.istop === true"
                            effect="dark"
                            type="danger"
                            style="width: 45px"
                          >
                            TOP
                          </el-tag>
                        </el-col>

                        <el-col
                          v-if="item.iselite === true"
                          class="outside"
                          :span="2"
                          style="color: #ffbb00;font-weight: bolder;font-size: 13px;overflow: hidden"
                        >
                          <el-tag
                            v-if="item.iselite === true"
                            effect="dark"
                            type="danger"
                            style="width: 45px;color: #ffbb00"
                          >
                            <i class="el-icon-star-on"></i>
                          </el-tag>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col
                          :span="20"
                          @click="seePost(item)"
                          style="padding-left: 15px;height: 30px;text-align: left;border-radius: 6px;padding-top:15px"
                        >
                          <el-link
                            @click="seePost(item)"
                            style="font-size: 20px;font-weight: bolder;color: rgba(0,0,0,0.7)"
                          >
                            {{ item.title }}
                          </el-link>
                        </el-col>
                        <el-col
                          :span="2"
                          style="padding-top: 1px;overflow: hidden;"
                        >
                          <el-button
                            v-if="item.iselite == false"
                            @click="addStar(item)"
                            id="star"
                            type="primary"
                            size="small"
                            style="right:2px;float: top;margin-top: 10px;height: 30px;"
                            ><i class="el-icon-star-off"></i
                          ></el-button>
                          <el-button
                            v-if="item.iselite == true"
                            @click="addStar(item)"
                            id="star"
                            type="primary"
                            size="small"
                            style="right:2px;float: top;margin-top: 10px"
                            ><i class="el-icon-star-on"></i
                          ></el-button>
                        </el-col>
                        <el-col
                          :span="2"
                          style="padding-top: 1px;overflow: hidden;"
                        >
                          <el-dropdown
                            trigger="click"
                            @command="handleCommand($event, item)"
                            id="moreList"
                            style=""
                          >
                            <el-button
                              type="primary"
                              size="small"
                              style="left: 1px;float: top;margin-top: 10px"
                            >
                              <i class="el-icon-more-outline"></i>
                            </el-button>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item command="delPost"
                                  >删除</el-dropdown-item
                                >
                                <el-dropdown-item
                                  v-if="item.istop == false"
                                  command="topPost"
                                  >置顶</el-dropdown-item
                                >
                                <el-dropdown-item
                                  v-if="item.istop == true"
                                  command="topPost"
                                  >取消置顶</el-dropdown-item
                                >
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </el-col>
                      </el-row>
                      <el-row
                        style=" overflow: hidden;text-indent:2em;word-break: break-all;margin: -25px 0;padding-left:15px;padding-right:15px;height: 100px;text-align:left;font-size: 15px;font-weight: bold;"
                      >
                        <el-link
                          :underline="false"
                          @click="seePost(item)"
                          style="color: rgba(0,0,0,0.7);font-weight: normal"
                        >
                          {{ item.detail }}
                        </el-link>
                      </el-row>
                    </el-card>
                  </ul>
                  <p v-if="loading"></p>
                  <p v-if="noMore">没有更多了</p>
                </div>
              </div>
              <div id="managepage" style="display: none">
                <manageStu />
              </div>
            </el-col>

            <el-col :span="6" :offset="1">
              <el-card
                class="box-card"
                shadow="always"
                style="background-color: white;margin-bottom: 30px;min-height: 200px;text-align: center;"
              >
                <el-row
                  style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 0px;color: rgba(0,0,0,0.7);"
                >
                  圈子规则
                </el-row>
                <el-row
                  v-model="rules"
                  style="overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;padding-left:5px"
                >
                  {{ rules }}
                </el-row>
                <el-row
                  v-if="addOrNot === 3"
                  id="ruleChange"
                  style="height: 25px;padding-bottom:5px;font-size: 10px;font-weight: bold;margin-top: 10px;margin-bottom:10px;color: #00aeef;"
                >
                  <el-button
                    type="text"
                    underline="true"
                    style="font-weight: bold;color: red;font-size: 15px;position:relative;width:100%"
                    @click="changeRuleVisible = true"
                    >修改规则
                  </el-button>
                  <el-dialog title="修改规则" v-model="changeRuleVisible">
                    <el-form :model="form">
                      <el-form-item
                        label="输入新规则"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          type="textarea"
                          :rows="5"
                          v-model="newRule"
                          placeholder="请输入新规则"
                          maxlength="300"
                          show-word-limit
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <!-- slot="footer" -->
                    <template class="dialog-footer" #footer>
                      <el-button @click="changeRuleVisible = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="changeRule"
                        >确 定</el-button
                      >
                    </template>
                  </el-dialog>
                </el-row>
              </el-card>
              <el-card
                class="box-card"
                shadow="always"
                style="background-color: white;min-height: 160px;text-align: center;"
              >
                <el-row
                  style="height: 50px;font-size: 20px;font-weight: bolder;margin-top: 5px;color: rgba(0,0,0,0.7);"
                >
                  课程信息
                </el-row>
                <el-row
                  v-model="classDetail"
                  style="padding-left:5px;overflow: hidden;text-indent: 2em;word-break: break-all;height: 80px;font-size: 15px;font-weight: bold;margin-top: 15px;color: #00aeef;"
                >
                  {{ circle.detail }}
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import { useRouter, useRoute, routerViewLocationKey } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import navbar from "../NavHeader";
import manageStu from "../userManage/manageStudents";
import videoList from "../Record/videolist2";

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const axios = ctx.axios;
    const route = useRoute();
    const router = useRouter();
    // const $route = unref(ctx.$router.currentRoute);

    const store = useStore();
    const data = reactive({
      //////自用
      tabPosition: "left",
      newTitle: "",
      newContent: "",
      newRule: "",
      submitVisible: false,
      changeRuleVisible: false,
      activeNames: "",
      count: 3, //post第一次加载
      busy: false,
      loading: false,
      tabName: "first",
      pagesize: 4,
      currentPage: 1,

      /////请求
      circle: { name: "课程名称", detail: "课程介绍" },
      classId: "1",
      rules: "圈子规则",
      userInfo: null,
      amount: 0,
      posts: [
        {
          title: "帖子标题",
          detail: "帖子内容",
          iselite: true,
          istop: true,
          id: 1,
        },
      ],
      addOrNot: 3, //0=没加，1=申请了，2=加入，3=老师
      userType: "student",
      stunum: 60,
    });

    const noMore = computed(() => {
      return data.count >= data.amount;
    });

    const disabled = computed(() => {
      return data.loading || noMore;
    });

    const userInfo = computed(() => store.state.userInfo);

    onBeforeMount(() => {
      // if (router.query.course.id != null) {
      //   data.classId = router.query.course.id;
      //   data.circle = router.query.course;
      //   if (routerViewLocationKey.query.course.rule == "") {
      //     data.rules = "暂无规则";
      //   } else {
      //     data.rules = router.query.course.rule;
      //   }
      //   window.localStorage.setItem("courserule", data.rules);
      //   window.localStorage.setItem("coursename", data.circle.name);
      //   window.localStorage.setItem("coursedetail", data.circle.detail);
      //   window.localStorage.setItem("courseid", data.classId);
      //   window.localStorage.setItem("coursetime", data.circle.time);
      //   window.localStorage.setItem("coursecircle", data.tabName);
      // } else {
      //   data.classId = window.localStorage.getItem("courseid");
      //   data.circle.name = window.localStorage.getItem("coursename");
      //   data.circle.detail = window.localStorage.getItem("coursedetail");
      //   data.rules = window.localStorage.getItem("courserule");
      //   data.tabName = window.localStorage.getItem("coursecircle");
      // }
      getposts();
      isIn();
      data.userType = userInfo.usertype;
      data.userInfo = userInfo;
    });

    const handleExpandChange = (row, expandRows) => {
      const $classTable = this.$refs.classTable;
      if (expandRows.length > 1) {
        expandRows.forEach((expandRow) => {
          if (row.id !== expandRow.id) {
            $classTable.toggleRowExpansion(expandRow, false);
          }
        });
      }
      data.currentClassId = row.id;
    };

    const handleClick = (tab) => {
      if (tab.name === "first") {
        data.tabName = "first";
        window.localStorage.setItem("coursecircle", data.tabName);
      } else if (tab.name === "second") {
        data.tabName = "second";
        window.localStorage.setItem("coursecircle", data.tabName);
        isIn();
        getposts();
      }
    };

    const seePost = (item) => {
      router.replace({
        name: "postpage",
        params: {
          id: item.id,
        },
      });
    };

    const handleCurrentChange = () => {
      data.currentPage = currentPage;
    };

    const getposts = () => {
      axios({
        method: "post",
        url: "/findpostbycourse",
        headers: { token: userInfo.token },
        headers: { token: "1" },
        data: {
          id: data.classId,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          data.posts = res.data.data;
          data.amount = data.posts.length;
        } else {
          ElMessage({
            showClose: true,
            type: "error",
            message: "获取圈子内容失败",
          });
        }
      });
    };
    const isIn = () => {
      axios({
        method: "post",
        url: "/isInCourse",
        headers: { token: userInfo.token },
        data: {
          courseid: data.classId,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          data.addOrNot = res.data.data; //undone
          if (data.userType != "student") {
            document
              .getElementById("addbtn")
              .setAttribute("style", "display:none");
            document
              .getElementById("appliedbtn")
              .setAttribute("style", "display:none");
            document
              .getElementById("addedbtn")
              .setAttribute("style", "display:none");
          } else {
            if (data.addOrNot == 1) {
              document
                .getElementById("addbtn")
                .setAttribute("style", "display:none");
              document.getElementById("appliedbtn").removeAttribute("style");
              document
                .getElementById("addedbtn")
                .setAttribute("style", "display:none");
            } else if (data.addOrNot == 0) {
              document.getElementById("addbtn").removeAttribute("style");
              document
                .getElementById("appliedbtn")
                .setAttribute("style", "display:none");
              document
                .getElementById("addedbtn")
                .setAttribute("style", "display:none");
            } else if (data.addOrNot == 2) {
              document
                .getElementById("addbtn")
                .setAttribute("style", "display:none");
              document
                .getElementById("appliedbtn")
                .setAttribute("style", "display:none");
              document.getElementById("addedbtn").removeAttribute("style");
            }
          }
        } else {
          ElMessage({
            showClose: true,
            type: "error",
            message: "获取学生与课程关系失败",
          });
        }
      });
    };
    const seeposts = () => {
      document.getElementById("postlist").removeAttribute("style");
      document
        .getElementById("managepage")
        .setAttribute("style", "display:none");
    };

    const seemanage = () => {
      console.log("manage");
      document.getElementById("managepage").removeAttribute("style");
      document.getElementById("postlist").setAttribute("style", "display:none");
    };

    const seevideo = () => {
      window.localStorage.setItem("coursecircle", data.tabName);
      window.localStorage.setItem("course", data.circle);
      router.push({
        name: "videolist2",
      });
    };
    const addStar = (item) => {
      axios({
        method: "post",
        url: "/changepostiselite",
        headers: { token: userInfo.token },
        data: {
          id: item.id,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          let staron = "starIcon" + item.id;
          //document.getElementById(''+staron).setAttribute("class", "el-icon-star-on")//undone v-if
          ElMessage({
            showClose: true,
            type: "success",
            message: "修改成功",
          });
          data.posts = res.data.data;
          data.amount = data.posts.length;
        } else if (res.data.code == 3001) {
          ElMessage({
            showClose: true,
            type: "error",
            message: "无操作权限",
          });
        } else {
          ElMessage({
            showClose: true,
            type: "error",
            message: "设置失败",
          });
        }
      });
    };
    const handleCommand = (command, item) => {
      if (command == "topPost") {
        axios({
          method: "post",
          url: "/changepostistop",
          headers: { token: userInfo.token },
          data: {
            id: item.id,
          },
        }).then((res) => {
          if (res.data.code == 1001) {
            ElMessage({
              showClose: true,
              type: "success",
              message: "修改成功",
            });
            data.posts = res.data.data;
            data.amount = data.posts.length;
          } else if (res.data.code == 3001) {
            ElMessage({
              showClose: true,
              type: "error",
              message: "无操作权限",
            });
          } else {
            ElMessage({
              showClose: true,
              type: "error",
              message: "置顶失败",
            });
          }
        });
      } else if (command == "delPost") {
        this.$confirm("确认删除该帖子?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios({
            method: "post",
            url: "/deletepost",
            headers: { token: userInfo.token },
            data: {
              id: item.id,
            },
          }).then((res) => {
            if (res.data.code == 1001) {
              ElMessage({
                showClose: true,
                type: "success",
                message: "已删除",
              });
              data.posts = res.data.data;
              data.amount = data.posts.length;
            } else if (res.data.code == 3001) {
              ElMessage({
                showClose: true,
                type: "error",
                message: "无操作权限",
              });
            } else {
              ElMessage({
                showClose: true,
                type: "error",
                message: "删除失败",
              });
            }
          });
        });
      }
    };
    const changeRule = () => {
      axios({
        method: "post",
        url: "/setrule",
        headers: { token: userInfo.token },
        data: {
          cid: data.classId,
          rule: data.newRule,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          (data.changeRuleVisible = false),
            ElMessage({
              showClose: true,
              type: "success",
              message: "修改成功",
            });
          data.rules = res.data.data;
          data.newRule = "";
        } else {
          ElMessage({
            showClose: true,
            type: "error",
            message: "修改失败",
          });
        }
      });
    };
    const post = () => {
      if (data.newTitle == "") {
        ElMessage({
          type: "warning",
          message: "请输入帖子标题",
        });
        return;
      } else if (data.newContent == "") {
        ElMessage({
          type: "warning",
          message: "请输入帖子内容",
        });
        return;
      }
      axios({
        method: "post",
        url: "/createpost",
        headers: { token: userInfo.token },
        data: {
          courseid: data.classId,
          title: data.newTitle,
          detail: data.newContent,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          (data.submitVisible = false),
            ElMessage({
              showClose: true,
              type: "success",
              message: "发布成功",
            });
          data.posts = res.data.data;
          data.amount = data.posts.length;
          data.activeNames = "";
          data.newContent = "";
          data.newTitle = "";
        } else {
          ElMessage({
            showClose: true,
            type: "error",
            message: "发布失败",
          });
        }
      });
    };

    const addClass = () => {
      axios({
        method: "post",
        url: "/applyCourse",
        headers: { token: userInfo.token },
        data: {
          courseid: data.classId,
        },
      }).then((res) => {
        if (res.data.code == 1001) {
          ElMessagee({
            showClose: true,
            message: "成功申请课程",
            type: "success",
          }),
            isIn();
        } else {
          ElMessage({
            showClose: true,
            message: "加入课程失败",
            type: "error",
          });
        }
      });
    };
    const loadMore = () => {
      data.busy = true;
      data.loading = true;
      setTimeout(() => {
        data.count += 2;
        data.loading = false;
        data.busy = false;
      }, 2000);
    };

    return {
      ...toRefs(data),
      noMore,
      disabled,
      handleExpandChange,
      handleCurrentChange,
      seemanage,
      seeposts,
      isIn,
      getposts,
      handleClick,
      seePost,
      seevideo,
      addStar,
      handleCommand,
      changeRule,
      post,
      addClass,
      loadMore,
      userInfo,
      route,
      router,
      axios,
      store,
      ctx,
    };
  },
  components: {
    manageStu,
    videoList,
    navbar,
  },
};
</script>

<style></style>

<style scoped>
:deep(.el-tabs__item) {
  font-size: 17px;
  font-weight: bold;
}

:deep(.myel-tabs > .el-tabs__header) {
  border-bottom: 1px solid #e4e7ed;
  background-color: rgba(138, 255, 149, 0.44);
  margin-top: 50px;
}

:deep(.el-collapse-item) {
  text-align: center;
}

:deep(.el-collapse-item__header) {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

:deep(.el-collapse-item__content) {
  text-align: center;
}

:deep(.el-dropdown) {
  vertical-align: top;
  border-radius: 6px;
}

.add:hover {
  background-color: #73ff85;
}

.add {
  position: relative;
  font-weight: bolder;
  color: black;
  border: 3px solid;
  border-color: #00e6ff;
  top: -5px;
}

.applied,
.added {
  position: relative;
  font-weight: bolder;
  color: black;
  border: 3px solid;
  border-color: grey;
  top: -5px;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-more-outline,
.el-icon-star-off,
.el-icon-star-on {
  font-size: 15px;
}

.switch {
  color: #606266;
  cursor: pointer;
}
.switch:hover {
  color: #409eff;
}
.switch:after {
  border-color: #409eff;
}
</style>
