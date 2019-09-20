;
(function () {
	"use strict";

	let hotSlider = $('.ba-hot-slider');
	let hotSliderImages = $('.ba-hot-slider-images');
	hotSlider.slick({
		infinite: false,
		nextArrow: $('[data-hot-next]'),
		prevArrow: $('[data-hot-prev]'),
		asNavFor: hotSliderImages
	});

	
	hotSliderImages.slick({
		infinite: false,
		arrows: false,
		asNavFor: hotSlider,
		fade:true
	});

	let bestSlider = $('#best');
	bestSlider.slick({
		slide: '.ba-offer',
		infinite: false,
		nextArrow: bestSlider.find('[data-next]'),
		prevArrow: bestSlider.find('[data-prev]')
	});

	//change numbe of slides
	let currentSlideEl = $('[data-current-offer]');
	let totalSlideEl = $('[data-total-offer]');

	let slidesCount = $('.ba-offer').length;

	slidesCount = slidesCount < 10 ? '0' + slidesCount : slidesCount;

	totalSlideEl.text(slidesCount); // set total number of slides

	bestSlider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
		nextSlide++;
		nextSlide = nextSlide < 10 ? '0' + nextSlide : nextSlide;
		currentSlideEl.text(nextSlide);
	});



	//Mob nav toggle
	const menuToggleBtn = $('.ba-menu-toggle, .ba-overlay');
	const mobNav = $('.ba-mob-nav');

	menuToggleBtn.on('click', () => mobNav.toggleClass('ba-open'));

	//add map
	function baMap() {
		//create map and asign it to the baMap var
		let mapCenter = {
			lat: 41.902782,
			lng: 12.496365
		};

		let baMap = new google.maps.Map(document.getElementById('ba-map'), {
			center: mapCenter,
			zoom: 6,
			styles: [{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [{
							"color": "#e9e9e9"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f5f5f5"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f5f5f5"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [{
							"color": "#dedede"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"elementType": "labels.text.stroke",
					"stylers": [{
							"visibility": "on"
						},
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"elementType": "labels.text.fill",
					"stylers": [{
							"saturation": 36
						},
						{
							"color": "#333333"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f2f2f2"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [{
							"color": "#fefefe"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [{
							"color": "#fefefe"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				}
			]
		});

		// The marker, positioned in Rome
		let cities = {
			rome: {
				lat: 41.902782,
				lng: 12.496365
			},
			paris: {
				lat: 48.856613,
				lng: 2.352222
			},
			madrid: {
				lat: 40.416775,
				lng: -3.703790
			},
			kiev: {
				lat: 50.450100,
				lng: 30.523399
			},
		}

		let mapMarkers = [];
		for (let key in cities) {
			var marker = new google.maps.Marker({
				position: cities[key],
				map: baMap,
				icon: 'img/marker.svg'
			});

			let infowindow = new google.maps.InfoWindow({
				content: '<b>' + key + '</b>'
			});
			infowindow.open(baMap, marker);

			mapMarkers[key] = marker; //save markers in object
		}

		//on select city
		$('#city-select').on('change', function (e) {
			baMap.panTo(cities[this.value]);
		});

	} // function ba-map


	$(document).ready(function (e) {
		baMap();
	});

})();