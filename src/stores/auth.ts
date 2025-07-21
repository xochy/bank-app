import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  username: string;
  email: string;
  password: string;
  access_token: string;
}

export interface AuthPayload {
  username?: string;
  email?: string;
  password?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.access_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return ApiService.post("token", formData)
      .then(({ data }) => {
        const loggedInUser: User = {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          access_token: data.access_token,
        };

        setAuth(loggedInUser);
      })
      .catch(({ response }) => {
        console.error("Login error:", response.data.detail);
        setError([response.data.detail]);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    const payload = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };

    return ApiService.post("signup", payload)
      .then(({ data }) => {
        // redirecto to login
      })
      .catch(({ response }) => {
        // setError([response.data.detail]);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
