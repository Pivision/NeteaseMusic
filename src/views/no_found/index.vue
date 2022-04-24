<template>
	<div>
		404
		<p>过{{ second }}秒后自动跳转到<router-link class="to_home" to="/main/home">首页</router-link></p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				second: 3,
				interval_handler: null,
			}
		},
		created() {
			this.interval_handler = setInterval(() => {
				if (this.second === 0) {
					clearInterval(this.interval_handler)
					return
				}
				this.second--
			}, 1000)
			setTimeout(() => {
				this.$router.push({
					path: '/main/home',
				})
			}, 3000)
		},
	}
</script>

<style scoped>
	.to_home {
		color: blue;
		text-decoration: underline;
	}
</style>