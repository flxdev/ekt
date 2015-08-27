$(document).ready( function() {

	 $(document).click(function() {
	        $(".js-select").removeClass("is-active");
		    $(".js-select-list").slideUp(100);
		    $('.js-drop').removeClass('is-active');
		    $('.js-drop-list').fadeOut();
			// $('.ms-choice').removeClass('is-active');
	    });
	    
	    // select list
	      $("body").on("click",".js-select",function(event) {
	          event.stopPropagation();
	      });
	      $("body").on("click",".js-select-text",function(event) {
	      	var select = $(this).parents(".js-select");
	          if (select.hasClass("is-active")) {
	              $(".js-select").removeClass("is-active");
	              $(".js-select-list").slideUp(100);
	          }
	          else {
	              $(".js-select").removeClass("is-active");
	              $(".js-select-list").slideUp(100);
	              select.toggleClass("is-active").find(".js-select-list").slideToggle(100);
	          }
	         
	      });

	      $("body").on("click",".js-select-list li",function() {
	          var val = $(this).attr("data-val");
	          var text = $(this).text();
	          var select = $(this).parents(".js-select");
	          var selectList = $(this).parents(".js-select-list");
	          select.find(".js-select-text").text(text);
	          select.find("option").removeAttr("selected");
	          select.find('option[value="'+val+'"]').attr("selected", "selected");
	          selectList.find("li").removeClass("is-active");
	          $(this).addClass("is-active");
	          select.removeClass("is-active");
	          selectList.slideUp(100);
	          return false;
	          
	      });


	// open nav
	function navOpen() {
		$('.js-list-links').each(function() {
			if ($(this).parent().hasClass('is-active')) {
				$(this).show();
			}
		});
		$('.js-nav-item').on('click', function() {
			var this_ = $(this).parent(),
				item = $('.js-nav-item').parent(),
				thisList = this_.find('.js-list-links'),
				list = $('.js-list-links');
			if (!this_.hasClass('is-active')) {
				item.removeClass('is-active');
				list.slideUp(500);
				this_.addClass('is-active');
				thisList.slideDown(500);
			}
			else {
				this_.removeClass('is-active');
				list.slideUp(500);
			}
			return false;
		});
	}
	navOpen();

	// spiner
	function spiner() {
		var number = $('.js-spiner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.js-plus');
			var minus = $(this).find('.js-minus');
			plus.on('click', function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				}
			});
			minus.on('click', function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('1');
					return false;
				}
			});
		});
	}
	spiner();

	// slider
	$('[class*="js-slider"], .js-galery').on('init', function(slick){
		$(this).addClass('is-init');
	});
	$('.js-slider').slick({
		dots: true,
		arrows: true,
		infinite: false,
		adaptiveHeight: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1180,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					dots: true
				}
			}
		]
	});
	$('.js-galery').slick({
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 700,
		autoplaySpeed: 3000,
		fade: true,
		cssEase: 'linear',
	});
	$('.js-slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-slider-nav'
	});
	$('.js-slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.js-slider-for',
		dots: false,
		arrows: false,
		focusOnSelect: true
	});

	// dropdown
	$('.js-open-drop').on('click', function(event) {
		var this_ = $(this).parents('.js-drop'),
			list = this_.find('.js-drop-list');
		if (this_.hasClass('is-active')) {
			this_.removeClass('is-active');
			list.fadeOut();
		}
		else {
			this_.addClass('is-active');
			list.fadeIn();
		}
		event.stopPropagation();
	});

	// multiple-select
	$('.js-multiple-select').multipleSelect({
		selectAll: false,
		countSelected: 10,
		minimumCountSelected: 10
	});

	$('.js-filter-select').multipleSelect({
		single: true
	});
	function activeSel() {
		var parent = $('.js-filter-select, .js-multiple-select'),
			item = parent.find('> button'),
			li = parent.find('.ms-drop li');
		item.on('click', function () {
			var this_ = $(this),
				div = this_.find('> div');
			if (div.hasClass('open')) {
				$('.ms-choice').removeClass('is-active');
				div.parents('.ms-choice').addClass('is-active');
			}
			else {
				div.parents('.ms-choice').removeClass('is-active');
			}
		});
		li.on('click', function() {
			var parent = $(this).parents('.js-filter-select, .js-multiple-select');
			parent.find('.ms-choice').removeClass('is-active');
		});
	}
	activeSel();
	

	// items add wrap
	function itemWrap() {
		function addWrap() {
			var row = $('.items__row'),
				item = $('.items__wrap').find('.item');
			if ($(window).width() < 1166) {
				while(row.children('.item:not(.items__wrap)').length)
					row.children('.item:not(.items__wrap):lt(2)').wrapAll('<div class="items__wrap">');
			}
			else {
				item.unwrap();
			};
		}
		window.onload = function() {
			addWrap();
		};
		$(window).resize(function() {
			addWrap();
		});
	} itemWrap();

	// accordion
	function accord() {
		$('.js-accord').each(function() {
			var this_ = $(this),
				block = this_.find('.js-accord-block');
			if (this_.hasClass('is-active')) {
				block.show();
			}
		});
		$('.js-accord-but').on('click', function() {
			var this_ = $(this),
				parent = this_.parents('.js-accord'),
				block = parent.find('.js-accord-block');
			if (!parent.hasClass('is-active')) {
				parent.addClass('is-active')
				block.slideDown(400);
			}
			else {
				parent.removeClass('is-active');
				block.slideUp(400);
			}
			return false;
		});
	} accord();

	$('.js-sortin-item').on('click', function() {
		var this_ = $(this),
			parent = this_.parents('.js-sorting'),
			item = parent.find('.js-sortin-item'),
			active = ('is-active'),
			activeTop = ('is-active-top');
			if (!this_.hasClass(active)) {
				item.removeClass(active).removeClass(activeTop);
				this_.addClass(active);
			}
			else if (!this_.hasClass(activeTop)) {
				this_.removeClass(active).toggleClass(activeTop);
			}
	});
	
	// item show info
	function itemOpen() {
		$('.js-item').each(function() {
			var this_ = $(this),
				block = this_.find('.js-item-text');
			if (this_.hasClass('is-active')) {
				block.show();
			}
		});
		$('.js-item-open').on('click', function() {
			var this_ = $(this),
				parent = this_.parents('.js-item')
				block = parent.find('.js-item-text');
			if (!parent.hasClass('is-active')) {
				parent.addClass('is-active')
				block.slideDown(400);
			}
			else {
				parent.removeClass('is-active');
				block.slideUp(400);
			}
			return false;
		});
	} itemOpen();
	
	// filter
	$('.js-filter-all').on('click', function() {
		var this_ = $(this),
			parent = this_.parents('.filter'),
			block = parent.find('.js-filter-block');
		if (!parent.hasClass('is-active')) {
			parent.toggleClass('is-active');
			block.slideDown(400);
			this_.text('Свернуть все фильтры');
		}
		else {
			parent.removeClass('is-active');
			block.slideUp(400);
			this_.text('Показать все фильтры');
		}
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tab_link = $(this).find("a"),
				tab_item = $(this).find("li"),
				index = tab_link.attr("href"),
				parents = $(this).parents(".js-tab-group"),
				tab_cont = parents.find(".js-tab-cont");
			tab_link.on("click", function() {
				var index = $(this).attr("href");
				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(500);
				parents.find("."+index).fadeIn(500);
				return false;
			});
			$(this).find('li:first').addClass("is-active");
			parents.find("."+index).fadeIn(500);
		});
	}
	tab();

});