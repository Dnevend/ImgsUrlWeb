<template>
  <div id="app">

    <el-container>
      <el-header>
        <div id="nav">
          <router-link to="/">Upload</router-link> |
          <router-link to="/manage">Manage</router-link>
        </div>
      </el-header>

        <el-main>
          <router-view/>
        </el-main>

      <el-footer>
        <img class="construction" src='./assets/construction.png' />
        <span>Constructioning . . .</span>
      </el-footer>
    </el-container>


    <template>
      Scroll down to see the bottom-right button.
      <el-backtop target=".el-main" :bottom="100">
        <div
            style="{ height: 100%; width: 100%;
                  background-color: #008800;
                  color: #ffffff;
                  box-shadow: 0 0 6px rgba(0,0,0, .5);
                  text-align: center; line-height: 50px; }" >
          UP
        </div>
      </el-backtop>
    </template>

  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  //color #2c3e50

  .el-header {
    background-color darkolivegreen;
    position: fixed;
    top: 0px;
    left:0px;
    width:100%;
    z-index:999;
  }

  .el-header a{
    color: #fff;
    font-weight: bold;
    text-decoration: overline underline;
  }

  .el-main {
    width:100%;
    height:100%;
    background: url("./assets/buddha.png") no-repeat;
    //background-color: #000000;
    //opacity: 0.9;
    background-position:center top;
    //background-size:100% 100%;
    //-moz-background-size:100% 100%;
    text-align: center;
    position:fixed;
    left:0px;
  }
  .el-footer{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    vertical-align: middle;
    background-color: #000;
    z-index: 9999;
    opacity:0.3;
  }
  .construction
  {
    height:50px;
    vertical-align:middle;
    //-webkit-animation: flip-2-hor-top-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
    //animation: flip-2-hor-top-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  }
</style>
