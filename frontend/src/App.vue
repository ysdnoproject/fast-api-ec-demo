<template>
  <el-container
    style="height: 500px; border: 1px solid #eee"
    direction="vertical"
    v-loading="loading"
  >
    <Header></Header>
    <el-container>
      <Menu></Menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <Footer></Footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import Menu from "@/layouts/Menu.vue";
import { Action } from "vuex-class";

@Component({
  components: {
    Footer,
    Header,
    Menu
  }
})
export default class App extends Vue {
  @Action("user/fetchUserByToken") fetchUserByToken;

  loading = false;

  async created() {
    this.loading = true;
    try {
      await this.fetchUserByToken();
    } catch (e) {
      // do nothing
    } finally {
      this.loading = false;
    }
  }
}
</script>
