$(document).ready( function() {

	// form validation
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this 	= $(this),
				input = 'input[data-validation="required"], input[data-validation="email"], input[data-validation="number"], input[data-validation="password"]',
				button 		= form_this.find('input[type="submit"], button[type="submit"]');
			$.validate({
				form : form_this,
				borderColorOnError : false,
        		scrollToTopOnError : false
        		// onValidate : function() {
    		    //   return {
    		    //     element : $('.datepicker input'),
    		    //     message : 'This input has an invalid value for some reason'
    		    //   }
    		    // },
        		// showErrorDialogs : false
			});
			button.prop('disabled', true);
			function checkInput() {
				good = 1;
				form_this.find(input).each(function () {
					if ($(this).val() != '') {
						m = 1;
					}
					else {
						m = 0;
					}
					good = good *m;
				});
				if(good==1){
					button.prop('disabled', false);
				}
				else{
					button.prop('disabled', true);	
				}
			};
			form_this.find(input).on('keyup', function() {
				checkInput();
			});
		});
	};

	// mask
	$('input[name="phone"], input[type="phone"]').inputmask({
		mask: '+999 99 999 99 99',
		showMaskOnHover: false,
		showMaskOnFocus: false,
		placeholder: ''
	});
	$('.datepicker input').on('validation', function(evt, valid) {
    	alert();
    });

	// var datepicker = $('.datepicker');
	// if (datepicker.length) {
	// 	datepicker.each(function() {
	// 		var this_ = $(this),
	// 			input = this_.find('input');
	// 		input.on('chenge', function(){
	// 			$(this).addClass('is-date');
	// 		});
	// 	});
	// }
	// $('.datepicker input').change(function() {
	// 	if($(this).val() != '') {
	// 		inputAc.removeClass('error');
	// 		$(this).addClass('valid');
	// 	}
	// 	else {
	// 		inputAc.removeClass('valid');
	// 		$(this).addClass('error');
	// 	}
	// });
	$('.datepicker input').on('click', function(event) {
		$(this).addClass('is-active');
		event.stopPropagation();
	});

	$('body').on('click', function() {
		var inputAc = $('.datepicker input.is-active'),
			parent 	= inputAc.parents('.datepicker');
		if(inputAc.val() != '') {
			parent.removeClass('error');
			parent.addClass('valid');
		}
		else {
			parent.removeClass('valid');
			parent.addClass('error');
		}
	});

});