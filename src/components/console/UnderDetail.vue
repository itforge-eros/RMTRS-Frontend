<template>
  <div>
    LOL <h2>LOL</h2>{{ rowData }}
  </div>
</template>

<script>
export default {
  name: 'UnderDetail',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    },
  }
}
</script>
