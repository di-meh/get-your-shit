<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-1 h-[calc(100vh-4rem)]">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="text-2xl font-bold leading-9 tracking-tight">
            Connectez-vous
          </h2>
        </div>

        <div class="mt-10">
          <div>
            <form action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="label label-text">Email address</label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="input input-bordered input-primary w-full"
                  >
                </div>
              </div>

              <div>
                <label for="password" class="label label-text">Password</label>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="input input-bordered input-primary w-full"
                  >
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-sm leading-6">
                  <NuxtLink to="/" class="font-semibold text-secondary hover:text-secondary-focus">
                    Forgot password?
                  </NuxtLink>
                </div>
              </div>

              <div>
                <UButton type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="~/assets/img/weed2.jpg" alt="">
    </div>
  </div>
</template>
