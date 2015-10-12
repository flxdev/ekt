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
					if ($(this).hasClass('error')){
						m=0;
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
	
	$('body').on('click', '.datepicker input', function(event) {
		$(this).addClass('is-active');
		event.stopPropagation();
	});

	$('body').on('click', function() {
		$('.datepicker input.is-active').each(function() {
			var this_ = $(this),
				parent 	= this_.parents('.datepicker');
			if(this_.val() != '') {
				parent.removeClass('error');
				parent.addClass('valid');
			}
			else {
				parent.removeClass('valid');
				parent.addClass('error');
			}
		});
	});

});