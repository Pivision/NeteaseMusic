<template>
	<div>
		<van-icon name="arrow-left" class="arrowLeft" size="20" @click="back" />
		<div>
			<div class="list_top" :style="{ 'background-image': 'url(' + this.list_cover + ')' }"></div>
			<img class="list_cover" :src="this.list_cover" alt="" />
			<p class="list_name">{{ list_name }}</p>
			<p class="list_author">创建者：{{ list_author }}</p>
		</div>

		<div class="song_list">
			<SongItem v-for="item in play_list" :key="item.name" :id="item.id" :song_name="item.name" :song_star="item.ar[0].name"></SongItem>
		</div>
	</div>
</template>

<script>
	import SongItem from '../../components/SongItem.vue'
	export default {
		components: {
			SongItem,
		},
		data() {
			return {
				play_list: [],
				list_cover: '',
				list_name: '',
				list_author: '',
			}
		},
		created() {
			this.axios({
				method: 'GET',
				url: 'http://localhost:3000/playlist/detail?id=' + this.$route.params.id,
			}).then((res) => {
				this.play_list = res.data.playlist.tracks
				this.list_cover = res.data.playlist.coverImgUrl
				this.list_name = res.data.playlist.name
				this.list_author = res.data.playlist.creator.nickname
				// console.log(res.data.playlist.creator.nickname)
			})
		},
		methods: {
			back() {
				this.$router.replace('/main/home')
			},
		},
	}
</script>

<style scoped>
	.list_top {
		height: 150px;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 25%;
		filter: blur(10px);
		transform: scale(1.1);
	}

	.list_cover {
		height: 110px;
		position: absolute;
		z-index: 2;
		top: 20px;
		left: 20px;
		bottom: 20px;
	}

	.list_name {
		color: #fff;
		position: absolute;
		height: 133px;
		z-index: 2;
		top: 17px;
		left: 150px;
		right: 20px;
		bottom: 20px;
		font-size: 18px;
		line-height: 28px;
		font-weight: 300;
	}

	.list_author {
		color: rgb(228, 228, 228);
		position: absolute;
		z-index: 2;
		top: 112px;
		left: 150px;
		right: 20px;
		font-size: 14px;
		line-height: 16px;
		font-weight: 300;
	}

	.song_list {
		position: fixed;
		top: 150px;
		z-index: 1;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: scroll;
	}

	.arrowLeft {
		position: absolute;
		z-index: 3;
		color: #eee;
		top: 8px;
		left: 2px;
	}
</style>
