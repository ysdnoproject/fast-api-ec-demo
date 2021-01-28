<template>
  <el-header>
    <el-row>
      <el-col :span="8">
        <i class="el-icon-s-home" style="font-size:26px" @click="goHome"></i>
      </el-col>
      <el-col :span="8">
        <span style="font-size:26px">Fast api ec demo</span>
      </el-col>
      <el-col :span="8">
        <template v-if="isLoggedIn">
          <el-row>
            <el-col :span="22" style="text-align: right">
              <span>你好：{{ username }}</span>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-dropdown @command="handleCommand" trigger="click">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="dropDownCommand.LOGOUT">
                    登出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row>
            <el-col :span="2" :offset="20">
              <router-link :to="{ name: 'login' }">登录</router-link>
            </el-col>
            <el-col :span="2">
              <router-link :to="{ name: 'register' }">注册</router-link>
            </el-col>
          </el-row>
        </template>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import { HeaderDropDownCommand } from "@/types/Enums";

@Component
export default class Header extends Vue {
  @State(state => state.user.user.name) username;

  @Getter("user/isLoggedIn") isLoggedIn;

  @Action("user/logout") logoutAction;

  dropDownCommand = HeaderDropDownCommand;

  goHome() {
    if (this.$router.currentRoute.name !== "home") {
      this.$router.push({ name: "home" });
    }
  }

  async handleCommand(command) {
    switch (command) {
      case this.dropDownCommand.LOGOUT:
        await this.logout();
        break;
      default:
    }
  }

  async logout() {
    await this.logoutAction();
    this.goHome();
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 12px;
}
</style>
