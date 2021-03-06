$(document).ready(function () {
	//яндекс апи
	ymaps.ready(init);
	// Обьекты (пункты выдачи)для добавления достаточно указать координаты и адрес (для отображения )
	var groups = [{
		name: "",
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: 'img/map_label.png',
		iconImageSize: [30, 42],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-5, -38],

		items: [{
				center: [55.801131, 37.508167],
				name: "Пункт Выдачи заказов Песчаная улица,дом 13"
			},
			{
				center: [55.757556, 37.651592],
				name: "Пункт Выдачи заказов Подсосенский переулок,11"
			}
		]
	}];

	function init() {
		var myMap = new ymaps.Map("map", {
				center: [55.76, 37.64],
				zoom: 10,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			);
		myMap.controls.add('zoomControl', {
			float: 'right',
			position: {
				right: 10,
				top: 470
			}
		})
		// Контейнер для пунктов выдачи
		var menu = $('<ul class="menu"/>');
		//отключение возможности листать карту и применять жесты 
		if ("ontouchstart" in document.documentElement) {
			myMap.behaviors.disable('drag');
			myMap.behaviors.disable('multiTouch');

		}

		//для каждогоместа выдачи создаем список  при клике на элемент которого центр карты туда смещается
		for (var i = 0, l = groups[0].items.length; i < l; i++) {
			createSubMenu(groups[0].items[i]);
		}

		function createSubMenu(group) {
			// сами адреса 
			var submenuItem = $('<li><a class="adress" href="#">' + group.name + '</a></li>'),
				// Создаем метку.
				placemark = new ymaps.Placemark(group.center, {});
			//загружаем в метку картинку 
			var collection = new ymaps.GeoObjectCollection(null, {
				iconLayout: 'default#image',
				iconImageHref: 'img/map_label.png',
				iconImageOffset: [-5, -38]
			});
			collection.add(placemark);

			myMap.geoObjects.add(collection);

			//при клике на элемент списка центр сместиться в положение метки
			submenuItem
				.appendTo(menu).find('a')
				.bind('click', function () {
					if (!placemark.balloon.isOpen()) {
						myMap.setCenter(group.center);
						$(this).parent().parent().children().css("list-style-image", "url(../img/radioOff.png)");
						$(this).parent().css("list-style-image", "url(../img/radioHover.png)");

					} else {
						placemark.balloon.close();
					}
					return false;
				});
		}

		// Добавляем список в тэг BODY.
		menu.appendTo($('.adress-list'));
	}

	//кнопки(десктоп)
	$(".button-map").click(function () {

		$(".form-map-section").css("display", "grid");
		$(".data-from-user-section").css("display", "none");
		//для рисования кнопки(вместо картинки)
		/*$(".button-map").css({"background-color":"#fff","color":"#212bff","z-index":"2"});
		$(".button-delivery-data").css({"background-color":"#edeeef","color":"#8288a2","z-index":"1"});*/
		$(".button-map").css({
			"background-image": "url(../img/activeTab1.png)",
			"color": "#212bff",
			"z-index": "2"
		});
		$(".button-delivery-data").css({
			"background-image": "url(../img/tabOff1.png)",
			"color": "#8288a2",
			"z-index": "1"
		});

	});
	$(".button-delivery-data").click(function () {
		$(".form-map-section").css("display", "none");
		$(".data-from-user-section").css("display", "grid");
		/*для рисования кнопки (вместо картинки)
		$(".button-map").css({"background-color":"#edeeef","color":"#8288a2","z-index":"1"});
		$(".button-delivery-data").css({"background-color":"#fff","color":"#212bff","z-index":"2"});*/
		$(".button-map").css({
			"background-image": "url(../img/tabOff1.png)",
			"color": "#8288a2",
			"z-index": "1"
		});
		$(".button-delivery-data").css({
			"background-image": "url(../img/activeTab1.png)",
			"color": "#212bff",
			"z-index": "2"
		});

	});



	//маска для поля телефон
	$("#phone-to-send").mask("+7(999)999-99-99", {
		placeholder: "+7(___)___-__-__"
	});

	//поля ввода
	//маска ввода телефона


	$(".name-to-send").focusout(function (e) {
		var regexp = /^[?!,.а-яА-ЯёЁ0-9\s]+$/gm; //регулярное выражение выбирающее кириллицу и некоторые значки(по ТЗ)
		if (!regexp.test($(".name-to-send").val())) {
			e.preventDefault();
			if ($(".data-name-block").length < 2) {
				$(".data-name-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
			}
			$(".name-to-send").css({
				"border": "1px solid #ff0000"
			});

			$('.send-data').prop('disabled', true);
			flagHoverActiveBtnSend = 0;
			disableCssButtonSend();
			return false;
		} else {
			if (isEmpty($(".name-to-send").val())) {
				if ($(".data-name-block").length < 2) {
					$(".data-name-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
				}

				$('.send-data').prop('disabled', true);
				flagHoverActiveBtnSend = 0;
				disableCssButtonSend();
				$(".name-to-send").css({
					"border": "1px solid #ff0000"
				});
			} else {
				checkAllInput();
				$(".data-name-block .error").remove();
				$(".name-to-send").css({
					"border": "1px solid #dadef0"
				});
			}
		}
	});

	function isEmpty(str) {
		if (str.trim() == '')
			return true;

		return false;
	}
	$(".phone-to-send").focusout(function () {
		if (isEmpty($(".phone-to-send").val())) {
			if ($(".data-phone-block").length < 3) {
				$(".data-phone-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
			}
			$(".phone-to-send").css({
				"border": "1px solid #ff0000"
			})

			$('.send-data').prop('disabled', true);
			flagHoverActiveBtnSend = 0;
			disableCssButtonSend();
		} else {
			if (isEmpty($(".phone-to-send").val())) {
				if ($(".data-phone-block").length < 3) {
					$(".data-phone-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');

				}
				$(".phone-to-send").css({
					"border": "1px solid #ff0000"
				});
				$('.send-data').prop('disabled', true);
				flagHoverActiveBtnSend = 0;
				disableCssButtonSend();
			} else {
				checkAllInput();
				$(".data-phone-block .error").remove();
				$(".phone-to-send").css({
					"border": "1px solid #dadef0"
				});
			}
		}
	});

	//блокируем ввод букв для ввода в поле телефон
	document.getElementById("phone-to-send").onkeydown = function (e) {
		if ((e.which >= 48 && e.which <= 57) // цифры
			||
			(e.which >= 96 && e.which <= 105) // num lock
			||
			e.which == 8 // backspace
			||
			(e.which >= 37 && e.which <= 40) // стрелки
			||
			e.which == 46) // delete 
		{
			return true;
		} else {
			return false;
		}
	}

	$(".adress-to-send").focusout(function () {
		if (isEmpty($(".adress-to-send").val())) {
			if ($(".data-adress-block").length < 3) {
				$(".data-adress-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
			}
			$(".adress-to-send").css({
				"border": "1px solid #ff0000"
			});

			$('.send-data').prop('disabled', true);
			flagHoverActiveBtnSend = 0;
			disableCssButtonSend();
		} else {
			checkAllInput();

			$(".data-adress-block .error").remove();
			$(".adress-to-send").css({
				"border": "1px solid #dadef0"
			});
		}
	});

	$(".comment-to-send").focusout(function () {
		if (isEmpty($(".comment-to-send").val())) {
			if ($(".data-comment-block").length < 3) {
				$(".data-comment-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
			}
			$(".comment-to-send").css({
				"border": "1px solid #ff0000"
			});

			$('.send-data').prop('disabled', true);
			flagHoverActiveBtnSend = 0;
			disableCssButtonSend();
		} else {
			if (isEmpty($(".comment-to-send").val())) {
				if ($(".data-comment-block").length < 3) {
					$(".data-coment-block").append('<div><span class="error" style="color:#ff0000">Error message</span></div>');
				}
				$(".comment-to-send").css({
					"border": "1px solid #ff0000"
				});

				$('.send-data').prop('disabled', true);
				flagHoverActiveBtnSend = 0;
				disableCssButtonSend();
			} else {


				checkAllInput();
				$(".data-comment-block .error").remove();
				$(".comment-to-send").css({
					"border": "1px solid #dadef0"
				});
			}
		}
	});

	//jquery функция для того чтобы поменять местами блоки(по селектору)
	//тут я просто меняю блоки местами (далее меняю название классов и стили меняются сами по классу)
	jQuery.fn.swap = function (b) {
		b = jQuery(b)[0];
		var a = this[0],
			a2 = a.cloneNode(true),
			b2 = b.cloneNode(true),
			stack = this;

		a.parentNode.replaceChild(b2, a);
		b.parentNode.replaceChild(a2, b);

		stack[0] = a2;
		return this.pushStack(stack);
	};
	//флаг для повторного нажатия верхней кнопки(не выпадающей)
	var flagbt1 = 0;

	$(".mobile-bt1").click(function () {
		if (flag == 1) {
			$(".mobile-bt2").css("display", "none");
			flag = 0;
		} else {
			$(".mobile-bt2").css("display", "block");
			flagbt1 = 1;
		}
	});
	//флаг для определения какую страницу открывать
	var flag = 0;
	//1)меняем местами блоки
	//2)меняем местами классы
	//3)меняем одну страницу на другую
	function clickbtn() {
		$(".mobile-bt2").click(function () {
			$(".mobile-bt2").swap(".mobile-bt1");
			$(".mobile-bt2").attr('class', 'btnswap');
			$(".mobile-bt1").attr('class', 'mobile-bt2');
			$(".btnswap").attr('class', 'mobile-bt1');

			$(".mobile-bt2").css("display", "none");
			$(".mobile-bt1").click(function () {
				$(".mobile-bt2").css("display", "block");
			});
			if (flag == 0) {
				$(".form-map-section").css("display", "grid");
				$(".data-from-user-section").css("display", "none");
				flag = 1;
			} else if (flag == 1) {

				$(".form-map-section").css("display", "none");
				$(".data-from-user-section").css("display", "grid");
				flag = 0;
			}
			clickbtn();
		});
	}
	clickbtn();

	var flagHoverActiveBtnSend = 0;

	function checkAllInput() {
		if ((!isEmpty($('.name-to-send').val())) &&
			(!isEmpty($('.adress-to-send').val())) &&
			(!isEmpty($('.comment-to-send').val())) &&
			(!isEmpty($('.phone-to-send').val()))) {
			if ($('.all-content').find('.error').length == 0) {
				$('.send-data').css({
					'background-color': '#212bff',
					'color': 'ffffff'
				});
				$('.send-data').prop('disabled', false);
				flagHoverActiveBtnSend = 1;
			}
		}
	}
	$('.send-data').mouseenter(function () {
		if (flagHoverActiveBtnSend == 1) {
			$('.send-data').css("background-color", "#2029ea");
		}
	});
	$('.send-data').mousedown(function () {
		if (flagHoverActiveBtnSend == 1) {
			$('.send-data').css("background-color", "#1e26d8");
		}
	});
	$('.send-data').mouseleave(function () {
		if (flagHoverActiveBtnSend == 1) {
			$('.send-data').css("background-color", "#212bff");
		}
	});

	function disableCssButtonSend() {
		$('.send-data').css("background-color", "edeeef");
		$('.send-data').css("color", "#b8bed8");
	}



});