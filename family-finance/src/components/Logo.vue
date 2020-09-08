<template>
  <div class="logo">
    <img src="@/assets/img/logo.png" />
    <p class="slogan" style="margin-top: 1em">家庭理财App</p>
    <p class="slogan">您的家庭资产管家</p>
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style>
.logo {
  width: 100vw;
  height: 35vh;
  /* background-color: aliceblue; */
}

.logo img {
  position: relative;
  display: block;
  width: 90px;
  height: 90px;
  margin: 0 auto;
  padding-top: 10vh;
}

.logo .slogan {
  text-align: center;
  font-size: 14px;
  color: rgb(147, 153, 159);
  margin-top: 0.5em;
}
</style>