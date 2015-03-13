function isMobile() {
	return ('ontouchstart' in document.documentElement);
}
jQuery(function($){

	// Sticky Nav
	$('.sticky-nav').waypoint('sticky', {
	  stuckClass: 'navbar-fixed-top'
	});

	// Smoth Scrolling
	$.localScroll();
	
	// Parallax
	$window = $(window);
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	} else {
		$('#start').parallax("80%", 0.4, true);
		$('#projects-img').parallax("50%", 0.3, true);
		$('#social-img').parallax("50%", 0.3, true);
		$('#contact-img ').parallax("50%", 0.3, true);
	}

	var options = {
		beforeSubmit:    function() {
			$('#submit_btn').button('loading');
			$("#form :input").attr("disabled", true);
			$('#result').hide();
			$('#result').removeClass();
			return true;
		},
		success:         function(data) {
			var json = jQuery.parseJSON(data);
			$('#result').html = json.result;
			if(json.hasError == true) {
				if(json.captchaValid == false) {
					// reload?
				}
				$('#result').addClass("alert alert-warning");
			} else {
				$('#result').addClass("alert alert-success");
				$('#contact_form').resetForm();
				grecaptcha.reset();
			}
			$('#submit_btn').button('reset');
			$("#form :input").attr("disabled", false);
			$('#result').html(json.result);
			$('#result').fadeIn('slow');
		},
		error:           function(data) {
			var json = jQuery.parseJSON(data.responseText);
			$('#result').html = "Fehler! Bitte versuche es erneut!";
			$('#result').addClass("alert alert-danger");
			$('#result').fadeIn('slow');
			$("#form :input").attr("disabled", false);
		},
	};
	$('#contact_form').ajaxForm(options); 
}); 