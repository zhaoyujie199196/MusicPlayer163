<template>
  <!--userSelectNone：禁止用户选中-->
  <div id="app" :class="{'user-select-none': userSelectNone}">
    <Navbar v-show="showNavbar" ref="navbar" />
    <main ref="main"></main>
<!--    <keep-alive>-->
      <router-view></router-view>
<!--    </keep-alive>-->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {Navbar},
  computed: {
    showNavbar() {
      return true
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  transition: all 0.4s;
}

main {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  overflow:auto;
  padding:64px 10vw 96px 10vw;
  box-sizing:border-box;
  scrollbar-width:nont;
}

@media (max-width: 1336px) {
  main {
    padding: 64px 5vw 96px 5vw;
  }
}

main::-webkit-scrollbar {
  width: 0px;
}

.slider-up-enter-active,
.slider-up-leave-active {
  transition: transform 0.4s;
}
.slider-up-enter,
.slider-up-leave-to{
  transform: translateY(100%)
}

</style>
