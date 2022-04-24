<template>
	<div>
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in banner_list" :key="item.imageUrl" :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"></van-swipe-item>
		</van-swipe>
		<p class="title">精品歌单</p>
		<van-row gutter="10" class="mv_list" type="flex" justify="space-between">
			<van-col span="8" class="mv_item" v-for="item in mv_list" :key="item.name">
				<van-cell class="mv_cell" :to="/list/ + item.id">
					<img :src="item.coverImgUrl" alt="" />
					<p>{{ item.name }}</p>
				</van-cell>
			</van-col>
		</van-row>

		<p class="title">年度音乐</p>

		<div>
			<SongItem v-for="item in song_list" :key="item.name" :id="item.id" :song_name="item.name" :song_star="item.ar[0].name"></SongItem>
		</div>
	</div>
</template>

<script>
	import SongItem from '../../components/SongItem.vue'
	export default {
		props: ['id'],
		components: {
			SongItem,
		},
		data() {
			return {
				mv_list: [],
				song_list: [],
				banner_list: [],
			}
		},
		created() {
			this.axios({
				method: 'GET',
				url: 'http://localhost:3000/banner',
			}).then((res) => {
				this.banner_list = res.data.banners
				// console.log(res)
			})
			this.axios({
				method: 'GET',
				url: 'http://localhost:3000/top/playlist/highquality?cat=日语&limit=12',
			}).then((res) => {
				this.mv_list = res.data.playlists
				// console.log(this.mv_list)
			})
			this.axios({
				method: 'GET',
				// url: 'http://localhost:3000/personalized/newsong',
				url: 'http://localhost:3000/playlist/detail?id=5405666676',
			}).then((res) => {
				// this.song_list = res.data.result
				this.song_list = res.data.playlist.tracks
				// console.log(res)
			})
			this.axios({
				method: 'GET',
				// url: 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=0557FA654ADC15B98A5F017C7902FF11&appid=922500&l=schinese',
				url: 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=922500&key=0557FA654ADC15B98A5F017C7902FF11&steamid=76561198866802768&l=schinese',
				// responseType: 'text',
				// headers: {
				// 	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
				// },
			}).then((res) => {
				// this.song_list = res.data.result
				// this.song_list = res.data.playlist.tracks
				console.log(res)
			})
		},
	}
</script>

<style scoped>
	.my-swipe {
		height: 160px;
	}

	.van-swipe-item {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.title {
		height: 35px;
		background: #eee;
		padding-left: 10px;
		line-height: 35px;
	}

	.mv_list {
		margin-top: 10px;
	}

	.mv_item {
		margin-bottom: 10px;
	}

	.mv_list img {
		width: 100%;
	}

	.mv_list p {
		font-style: 12px;
		padding: 0 5px;
	}
	.mv_cell {
		padding: 0;
	}

	.right_icon {
		font-size: 30px;
		margin-top: 10px;
	}
</style>