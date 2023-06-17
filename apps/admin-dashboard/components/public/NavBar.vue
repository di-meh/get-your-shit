<template>
  <nav class="navbar bg-neutral text-neutral-content px-4 fixed top-0 z-10">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><NuxtLink to="/login">Se connecter</NuxtLink></li>
          <li><NuxtLink to="/register">Devenir restaurateur</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">Get Your Shit</NuxtLink>
    </div>
    <div class="navbar-end gap-4 hidden md:flex">
      <NuxtLink to="/login">
        <UButton color="emerald" :ui="{rounded: 'rounded-full'}">Se connecter</UButton>
      </NuxtLink>
      <NuxtLink to="/register">
        <UButton :ui="{rounded: 'rounded-full'}">Devenir restaurateur</UButton>
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>