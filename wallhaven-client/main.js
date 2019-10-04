// settings
const apiKey = '1s9mBrXtijsRplYRXqJkhOkMdUdAWl67';
const purity = 100; // 100 SFW, 110 Sketcy, 111 NSFW
let pageNum = 1;

// wallpaper class
class Wallpaper {
	constructor(path, thumb) {
		this.path = path;
		this.thumb = thumb;
	}
}

// UI class
class UI {
	static AddWallToDoc(wallpaper) {
		const wallArea = document.querySelector('#wallpapers');
		const wallGallery = document.createElement('div');
		wallGallery.className = 'item shadow-large'
		wallGallery.innerHTML = `
		<a href=${wallpaper.path} target="_blank">
			<img src=${wallpaper.thumb}  alt="wallpaper"/>
		</a>`

		wallArea.appendChild(wallGallery);
	}
}

// event listener
document.addEventListener('DOMContentLoaded', GetWallpapers);

function GetWallpapers() {
	const xhr = new XMLHttpRequest();
	// const URL = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}&page=${pageNum}&purity=${purity}`;
	const URL = 'example.json';
	xhr.open('GET', URL , true);
	xhr.withCredentials = true;

	// loading
	xhr.onprogress = function() {
		console.log('Connecting to Wallhaven API ...');
	}

	// on load
	xhr.onload = function() {
		console.log('Request Completed!');

		// check status
		if (this.status == 200) {
			const data = JSON.parse(this.responseText);
			const wallpapers = data.data;

			for ( let wallpaper of wallpapers) {
				const wall = new Wallpaper( wallpaper.path, wallpaper.thumbs.small );
				UI.AddWallToDoc(wall);
			}

		} else if (this.status == 404) {
			console.log('Failed to Connect: Not Found');
		}
	}

	// error handling
	xhr.onerror = function() {
		console.log('Failed to Connect to API!');
	}

	// send request
	xhr.send();
}