<template>
  <svg :class="svgClass" aria-hidden="true" width="24px" height="24px">
    <use :xlink:href="iconName" :fill="color"/>
  </svg>
  <div>
  </div>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>