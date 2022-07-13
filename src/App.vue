<script setup>
import { RouterLink, RouterView } from "vue-router";

import Login from "@/components/LoginForm/LoginForm.vue";
//import { useAppStore } from '@/stores/app';
</script>
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      //  AccessToken: useAppStore()
    };
  },
  watch: {
    "$state.accessToken"(newValue) {
      if (newValue == 0) {
        this.$sources.isLogin = false;
        this.$sources.services = [];
      } else {
        /*var self = this;
        self.$sources.isLogin = true;
        this.$api.client.get('','', function(err, handlerResponse){
          console.log("2.1",err, handlerResponse);
          if(handlerResponse.length > 0) {
            console.log("2", self.$sources, self.token);
            self.$sources.services = handlerResponse;
            
          }
        })*/
      }
    },
    "$api.client": function (newValue) {
      if (newValue) {
        var self = this;
        this.$api.client.get("", "", function (err, handlerResponse) {
          console.log("2.1", err, handlerResponse);
          if (handlerResponse.length > 0) {
            console.log("2", self.$sources, self.token);
            self.$sources.services = handlerResponse;
            self.$sources.isLogin = true;
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="wrapper">
    <!--div>{{ $sources }}}</!--div-->
    <RouterView />
    <Login v-if="!$sources.isLogin"></Login>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.root {
  position: relative;
  padding: 2em 0;
  margin-top: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid #ccc;
}
.root::before {
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 2px;
  background: #d7e4ed;
}
</style>
