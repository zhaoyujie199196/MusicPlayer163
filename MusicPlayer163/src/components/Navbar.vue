<template>
  <div>
    <!--如果hasCustomTitlebar计算为true，has-custom-titlebar被设置成类名，否则不设置-->
    <nav :class="{'has-custom-titlebar': hasCustomTitlebar}">
      <div class="navigation-buttons">
        <button-icon @click.native="go('back')">
          <svg-icon iconClass="arrow-left"></svg-icon>
        </button-icon>
        <button-icon @click.native="go('forward')">
          <svg-icon iconClass="arrow-right"></svg-icon>
        </button-icon>
      </div>
    </nav>
  </div>
</template>

<script>
import ButtonIcon from '@/components/ButtonIcon.vue';
export default {
  name:'Navbar',
  components:{
    ButtonIcon,
  },
  data() {
    return {
      inputFocus:false,
      langs:['zh-CN'],
      keywords:'',
      enableWin32Titlebar: false,
      enableLinuxTitlebar: false,
    }
  },
  computed: {
    hasCustomTitlebar() {
      return this.enableWin32Titlebar || this.enableWin32Titlebar
    }
  },
  methods:{
    go(where) {
      console.log("go " + where)
    },
    doSearch() {

    },
    showUserProfileMenu(e) {

    },
    logout() {

    },
    toSettings(){

    },
    toGithub() {

    },
    toLogin() {

    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  position:fixed;
  top:0;
  right:0;
  left:0;
  display:flex;
  justify-content: space-between;
  aligh-items: center;
  height: 64px;
  padding: {
    right:10vw;
    left: 10vw;
  }
  backdrop-filter: saturate(180%) blur(20px);
  background-color: var(--color-navbar-bg);
  z-index:100;
  -webkit-app-region: drag;
}

@media(max-width: 1336px) {
  nav {
    padding:0 max(5vw, 90px)
  }
}

nav.has-custom-titlebar{
  padding-top: 20px;
  -webkit-app-region: no-drag;
}

.navigation-buttons {
  flex:1;
  display:flex;
  align-items:center;
  .svg-icon {
    height:24px;
    width:24px;
  }
  button {
    -webkit-app-region: no-drag;
  }
}
@media(max-width: 970px) {
  .navigation-buttons{
    flex:unset;
  }
}

.navigation-links {
  flex: 1;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  user-select: none;
  a {
    -webkit-app-region: no-drag;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 6px;
    padding: 6px 10px;
    color: var(--color-text);
    transition: 0.2s;
    -webkit-user-drag: none;
    margin: {
      right: 12px;
      left: 12px;
    }
    &:hover {
      background: var(--color-secondary-bg-for-transparent);
    }
    &:active {
      transform: scale(0.92);
      transition: 0.2s;
    }
  }
  a.active {
    color: var(--color-primary);
  }
}

</style>