<template>
	<div>
    <Content />
    <ContentWhy />
  </div>
</template>

<script>
// @ is an alias to /src
import Content from "@/components/Content.vue";
import ContentWhy from "@/components/ContentWhy.vue";

export default {
  name: "Intro",
  components: {
    Content,
    ContentWhy
  }
};
</script>
