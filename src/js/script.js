$( document ).ready(function() {	
	$("#phone-to-send").mask("+7(999)999-99-99", { placeholder: "+7(___)___-__-__" });


ymaps.ready(init);

	function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            //searchControlProvider: 'yandex#search'
        }),

    // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: []
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: '',
                hintContent: ''
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку нелзя перемещать.
            draggable: false
        })

    myMap.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([55.801131, 37.508167], {
            balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
				}))
				.add(new ymaps.Placemark([55.757556, 37.651592], {
					balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
				}, {
					preset: 'islands#icon',
					iconColor: '#0095b6'
				}));
	}
$(".button-map").click(function() {
	$(".form-map-section").css("display","grid");
	$(".data-from-user-section").css("display","none");
	$(".button-map").css({"background-color":"#fff","color":"#212bff","z-index":"2"});
	$(".button-delivery-data").css({"background-color":"#edeeef","color":"#8288a2","z-index":"1"});
});
$(".button-delivery-data").click(function() {
	$(".form-map-section").css("display","none");
	$(".data-from-user-section").css("display","grid");
	$(".button-map").css({"background-color":"#edeeef","color":"#8288a2","z-index":"1"});
	$(".button-delivery-data").css({"background-color":"#fff","color":"#212bff","z-index":"2"});
	});
	$(".name-to-send").focusout( function(e) {
		var regexp = /^[?!,.а-яА-ЯёЁ0-9\s]+$/gm;
		if(!regexp.test($(".name-to-send").val())) {
				e.preventDefault();
				$(".name-to-send").css({"border":"1px solid #ff0000"})
				//$(".data-phone").append('<span style="color:#ff0000">Error message</span>');
				return false;
		}else{
			if(isEmpty($(".name-to-send").val())){
				$(".name-to-send").css({"border":"1px solid #ff0000"})
			 }else{
		 
				$(".name-to-send").css({"border":"1px solid #dadef0"})
			 }
		}
 });
 function isEmpty(str) {
  if (str.trim() == '') 
    return true;
    
  return false;
 }
	 $(".phone-to-send").focusout(function(){
	 if(isEmpty($(".phone-to-send").val())){
		$(".phone-to-send").css({"border":"1px solid #ff0000"})
	 }else{
		 
		$(".phone-to-send").css({"border":"1px solid #dadef0"})
	 }
	});

	 $(".adress-to-send").focusout(function(){
	 if(isEmpty($(".adress-to-send").val())){
		$(".adress-to-send").css({"border":"1px solid #ff0000"})
	 }else{
		 
		$(".adress-to-send").css({"border":"1px solid #dadef0"})
	 }
	});

	 $(".comment-to-send").focusout(function(){
	 if(isEmpty($(".comment-to-send").val())){
		$(".comment-to-send").css({"border":"1px solid #ff0000"})
	 }else{
		$(".comment-to-send").css({"border":"1px solid #dadef0"})
	 }});

});