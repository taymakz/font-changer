<script setup lang="ts">
import { appName } from '~/constants'
import fonts from '~/utils/fonts.json'

defineOgImageComponent('NuxtSeo', {
  title: appName,
})

const inputValue = ref<string>('')
function convertText(value: string, mapping: any) {
  let convertedText = ''
  for (const char of value.toLowerCase()) {
    if (mapping[char])
      convertedText += mapping[char]
    else
      convertedText += char // Non-alphabet characters remain unchanged.
  }
  return convertedText
}
const { copy, copied } = useClipboard()
</script>

<template>
  <div class="min-h-screen bg-[#101720] py-10">
    <!-- Content -->
    <div class="container">
      <h1 class="text-2xl sr-only">
        Simple Font Changer
      </h1>

      <div class="max-w-xl mx-auto mb-10 mt-[10%]">
        <input
          v-model="inputValue" type="text" placeholder="Enter Your Text"
          class="border border-white/10 rounded-lg bg-transparent placeholder:text-base text-lg py-4 px-4 w-full outline-none focus:border-violet-500 focus:placeholder:text-violet-500 focus:placeholder:translate-x-2 placeholder:duration-200 duration-200 placeholder:text-white/60 text-white/80"
        >
      </div>
      <div class="space-y-24">
        <div v-for="(fontStyle, index) in fonts" :key="index" class="space-y-10">
          <div class="flex items-center gap-4 before:h-px before:w-full before:grow before:bg-white/5 before:rounded-full  after:h-px after:w-full after:grow after:bg-white/5 after:rounded-full text-2xl text-violet-300 font-semibold ">
            <p class="min-w-fit">
              {{ fontStyle.sectionTitle }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2  gap-4">
            <div v-for="(item, index) in fontStyle.items" :key="index" class="space-y-2 border rounded-lg border-white/5 py-3 px-4 duration-200 hover:-translate-y-0.5">
              <div class="flex text-lg items-center justify-between text-violet-500">
                <div>{{ item.title }}</div>
                <Transition name="fade">
                  <div v-if="convertText(inputValue, item.mapping)">
                    <IconCopy v-show="!copied" class="w-6 h-6 cursor-pointer" @click="copy(convertText(inputValue, item.mapping))" />
                    <IconCheck v-show="copied" class="w-6 h-6" />
                  </div>
                </Transition>
              </div>
              <p class="text-violet-200 text-xl break-words">
                {{ convertText(inputValue, item.mapping) || convertText('sample', item.mapping) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
