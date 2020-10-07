window.addEvent('domready', function () {
	new iframe_selector({
		selectors: {
			'.formrow_optin .poplink': {
				'type': 'iframe'
			},
			'#footer': {
				'type': 'iframe'
			}
		}
	});
	add_pop_iframe_closer_events();
	if (current_page == 'page_pregame') {
		initialize_quiz();
	}
	if (current_page == 'page_reg_half') {
		var optinlayer = new Optin_layer({
			form_id: 'form_reg_half'
		});
		$$('.formrow_title label').addEvent('click', function () {
			$$('.formrow_title label').removeClass('active');
			$(this).addClass('active');
		});
		mooli = new Moolidator_Lite({
			'form_id': 'form_reg_half',
			'debug': false,
			'submit_button_id': 'submit_reg_half',
			'rules': moolidator_lite_rules,
			'countries': moolidator_lite_countries
		});
		mooli.addEvents({
			'moolidator_lite_submit': function () {
				if (optinlayer.test_checkboxes() === false) {
					optinlayer.show();
				} else {
					if (page_submitted === false) {
						page_submitted = true;
						if (popunder_on_submit('halfreg') === false) {
							$('form_reg_half').submit();
						}
					}
				}
				return false;
			}
		});
		mooli.options.rules['default'].firstname.negative.push(/^Nome$/i);
		mooli.options.rules['default'].lastname.negative.push(/^Cognome$/i);
		mooli.options.rules['default'].city.negative.push(/^LocalitÃ $/i);
	}
	if (current_page == 'page_reg_full') {
		if ($$('#optin_layer').length > 0) {
			var optinlayer = new Optin_layer({
				form_id: 'form_reg_full'
			});
		}
		$$('.formrow_title label').addEvent('click', function () {
			$$('.formrow_title label').removeClass('active');
			$(this).addClass('active');
		});
		$$('select').each(function (el) {
			if (el.get('data-value')) {
				el.set('value', el.get('data-value'));
			}
		});
		mooli = new Moolidator_Lite({
			'form_id': 'form_reg_full',
			'submit_button_id': 'submit_reg_full',
			'rules': moolidator_lite_rules,
			'countries': moolidator_lite_countries
		});
		mooli.addEvents({
			'moolidator_lite_submit': function () {
				if (page_submitted === false) {
					page_submitted = true;
					if (popunder_on_submit('fulreg') === false) {
						$('form_reg_full').submit();
					}
				}
			}
		});
		mooli.options.rules.it.street.negative.push(/^Nome via$/i);
	}
});