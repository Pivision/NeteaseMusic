<template>
	<div>
		<van-search v-model="key_words" placeholder="请输入搜索关键词" />
		<div v-show="song_list.length === 0">
			<p class="title">热门搜索</p>
			<div class="hot_list">
				<van-button @click="key_words = item.first" v-for="(item, index) in hot_list" :key="index" round type="default" size="small">{{ item.first }}</van-button>
			</div>
		</div>

		<div class="song_list" v-show="song_list.length > 0">
			<SongItem v-for="(item, index) in song_list" :key="index" :id="item.id" :song_name="item.name" :song_star="item.artists[0].name"> </SongItem>
			<p>搜索到头啦</p>
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
				key_words: '',
				hot_list: [],
				song_list: [],
			}
		},
		created() {
			this.axios({
				method: 'GET',
				url: 'http://localhost:3000/search/hot',
			}).then((res) => {
				// console.log(res)
				this.hot_list = res.data.result.hots
				console.log(this.hot_list)
			})
		},
		watch: {
			key_words() {
				if (this.key_words === '') {
					this.song_list = []
					return false
				}
				this.axios({
					method: 'GET',
					url: 'http://localhost:3000/search?keywords=' + this.key_words + '&limit=30',
				}).then((res) => {
					// console.log(res.data.result.songs)
					this.song_list = res.data.result.songs
				})
			},
		},
	}
</script>

<style scoped>
	.title {
		font-size: 12px;
		padding-left: 15px;
	}

	.hot_list {
		padding: 0 15px;
	}

	.hot_list button {
		margin-top: 15px;
		margin-right: 10px;
		min-width: 50px;
	}

	.song_list p {
		height: 30px;
		background: #eee;
		text-align: center;
		line-height: 30px;
	}
</style>