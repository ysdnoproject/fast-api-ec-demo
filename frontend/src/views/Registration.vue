<template>
  <el-form
    :model="createUserForm"
    status-icon
    :rules="rules"
    ref="createUserForm"
    label-width="80px"
    label-position="left"
  >
    <el-form-item label="邮箱" prop="email" :required="true">
      <el-input
        type="email"
        v-model="createUserForm.email"
        autocomplete="on"
        prefix-icon="el-icon-message"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item label="手机" prop="phone" :required="true">
      <el-input
        type="tel"
        v-model="createUserForm.phone"
        autocomplete="on"
        prefix-icon="el-icon-mobile-phone"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item label="用户名" prop="name" :required="true">
      <el-input
        type="text"
        v-model="createUserForm.name"
        autocomplete="off"
        prefix-icon="el-icon-user"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item label="密码" prop="password" :required="true">
      <el-input
        type="password"
        v-model="createUserForm.password"
        autocomplete="off"
        prefix-icon="el-icon-edit"
        :show-password="true"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword" :required="true">
      <el-input
        type="password"
        v-model="createUserForm.confirmPassword"
        autocomplete="off"
        prefix-icon="el-icon-edit"
        :show-password="true"
      ></el-input>
      <template slot="error" slot-scope="{ error }">
        <form-item-error :error="error" />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()" :loading="loading">
        提交
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api";
import { CreateUserFormParams } from "@/types/CreateUserInterface";
import { buildCreateUserRequest } from "@/transforms/ApiRequestTransform";
import { ElFormExtend } from "@/index.d";
import { serverValidationError } from "@/utils/FormUtil";
import FormItemError from "@/components/FormItemError.vue";

@Component({
  components: {
    FormItemError
  }
})
export default class Registration extends Vue {
  createUserForm: CreateUserFormParams = {
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: ""
  };

  loading = false;

  $refs!: {
    createUserForm: ElFormExtend;
  };

  checkPhone = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("error.required"));
    }
    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
      return callback(new Error("error.invalid"));
    }
    return callback();
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("error.required"));
    }
    if (this.createUserForm.confirmPassword) {
      this.$refs.createUserForm.validateField("confirmPassword");
    }
    return callback();
  };

  checkConfirmPassword = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("error.required"));
    }
    if (value !== this.createUserForm.password) {
      return callback(new Error("error.confirmPasswordDiff"));
    }
    return callback();
  };

  rules = {
    email: [
      { required: true, message: "error.required", trigger: "blur" },
      { type: "email", message: "error.invalid", trigger: "blur" }
    ],
    phone: [{ validator: this.checkPhone, trigger: "blur" }],
    name: [{ required: true, message: "error.required", trigger: "blur" }],
    password: [{ validator: this.checkPassword, trigger: "blur" }],
    confirmPassword: [{ validator: this.checkConfirmPassword, trigger: "blur" }]
  };

  async submitForm() {
    this.loading = true;
    try {
      const valid = await this.$refs.createUserForm.validate();
      if (valid) {
        const request = buildCreateUserRequest(this.createUserForm);
        const res = await api.createUser(request);
        await this.$router.push({
          name: "login",
          query: { email: res.data.email }
        });
        this.$message.success(this.$t("register success") as string);
      }
    } catch (e) {
      if (e.response?.status === 422) {
        serverValidationError(e.response.data, this.$refs.createUserForm);
      }
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.$refs.createUserForm.resetFields();
  }
}
</script>
