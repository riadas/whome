<template>
    <div id="footer">
        <span>Made with <b>&lt;/&gt;</b>&nbsp;by Ria Das </span>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>

#footer {
    background-color: #a969a9;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 50px;
    position: fixed;
    color: white;
}

span {
    margin-top: 10px;
    font-size: smaller;
}

</style>