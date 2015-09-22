$(document).ready( function() {

	// form validation
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this 	= $(this),
				input = $('input[data-validation="required"], input[data-validation="email"], input[data-validation="number"], input[data-validation="password"]'),
				button 		= form_this.find('input[type="submit"], button[type="submit"]');
			$.validate({
				form : form_this,
				validateOnBlur : false,
				borderColorOnError : false,
        		scrollToTopOnError : false
        		// showErrorDialogs : false
			});
			button.prop('disabled', true);
			function checkInput() {
				form_this.find(input).each(function () {
					if ($(this).val() != '') {
						button.prop('disabled', false);
					}
					else {
						button.prop('disabled', true);
					}
				});
			};
			input.on('keyup', function() {
				checkInput();
			});
		});
	};

	$('input[name="phone"], input[type="phone"]').mask("+999 99 999 99 99",{placeholder:" "});

});