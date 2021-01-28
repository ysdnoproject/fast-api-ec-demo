<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm"
    label-width="80px"
    label-position="left"
  >
    <el-form-item label="邮箱" prop="email" :required="true">
      <el-input
        type="email"
        v-model="loginForm.email"
        autocomplete="on"
        prefix-icon="el-icon-message"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item label="密码" prop="password" :required="true">
      <el-input
        type="password"
        v-model="loginForm.password"
        autocomplete="on"
        prefix-icon="el-icon-edit"
        :show-password="true"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()" :loading="loading">
        登录
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";
import { LoginFormParams } from "@/types/LoginInterface";
import { buildLogInRequest } from "@/transforms/ApiRequestTransform";
import { ElFormExtend } from "@/index.d";
import { serverValidationError } from "@/utils/FormUtil";
import FormItemError from "@/components/FormItemError.vue";
import { Action } from "vuex-class";

@Component({
  components: {
    FormItemError
  }
})
export default class Login extends Vue {
  @Action("user/loggedIn") loggedIn;

  loginForm: LoginFormParams = {
    email: "",
    password: ""
  };

  loading = false;

  $refs!: {
    loginForm: ElFormExtend;
  };

  rules = {
    email: [{ required: true, message: "error.required", trigger: "blur" }],
    password: [{ required: true, message: "error.required", trigger: "blur" }]
  };

  mounted() {
    const { email } = this.$route.query;
    if (email) {
      this.loginForm.email = String(email);
    }
  }

  async submitForm() {
    this.loading = true;
    try {
      const valid = await this.$refs.loginForm.validate();
      if (valid) {
        const request = buildLogInRequest(this.loginForm);
        const res = await api.login(request);
        await this.loggedIn(res.data);
        await this.$router.push({ name: "home" });
      }
    } catch (e) {
      if (e.response?.status === 422) {
        const errors = e.response.data;
        serverValidationError(errors, this.$refs.loginForm);
      }
      if (e.response?.status === 401) {
        const error = e.response.data;
        this.$message.error(this.$t(error.detail) as string);
      }
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.$refs.loginForm.resetFields();
  }
}
</script>
