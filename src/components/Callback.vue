<template>
</template>
<script>

import { setIdToken, setAccessToken } from '../assets/utils/auth.js';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>
