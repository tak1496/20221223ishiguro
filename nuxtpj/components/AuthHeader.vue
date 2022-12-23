<template>
  <div class="auth_header">
    <div>
      <img class="logo" src="/img/logo.png" />
    </div>
    <nav>
      <ul class="flex__item">
        <li>
          <NuxtLink to="/register">新規登録</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">ログイン</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.auth_header {
  display: flex;
  justify-content: space-between;
  padding:10px 30px;
}

.logo {
  width: 100px;
}

.flex__item {
  display: flex;
  justify-content: space-between;
}

.flex__item li{
  padding: 0px 10px;
  list-style: none;
}
</style>