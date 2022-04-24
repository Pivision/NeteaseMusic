<template>
	<div v-if="song">
		<van-icon name="arrow-left" class="arrowLeft" size="25" @click="back" />
		<div class="song_bg" :style="{ 'background-image': 'url(' + song.al.picUrl + ')' }"></div>
		<div class="contaner">
			<img :class="{ playing: isPlaying }" class="needle_img" src="./img/needle-ab.png" alt="" />
			<div :class="{ paused: !isPlaying }" class="song_body" @click="play">
				<img class="song_img" :src="song.al.picUrl + '?imageView&thumbnail=360y360&quality=75&tostatic=0'" alt="" />
				<img class="start_img" src="./img/start.png" alt="" v-show="!isPlaying" />
			</div>
		</div>
		<audio ref="audio" preload :src="'https://music.163.com/song/media/outer/url?id=' + $route.params.id + '.mp3'"></audio>
		<div class="songName">{{ songName }}</div>
		<div class="lrc" ref="test">
			<p v-for="(item, index) in lrc_text" :key="index" ref="lrc_data">{{ item }}</p>
		</div>
		<van-progress :percentage="this.curTime > 0 ? (this.curTime / this.lrc_data.length) * 100 : '0'" class="percent" :show-pivot="false" stroke-width="3" color="red" track-color="rgba(0,0,0,0)" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				song: null,
				isPlaying: false,
				lrc_text: [],
				lrc_time: [],
				lrc_data: [],
				curTime: '',
			}
		},
		created() {
			this.getSongDetail()
			this.getLyric()
		},
		methods: {
			play() {
				this.isPlaying = !this.isPlaying
				// console.log(this.$refs.lrc_data)
				if (this.isPlaying === false) {
					this.$refs.audio.pause()
				} else {
					this.$refs.audio.play()
				}
				this.$refs.audio.addEventListener('timeupdate', () => {
					this.curTime = Math.floor(this.$refs.audio.currentTime)
					if (this.lrc_data[this.curTime]) {
						this.$refs.lrc_data[this.lrc_data[this.curTime] - 1].style.color = 'rgb(219, 219, 219)'
						this.$refs.lrc_data[this.lrc_data[this.curTime]].style.color = 'red'
						let lrcTop = this.$refs.lrc_data[this.lrc_data[this.curTime]].offsetTop
						// console.log(lrcTop);
						this.$refs.test.scrollTop = lrcTop
						return this.curTime
					}
				})
			},

			getSongDetail() {
				this.axios({
					method: 'GET',
					url: 'http://localhost:3000/song/detail?ids=' + this.$route.params.id,
				}).then((res) => {
					this.song = res.data.songs[0]
					this.songName = res.data.songs[0].name
					// console.log(this.songName)
				})
			},

			getLyric() {
				this.axios({
					method: 'GET',
					url: 'http://localhost:3000/lyric?id=' + this.$route.params.id,
				}).then((res) => {
					console.log(res)
					this.lrc_text = res.data.lrc.lyric.split(/\[.+?\]/g).slice(1)
					// console.log(this.lrc_text)
					this.lrc_time = res.data.lrc.lyric.match(/\[.+?\]/g)
					// console.log(this.lrc_time)
					this.lrc_time.forEach((item, index) => {
						let mm = item.split(':')[0].split('[')[1] * 60
						// console.log(mm);
						let ss = +Number(item.split(':')[1].split(']')[0]).toFixed(0)
						// console.log(ss);
						this.lrc_data[mm + ss] = index
					})
					// console.log(this.lrc_data);
				})
			},

			back() {
				this.$router.replace('/main/home')
			},
		},
	}
</script>

<style scoped>
	.song_bg {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		filter: blur(20px);
		transform: scale(1.5);
	}

	.song_bg::after {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.contaner {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.needle_img {
		width: 70px;
		position: fixed;
		z-index: 9;
		top: 15px;
		left: 0;
		right: 0;
		margin: auto;
		transform: rotate(-40deg);
		transform-origin: top left;
		transition: all 0.5s;
	}

	.needle_img.playing {
		transform: rotate(-16deg);
	}

	.song_body {
		position: relative;
		margin: 60px auto 0 auto;
		width: 250px;
		height: 250px;
		background: purple;
		background: url(./img/bg.png) no-repeat center;
		background-size: contain;
		animation: song_route 10s linear infinite;
	}

	.song_body.paused {
		/* 停止动画旋转 */
		animation-play-state: paused;
	}

	.song_img {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.start_img {
		width: 56px;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	@keyframes song_route {
		100% {
			transform: rotate(360deg);
		}
	}

	.songName {
		position: absolute;
		z-index: 2;
		/* height: 30px; */
		top: 330px;
		left: 0;
		right: 0;
		bottom: 0;
		color: #eee;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}

	.lrc {
		padding: 0 20px;
		position: absolute;
		z-index: 2;
		top: 380px;
		left: 0;
		right: 0;
		bottom: 40px;
		margin: auto;
		color: rgb(219, 219, 219);
		overflow: scroll;
		scroll-behavior: smooth;
	}

	.lrc p {
		margin-bottom: 8px;
		text-align: center;
	}

	.arrowLeft {
		position: absolute;
		z-index: 3;
		color: #fff;
		top: 15px;
		left: 10px;
	}

	.percent {
		width: 100%;
		/* top: 360px; */
		position: absolute;
		z-index: 3;
		bottom: 0px;
	}
</style>
