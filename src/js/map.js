$(document).ready( function() {

	if ($('#map').length) {
		ymaps.ready(init);
	}

	function init () {
		var myMap = new ymaps.Map('map', {
				center: [53.9, 27.56667],
				zoom: 11,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
			objectManager = new ymaps.ObjectManager({
				clusterize: true
			}),
			MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="popover top">' +
					'<a class="close" href="#">&times;</a>' +
					'<div class="arrow"></div>' +
					'<div class="balloon">' +
						'$[[options.contentLayout observeSize minWidth=246 maxWidth=246]]' +
					'</div>' +
				'</div>', {
				build: function () {
					this.constructor.superclass.build.call(this);
					this._$element = $('.popover', this.getParentElement());
					this.applyElementOffset();
					this._$element.find('.close')
					    .on('click', $.proxy(this.onCloseClick, this));
				},
				clear: function () {
				    this._$element.find('.close')
				        .off('click');
				    this.constructor.superclass.clear.call(this);
				},
				onSublayoutSizeChange: function () {
					MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
					if(!this._isElement(this._$element)) {
					    return;
					}
					this.applyElementOffset();
					this.events.fire('shapechange');
				},
				applyElementOffset: function () {
					this._$element.css({
						left: -((this._$element[0].offsetWidth + 18) / 2),
						top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight + 10)
					});
				},
				onCloseClick: function (e) {
					e.preventDefault();
					this.events.fire('userclose');
				},
				getShape: function () {
					if(!this._isElement(this._$element)) {
					    return MyBalloonLayout.superclass.getShape.call(this);
					}
					var position = this._$element.position();
					return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
						[position.left, position.top], [
							position.left + this._$element[0].offsetWidth,
							position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
						]
					]));
				},
				_isElement: function (element) {
					return element && element[0] && element.find('.arrow')[0];
				}
			}),

			MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				'<h3 class="balloon__title">$[properties.balloonHeader]</h3>' +
				'<div class="balloon__content">$[properties.balloonContent]</div>'
			);

			objectManager.objects.options.set({
			    iconLayout: 'default#image',
				iconImageHref: 'img/marker.png',
				iconImageSize: [20, 27],
				balloonShadow: false,
           		balloonLayout: MyBalloonLayout,
           		balloonContentLayout: MyBalloonContentLayout,
           		balloonPanelMaxMapArea: 0
			});

		ZoomLayout = ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-buttons'>" +
				"<div id='zoom-in' class='btn-plus'>+</div>" +
				"<div id='zoom-out' class='btn-minus'>-</div>" +
			"</div>", {
			build: function () {
				ZoomLayout.superclass.build.call(this);

				this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
				this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

				$('#zoom-in').bind('click', this.zoomInCallback);
				$('#zoom-out').bind('click', this.zoomOutCallback);
			},
			clear: function () {
				$('#zoom-in').unbind('click', this.zoomInCallback);
				$('#zoom-out').unbind('click', this.zoomOutCallback);

				ZoomLayout.superclass.clear.call(this);
			},
			zoomIn: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() + 1
				});
			},
			zoomOut: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() - 1
				});
			}
		}),
		zoomControl = new ymaps.control.ZoomControl({ 
			options: { 
				layout: ZoomLayout,
				position: {
					top: 28,
					left: 17
				}
			} 
		});

		myMap.controls.add(zoomControl);

		myMap.geoObjects.add(objectManager);
		var data = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature", 
					"id": 0, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.9, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 900–2000,<p>" +
									"<p>Сб: 1000–1600<p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка", 
						"hintContent": "Текст подсказки"
					}
				},
				{
					"type": "Feature", 
					"id": 1, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.9, 27.46667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-2",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 900–2000,<p>" +
									"<p>Сб: 1000–1600<p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка", 
						"hintContent": "Текст подсказки"
					}
				},
				{
					"type": "Feature", 
					"id": 2, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.87, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-3",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 900–2000,<p>" +
									"<p>Сб: 1000–1600<p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка", 
						"hintContent": "Текст подсказки"
					}
				},
				{
					"type": "Feature", 
					"id": 3, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.93, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-4",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 900–2000,<p>" +
									"<p>Сб: 1000–1600<p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка", 
						"hintContent": "Текст подсказки"
					}
				}
			]
		}
		objectManager.add(data);
	}

});