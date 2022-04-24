<template>
	<div class="body">
		<van-nav-bar fixed title="首页" />
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item replace to="/main/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/main/search" icon="search">搜索</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.body {
		padding-top: 46px;
		padding-bottom: 50px;
	}
</style>