<template>
    <ul>
        <li v-for="user in users">
            <router-link :to="{ name: 'user', params: { userName:user.userName } }">{{ user.name }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name:'users',
    data:function(){
        return {
            users:[
                { name:"Ronel", userName: "radeita" },
                { name:"Albert", userName: "berto" }
            ]
        }
    }
}
</script>

<style lang="css" scoped>
    ul {
      list-style: circle;
      list-style-type: circle;
      padding: 0;
    }

    li {
      margin: 0 10px;
    }

    a {
      color: #999999;
    }
</style>
