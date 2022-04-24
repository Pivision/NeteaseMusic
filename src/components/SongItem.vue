<template>
	<div>
		<van-cell class="songItem" :to="/play/ + id" :title="song_name" size="large" :label="song_star + '-' + song_name">
			<template #right-icon>
				<van-icon class="right_icon" name="play-circle-o" />
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		props: ['song_name', 'song_star', 'id'],
	}
</script>

<style scoped>
	.right_icon {
		font-size: 30px;
		margin-top: 10px;
	}

	.songItem {
		border-bottom: solid 1px #eee;
	}
</style>