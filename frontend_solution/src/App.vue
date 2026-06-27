<template>
    <div class="h-screen">
      <div class="grid lg:grid-cols-2 h-full">
        <div class="col-span-1 p-6 bg-[#F8EAFF] hidden lg:block">
          <div class="ml-20">
              <logo />
          </div>
            <div class="rounded-2xl">
                <img 
                  :src="img" 
                  alt="auth_image"
                  class="m-auto rounded-2xl w-[44rem] h-[30rem]"
                >
            </div>

            <div class="mt-12 text-center">
                <h4 class="text-2xl font-bold text-[#61227D]">Team Achieve</h4>
                <p class="text-[#5E5E5E] text-lg">Your perfect solution for funding your desires</p>
            </div>
        </div>
       
        <div class="lg:col-span-1 h-full md:p-40 p-4">
            <div class="max-w-2xl">
              <div class="lg:hidden flex justify-center">
                <logo />
              </div>

              <div class="space-y-2 text-center">
                  <h1 class="font-bold md:text-5xl text-3xl text-[#61227D]">Welcome Back</h1>
                  <p class="text-sm md:text-base text-[##5E5E5E]">Enter your email address and password to access your account.</p>
              </div>

              <div class="space-y-6 mt-12 md:mt-20">
                  <div class="space-y-2">
                      <label for="" class="font-normal block text-[#5E5E5E] text-base">Email Address <span class="text-red-700 text-xs font-bold">*</span></label>
                      <input 
                          type="text" 
                          class="w-full p-2 rounded-lg border-[1px] border-#DDDDDD" 
                          placeholder="Enter yor email"
                        />
                  </div>

                    <div class="space-y-2 relative">
                      <label for="" class="block text[#5E5E5E] text-base font-normal">Password <span class="text-red-700 text-xs font-bold">*</span></label>
                      <div class="">
                        <input 
                          type="text" 
                          class="w-full p-2 rounded-lg border-[1px] border-#DDDDDD pr-10"
                          placeholder="Enter your password" 
                        />
                        <div class="w-12 h-10 bg-gray-300 rounded-r-lg absolute right-0 top-8 cursor-pointer"></div>
                      </div>
                  </div>

                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                      <input type="checkbox">
                      <label class="text-[#7D7D7D] text-sm">Remember me</label>
                    </div>

                    <div class="">
                      <span class="text-[#61227D] text-sm underline cursor-pointer">Forgot Password</span>
                    </div>
                  </div>

              </div>

              <div class="mt-12">

                <button class="bg-[#61227D] p-2 text-white rounded-md w-full">
                  Sign In
                </button>
                <div class="text-center mt-2">
                  <p class="text-base font-normal text-[#5E5E5E]">Don't have an account? <span class="font-bold text-[#61227D]">Sign Up</span></p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import logo from "./component/logo.vue"
import img from "./buysimply-2.png"
import "./index.css"
</script>
