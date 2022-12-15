(function($){
	$(function(){
		if($('.menu-acc-wish-dropdown').length > 0) {
			$('.menu-acc-wish-dropdown').on('mouseover',function(){
				$('.menu-dropdown-children').slideDown();
			})
			$('.menu-acc-wish-dropdown').on('mouseleave',function(){
				$('.menu-dropdown-children').slideUp();
			})
		}
      // ENTER DRAW 
		if($('#launch-form').length > 0 ) {
			$('.prod-card-enter-draw-btn').on('click',function(e){
				e.preventDefault();
				$('#launch-form').fadeIn();
				$('body').addClass('launch-form-open');
			})
			$('.launch-close, .launch-form-bg').on('click',function(e){
				e.preventDefault();
				$('#launch-form').fadeOut();
				$('body').removeClass('launch-form-open');
			})

			// FORM VALIDATION
			let id = (id) => document.getElementById(id);
			let classes = (classes) => document.getElementsByClassName(classes);
			let name = id("klaviyo_form_first_name"),
			  email = id("k_id_email"),
			  last_name = id("klaviyo_form_last_name"),
			  phone = id("klaviyo_form_Phone_Number"),
			  id_number = id("klaviyo_form_ID_Number"),
			  shipping = id("klaviyo_form_Shipping_Address"),
			  city = id("klaviyo_form_City"),
			  post_code = id("klaviyo_form_Post_Code"),
			  size = id("klaviyo_form_size"),
			  form = id("email_signup"),
			  errorMsg = classes("error");
			// Adding the submit event Listener
			form.addEventListener("submit", (e) => {
			  engine(name, 0, "First Name cannot be blank", e);
			  engine(last_name, 1, "Last Name cannot be blank", e);
			  engine(phone, 2, "Phone Number cannot be blank", e);
			  engine(id_number, 3, "ID Number cannot be blank", e);
			  engine(email, 4, "Email cannot be blank", e);
			  engine(size, 5, "Size cannot be blank", e);
			  engine(shipping, 6, "Address cannot be blank", e);
			  engine(city, 7, "City cannot be blank", e);
			  engine(post_code, 8, "Post Code cannot be blank", e);
			});
			// engine function which will do all the works
			let engine = (id, serial, message, e) => {
			  if (id.value.trim() === "") {
			    errorMsg[serial].innerHTML = message;
			    e.preventDefault();
			  } else {
			    errorMsg[serial].innerHTML = "";
			    return true;
			  }
			};
		}
		
      //For Cart
         var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };
        var cart = getUrlParameter('cartr');
        if(cart == 'y') {
           $("body").addClass("is-minicart");
        }
      
      
      	function getMonthFromString(mon){
		   var d = Date.parse(mon + "1, 2012");
		   if(!isNaN(d)){
		      return new Date(d).getMonth() + 1;
		   }
		   return -1;
		}

		if($('.countdown').length > 0) {
			var dropYear = $('.countdown').data('year'),
			dropMonth = $('.countdown').data('month'),
			dropMonthInt = getMonthFromString(dropMonth)+'',
			dropDay = $('.countdown').data('day'),
			dropTime = $('.countdown').data('hour').split(":"),
			currentdate = new Date();
            if((dropYear==currentdate.getFullYear()) && (dropMonthInt==(currentdate.getMonth()+1)) && (dropDay==currentdate.getDate()) ) {
              setInterval(function(){
                var countdown = new Date();
                if((dropTime[0]==countdown.getHours()) && dropTime[1]==countdown.getMinutes()) {
                  $('.page-product').removeClass('dropsoon-product');
                  $('.page-product').addClass('product-dropped');
                  $('.prod-card-enter-draw-btn').remove();
                  $('.countdown').remove();
                  $('.draw-closed-notice').removeClass('hide-me');
                }
              }, 1000);
            };

		}
      
      
      
      
		var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };
		var cart = getUrlParameter('atc');
        if(cart == '1') {
            $("body").addClass("is-minicart");
        }

        if($('.js-variant-radio').length > 0){
        	var enableWishlist = false;
        	setTimeout(function(){
				$('.js-variant-radio').each(function(){
					if($(this).is(':checked')){
						enableWishlist = true;
						var stock = $(this).data('inventory-qty');
						if(stock > 0){
							$('.add-cart-btns').removeClass('unavailable-product-selected');
						} else {
							$('.add-cart-btns').addClass('unavailable-product-selected');
						}
					} 
				});
				if(enableWishlist == true) {
					$('.btn-wishlist').removeClass('disable-wishlist');
				}
			},5);
		}
 
		function swymCallbackFn(swat) {
			$('.fieldset-var').on('click',function(){
				// $('.js-variant-radio').prop("checked", false);
				// $(this).find('input[type=radio]').prop("checked", true);
				var var_id = $(this).data("var-id");
				var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + var_id;
      			window.history.replaceState({ path: newurl }, '', newurl);
				if($('.btn-wishlist').length > 0 ){
					$('.btn-wishlist').removeClass('disable-wishlist')
					$('.btn-wishlist').attr('data-product-url', newurl);
					$('.btn-wishlist').attr('data-variant-id', var_id);
				}
				window.triggerSwymVariantEvent(var_id);
        		swat.initializeActionButtons(".add-cart-btns");
				if($(this).hasClass('unavailable-product')) {
					$('input[name=quantity]').val(0);
					$('.add-cart-btns').addClass('unavailable-product-selected');
				} else {
					$('input[name=quantity]').val(1);
					$('.add-cart-btns').removeClass('unavailable-product-selected');
				}
				setTimeout(function(){ 
		          if($('[name="id"]').val() != "{{ product.selected_or_first_available_variant.id }}"){
		           // location.reload();
		          }
		        }, 1);
			})
		}
		if (!window.SwymCallbacks) {
		    window.SwymCallbacks = [];
		}
		window.SwymCallbacks.push(swymCallbackFn);
	});

})(jQuery)

