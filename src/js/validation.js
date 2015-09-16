$(document).ready( function() {

	// form validation
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				borderColorOnError : false,
        		scrollToTopOnError : false,
        		modules : 'toggleDisabled'
        		// showErrorDialogs : false
			});
		});
	};

	$('input[name="phone"], input[type="phone"]').mask("+999 99 999 99 99",{placeholder:" "});

});