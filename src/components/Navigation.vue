<template>
    <nav id="navbar">
        <a class="brand" href="#">Skydog Cineplex</a>
    </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
    nav {
        background-color: $main-blue;
        padding: 15px 20px;
        width: 100%;
        height: auto;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 1.3em;
        z-index: 10;
        .brand {
            color: $main-yellow;
            text-decoration: none;
            font-weight: bold;
        }
    }
</style>
