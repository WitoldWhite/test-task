	var rS = 'sLjQjlONIuIgzzuPzHGPMzkttkmIwmsKx';
	var rI = '8ojZcEVnqWM-v9dBVAE';
	var pI = 'page_reg_half';

	var user_device_type = 'pc';

	var mooli = '';
	var moolidator_lite_countries = {
		'default': 'it',
		'1': 'it',
		'2': 'ch',
		'3': 'default'
	};

	var POPUNDER = {};
	var context = 'it';

	try {
		var iframeLoaded = function () {
			document.getElementsByClassName("_sponsor_loader")[0].style.display = "none"
		};
		window.addEvent("domready", function () {
			new Sponsorlist_sweepstake
		});
		var Sponsorlist_sweepstake = new Class({
			Implements: Options,
			options: {
				hidden_class: "hidden",
				sponsor_list_link_class: "sponsorlist",
				sponsor_class: "_sponsor",
				sponsor_list_class: "_sponsor_list",
				sponsor_button_class: "_sponsor_button",
				sponsor_close_button: "_sponsor_iframe_closer",
				unsubscribe: 0,
				sponsor_hiddenfield: "sponsor_ignore_user",
				sponsor_iframe_id: "sponsorlist_iframe",
				sponsor_iframe_container_id: "_sponsorlist_container",
				sponsor_iframe_background_id: "_sponsorlist_cover",
				sponsor_iframe_loader_class: "_sponsor_loader"
			},
			use_Storage: !0,
			CookieListenerStatus: !1,
			initialize: function (s) {
				this.setOptions(s), this.initController(), this.checkStorage() && (this.updateSponsorByStorage(),
					this.addEvents())
			},
			initController: function () {
				var s = this;
				$$("." + s.options.sponsor_button_class).each(function (o) {
					o.addEvent("click", function () {
						this.target === s.options.sponsor_iframe_id && ($$("." + s.options
								.sponsor_iframe_loader_class)[0].style.display = "block", s
							.Sponsorlist_visibility(!0));
						var o = this.href;
						new RegExp("unsubscribe=1").test(o) && !0 !== s.use_Storage && s
							.CookieListener()
					})
				})
			},
			checkStorage: function () {
				return this.storageAvailable("sessionStorage") ? this.use_Storage = !0 : this.use_Storage = !1, !0
			},
			addEvents: function () {
				self = this, self.use_Storage && window.addEventListener("storage", function (s) {
					if (s.storageArea === sessionStorage) {
						var o = sessionStorage.getItem(self.options.sponsor_hiddenfield),
							e = $$('input[name = "' + self.options.sponsor_hiddenfield + '"]');
						e && e[0] && (e[0].value = o), ab.setHF(self.options.sponsor_hiddenfield, o)
					}
				}), $$("." + self.options.sponsor_close_button).length > 0 && $$("." + self.options
					.sponsor_close_button).addEvent("click", function () {
					self.Sponsorlist_visibility(!1)
				})
			},
			Sponsorlist_visibility: function (s) {
				if (s) {
					$(this.options.sponsor_iframe_container_id).removeClass(this.options.hidden_class), $(this
						.options.sponsor_iframe_background_id).removeClass(this.options.hidden_class);
					var o = $(this.options.sponsor_iframe_container_id).getSize();
					o = o.y;
					var e = $$("." + this.options.sponsor_close_button)[0].getSize();
					e = e.y, $(this.options.sponsor_iframe_id).set("height", Math.ceil(o - e - 5) + "px")
				} else $(this.options.sponsor_iframe_container_id).addClass(this.options.hidden_class), $(this
					.options.sponsor_iframe_background_id).addClass(this.options.hidden_class), $(this.options
					.sponsor_iframe_id).src = "about:blank"
			},
			CookieListener: function () {
				var s = this;
				!1 === s.CookieListenerStatus && (s.CookieListenerStatus = !0, setInterval(function () {
					s.updateSponsorByStorage()
				}, 1e3))
			},
			updateSponsorByStorage: function () {
				if (this.use_Storage) var s = sessionStorage.getItem(this.options.sponsor_hiddenfield);
				else s = Cookie.read(this.options.sponsor_hiddenfield);
				s && ($$('input[name = "' + this.options.sponsor_hiddenfield + '"]')[0].value = s, ab.setHF(this
					.options.sponsor_hiddenfield, s))
			},
			storageAvailable: function (s) {
				try {
					var o = window[s],
						e = "__storage_test__";
					return o.setItem(e, e), o.removeItem(e), !0
				} catch (s) {
					return !1
				}
			}
		});
	} catch (error) {
		console.log('iframe main.js')
	}

	try {
		/* This opens a layer, when the user tries to submit the page but did not accept the t&c
		 * the layer contains 2 buttons:
		 * 1) confirm button accepts the t&c and submits
		 * 2) skip button submits the form */
		var Optin_layer = function (options) {
			var self = this;
			var _defaults = {
				layer_id: 'optin_layer',
				hide_class: 'hidden',
				confirm_button_id: 'optin_confirm_button',
				skip_button_id: 'optin_skip_button',
				form_id: 'form_reg_half',
				checkbox_1_id: 'agb',
				checkbox_2_id: 'agb2',
				fake_checkbox_id: 'fake_agb_checkbox'
			};
			var _options = {};

			var init = function (options) {
				_options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);

				if (typeof $(_options.layer_id) === null) {
					return;
				}

				add_events();
			};

			var add_events = function () {
				if ($(_options.confirm_button_id) !== null && $(_options.fake_checkbox_id) !== null) {
					$$('#' + _options.confirm_button_id + ', #' + _options.fake_checkbox_id).each(function (trigger) {
						$(trigger).addEvent('click', function () {
							if ($(_options.checkbox_1_id) !== null && $(_options.checkbox_2_id) !==
								null && $(_options.fake_checkbox_id) !== null) {
								$$('#' + _options.checkbox_1_id + ', #' + _options.checkbox_2_id +
									', #' + _options.fake_checkbox_id).each(function (checkbox) {
									$(checkbox).set('checked', true);
								});
								disable_buttons();
								save_log(self.submit_form);
							}
						});
					});
				}

				if ($(_options.skip_button_id) !== null) {
					$(_options.skip_button_id).addEvent('click', function () {
						disable_buttons();
						save_log(self.submit_form);
					});
				}
			};

			var disable_buttons = function () {
				$(_options.confirm_button_id).removeEvents();
				$(_options.skip_button_id).removeEvents();
				$(_options.fake_checkbox_id).removeEvents();
				$(_options.fake_checkbox_id).set('disabled', true);
				return;
			};

			var save_log = function (do_after_saving) {
				var ident = '';

				// none of the t&c checkboxes has been ticked
				if ($(_options.checkbox_1_id).checked === false && $(_options.checkbox_2_id).checked === false) {
					ident = 'agb_dialog_62_agb_0';
				}

				// only the first t&c checkbox has been ticked
				if ($(_options.checkbox_1_id).checked === true && $(_options.checkbox_2_id).checked === false) {
					ident = 'agb_dialog_62_agb_1';
				}

				// both t&c checkboxes have been ticked
				if ($(_options.checkbox_1_id).checked === true && $(_options.checkbox_2_id).checked === true) {
					ident = 'agb_dialog_62_agb_2';
				}

				new Request({
					'url': '/cgi-bin/global.pl?todo=log_misc&ident=' + ident,
					onComplete: function () {
						do_after_saving.attempt();
					}
				}).send();
			};

			self.submit_form = function () {
				if (page_submitted === false) {
					page_submitted = true;
					$(_options.form_id).submit();
				}
				return;
			};

			self.test_checkboxes = function () {
				var is_valid = false;
				if ($(_options.checkbox_1_id) !== null && $(_options.checkbox_2_id) !== null) {
					if ($(_options.checkbox_1_id).get('checked') === true && $(_options.checkbox_2_id).get(
							'checked') === true) {
						is_valid = true;
					}
				}
				return is_valid;
			};

			self.show = function () {
				if (typeof $(_options.layer_id) !== null) {
					$(_options.layer_id).removeClass(_options.hide_class);
				}
				return;
			};

			self.hide = function () {
				if (typeof $(_options.layer_id) !== null) {
					$(_options.layer_id).removeClass(_options.hide_class);
				}
				return;
			};

			init(options);
		};
	} catch (error) {
		console.log('Optin_layer main.js')
	}

	try {
		(function (l, o, a, d, i, n, g, w, e, b) {
			g = 'AccengageWebSDKObject';
			w = 'script';
			l[g] = l[g] || {};
			l[g][n] = d;
			l[d] = l[d] || [];
			l[d].p = {
				'date': 1 * new Date(),
				'window': l,
				'document': o,
				'params': a
			};
			e = o.createElement(w);
			b = o.getElementsByTagName(w)[0];
			e.async = 1;
			e.src = 'https://' + n + i + '/init.js';
			b.parentNode.insertBefore(e, b);
		})(window, document, {}, 'ACC', '/pushweb/assets', 'eu.winnernotification.net');

		var ACC = ACC || [];

		var sws_acc = {
			page_name: "reg_half",
			data_page: "1",
			count: 0,
			try_gws_country_count: 0,
			try_participation_pk_count: 0
		};

		var update_AC_data = function () {
			/* this function will be called only by two case: if the user click on the native push notification or if the user is already optin */

			if (sws_acc.data_page == '1') {
				/* push gws_country to acc by using UpdateDeviceInfo but only by success(core:getDeviceID) => only if user get/has UDID  START*/
				ACC.push([
					"core:getDeviceID", /* Use this command to retrieve the current user device ID */
					null,
					{
						"onSuccess": function (deviceID) {
							/* setGwsCountry */
							setValByUpdateDeviceInfo({
									"gws_country": 'it'
								}, 'acc_gws_contry_success', 'acc_gws_contry_failed', sws_acc
								.try_gws_country_count, 'acc_gws_contry_retry');
						}
					}
				]);
				/* END */
			} else {
				ACC.push([
					"core:getDeviceID",
					null,
					{
						"onSuccess": function (deviceID) {
							/* setGwsCountry */
							setValByUpdateDeviceInfo({
									"gws_country": 'it'
								}, 'acc_gws_contry_success', 'acc_gws_contry_failed', sws_acc
								.try_gws_country_count, 'acc_gws_contry_retry');

							/* setParticipationPk */
							setValByUpdateDeviceInfo({
									"participationPk": 0
								}, 'acc_participationPk_success', 'acc_participationPk_failed', sws_acc
								.try_participation_pk_count, 'acc_participationPk_retry');
						}
					}
				]);
			}
		};

		var setIdentSessionName = function (identName) {
			if (typeof localStorage_is_supported === "function" && localStorage_is_supported()) {
				if (!sessionStorage.getItem(identName)) {
					/* sessionStorage is used to avoid send ident more than one times by reload, twice click, etc ... */
					sessionStorage.setItem(identName, identName);
					if (typeof log.send === "function") {
						log.send({
							'url': '/cgi-bin/global.pl',
							'params': {
								'ident': identName,
								'todo': 'log_misc'
							}
						});
					}
				}
			}
		};

		var setLogMiscForStep = function () {
			window.setTimeout(function () {
				var show_alert_yes_button = document.getElementsByClassName('acc--acceptContent');
				if (show_alert_yes_button.length && show_alert_yes_button[0].offsetWidth > 0) {
					setIdentSessionName('accengage_show');
					show_alert_yes_button[0].addEventListener('click', function () {
						/* click by acc push notification popup, not the native from Browser */
						setIdentSessionName('accengage_first_click');
					});
				} else {
					if (sws_acc.count <= 150) {
						/* to ovoid to call the function setLogMiscForStep() forever if show_alert_yes_button is hidden or not exist, etc ... */
						setLogMiscForStep();
					}
					sws_acc.count++;
				}
			}, 10);
		};

		/* UpdateDeviceInfo and check if this was Successful or not by Using log_misc and SessionStorage  START*/
		var setValByUpdateDeviceInfo = function (keyValToPush, identBySuccess, identByError, tryCounter, identByRetry) {
			ACC.push([
				"core:updateDeviceInfo", /* Use this command whenever you want to update the current user's information */
				keyValToPush /* keyValToPush Example  {"key": 'value'} */ ,
				{
					"onSuccess": function () {
						setIdentSessionName(identBySuccess); /* if the Push was Successful */
					},
					"onError": function (error) {
						setIdentSessionName(identByError);
						if (tryCounter > 0) {
							if (typeof log.send === "function") {
								log.send({
									'url': '/cgi-bin/global.pl',
									'params': {
										'ident': identByRetry,
										'todo': 'log_misc'
									}
								});
							}
						}
						if (tryCounter <= 10) {
							tryCounter++;
							setValByUpdateDeviceInfo();
						}
					}
				}
			]);
		};
		/* END */

		ACC.push([
			"push:addCustomListeners", /* register your custom listeners to an event triggered by the library */
			{
				"plugin:started": function () {
					/* the push plugin is now started */
					setLogMiscForStep();
				},
				"landingFeedback:optin": function () {
					/* this user is now optin */
					update_AC_data();
					setIdentSessionName(
						'accengage_final_optin'); /* by click on the native push notification by Browser */
				}
			}
		]);

		ACC.push([
			"core:isOptin", /* check if the User is optin or not */
			null,
			{
				"onSuccess": function (firstOptinDate) {
					/* this user is optin since : " + firstOptinDate */
					update_AC_data();
				},
				"onError": function (err) {
					/* this user is optout", err */
					var isHardOptout = (err === 'denied');
					if (!isHardOptout) {
						ACC.push(["push:showAlert", /* Use this command when you want to show the HTML alert to the user. */
							{},
							{
								"onError": function (err) {}
							}
						]);
					}
				}
			}
		]);
	} catch (error) {
		console.log('logic steps alert main.js')
	}

	try {
		/* #159598 */
		var dccBts = (function () {
			try {
				document.addEventListener('DOMContentLoaded', function () {

					var linkElements = document.getElementsByTagName('a');
					for (var i = 0; i < linkElements.length; i++) {
						linkElements[i].setAttribute('data-dcc', 0);
					}

					function watchBotClicks(event) {
						if (!event) {
							return false;
						}
						var clicked_Element = event.target;
						var clicked_Element_tag_name = event.target.nodeName.toLowerCase();

						if (clicked_Element.getAttribute('data-dcc') !== null || clicked_Element.parentElement
							.getAttribute('data-dcc') !== null) {
							if (clicked_Element_tag_name === "a" && clicked_Element.children.length > 0 &&
								clicked_Element.getAttribute('data-dcc') !== null) {
								for (var j = 0; j < clicked_Element.children.length; j++) {
									clicked_Element.children[j].setAttribute('data-dcc', parseInt(
										clicked_Element.children[j].getAttribute('data-dcc')) + 1);
								}
							} else if (clicked_Element_tag_name !== "a" && clicked_Element.parentElement
								.tagName.toLowerCase() === "a") {
								clicked_Element.parentElement.setAttribute('data-dcc', parseInt(
									clicked_Element.parentElement.getAttribute('data-dcc')) + 1);
							}

							if (clicked_Element_tag_name === "a") {
								if (parseInt(clicked_Element.getAttribute('data-dcc')) >= 3) {
									handleAttr(clicked_Element);
								}
							} else {
								if (parseInt(clicked_Element.parentElement.getAttribute('data-dcc')) >= 3) {
									handleAttr(clicked_Element.parentElement);
								}
							}
							return false;
						}
					}

					function handleAttr(element) {
						element.removeProperties('target', 'class').setAttribute('href', '#');
						/**
						 * remove event doesn't work somehow
						 */
						// element.removeEventListener('click', watchBotClicks);
						// element.children[0].removeEventListener('click', watchBotClicks);
					};

					var watchedLinkElements = document.querySelectorAll('[data-dcc]');
					for (var l = 0; l < watchedLinkElements.length; l++) {
						watchedLinkElements[l].addEventListener('click', watchBotClicks);
					}
				});
			} catch (error) {}
		})();
	} catch (error) {
		console.log('dccBts main.js')
	}