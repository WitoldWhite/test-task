/*! Copyright © 2018 accengage-web-sdk 3.5.6 by Accengage */
"use strict";

function _toConsumableArray(a) {
	if (Array.isArray(a)) {
		for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
		return c
	}
	return Array.from(a)
}

function _defineProperty(a, b, c) {
	return b in a ? Object.defineProperty(a, b, {
		value: c,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : a[b] = c, a
}
var _slicedToArray = function () {
	function a(a, b) {
		var c = [],
			d = !0,
			e = !1,
			f = void 0;
		try {
			for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0);
		} catch (err) {
			e = !0, f = err
		} finally {
			try {
				!d && h.return && h.return()
			} finally {
				if (e) throw f
			}
		}
		return c
	}
	return function (b, c) {
		if (Array.isArray(b)) return b;
		if (Symbol.iterator in Object(b)) return a(b, c);
		throw new TypeError("Invalid attempt to destructure non-iterable instance")
	}
}();
! function (a) {
	"[object Object]" === Object.prototype.toString.call(a.AccengageWebSDKObject) && "string" == typeof a.AccengageWebSDKObject["eu.winnernotification.net"] && function (a) {
		function b(a, b) {
			return this.proxy = a, this.config = b, this
		}

		function c() {
			try {
				new b(a, o).validate().start(function (a) {
					n.context.mode = n.MODE.TOP, n.context.location = n.LOCATION.TOP, n.browserManager.init(a.window), n.context.snap(a, n.browserManager.getProperties(), n.context.location), n.utils.downwardMessage = I, n.utils.downwardFeedback = K, n.widgetManager.init(n.settings, n.eventManager, n.context.location, n.dom), n.eventManager.bind(s), n.optinType = n.context.isHTTPS && n.settings.dependencies.enableOneStepOptin || !1, n.logicManager.add("core:addCustomListeners", e), n.widgetManager.fire(n.WIDGET.DEBUG, {
						contents: ["`top` configured +" + (1 * new Date - n.context.startDate) + " ms", n.settings, n.browserManager.getProperties()]
					}), n.customEventManager.setProps(n.widgetManager), B.setProps(n.logicManager), C.setProps(n.widgetManager, n.dependencyManager, B), g(function (a) {
						u = !0, n.optinType || n.utils.downwardMessage("_dispatchMiddleWW"), n.context.window.addEventListener("message", function (a) {
							if (a.origin === "https://" + n.settings.alias) {
								var b = !1;
								n.optinType && (b = G(a)), b || H(a)
							}
						}, !1)
					}), d(), n.utils.downwardMessageToWW = J
				})
			} catch (c) {}
		}

		function d() {
			if (!n.optinType) return n.widgetManager.fire(n.WIDGET.DEBUG, {
				type: "debug",
				content: "Using the landing optin method"
			});
			var a = "https://" + window.location.hostname + "/acc_ww.js";
			try {
				t = new Worker(a), t.onmessage = L
			} catch (b) {
				n.widgetManager.fire(n.WIDGET.DEBUG, {
					type: "error",
					content: "Using the landing optin method"
				})
			}
		}

		function e(a, b) {
			var c;
			return b = b || {}, "object" !== n.utils.extendedTypeOf(a) ? n.utils.onError(b, "Provided command options is not an object") : (c = n.customEventManager.add(a, ["sdkLoaded"]), c.length ? n.utils.onSuccess(b, c) : n.utils.onError(b, "No listeners added"))
		}

		function f() {
			return "https://" + n.settings.alias + n.settings.aliasPath + n.ASSETS.MIDDLE
		}

		function g(a) {
			var b = f() + "?" + n.widgetManager.getDebugQueryParams(),
				c = n.dom.createIframe(b, n.MODE.MIDDLE.PROXY),
				d = function () {
					n.widgetManager.fire(n.WIDGET.DEBUG, {
						type: "warning",
						content: "Middle is waiting for the <body> to be created. If you read this log, please note that this could mean that the `DOMContentLoaded` event takes some time to fire"
					}), n.context.document.addEventListener("DOMContentLoaded", function () {
						return e()
					}, !1)
				},
				e = function () {
					if ("object" != typeof n.context.document.body.appendChild(c)) return n.widgetManager.fire(n.WIDGET.DEBUG, {
						type: "error",
						content: "Middle has not been loaded, SDK loading state will then stop here."
					});
					r = c.contentWindow
				};
			return "function" === n.utils.typeOf(a) && (c.onload = a), "htmlbodyelement" !== n.utils.extendedTypeOf(n.context.document.body) ? d() : e()
		}

		function h() {
			var a = n.context.window.navigator.serviceWorker;
			return "serviceworker" === n.utils.extendedTypeOf(a)
		}

		function i() {
			var a = {
				token: null,
				permission: "none"
			};
			return h() ? Promise.resolve() : n.swHandler.install().then(n.swHandler.makeSubscription).then(function (b) {
				a = n.utils.extend(a, b || {}), n.widgetManager.fire(n.WIDGET.DEBUG, {
					type: "success",
					contents: ["Token retrieved", a]
				}), n.widgetManager.fire(n.WIDGET.SUBTRACK, {
					type: "event",
					category: "Notification Token",
					action: "generate"
				}), a.permission = "granted", a.type = "_push:popupFeedback"
			}).then(n.swHandler.listen).then(function () {
				n.swHandler.broadcast({
					type: "_push:refreshState",
					body: a,
					opts: {
						toLocation: n.LOCATION.TOP
					}
				});
				var b = new MessageEvent("_push:popupFeedback", {
					data: a
				});
				n.eventManager.trigger(b)
			}).catch(function (a) {
				return console.log(a)
			})
		}

		function j(a, b) {
			var c = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
				d = ["_sw:plugin_push_prepare"];
			if (a.topic = n.utils.generateUUID(), n.eventManager.add(a.topic, function (c) {
					return n.eventManager.remove(a.topic), !n.utils.empty(c.data.body) && "onSuccess" in b ? b.onSuccess.apply(this, [c.data.body]) : !n.utils.empty(c.data.error) && "onError" in b ? b.onError.apply(this, [c.data.error]) : void 0
				}), c) return t.postMessage(a);
			if (d.includes(a.type) && n.optinType) {
				var e = new MessageEvent(a.type, {
					data: a
				});
				return n.eventManager.trigger(e)
			}
			return r.postMessage(a, f())
		}

		function k() {
			var a = {
					browserName: n.context.browserName || "-",
					browserVersion: n.context.browserVersion || "-",
					devicePlatform: n.context.devicePlatform || "-",
					countryCode: n.context.countryCode,
					language: n.context.language,
					time_zone: n.context.timeZone,
					__currentDomain: n.context.currentDomain,
					__currentVersion: n.SDK_VERSION
				},
				b = n.safari.readBackupProfile();
			return n.utils.empty(b) || n.widgetManager.fire("debug", {
				contents: ["Retrieve profile backup", b]
			}), n.utils.extend(a, b)
		}

		function l() {
			var a = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0],
				b = function () {
					n.utils.downwardMessage("_notifyIncludedResources", n.dependencyManager.getIncludedResources())
				};
			if (a > 20) return n.widgetManager.fire("debug", {
				type: "error",
				content: "notifying middle process has reached its maximum attempt"
			});
			1 === a ? b() : n.widgetManager.fire("debug", {
				content: "notifying middle (attempts=" + a + ")"
			}), q = setTimeout(function () {
				b(), l(++a)
			}, 1e3)
		}

		function m() {
			clearTimeout(q), n.utils.empty(t) || n.utils.downwardMessage("_disableNotifyIncludedResources")
		}
		var n = {};
		n.MODE = {
			TOP: "acc_top",
			MIDDLE: {
				PROXY: "acc_proxy",
				BRIDGE: "acc_bridge",
				LANDING: "acc_landing_push_optinisation"
			}
		}, n.ASSETS = {
			MIDDLE: "/m_main.html",
			LANDING: "/index.html",
			CONFIG: "/config.json",
			WW: "/d_main.js",
			SW: "/"
		}, n.WIDGET = {
			DEBUG: "debug",
			SUBTRACK: "subtrack"
		}, n.SDK_VERSION = "3.5.6", n.LOCATION = {
			TOP: "top",
			MIDDLE: "middle",
			DOWN: "down"
		}, n.PLUGIN_COMPLIANCY = {
			PUSH: [{
				name: "chrome",
				min: "44"
			}, {
				name: "firefox",
				platform: "desktop",
				min: "46"
			}, {
				name: "safari",
				platform: "desktop",
				min: "7"
			}]
		}, n.OWNERS = {
			ACCENGAGE: "owners_acc"
		};
		var o = {
			partnerId: "egentic125828266335fac",
			A4SKey: "bndkdev",
			alias: "eu.winnernotification.net",
			aliasPath: "/pushweb/assets",
			version: "v3.5.x",
			allowDataCollection: "",
			enableOneStepOptin: "",
			websitePushID: "&quot;undefined&quot;",
			default: {
				urlClick: "eu.offer-updates.com",
				icon: ""
			},
			dependencies: {
				"push": {
					"scenario": "none",
					"alertOptions": {
						"reAskingDelay": 0,
						"reAskingDelay2": 1,
						"position": "topLeft",
						"contents": {
							"misc": {
								"en": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Activate your prize notification!</div></div></div>",
								"de": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Jetzt Gewinnbenachrichtigung aktivieren!</div></div></div>",
								"pl": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Włącz powiadomienie o nagrodzie!</div></div></div>",
								"da": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Klik JA for flere tilbud!</div></div></div>",
								"es": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Activa tu notificación de premio!</div></div></div>",
								"it": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Attiva la notifica di vincita!</div></div></div>",
								"fr": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Activez votre notification de prix!</div></div></div>",
								"no": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Aktiver premiemeddelelsen nå!</div></div></div>",
								"nl": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Activeer je prijsnotificatie!</div></div></div>",
								"sv": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Aktivera din vinst notifikation!</div></div></div>",
								"fi": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Aktivoi palkintoilmoituksesi!</div></div></div>",
								"pt": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>Ative sua notificação para prêmios!</div></div></div>",
								"th": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>เปิดข้อความเตือนเมื่อคุณได้รับรางวัล!</div></div></div>",
								"tw": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>您有（１）個優惠通知</div></div></div>",
								"cn": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>您有（１）個優惠通知</div></div></div>",
								"zh": "<div style='position:relative;width:100%;display:flex;padding:5px 0;'><div style='width:15%;position:relative;padding-top:2px;'><img src='https://websdk.accengage.net/images/alert_content_bell.png' width='100%' style='max-width:55px;display:block;margin:0 auto'></div><div style='width:85%;padding:10px 0 0 5%;'><div style='color:#0088C3;font-size:16px;padding:0 0 10px;font-weight:bold;text-align:center;line-height:20px;'>您有（１）個優惠通知</div></div></div>"
							},
							"deny": {
								"en": "No",
								"de": "Nein",
								"pl": "Nie",
								"da": "Nej",
								"es": "No",
								"it": "No",
								"fr": "Non",
								"no": "Nei",
								"nl": "Nee",
								"sv": "Nej",
								"fi": "Ei",
								"pt": "Não",
								"th": "ไม่",
								"tw": "没有",
								"cn": "没有",
								"zh": "没有"
							},
							"accept": {
								"en": "Yes",
								"de": "Ja",
								"pl": "Tak",
								"da": "Ja",
								"es": "Sí",
								"it": "Si",
								"fr": "Oui",
								"no": "Ja",
								"nl": "Ja",
								"sv": "Ja",
								"fi": "Kyllä",
								"pt": "Sim",
								"th": "ตกลง",
								"tw": "去看看",
								"cn": "去看看",
								"zh": "去看看"
							}
						}
					},
					"landingOptinOptions": {
						"width": 575,
						"height": 325,
						"withAppIcon": true,
						"theme": "white",
						"contents": {
							"ask": {
								"en": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Click on &#x22;Accept&#x22;!  97% took the chance to participate.</span></div></div></div>",
								"de": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Jetzt &#x201E;Zulassen&#x201C; klicken! 94% nutzen diese Chance.</span></div></div></div>",
								"pl": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Kliknij &#x22;Zaakceptuj&#x22;! 97% os&#xF3;b skorzysta&#x142;o z tej szansy.</span></div></div></div>",
								"da": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Klik &#x22;Accept&#x22;! 97% tog chancen for at deltage.</span></div></div></div>",
								"es": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>&#xA1;Haz clic en &#x22;Aceptar&#x22;! 97% se ha dado la oportunidad de participar.</span></div></div></div>",
								"it": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Clicca su &#x22;Accetta&#x22;! Il 94% ha colto l&#x27;occasione per partecipare.</span></div></div></div>",
								"fr": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Cliquez sur &#x22;Accepter&#x22;&#xA0; ! 97% ont tent&#xE9; leur chance de participer.</span></div></div></div>",
								"no": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Bekreft nå og sikre din sjanse til å vinne!</span></div></div></div>",
								"nl": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Klik op “Accepteren”! 97% nam deze kans om mee te doen!</span></div></div></div>",
								"sv": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Klicka p&#xE5; &#x22;Godk&#xE4;nn&#x22;! 97% tog chansen att delta.</span></div></div></div>",
								"fi": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Klikkaa &#x22;Hyv&#xE4;ksy&#x22;! 94% otti mahdollisuuden osallistua.</span></div></div></div>",
								"pt": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>Clique em &#x22;aceitar&#x22;! 94% aproveitaram a chance de participar!</span></div></div></div>",
								"th": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>คลิก “ตกลง” ! 97% เข้าร่วมเพื่อโอกาสในการลุ้นรางวัล</span></div></div></div>",
								"tw": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>立即到信箱點擊鏈接,確認您的參與</span></div></div></div>",
								"cn": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>立即到信箱點擊鏈接,確認您的參與</span></div></div></div>",
								"zh": "<div style='position:relative;width:100%;display:flex;padding: 0 0 20px'><div style='position:relative;min-width:48px'><img src='https://websdk.accengage.net/images/alert_graphite_bell.png' width='48' style='position:absolute;top:50%;transform:translateY(-50%);'></div><div><div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#C71414;font-size:16px;line-height:20px;'>立即到信箱點擊鏈接,確認您的參與</span></div></div></div>"
							},
							"granted": {
								"en": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Secure your chance to win now!</span></div>",
								"de": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Jetzt weitermachen und Gewinnchance sichern!</span></div>",
								"pl": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Teraz zabezpiecz swoją szansę na wygraną!</span></div>",
								"da": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Sikre din chance for at vinde nu!</span></div>",
								"es": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>¡Garantiza tu oportunidad de ganar ahora!</span></div>",
								"it": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Continua ora e assicurati la tua possibilità di vincere!</span></div>",
								"fr": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Sécurisez votre chance de gagner!</span></div>",
								"no": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Tusen takk! Vi har sendt en e-post til deg.</span></div>",
								"nl": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Pak nu je kans om te winnen!</span></div>",
								"sv": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Säkra din chans att vinna nu!</span></div>",
								"fi": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Varmista voittosi nyt!</span></div>",
								"pt": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>Garanta agora sua chance de ganhar!</span></div>",
								"th": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>เพิ่มโอกาสตอนนี้เลย!</span></div>",
								"tw": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>我們寄email 給您了</span></div>",
								"cn": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>我們寄email 給您了</span></div>",
								"zh": "<div style='padding:5px 10px 0;text-align:center;'><span style='font-weight:bold;color:#0088C3;font-size:16px;line-height:20px;'>我們寄email 給您了</span></div>"
							}
						}
					}
				},
				"vapid": {
					"publicKey": "BFCLq9K5FD01YtZnaWFMnYM-UrGjdrT0PbE89u8K80lzzjU0lMNkn06NkBjFR7AHeR8mOMyE0Uj1TAiz56OLd28"
				}
			},
			widgets: {}
		};
		n.settings = o;
		var p, q, r, s = {},
			t = void 0,
			u = !1,
			v = !1;
		"function" != typeof Object.assign && (Object.assign = function (a) {
			if (null == a) throw new TypeError("Cannot convert undefined or null to object");
			a = Object(a);
			for (var b = 1; b < arguments.length; b++) {
				var c = arguments[b];
				if (null != c)
					for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
			}
			return a
		});
		var w = function () {
			var a = this;
			return this.onSuccess = function (a, b) {
				var c;
				if ("object" === this.typeOf(a) && "onSuccess" in a) return c = a.onSuccess, delete a.onSuccess, c(b)
			}, this.onError = function (a, b) {
				var c;
				if ("object" === this.typeOf(a) && "onError" in a) return c = a.onError, delete a.onError, c(b)
			}, this.errorToString = function (a) {
				return "object" === this.typeOf(a) && "message" in a ? a.message : "error" === this.typeOf(a) && "message" in a ? a.message : "string" == typeof a ? a : "misc error"
			}, this.payloadToString = function (a) {
				return -1 === ["object", "array"].indexOf(this.typeOf(a)) ? a : JSON.stringify(a)
			}, this.extend = function (a, b) {
				var c, d = {};
				for (c in a) Object.prototype.hasOwnProperty.call(a, c) && (d[c] = a[c]);
				for (c in b) Object.prototype.hasOwnProperty.call(b, c) && (d[c] = b[c]);
				return d
			}, this.extendedTypeOf = function (a) {
				var b = Object.prototype.toString.call(a);
				return b.slice(8, b.length - 1).toLowerCase()
			}, this.typeOf = this.extendedTypeOf, this.xhr = function () {
				var a = new XMLHttpRequest;
				return function (b, c, d) {
					a.onreadystatechange = function () {
						4 === a.readyState && d(a.responseText)
					}, a.open(b, c), a.send()
				}
			}(), this.getMessageBody = function (a) {
				var b;
				try {
					b = JSON.parse(a.data.body)
				} catch (c) {
					return a.data.body
				}
				return b
			}, this.createPayloadMessage = function (a, b) {
				var c = {};
				if (a) return c.type = a, c.body = this.payloadToString(b), c
			}, this.createPayloadFeedback = function (a, b, c) {
				var d = {};
				if (a) {
					if (d.type = a, c) d.error = this.errorToString(c);
					else {
						if (!b) return;
						d.body = this.payloadToString(b)
					}
					return d
				}
			}, this.getMessageTopic = function (a) {
				return "string" == typeof a.data.topic ? a.data.topic : void 0
			}, this.empty = function (a) {
				var b, c, d, e, f = [b, null, !1, 0, "", "0"];
				for (d = 0, e = f.length; d < e; d++)
					if (a === f[d]) return !0;
				if ("object" == typeof a) {
					for (c in a) return !1;
					return !0
				}
				return !1
			}, this.emptyRecursive = function (a, b) {
				if (this.empty(a)) return !0;
				if (this.empty(b)) return this.empty(a);
				"/" === b.charAt(0) && (b = b.substr(1)), "/" === b.charAt(b.length - 1) && (b = b.slice(0, -1));
				var c, d, e = b.split("/"),
					f = a;
				for (c = 0; c < e.length; c++) {
					if (d = e[c], this.empty(f[d])) return !0;
					f = f[d]
				}
				return !1
			}, this.grep = function (a, b) {
				var c, d, e = [];
				if ("object" === this.typeOf(a))
					for (c in a) a[c] === b && e.push(c);
				else if ("array" === this.typeOf(a))
					for (d = 0; d < a.length; d++) a[d] === b && e.push(c);
				return e
			}, this.isTypeOf = function (a, b) {
				return b = "string" == typeof b ? [b] : b, -1 !== b.indexOf(this.typeOf(a))
			}, this.firstProp = function (a) {
				for (var b in a)
					if (a.hasOwnProperty(b) && "function" != typeof b) return b;
				return null
			}, this.getISOTimestampDate = function (a) {
				return a = void 0 !== a ? parseInt(a, 10) : 0, new Date(Date.now() + a).toISOString()
			}, this.isValidDate = function (a) {
				return "date" === this.typeOf(a) && !isNaN(a.getTime())
			}, this.merge = function (a, b) {
				return void 0 === a || null === a ? a = [] : "[object Array]" !== Object.prototype.toString.call(a) && (a = [a]), void 0 === b || null === b ? b = [] : "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]), a.concat(b)
			}, this.generateUUID = function () {
				var a = (new Date).getTime();
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (b) {
					var c = (a + 16 * Math.random()) % 16 | 0;
					return a = Math.floor(a / 16), ("x" == b ? c : 3 & c | 8).toString(16)
				})
			}, this.toJSON = function (a) {
				return "toJSON" in a ? Promise.resolve(a.toJSON()) : Promise.resolve(a)
			}, this.parseJSON = function (a) {
				try {
					return JSON.parse(a)
				} catch (b) {
					return a
				}
			}, this.isInteger = function (a) {
				return "number" === this.typeOf(a) && a % 1 == 0
			}, this.isValidString = function (a) {
				return "string" === this.typeOf(a) && "" !== a.trim()
			}, this.hashCode = function (a) {
				var b, c, d, e = 0;
				if (0 === a.length) return e;
				for (b = 0, d = a.length; b < d; b++) c = a.charCodeAt(b), e = (e << 5) - e + c, e |= 0;
				return e
			}, this.promisify = function (a) {
				var b = this;
				return new Promise(function (c, d) {
					try {
						c(a.apply(b))
					} catch (e) {
						d(e)
					}
				})
			}, this.each = function (b, c) {
				var d = function (a, b) {
						for (var c = 0; c < a.length; c++) b(c, a[c])
					},
					e = function (a, b) {
						for (var c in a) a.hasOwnProperty(c) && b(c, a[c])
					};
				return "object" === a.typeOf(b) ? e(b, c) : d(b, c)
			}, this.voidness = function () {}, this
		}.bind({})();
		n.utils = Object.create(w), /** @license MIT License - https://bitbucket.org/pellepim/jstimezonedetect/src/default/LICENCE.txt Copyright (c) Jon Nylander */
			function (a) {
				var b = function () {
					var a = "s",
						c = {
							DAY: 864e5,
							HOUR: 36e5,
							MINUTE: 6e4,
							SECOND: 1e3,
							BASELINE_YEAR: 2014,
							MAX_SCORE: 864e6,
							AMBIGUITIES: {
								"America/Denver": ["America/Mazatlan"],
								"Europe/London": ["Africa/Casablanca"],
								"America/Chicago": ["America/Mexico_City"],
								"America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
								"America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
								"Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Europe/Helsinki", "Asia/Damascus", "Africa/Cairo", "Asia/Gaza", "Europe/Minsk"],
								"Pacific/Auckland": ["Pacific/Fiji"],
								"America/Los_Angeles": ["America/Santa_Isabel"],
								"America/New_York": ["America/Havana"],
								"America/Halifax": ["America/Goose_Bay"],
								"America/Godthab": ["America/Miquelon"],
								"Asia/Dubai": ["Asia/Yerevan"],
								"Asia/Jakarta": ["Asia/Krasnoyarsk"],
								"Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
								"Australia/Sydney": ["Australia/Lord_Howe"],
								"Asia/Tokyo": ["Asia/Yakutsk"],
								"Asia/Dhaka": ["Asia/Omsk"],
								"Asia/Baku": ["Asia/Yerevan"],
								"Australia/Brisbane": ["Asia/Vladivostok"],
								"Pacific/Noumea": ["Asia/Vladivostok"],
								"Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
								"Pacific/Tongatapu": ["Pacific/Apia"],
								"Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
								"Asia/Karachi": ["Asia/Yekaterinburg"],
								"Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
							}
						},
						d = function (a) {
							var b = -a.getTimezoneOffset();
							return null !== b ? b : 0
						},
						e = function () {
							var b = d(new Date(c.BASELINE_YEAR, 0, 2)),
								e = d(new Date(c.BASELINE_YEAR, 5, 2)),
								f = b - e;
							return f < 0 ? b + ",1" : f > 0 ? e + ",1," + a : b + ",0"
						},
						f = function () {
							var a, b;
							if ("undefined" != typeof Intl && void 0 !== Intl.DateTimeFormat && void 0 !== (a = Intl.DateTimeFormat()) && void 0 !== a.resolvedOptions) return b = a.resolvedOptions().timeZone, b && (b.indexOf("/") > -1 || "UTC" === b) ? b : void 0
						},
						g = function (a) {
							for (var b = new Date(a, 0, 1, 0, 0, 1, 0).getTime(), c = new Date(a, 12, 31, 23, 59, 59).getTime(), d = b, e = new Date(d).getTimezoneOffset(), f = null, g = null; d < c - 864e5;) {
								var i = new Date(d),
									j = i.getTimezoneOffset();
								j !== e && (j < e && (f = i), j > e && (g = i), e = j), d += 864e5
							}
							return !(!f || !g) && {
								s: h(f).getTime(),
								e: h(g).getTime()
							}
						},
						h = function (a, b, d) {
							for (var e = !0; e;) {
								var f = a,
									g = b,
									h = d;
								e = !1, void 0 === g && (g = c.DAY, h = c.HOUR);
								for (var i = new Date(f.getTime() - g).getTime(), j = f.getTime() + g, k = new Date(i).getTimezoneOffset(), l = i, m = null; l < j - h;) {
									var n = new Date(l),
										o = n.getTimezoneOffset();
									if (o !== k) {
										m = n;
										break
									}
									l += h
								}
								if (g !== c.DAY) {
									if (g !== c.HOUR) return m;
									a = m, b = c.MINUTE, d = c.SECOND, e = !0, i = j = k = l = m = n = o = void 0
								} else a = m, b = c.HOUR, d = c.MINUTE, e = !0, i = j = k = l = m = n = o = void 0
							}
						},
						i = function (a, b, c, d) {
							if ("N/A" !== c) return c;
							if ("Asia/Beirut" === b) {
								if ("Africa/Cairo" === d.name && 13983768e5 === a[6].s && 14116788e5 === a[6].e) return 0;
								if ("Asia/Jerusalem" === d.name && 13959648e5 === a[6].s && 14118588e5 === a[6].e) return 0
							} else if ("America/Santiago" === b) {
								if ("America/Asuncion" === d.name && 14124816e5 === a[6].s && 1397358e6 === a[6].e) return 0;
								if ("America/Campo_Grande" === d.name && 14136912e5 === a[6].s && 13925196e5 === a[6].e) return 0
							} else if ("America/Montevideo" === b) {
								if ("America/Sao_Paulo" === d.name && 14136876e5 === a[6].s && 1392516e6 === a[6].e) return 0
							} else if ("Pacific/Auckland" === b && "Pacific/Fiji" === d.name && 14142456e5 === a[6].s && 13961016e5 === a[6].e) return 0;
							return c
						},
						j = function (a, d) {
							for (var e = function (b) {
									for (var e = 0, f = 0; f < a.length; f++)
										if (b.rules[f] && a[f]) {
											if (!(a[f].s >= b.rules[f].s && a[f].e <= b.rules[f].e)) {
												e = "N/A";
												break
											}
											if (e = 0, e += Math.abs(a[f].s - b.rules[f].s), e += Math.abs(b.rules[f].e - a[f].e), e > c.MAX_SCORE) {
												e = "N/A";
												break
											}
										} return e = i(a, d, e, b)
								}, f = {}, g = b.olson.dst_rules.zones, h = g.length, j = c.AMBIGUITIES[d], k = 0; k < h; k++) {
								var l = g[k],
									m = e(g[k]);
								"N/A" !== m && (f[l.name] = m)
							}
							for (var n in f)
								if (f.hasOwnProperty(n))
									for (var o = 0; o < j.length; o++)
										if (j[o] === n) return n;
							return d
						},
						k = function (a) {
							var c = function () {
									for (var a = [], c = 0; c < b.olson.dst_rules.years.length; c++) {
										var d = g(b.olson.dst_rules.years[c]);
										a.push(d)
									}
									return a
								},
								d = function (a) {
									for (var b = 0; b < a.length; b++)
										if (!1 !== a[b]) return !0;
									return !1
								},
								e = c();
							return d(e) ? j(e, a) : a
						};
					return {
						determine: function () {
							var a = f();
							return a || (a = b.olson.timezones[e()], void 0 !== c.AMBIGUITIES[a] && (a = k(a))), {
								name: function () {
									return a
								}
							}
						}
					}
				}();
				b.olson = b.olson || {}, b.olson.timezones = {
					"-720,0": "Etc/GMT+12",
					"-660,0": "Pacific/Pago_Pago",
					"-660,1,s": "Pacific/Apia",
					"-600,1": "America/Adak",
					"-600,0": "Pacific/Honolulu",
					"-570,0": "Pacific/Marquesas",
					"-540,0": "Pacific/Gambier",
					"-540,1": "America/Anchorage",
					"-480,1": "America/Los_Angeles",
					"-480,0": "Pacific/Pitcairn",
					"-420,0": "America/Phoenix",
					"-420,1": "America/Denver",
					"-360,0": "America/Guatemala",
					"-360,1": "America/Chicago",
					"-360,1,s": "Pacific/Easter",
					"-300,0": "America/Bogota",
					"-300,1": "America/New_York",
					"-270,0": "America/Caracas",
					"-240,1": "America/Halifax",
					"-240,0": "America/Santo_Domingo",
					"-240,1,s": "America/Asuncion",
					"-210,1": "America/St_Johns",
					"-180,1": "America/Godthab",
					"-180,0": "America/Argentina/Buenos_Aires",
					"-180,1,s": "America/Montevideo",
					"-120,0": "America/Noronha",
					"-120,1": "America/Noronha",
					"-60,1": "Atlantic/Azores",
					"-60,0": "Atlantic/Cape_Verde",
					"0,0": "UTC",
					"0,1": "Europe/London",
					"60,1": "Europe/Berlin",
					"60,0": "Africa/Lagos",
					"60,1,s": "Africa/Windhoek",
					"120,1": "Asia/Beirut",
					"120,0": "Africa/Johannesburg",
					"180,0": "Asia/Baghdad",
					"180,1": "Europe/Moscow",
					"210,1": "Asia/Tehran",
					"240,0": "Asia/Dubai",
					"240,1": "Asia/Baku",
					"270,0": "Asia/Kabul",
					"300,1": "Asia/Yekaterinburg",
					"300,0": "Asia/Karachi",
					"330,0": "Asia/Kolkata",
					"345,0": "Asia/Kathmandu",
					"360,0": "Asia/Dhaka",
					"360,1": "Asia/Omsk",
					"390,0": "Asia/Rangoon",
					"420,1": "Asia/Krasnoyarsk",
					"420,0": "Asia/Jakarta",
					"480,0": "Asia/Shanghai",
					"480,1": "Asia/Irkutsk",
					"525,0": "Australia/Eucla",
					"525,1,s": "Australia/Eucla",
					"540,1": "Asia/Yakutsk",
					"540,0": "Asia/Tokyo",
					"570,0": "Australia/Darwin",
					"570,1,s": "Australia/Adelaide",
					"600,0": "Australia/Brisbane",
					"600,1": "Asia/Vladivostok",
					"600,1,s": "Australia/Sydney",
					"630,1,s": "Australia/Lord_Howe",
					"660,1": "Asia/Kamchatka",
					"660,0": "Pacific/Noumea",
					"690,0": "Pacific/Norfolk",
					"720,1,s": "Pacific/Auckland",
					"720,0": "Pacific/Majuro",
					"765,1,s": "Pacific/Chatham",
					"780,0": "Pacific/Tongatapu",
					"780,1,s": "Pacific/Apia",
					"840,0": "Pacific/Kiritimati"
				}, b.olson.dst_rules = {
					years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
					zones: [{
						name: "Africa/Cairo",
						rules: [{
							e: 12199572e5,
							s: 12090744e5
						}, {
							e: 1250802e6,
							s: 1240524e6
						}, {
							e: 12858804e5,
							s: 12840696e5
						}, !1, !1, !1, {
							e: 14116788e5,
							s: 1406844e6
						}]
					}, {
						name: "Africa/Casablanca",
						rules: [{
							e: 12202236e5,
							s: 12122784e5
						}, {
							e: 12508092e5,
							s: 12438144e5
						}, {
							e: 1281222e6,
							s: 12727584e5
						}, {
							e: 13120668e5,
							s: 13017888e5
						}, {
							e: 13489704e5,
							s: 1345428e6
						}, {
							e: 13828392e5,
							s: 13761e8
						}, {
							e: 14142888e5,
							s: 14069448e5
						}]
					}, {
						name: "America/Asuncion",
						rules: [{
							e: 12050316e5,
							s: 12243888e5
						}, {
							e: 12364812e5,
							s: 12558384e5
						}, {
							e: 12709548e5,
							s: 12860784e5
						}, {
							e: 13024044e5,
							s: 1317528e6
						}, {
							e: 1333854e6,
							s: 13495824e5
						}, {
							e: 1364094e6,
							s: 1381032e6
						}, {
							e: 13955436e5,
							s: 14124816e5
						}]
					}, {
						name: "America/Campo_Grande",
						rules: [{
							e: 12032172e5,
							s: 12243888e5
						}, {
							e: 12346668e5,
							s: 12558384e5
						}, {
							e: 12667212e5,
							s: 1287288e6
						}, {
							e: 12981708e5,
							s: 13187376e5
						}, {
							e: 13302252e5,
							s: 1350792e6
						}, {
							e: 136107e7,
							s: 13822416e5
						}, {
							e: 13925196e5,
							s: 14136912e5
						}]
					}, {
						name: "America/Goose_Bay",
						rules: [{
							e: 122559486e4,
							s: 120503526e4
						}, {
							e: 125704446e4,
							s: 123648486e4
						}, {
							e: 128909886e4,
							s: 126853926e4
						}, {
							e: 13205556e5,
							s: 129998886e4
						}, {
							e: 13520052e5,
							s: 13314456e5
						}, {
							e: 13834548e5,
							s: 13628952e5
						}, {
							e: 14149044e5,
							s: 13943448e5
						}]
					}, {
						name: "America/Havana",
						rules: [{
							e: 12249972e5,
							s: 12056436e5
						}, {
							e: 12564468e5,
							s: 12364884e5
						}, {
							e: 12885012e5,
							s: 12685428e5
						}, {
							e: 13211604e5,
							s: 13005972e5
						}, {
							e: 13520052e5,
							s: 13332564e5
						}, {
							e: 13834548e5,
							s: 13628916e5
						}, {
							e: 14149044e5,
							s: 13943412e5
						}]
					}, {
						name: "America/Mazatlan",
						rules: [{
							e: 1225008e6,
							s: 12074724e5
						}, {
							e: 12564576e5,
							s: 1238922e6
						}, {
							e: 1288512e6,
							s: 12703716e5
						}, {
							e: 13199616e5,
							s: 13018212e5
						}, {
							e: 13514112e5,
							s: 13332708e5
						}, {
							e: 13828608e5,
							s: 13653252e5
						}, {
							e: 14143104e5,
							s: 13967748e5
						}]
					}, {
						name: "America/Mexico_City",
						rules: [{
							e: 12250044e5,
							s: 12074688e5
						}, {
							e: 1256454e6,
							s: 12389184e5
						}, {
							e: 12885084e5,
							s: 1270368e6
						}, {
							e: 1319958e6,
							s: 13018176e5
						}, {
							e: 13514076e5,
							s: 13332672e5
						}, {
							e: 13828572e5,
							s: 13653216e5
						}, {
							e: 14143068e5,
							s: 13967712e5
						}]
					}, {
						name: "America/Miquelon",
						rules: [{
							e: 12255984e5,
							s: 12050388e5
						}, {
							e: 1257048e6,
							s: 12364884e5
						}, {
							e: 12891024e5,
							s: 12685428e5
						}, {
							e: 1320552e6,
							s: 12999924e5
						}, {
							e: 13520016e5,
							s: 1331442e6
						}, {
							e: 13834512e5,
							s: 13628916e5
						}, {
							e: 14149008e5,
							s: 13943412e5
						}]
					}, {
						name: "America/Santa_Isabel",
						rules: [{
							e: 12250116e5,
							s: 1207476e6
						}, {
							e: 12564612e5,
							s: 12389256e5
						}, {
							e: 12885156e5,
							s: 12703752e5
						}, {
							e: 13199652e5,
							s: 13018248e5
						}, {
							e: 13514148e5,
							s: 13332744e5
						}, {
							e: 13828644e5,
							s: 13653288e5
						}, {
							e: 1414314e6,
							s: 13967784e5
						}]
					}, {
						name: "America/Santiago",
						rules: [{
							e: 1206846e6,
							s: 1223784e6
						}, {
							e: 1237086e6,
							s: 12552336e5
						}, {
							e: 127035e7,
							s: 12866832e5
						}, {
							e: 13048236e5,
							s: 13138992e5
						}, {
							e: 13356684e5,
							s: 13465584e5
						}, {
							e: 1367118e6,
							s: 13786128e5
						}, {
							e: 13985676e5,
							s: 14100624e5
						}]
					}, {
						name: "America/Sao_Paulo",
						rules: [{
							e: 12032136e5,
							s: 12243852e5
						}, {
							e: 12346632e5,
							s: 12558348e5
						}, {
							e: 12667176e5,
							s: 12872844e5
						}, {
							e: 12981672e5,
							s: 1318734e6
						}, {
							e: 13302216e5,
							s: 13507884e5
						}, {
							e: 13610664e5,
							s: 1382238e6
						}, {
							e: 1392516e6,
							s: 14136876e5
						}]
					}, {
						name: "Asia/Amman",
						rules: [{
							e: 1225404e6,
							s: 12066552e5
						}, {
							e: 12568536e5,
							s: 12381048e5
						}, {
							e: 12883032e5,
							s: 12695544e5
						}, {
							e: 13197528e5,
							s: 13016088e5
						}, !1, !1, {
							e: 14147064e5,
							s: 13959576e5
						}]
					}, {
						name: "Asia/Damascus",
						rules: [{
							e: 12254868e5,
							s: 120726e7
						}, {
							e: 125685e7,
							s: 12381048e5
						}, {
							e: 12882996e5,
							s: 12701592e5
						}, {
							e: 13197492e5,
							s: 13016088e5
						}, {
							e: 13511988e5,
							s: 13330584e5
						}, {
							e: 13826484e5,
							s: 1364508e6
						}, {
							e: 14147028e5,
							s: 13959576e5
						}]
					}, {
						name: "Asia/Dubai",
						rules: [!1, !1, !1, !1, !1, !1, !1]
					}, {
						name: "Asia/Gaza",
						rules: [{
							e: 12199572e5,
							s: 12066552e5
						}, {
							e: 12520152e5,
							s: 12381048e5
						}, {
							e: 1281474e6,
							s: 126964086e4
						}, {
							e: 1312146e6,
							s: 130160886e4
						}, {
							e: 13481784e5,
							s: 13330584e5
						}, {
							e: 13802292e5,
							s: 1364508e6
						}, {
							e: 1414098e6,
							s: 13959576e5
						}]
					}, {
						name: "Asia/Irkutsk",
						rules: [{
							e: 12249576e5,
							s: 12068136e5
						}, {
							e: 12564072e5,
							s: 12382632e5
						}, {
							e: 12884616e5,
							s: 12697128e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Jerusalem",
						rules: [{
							e: 12231612e5,
							s: 12066624e5
						}, {
							e: 1254006e6,
							s: 1238112e6
						}, {
							e: 1284246e6,
							s: 12695616e5
						}, {
							e: 131751e7,
							s: 1301616e6
						}, {
							e: 13483548e5,
							s: 13330656e5
						}, {
							e: 13828284e5,
							s: 13645152e5
						}, {
							e: 1414278e6,
							s: 13959648e5
						}]
					}, {
						name: "Asia/Kamchatka",
						rules: [{
							e: 12249432e5,
							s: 12067992e5
						}, {
							e: 12563928e5,
							s: 12382488e5
						}, {
							e: 12884508e5,
							s: 12696984e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Krasnoyarsk",
						rules: [{
							e: 12249612e5,
							s: 12068172e5
						}, {
							e: 12564108e5,
							s: 12382668e5
						}, {
							e: 12884652e5,
							s: 12697164e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Omsk",
						rules: [{
							e: 12249648e5,
							s: 12068208e5
						}, {
							e: 12564144e5,
							s: 12382704e5
						}, {
							e: 12884688e5,
							s: 126972e7
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Vladivostok",
						rules: [{
							e: 12249504e5,
							s: 12068064e5
						}, {
							e: 12564e8,
							s: 1238256e6
						}, {
							e: 12884544e5,
							s: 12697056e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Yakutsk",
						rules: [{
							e: 1224954e6,
							s: 120681e7
						}, {
							e: 12564036e5,
							s: 12382596e5
						}, {
							e: 1288458e6,
							s: 12697092e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Yekaterinburg",
						rules: [{
							e: 12249684e5,
							s: 12068244e5
						}, {
							e: 1256418e6,
							s: 1238274e6
						}, {
							e: 12884724e5,
							s: 12697236e5
						}, !1, !1, !1, !1]
					}, {
						name: "Asia/Yerevan",
						rules: [{
							e: 1224972e6,
							s: 1206828e6
						}, {
							e: 12564216e5,
							s: 12382776e5
						}, {
							e: 1288476e6,
							s: 12697272e5
						}, {
							e: 13199256e5,
							s: 13011768e5
						}, !1, !1, !1]
					}, {
						name: "Australia/Lord_Howe",
						rules: [{
							e: 12074076e5,
							s: 12231342e5
						}, {
							e: 12388572e5,
							s: 12545838e5
						}, {
							e: 12703068e5,
							s: 12860334e5
						}, {
							e: 13017564e5,
							s: 1317483e6
						}, {
							e: 1333206e6,
							s: 13495374e5
						}, {
							e: 13652604e5,
							s: 1380987e6
						}, {
							e: 139671e7,
							s: 14124366e5
						}]
					}, {
						name: "Australia/Perth",
						rules: [{
							e: 12068136e5,
							s: 12249576e5
						}, !1, !1, !1, !1, !1, !1]
					}, {
						name: "Europe/Helsinki",
						rules: [{
							e: 12249828e5,
							s: 12068388e5
						}, {
							e: 12564324e5,
							s: 12382884e5
						}, {
							e: 12884868e5,
							s: 1269738e6
						}, {
							e: 13199364e5,
							s: 13011876e5
						}, {
							e: 1351386e6,
							s: 13326372e5
						}, {
							e: 13828356e5,
							s: 13646916e5
						}, {
							e: 14142852e5,
							s: 13961412e5
						}]
					}, {
						name: "Europe/Minsk",
						rules: [{
							e: 12249792e5,
							s: 12068352e5
						}, {
							e: 12564288e5,
							s: 12382848e5
						}, {
							e: 12884832e5,
							s: 12697344e5
						}, !1, !1, !1, !1]
					}, {
						name: "Europe/Moscow",
						rules: [{
							e: 12249756e5,
							s: 12068316e5
						}, {
							e: 12564252e5,
							s: 12382812e5
						}, {
							e: 12884796e5,
							s: 12697308e5
						}, !1, !1, !1, !1]
					}, {
						name: "Pacific/Apia",
						rules: [!1, !1, !1, {
							e: 13017528e5,
							s: 13168728e5
						}, {
							e: 13332024e5,
							s: 13489272e5
						}, {
							e: 13652568e5,
							s: 13803768e5
						}, {
							e: 13967064e5,
							s: 14118264e5
						}]
					}, {
						name: "Pacific/Fiji",
						rules: [!1, !1, {
							e: 12696984e5,
							s: 12878424e5
						}, {
							e: 13271544e5,
							s: 1319292e6
						}, {
							e: 1358604e6,
							s: 13507416e5
						}, {
							e: 139005e7,
							s: 1382796e6
						}, {
							e: 14215032e5,
							s: 14148504e5
						}]
					}, {
						name: "Europe/London",
						rules: [{
							e: 12249828e5,
							s: 12068388e5
						}, {
							e: 12564324e5,
							s: 12382884e5
						}, {
							e: 12884868e5,
							s: 1269738e6
						}, {
							e: 13199364e5,
							s: 13011876e5
						}, {
							e: 1351386e6,
							s: 13326372e5
						}, {
							e: 13828356e5,
							s: 13646916e5
						}, {
							e: 14142852e5,
							s: 13961412e5
						}]
					}]
				}, a.jstz = b
			}(n);
		var x = function (a, b) {
			var c = function (b) {
					var c = function (a) {
						return a.split("-")[0].toLowerCase()
					};
					try {
						if (!("navigator" in b)) throw "no navigator in window";
						var d = b.navigator.languages;
						if ("array" === a.typeOf(d) && "string" === a.typeOf(d[0]) && !a.empty(d[0])) return c(d[0]);
						if (d = b.navigator.language, "string" === a.typeOf(d) && !a.empty(d)) return c(d);
						if (d = b.navigator.userLanguage, "string" === a.typeOf(d) && !a.empty(d)) return c(d);
						throw "no language retrieved"
					} catch (e) {
						return ""
					}
				},
				d = function (b) {
					var c = function (a) {
						var b = a.split("-");
						if (b.length < 1) throw "no country code provided";
						return b[1].toUpperCase()
					};
					try {
						if (!("navigator" in b)) throw "no navigator in window";
						var d = b.navigator.languages;
						if ("array" === a.typeOf(d) && "string" === a.typeOf(d[0]) && !a.empty(d[0])) return c(d[0]);
						if (d = b.navigator.language, "string" === a.typeOf(d) && !a.empty(d)) return c(d);
						if (d = b.navigator.userLanguage, "string" === a.typeOf(d) && !a.empty(d)) return c(d);
						throw "no country code retrieved"
					} catch (e) {
						return ""
					}
				};
			return this.localizeContent = function (b, c) {
				var d = this.language,
					e = void 0,
					f = void 0;
				try {
					if ("object" !== a.typeOf(c)) throw "contents is not an object";
					if ("string" === a.typeOf(c[b])) e = c[b];
					else {
						if ("object" !== a.typeOf(c[b])) throw "no value provided";
						if (f = a.firstProp(c[b]), "string" === a.typeOf(c[b][d])) e = c[b][d];
						else {
							if (!f || "string" !== a.typeOf(c[b][f])) throw "no string value provided";
							e = c[b][f]
						}
					}
				} catch (g) {
					e = ""
				}
				return e
			}, this.snap = function (a, e, f) {
				f = f ? f + ":" : "", this.threadId = f + Math.random().toString(36).substring(7), this.startDate = a.date, this.window = a.window, this.document = a.document, this.browserName = e.name, this.browserVersion = e.version, this.devicePlatform = e.platform, this.isHTTPS = "https:" === this.window.location.protocol, this.currentDomain = this.window.location.hostname, this.language = c(this.window), this.countryCode = d(this.window);
				var g = b.determine();
				this.timeZone = g.name() || ""
			}, this
		}.bind({})(n.utils, n.jstz);
		n.context = Object.create(x);
		var y = function () {
			var a = function () {
					var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
						b = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
					a = a.toString().split("."), b = b.toString().split(".");
					for (var c = 0; c < b.length; c++) {
						if ((a[c] ? parseInt(a[c]) : 0) < (b[c] ? parseInt(b[c]) : 0)) return !1
					}
					return !0
				},
				b = function () {
					var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
						b = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
					a = a.toString().split("."), b = b.toString().split(".");
					for (var c = !1, d = 0; d < b.length; d++) {
						var e = a[d] ? parseInt(a[d]) : 0,
							f = b[d] ? parseInt(b[d]) : 0;
						if (e > f) return !1;
						c = e === f
					}
					return !c
				};
			return {
				getProperties: function () {
					return {
						name: this.name,
						version: this.version,
						platform: this.platform,
						userAgent: this.userAgent
					}
				},
				init: function (a) {
					var b = this,
						c = a.navigator.userAgent,
						d = /Trident\//.test(c),
						e = /Safari/.test(c),
						f = /Chrome/.test(c),
						g = void 0;
					if (this.userAgent = c, g = c.match(/Edge\/(\d+)/)) return this.name = "edge", this.version = parseInt(g[1]), void(this.platform = /Windows Phone/.test(c) ? "mobile" : "desktop");
					if (d) {
						var h = function () {
							b.name = "internet explorer";
							var a = [];
							return a.push(c.match(/IE (\d+)/)), a.push(c.match(/rv\:(\d+)/)), a.push(c.match(/IEMobile(\d+)/)),
								function () {
									for (var c = 0; c < a.length; c++)
										if (a[c]) return void(b.version = parseInt(a[c][1]))
								}(), b.platform = /IEMobile/.test(c) ? "mobile" : "desktop", {
									v: void 0
								}
						}();
						if ("object" == typeof h) return h.v
					}
					if (g = c.match(/Firefox\/(\d+)/)) return this.name = "firefox", this.version = parseInt(g[1]), void(this.platform = /Tablet|Mobile/.test(c) ? "mobile" : "desktop");
					if (g = c.match(/(Opera|OPR)\/(\d+)/)) return this.name = /Opera Mini/.test(c) ? "opera mini" : "opera", this.version = parseInt(g[2]), void(this.platform = /Mobile Safari|Opera Mobi/.test(c) ? "mobile" : "desktop");
					if (g = c.match(/(UCBrowser|UBrowser)\/(\d+)/)) return this.name = "uc browser", this.version = parseInt(g[2]), void(this.platform = /(mobi|nokia|android)/i.test(c) ? "mobile" : "desktop");
					if (g = c.match(/SamsungBrowser\/(\d+)/)) return this.name = "samsung internet", this.version = parseInt(g[1]), void(this.platform = /mobi/i.test(c) ? "mobile" : "desktop");
					if ((g = c.match(/Version\/([\d.]*)/)) && e && !f) {
						var i = g[1].split(".");
						return this.name = "safari", this.version = i[0] + "." + i[1], void(this.platform = /iPad|iPhone|iPod/.test(c) ? "mobile" : "desktop")
					}
					return g = c.match(/Chrome\/(\d+)/), !g || !f || null === a.chrome || void 0 === a.chrome || /Edge/.test(c) || "Google Inc." !== a.navigator.vendor || /(OPR|Opera)/.test(c) && !/(Build\/OPR)/.test(c) ? void 0 : (this.name = "chrome", this.version = parseInt(g[1]), void(this.platform = /Mobile Safari|Android/.test(c) ? "mobile" : "desktop"))
				},
				filter: function (c) {
					for (var d = 0; d < c.length; d++) {
						var e = c[d];
						if (this.name === e.name && (!("platform" in e && this.platform !== e.platform) && (!("min" in e) || a(this.version, e.min)) && (!("max" in e) || b(this.version, e.max)))) return
					}
					throw "Browser not targeted"
				},
				isTargeted: function (a) {
					try {
						this.filter(a)
					} catch (b) {
						return !1
					}
					return !0
				}
			}
		}.bind({})();
		n.browserManager = Object.create(y);
		var z = function (a, b) {
			var c = {
					"top:debug": "/t_w_debug.js",
					"middle:subtrack": "/m_w_subtrack.js",
					"middle:notification": "/m_w_notification.js"
				},
				d = {},
				e = [],
				f = [],
				g = {};
			f._fireWidget = function (a) {
				var b = g.eventManager.getMessageBody(a);
				h(b) && this.fire(b.widget, b.options)
			}.bind(this);
			var h = function (b) {
					return "object" === a.typeOf(b) && "string" === a.typeOf(b.widget)
				},
				i = function (a) {
					if (-1 === e.indexOf(a)) {
						var b = "https://" + g.settings.alias + g.settings.aliasPath + c[a];
						g.dom.loadJS(b)
					}
				};
			return this.fire = function (a, b) {
				(d[a] = d[a] || []).push(b)
			}, this.getDebugQueryParams = function () {
				var b = "";
				return a.empty(g.settings.widgets.debug) || a.empty(g.settings.widgets.debug.key) || (b += "&ACCdebugKey=" + g.settings.widgets.debug.key, b += "&ACCdebugMode=" + (a.empty(g.settings.widgets.debug.mode) ? 1 : g.settings.widgets.debug.mode), b += "&ACCtimestamp=" + 1 * new Date), b
			}, this.getQueues = function () {
				return d
			}, this.init = function (c, d, e, h) {
				g.settings = c, g.eventManager = d, g.dom = h, g.eventManager.bind(f);
				for (var j in g.settings.widgets)
					if ("object" === a.typeOf(g.settings.widgets[j])) switch (j) {
						case "debug":
							i("top:debug");
							break;
						case "subtrack":
							e === b.MIDDLE && i("middle:subtrack");
							break;
						case "notification":
							e === b.MIDDLE && i("middle:notification")
					}
			}, this
		}.bind({})(n.utils, n.LOCATION);
		n.widgetManager = Object.create(z), n.eventManager = function () {
			var a = "manager:event",
				b = {},
				c = function (a) {
					return "messageevent" === n.utils.extendedTypeOf(a) && "object" === n.utils.extendedTypeOf(a.data) && "string" == typeof a.data.type
				};
			return {
				getMessageBody: function (a) {
					var b;
					try {
						b = JSON.parse(a.data.body)
					} catch (c) {
						return a.data.body
					}
					return b
				},
				getOptinTypeBody: function (a) {
					var b = void 0;
					try {
						b = JSON.parse(a.data)
					} catch (c) {
						return a.data
					}
					return b
				},
				getMessagePayload: function (a) {
					return "object" === n.utils.extendedTypeOf(a.data) ? a.data : void 0
				},
				getMessageTopic: function (a) {
					return "string" == typeof a.data.topic ? a.data.topic : void 0
				},
				getMessageType: function (a) {
					return "string" == typeof a.data.type ? a.data.type : void 0
				},
				list: function () {
					return Object.keys(b)
				},
				bind: function (a) {
					var b;
					for (b in a) this.add(b, a[b])
				},
				add: function (a, c) {
					b[a] = c
				},
				remove: function (a) {
					delete b[a]
				},
				exist: function (a) {
					return b.hasOwnProperty(a)
				},
				trigger: function (d) {
					var e, f;
					if (!c(d)) return void n.widgetManager.fire(n.WIDGET.DEBUG, {
						type: "warning",
						callee: a,
						contents: ["Unvalid event", d]
					});
					e = this.getMessageType(d); {
						if (this.exist(e)) return b[e].apply(this, [d]);
						if (n.widgetManager.fire(n.WIDGET.DEBUG, {
								type: "warning",
								callee: a,
								contents: ["Event type `" + e + "` does not exist", d]
							}), f = this.getMessageTopic(d)) return n.utils.downwardFeedback(f, null, "event type error")
					}
				}
			}
		}(), n.logicManager = function () {
			var a = {};
			return {
				add: function (b, c) {
					a[b] = c
				},
				apply: function (b, c, d) {
					try {
						if (d = d || {}, !a.hasOwnProperty(b)) throw new Error("Unknown method");
						return a[b].apply(n, [c, d])
					} catch (f) {
						var e = "misc error";
						if ("string" === n.utils.extendedTypeOf(f) ? e = f : "error" !== n.utils.extendedTypeOf(f) || n.utils.empty(f.message) || (e = f.message), "onError" in d) return d.onError.apply(this, [e]);
						throw e
					}
				},
				exist: function (b) {
					return a.hasOwnProperty(b)
				},
				list: function () {
					return a
				},
				remove: function (b) {
					delete a[b]
				}
			}
		}(), n.dependencyManager = function () {
			var a = {},
				b = [],
				c = [],
				d = !1,
				e = ["core", "collect", "storage"];
			return {
				dependencyLoaded: function (a) {
					b.push(a)
				},
				dependencyStarted: function (a) {
					c.push(a)
				},
				getDependencyOptions: function (a) {
					return n.settings.dependencies[a] || {}
				},
				getIncludedResources: function () {
					return a
				},
				isDependencyLoaded: function (a) {
					return -1 !== b.indexOf(a)
				},
				isDependencyStarted: function (a) {
					return -1 !== c.indexOf(a)
				},
				isSDKLoaded: function () {
					return d
				},
				prepareDependency: function (a) {
					n.utils.empty(n[a]) || "function" !== n.utils.extendedTypeOf(n[a].prepare) || n[a].prepare()
				},
				resourceIncluded: function (b, c) {
					a.hasOwnProperty(b) || (a[b] = []), a[b].push(c)
				},
				setSDKLoaded: function (a) {
					d = a
				},
				startDependencies: function () {
					for (var a = 0; a < b.length; a++) !n.utils.empty(n[b[a]]) && "function" === n.utils.extendedTypeOf(n[b[a]].start) && -1 === e.indexOf([b[a]]) && c.indexOf(-1 === [b[a]]) && n[b[a]].start()
				},
				startGdprDependencies: function () {
					for (var a = 0; a < e.length; a++) n.utils.empty(n[e[a]]) || "function" !== n.utils.extendedTypeOf(n[e[a]].start) || n[e[a]].start()
				},
				disableDependencies: function () {
					for (var a = 0; a < c.length; a++) - 1 === e.indexOf(c[a]) && n[c[a]].disablePlugin()
				}
			}
		}();
		var A = function (a) {
			var b = {},
				c = {},
				d = {},
				e = function () {
					for (var a in d) d.hasOwnProperty(a) && a in c && "function" == typeof c[a] && (g(a, d[a]), delete d[a])
				},
				f = function (a, b) {
					var d = [];
					return Object.keys(a).forEach(function (e) {
						"function" == typeof a[e] && -1 !== b.indexOf(e) && (c[e] = a[e], d.push(e))
					}), e(), d
				},
				g = function (a, e) {
					var f = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2];
					if (!(a in c && "function" == typeof c[a])) return void(f ? d[a] = e : b.widgetManager.fire("debug", {
						type: "warning",
						callee: "manager:custom_event",
						content: "Custom event name `" + a + "` not registered"
					}));
					c[a](e)
				};
			return {
				add: f,
				trigger: g,
				setProps: function (a) {
					b.widgetManager = a
				}
			}
		}.bind({})(n.utils);
		n.customEventManager = Object.create(A);
		var B = function (a) {
				function b(b, d) {
					var e = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
					return this.validate = function () {
						if ("string" != typeof b) throw "action is not a string";
						if (b.indexOf(":") < 1) throw "action is not in format `plugin:method`";
						if ("_" === b.charAt(0)) throw "action contains a `_`"
					}, this.getAction = function () {
						return b
					}, this.getDependency = function () {
						return b.split(":")[0]
					}, this.apply = function () {
						return c.logicManager.exist(b) ? c.logicManager.apply(b, d, e) : a.downwardMessage(b, d, {
							onSuccess: function (b) {
								return a.onSuccess(e, b)
							},
							onError: function (c) {
								var d = a.errorToString(c);
								return "Event type does not exist" === d ? a.onError(e, "Given command `" + b + "` does not exist") : a.onError(e, d)
							}
						})
					}, this.toArray = function () {
						return [b, d, e]
					}, this
				}
				var c = {};
				return b.setProps = function (a) {
					c.logicManager = a
				}, b
			}(n.utils),
			C = function (a) {
				function b(b) {
					function g(b) {
						try {
							var c;
							d(b);
							var g = (c = e.Command).call.apply(c, [{}].concat(_toConsumableArray(b)));
							g.validate(), i.push(g)
						} catch (h) {
							e.widgetManager.fire("debug", {
								type: "error",
								callee: f,
								contents: ["Invalid command:", a.errorToString(h), b]
							})
						}
					}
					var h = this,
						i = [],
						j = [],
						k = function () {
							h.push(b || []), e.widgetManager.fire("debug", {
								callee: f,
								content: "Awaiting queue treated: " + i.length + " commands added"
							})
						};
					this.push = function () {
						try {
							var b = Array.prototype.slice.call(arguments);
							b = b[0], c(b);
							for (var d = 0; d < b.length; d++) g(b[d])
						} catch (h) {
							e.widgetManager.fire("debug", {
								type: "warning",
								calee: f,
								content: a.errorToString(h)
							})
						}
					}, this.consume = function () {
						for (var a = i.length - 1; a >= 0; a--) {
							var b = i[a],
								c = b.getDependency();
							e.dependencyManager.isDependencyStarted(c) && (e.widgetManager.fire("debug", {
								callee: f,
								contents: ["Applying command", b.toArray()]
							}), b.apply(), j.push(b), i.splice(a, 1))
						}
						return !i.length
					}, k()
				}

				function c(a) {
					if (0 === a.length) throw "no data has been pushed"
				}

				function d(b) {
					if ("array" !== a.typeOf(b)) throw "input data is not an array"
				}
				var e = {},
					f = "manager:command";
				return b.setProps = function (a, b, c) {
					e.widgetManager = a, e.dependencyManager = b, e.Command = c
				}, b
			}(n.utils),
			D = function (a) {
				var b = function (b) {
					try {
						var c = a.document.getElementById(b);
						if ("object" != typeof c) throw 1;
						return c
					} catch (d) {
						return
					}
				};
				return {
					loadJS: function (b) {
						var c = a.document.createElement("script"),
							d = a.document.getElementsByTagName("script")[0];
						c.async = 1, c.src = b, d.parentNode.insertBefore(c, d)
					},
					createIframe: function (b, c) {
						var d = a.document.createElement("iframe");
						return d.src = b, d.height = d.width = 1, d.name = c, d.style.border = "none", d.style.display = "none", d
					},
					createElement: function (b, c) {
						var d = a.document.createElement(b);
						for (var e in c) d.setAttribute(e, c[e]);
						return d
					},
					createHTML: function (b) {
						var c = a.document.createElement("div");
						return c.innerHTML = b.trim(), 1 === c.childNodes.length ? c.firstChild : c.childNodes
					},
					removeElement: function (a) {
						var c = "string" == typeof a ? b(a) : a;
						c && c.parentNode.removeChild(c)
					},
					show: function (a) {
						var c = "string" == typeof a ? b(a) : a;
						c && (c.style.display = "block")
					},
					hide: function (a) {
						var c = "string" == typeof a ? b(a) : a;
						c && (c.style.display = "none")
					},
					hasClass: function (a, c) {
						var d = "string" == typeof a ? b(a) : a;
						return !!d && new RegExp(" " + c + " ").test(" " + d.className + " ")
					},
					addClass: function (a, c) {
						var d = "string" == typeof a ? b(a) : a;
						d && !this.hasClass(d, c) && (d.className += " " + c)
					},
					removeClass: function (a, c) {
						var d = "string" == typeof a ? b(a) : a;
						if (d) {
							var e = " " + d.className.replace(/[\t\r\n]/g, " ") + " ";
							if (this.hasClass(d, c)) {
								for (; e.indexOf(" " + c + " ") >= 0;) e = e.replace(" " + c + " ", " ");
								d.className = e.replace(/^\s+|\s+$/g, "")
							}
						}
					},
					getCSSRule: function (b, c, d, e) {
						var f = function (a) {
							return a + ";"
						};
						return b + "{" + (c || []).map(f).join("") + ("desktop" === a.devicePlatform ? (d || []).map(f).join("") : (e || []).map(f).join("")) + "}"
					},
					createStyleSheet: function (b) {
						var c = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
							d = a.document.createElement("style");
						c.length && d.setAttribute("id", c), d.innerHTML = b, a.document.head.appendChild(d)
					}
				}
			}.bind({})(n.context);
		n.dom = Object.create(D);
		var E = function (a, b, c, d, e, f) {
			var g = !1,
				h = "acc_saffix-",
				i = ["udid", "__fbmessengeroptin", "__firstopen"],
				j = {
					EMPTY_DATA: "read data are empty",
					EMPTY_FIELD: "no field provided",
					NOT_SAFARI: "not a safari browser",
					UNVALID_DATA: "read data are not a valid object",
					UNVALID_FIELDS: "fields are not a valid object",
					PERM_DENIED: "Permission is denied. User is hard optout",
					NO_SUPPORT: "Notification is not supported by Safari",
					PERM_DEFAULT: "native push permission is not granted"
				},
				k = function () {
					if ("safari" !== c.getProperties().name) throw j.NOT_SAFARI
				},
				l = function () {
					return h + a.hashCode(d.partnerId)
				},
				m = function (a) {
					Object.keys(a).forEach(function (b) {
						-1 === i.indexOf(b.toLowerCase()) && delete a[b]
					})
				},
				n = function (a) {
					g = !0;
					try {
						var b = new MessageEvent("_push:popupFeedback", {
							data: {
								body: {
									token: a.deviceToken,
									permission: a.permission
								},
								type: "_push:popupFeedback"
							}
						});
						f.trigger(b)
					} catch (err) {
						console.log("An error occured while dispatching event " + err)
					}
				},
				o = function () {
					return new Promise(function (a, b) {
						if (!1 in e.window) b(j.NO_SUPPORT);
						else {
							var c = e.window.setInterval(function () {
								!0 === g ? e.window.clearInterval(c) : p().then(function (a) {
									console.log(a), n(a)
								}).catch(function (a) {
									a === j.PERM_DENIED && (g = !0)
								})
							}, 200);
							e.window.safari.pushNotification.requestPermission("https://api.accengage.com/safari/v1/" + d.partnerId, d.dependencies.websitePushID, {}, n)
						}
					})
				},
				p = function () {
					if (!1 in e.window) return Promise.reject(j.NO_SUPPORT);
					var a = e.window.safari.pushNotification.permission(d.dependencies.websitePushID);
					return "denied" === a.permission ? Promise.reject(j.PERM_DENIED) : "default" === a.permission ? Promise.reject(j.PERM_DEFAULT) : Promise.resolve(a)
				};
			return {
				makeBackupProfile: function (c) {
					try {
						if (k(), "object" !== a.typeOf(c)) throw j.UNVALID_FIELDS;
						if (m(c), a.empty(c)) throw j.EMPTY_FIELD;
						var d = this.readBackupProfile();
						d = a.extend(d, c), d = JSON.stringify(d), b.createCookie(l(), d)
					} catch (e) {}
				},
				readBackupProfile: function () {
					try {
						k();
						var c = b.readCookie(l());
						if ("string" !== a.typeOf(c) || a.empty(c)) throw j.EMPTY_DATA;
						var d = a.parseJSON(c);
						if ("object" !== a.typeOf(d)) throw j.UNVALID_DATA;
						return d
					} catch (e) {
						return {}
					}
				},
				prepareSafari: function () {
					return p().catch(function (a) {
						return a !== j.PERM_DENIED ? o() : Promise.reject("permission is denied")
					})
				},
				getPermission: p
			}
		}.bind({})(n.utils, n.dom, n.browserManager, n.settings, n.context, n.eventManager);
		n.safari = Object.create(E),
			function (a, b) {
				function c(a) {
					if ("array" !== b.typeOf(a)) throw "Proxy has not been declared as an Array"
				}

				function d(a) {
					if ("object" !== b.typeOf(a)) throw "no init params found";
					if ("number" !== b.typeOf(a.date)) throw "starting date is not provided";
					if (-1 === ["global", "window"].indexOf(b.typeOf(a.window))) throw "global window scope is not provided nor valid";
					if (-1 === ["htmldocument", "document"].indexOf(b.typeOf(a.document))) throw "page document is not provided nor valid"
				}

				function e(a) {
					if ("object" !== b.typeOf(a)) throw "config is not a valid object";
					if (!b.isValidString(a.partnerId)) throw "no `partnerId` in config"
				}

				function f(a) {
					if (!b.empty(a[g])) throw "previous initalisation has already been made";
					a[g] = 1 * new Date
				}
				var g = "a",
					h = "p";
				a.prototype.validate = function () {
					return c(this.proxy), d(this.proxy[h]), e(this.config), this
				}, a.prototype.start = function (a) {
					f(this.proxy), a(this.proxy[h])
				}
			}(b, n.utils);
		var F = function (a) {
			var b = [void 0, null, ""],
				c = function (a, b) {
					return a.some(function (a) {
						return b === a
					})
				},
				d = function (b) {
					return function (c) {
						var d = a.typeOf(c);
						switch (b) {
							case "numeric":
								if ("number" === d && !isNaN(c)) break;
								throw new Error("not a numeric");
							default:
								if (d !== b) throw new Error("not a " + b)
						}
					}
				},
				e = function (a) {
					return function (b) {
						if (!c(a, b)) throw new Error("value not in " + a.join(", "))
					}
				};
			return function () {
				var f = this,
					g = {};
				g.rules = {}, g.value = void 0, this.addValue = function (a) {
					return g.value = a, h(), f
				}, this.addRules = function (a) {
					return g.rules = a, h(), f
				}, this.toValue = function () {
					return g.value
				}, this.validate = function () {
					var a = g.rules.field + " - validation error: ",
						h = !g.rules.optional,
						i = c(b, g.value);
					if (h && i) throw a + "field is required";
					if (h || !h && !i) try {
						g.rules.type && d(g.rules.type)(g.value), g.rules.valueIn && e(g.rules.valueIn)(g.value)
					} catch (j) {
						throw a + j.message
					}
					return f
				};
				var h = function () {
					g.rules.hasOwnProperty("default") && void 0 === g.value && (g.value = g.rules.default), g.rules.formattedDate && "now()" === g.value && (g.value = a.getISOTimestampDate())
				}
			}
		}.bind({})(n.utils);
		! function (a) {
			function b() {
				return "firefox" === a.browserManager.name ? Promise.resolve() : a.optinType && "serviceworkercontainer" === a.utils.extendedTypeOf(d()) ? Promise.resolve() : "serviceworker" === a.utils.extendedTypeOf(d().controller) ? Promise.resolve() : Promise.reject(l.SERVICE_WORKER_NOT_ACTIVATED)
			}

			function c() {
				var b = "https://" + a.settings.alias + a.settings.aliasPath + a.ASSETS.SW + "sw_" + a.context.browserName;
				return "firefox" === a.context.browserName && (b += "desktop" === a.context.devicePlatform ? "_d" : "_m"), b += ".js", a.optinType && (b = "https://" + window.location.hostname + "/acc_sw.js"), a.context.window.navigator.serviceWorker.register(b, {
					scope: "./"
				}).then(g)
			}

			function d() {
				return n ? n.window.navigator.serviceWorker : a.context.window.navigator.serviceWorker
			}

			function e(b) {
				var c = a.eventManager.getMessagePayload(b);
				if (!c) return a.widgetManager.fire(a.WIDGET.DEBUG, {
					type: "warning",
					callee: m,
					contents: ["Unvalid message from SW", b]
				});
				switch (a.widgetManager.fire(a.WIDGET.DEBUG, {
					callee: m,
					contents: ["Receive message from SW", c]
				}), a.utils.empty(c.opts) || a.utils.empty(c.opts.toLocation) ? a.LOCATION.MIDDLE : c.opts.toLocation) {
					case a.LOCATION.TOP:
						a.utils.forwardMessage(c.type, c.body);
						break;
					case a.LOCATION.MIDDLE:
						a.eventManager.trigger({
							data: c
						});
						break;
					case a.LOCATION.DOWN:
						a.utils.downwardMessage(c.type, c.body)
				}
			}

			function f(b) {
				var c = a.eventManager.getMessagePayload(b);
				if (!c) return a.widgetManager.fire(a.WIDGET.DEBUG, {
					type: "warning",
					callee: m,
					contents: ["Unvalid message from SW", b]
				});
				switch (a.widgetManager.fire(a.WIDGET.DEBUG, {
					callee: m,
					contents: ["Receive message from SW", c]
				}), a.utils.empty(c.opts) || a.utils.empty(c.opts.toLocation) ? a.LOCATION.TOP : c.opts.toLocation) {
					case a.LOCATION.TOP:
						a.eventManager.trigger(b);
						break;
					case a.LOCATION.DOWN:
						a.utils.downwardMessage(c.type, c.body)
				}
			}

			function g() {
				return b().catch(function () {
					a.optinType || h()
				})
			}

			function h() {
				return a.widgetManager.fire(a.WIDGET.DEBUG, {
					callee: m,
					content: "Initiating bridge..."
				}), new Promise(function (b, c) {
					var d = a.dom.createIframe("https://" + a.settings.alias + a.settings.aliasPath + a.ASSETS.MIDDLE, a.MODE.MIDDLE.BRIDGE);
					d.onload = function () {
						a.widgetManager.fire(a.WIDGET.DEBUG, {
							callee: m,
							content: "...Bridge initiated"
						}), b()
					}, "object" == typeof a.context.document.body.appendChild(d) ? n = d.contentWindow : c("Invalid bridge iframe")
				})
			}

			function i() {
				if (!("serviceWorker" in a.context.window.navigator)) throw "no service worker compliancy";
				if (!("Notification" in a.context.window)) throw "no notification api compliancy"
			}

			function j() {
				return new Promise(function (b, c) {
					a.optinType && b(),
						a.utils.forwardMessage("_top:isContextSecure", null, {
							onSuccess: function () {
								return b()
							},
							onError: function () {
								return c(l.NON_SECURE_ORIGIN)
							}
						})
				})
			}
			a.swHandler = {};
			var k = {
					NAVIGATOR_PERMISSIONS: [{
						name: "chrome"
					}, {
						name: "firefox",
						min: "45"
					}]
				},
				l = {
					NON_SECURE_ORIGIN: "non secure origin: unable to reach SW",
					PUSH_PERMISSION_NOT_GRANTED: "push permission not granted",
					SERVICE_WORKER_NOT_ACTIVATED: "SW is not activated"
				},
				m = "plugin:sw_handler",
				n = null,
				o = {
					EMPTY: "no subscription has been made"
				},
				p = function (a, b) {
					function c(a) {
						for (var b = "=".repeat((4 - a.length % 4) % 4), c = (a + b).replace(/\-/g, "+").replace(/_/g, "/"), d = atob(c), e = new Uint8Array(d.length), f = 0; f < d.length; ++f) e[f] = d.charCodeAt(f);
						return e
					}
					var d = {
							userVisibleOnly: !0
						},
						e = function (a, b) {
							var c = void 0;
							try {
								c = b.getKey(a), c = String.fromCharCode.apply(null, new Uint8Array(c)), c = btoa(c)
							} catch (d) {
								c = void 0
							} finally {
								return c
							}
						};
					return this.delete = function (c) {
						return c.pushManager.getSubscription().then(function (c) {
							return a.empty(c) ? Promise.reject(b.EMPTY) : c.unsubscribe()
						})
					}, this.make = function (b, e) {
						return d.applicationServerKey = c(e), b.pushManager.subscribe(d).then(a.toJSON).then(function (a) {
							var b = {
								token: a.endpoint
							};
							return "keys" in a && (b.userPublicKey = a.keys.p256dh, b.userAuth = a.keys.auth), Promise.resolve(b)
						})
					}, this.read = function (c) {
						return c.pushManager.getSubscription().then(function (c) {
							if (a.empty(c)) return Promise.reject(b.EMPTY);
							var d = {
								token: c.endpoint
							};
							return "getKey" in c && (d.userPublicKey = e("p256dh", c), d.userAuth = e("auth", c)), Promise.resolve(d)
						})
					}, this
				}.bind({})(a.utils, o);
			a.eventManager.add("_sw:plugin_push_prepare", function (c) {
				var f = a.eventManager.getMessageTopic(c),
					g = {};
				return a.swHandler.getNotificationPermission().then(function (a) {
					g.permission = a
				}).then(j).then(b).then(function () {
					d().onmessage = e, g.serviceworker = !0
				}).then(function () {
					if ("granted" !== g.permission) return Promise.reject(l.PUSH_PERMISSION_NOT_GRANTED);
					if (a.utils.empty(d().controller) && a.optinType) throw new Error(l.NON_SECURE_ORIGIN);
					return d().ready
				}).then(function (b) {
					return p.make(b, a.settings.dependencies.vapid.publicKey)
				}).then(function (b) {
					g = a.utils.extend(g, b || {})
				}).catch(function (b) {
					a.utils.errorToString(b) === l.NON_SECURE_ORIGIN && (g.serviceworker = void 0), a.utils.errorToString(b) === l.SERVICE_WORKER_NOT_ACTIVATED && (g.serviceworker = !1)
				}).then(function () {
					if (!a.optinType) return a.utils.forwardFeedback(f, g);
					var b = Object.assign({}, {
							state: g,
							type: f,
							body: JSON.stringify(g)
						}),
						c = new MessageEvent(f, {
							data: b
						});
					a.eventManager.trigger(c)
				})
			}), a.eventManager.add("_sw:get_push_subscription", function (c) {
				var e = a.eventManager.getMessageTopic(c);
				return new Promise(function (a, b) {
					try {
						i(), a()
					} catch (c) {
						b(c)
					}
				}).then(a.swHandler.getNotificationPermission).then(function (a) {
					if ("granted" !== a) return Promise.reject(l.PUSH_PERMISSION_NOT_GRANTED)
				}).then(j).then(b).then(function () {
					return d().ready
				}).then(p.read).then(function (b) {
					return a.utils.downwardFeedback(e, b || {})
				}).catch(function (b) {
					return a.utils.downwardFeedback(e, null, a.utils.errorToString(b))
				})
			}), a.eventManager.add("_sw:plugin_push_askPermission", function (b) {
				var c = a.eventManager.getMessageTopic(b);
				return a.widgetManager.fire(a.WIDGET.DEBUG, {
					callee: m,
					content: "test"
				}), a.swHandler.askPermission().then(function (b) {
					"granted" === b ? a.utils.forwardFeedback(c, "permission granted") : a.utils.forwardFeedback(c, null, "permission not granted")
				}).catch(function () {
					a.utils.forwardFeedback(c, null, "error while asking permission")
				})
			}), a.eventManager.add("_sw:broadcast", function (b) {
				var c = a.eventManager.getMessageBody(b);
				a.swHandler.broadcast(c)
			}), a.eventManager.add("_top:getOptinType", function (b) {
				var c = a.eventManager.getMessageBody(b);
				a.swHandler.getOptinType(c)
			}), a.swHandler.install = function () {
				return c().then(function () {
					return Promise.resolve()
				})
			}, a.swHandler.listen = function () {
				return null === d().controller ? Promise.reject("SW is null") : (d().onmessage = f, Promise.resolve())
			}, a.swHandler.makeSubscription = function () {
				return b().catch(function () {
					return Promise.reject("SW_not_fully_ready")
				}).then(function () {
					return d().ready.then(function (b) {
						return p.make(b, a.settings.dependencies.vapid.publicKey)
					}).catch(function (a) {
						return console.log(a)
					})
				})
			}, a.swHandler.broadcast = function (c) {
				try {
					if (i(), "object" !== a.utils.typeOf(c) || a.utils.empty(c.type)) throw "unvalid message"
				} catch (e) {
					return a.widgetManager.fire(a.WIDGET.DEBUG, {
						type: "warning",
						callee: m,
						contents: ["error while broadcasting to SW", a.utils.errorToString(e), c]
					})
				}
				return a.widgetManager.fire(a.WIDGET.DEBUG, {
					callee: m,
					contents: ["Message to broadcast to SW", c]
				}), b().then(function () {
					return d().controller.postMessage({
						type: "_broadcast",
						body: c
					})
				}).catch(function () {
					a.widgetManager.fire(a.WIDGET.DEBUG, {
						type: "warning",
						callee: m,
						content: "Service Worker not activated to broadcast message"
					})
				})
			}, a.swHandler.getNotificationPermission = function () {
				return a.browserManager.isTargeted(k.NAVIGATOR_PERMISSIONS) ? a.context.window.navigator.permissions.query({
					name: "notifications"
				}).then(function (a) {
					return "state" in a ? a.state : Promise.reject()
				}).catch(function () {
					return "none"
				}) : Promise.resolve(a.context.window.Notification.permission)
			}, a.swHandler.askPermission = function (b, c) {
				return c = c || {}, new Promise(function (b) {
					a.context.window.Notification.requestPermission(function (d) {
						return "granted" === d ? (a.utils.onSuccess(c, !0), b(d)) : (a.utils.onError(c, "notification permission not granted"), b(d))
					})
				})
			}, a.swHandler.removeSw = function () {
				return b().then(function () {
					return d().ready.then(function (b) {
						b.unregister().then(function (b) {
							if (b) return Promise.resolve(b);
							a.widgetManager.fire(a.WIDGET.DEBUG, {
								type: "warning",
								callee: m,
								content: "SW has not been removed or has been already removed"
							})
						})
					})
				}).catch(function (b) {
					a.widgetManager.fire(a.WIDGET.DEBUG, {
						type: "warning",
						callee: m,
						content: "SW is not present"
					})
				})
			}, a.dependencyManager.resourceIncluded("push", "middle:swHandler")
		}(n), a.l = function (a) {
				return a.apply(n)
			},
			function (a) {
				function b(a) {
					return this.handler = a.localStorage, this
				}

				function c() {
					return a.optinType ? "safari" === a.browserProperties.name ? Promise.resolve() : new Promise(function (b, c) {
						a.utils.downwardMessage("mid:get:storage", null, {
							onSuccess: function (d) {
								a.utils.empty(d) && b();
								try {
									d = JSON.parse(d)
								} catch (e) {
									c(err)
								}
								"denied" === a.context.window.Notification.permission && d.hardOptoutStatus && c("The user is hard optout"), (a.utils.empty(d.__userAuth) && a.utils.empty(d.__userPubKey) && a.utils.empty(d.__token) || "N" === d.system_optin_notifs) && b(), c("The user is already optin")
							},
							onError: function (d) {
								"profile is empty" === a.utils.errorToString(d) && b(), c(d)
							}
						})
					}) : Promise.resolve()
				}

				function d() {
					if (!a.optinType) return Promise.resolve();
					var b = a.context.window.navigator.serviceWorker;
					return a.utils.empty(b.controller) ? Promise.reject("sw has not been detected it might not be present") : b.ready.then(function (a) {
						a.update()
					})
				}

				function e() {
					try {
						if (g(), "safari" === a.browserProperties.name) return;
						void 0 !== ma.serviceworker && d().then(function () {
							a.widgetManager.fire("debug", {
								type: "info",
								callee: fa,
								content: "user is currently optin"
							}), k()
						}).catch(function (a) {
							f(a)
						})
					} catch (b) {
						f(b)
					}
				}

				function f(b) {
					var c = window.Notification.permission;
					"denied" !== c && "default" !== c || (a.widgetManager.fire("debug", {
						type: "info",
						callee: fa,
						contents: ["user is currently optout", a.utils.errorToString(b)]
					}), a.optinType && a.utils.downwardMessage("mid:get:storage", null, {
						onSuccess: function (b) {
							var c = JSON.parse(b);
							return "Y" === c.system_optin_notifs && c.isOptin ? a.utils.onSuccess(null, {
								firstOptinDate: c.firstOptinDate,
								firstOptinDomain: c.firstOptinDomain
							}) : c.hardOptoutStatus ? a.utils.onError(null, {
								status: "This user has denied the notification permission",
								details: null
							}) : a.utils.onError(null, {
								status: "This user has not granted the notification permission, nor denied it",
								details: null
							})
						},
						onError: function (b) {
							return a.utils.onError(null, b)
						}
					}), l())
				}

				function g() {
					if ("denied" === ma.permission) throw a.utils.downwardMessage("_core:updateUser", {
						system_optin_notifs: "N"
					}), a.utils.downwardMessage("mid:put:storage", {
						value: {
							system_optin_notifs: "N"
						}
					}), ea.PUSH_PERMISSION_DENIED;
					if ("granted" !== ma.permission) throw ea.PUSH_PERMISSION_NOT_GRANTED;
					if (void 0 !== ma.serviceworker) {
						if (!1 === ma.serviceworker) throw ea.SERVICE_WORKER_NOT_ACTIVATED;
						if (a.utils.empty(ma.token) && !a.optinType) {
							if ("chrome" === a.browserManager.getProperties().name && a.browserManager.getProperties().version >= 71 || "firefox" === a.browserManager.getProperties().name) return;
							throw ea.NO_ENDPOINT_RETRIEVED
						}
					}
				}

				function h() {
					if ("denied" === ma.permission) throw ea.PUSH_PERMISSION_DENIED;
					if ("granted" !== ma.permission) throw ea.PUSH_PERMISSION_NOT_GRANTED;
					if (a.utils.empty(ma.token) && !a.optinType) {
						if ("chrome" === a.browserManager.getProperties().name && a.browserManager.getProperties().version >= 71 || "firefox" === a.browserManager.getProperties().name) return;
						throw ea.NO_ENDPOINT_RETRIEVED
					}
				}

				function j() {
					return "safari" === a.browserProperties.name ? a.safari.getPermission().then(function (a) {
						if ("granted" === a.permission) return Promise.reject(ea.PUSH_PERMISSION_ALREADY_GRANTED)
					}).catch(function (a) {
						return a === ea.PUSH_PERMISSION_NOT_GRANTED ? Promise.resolve() : Promise.reject(a)
					}) : "denied" === ma.permission ? Promise.reject(ea.PUSH_PERMISSION_DENIED) : void 0 !== ma.serviceworker ? !a.optinType && ("chrome" === a.browserManager.getProperties().name && a.browserManager.getProperties().version >= 71 || "firefox" === a.browserManager.getProperties().name) ? "granted" !== ma.permission ? Promise.resolve() : new Promise(function (b, c) {
						a.utils.downwardMessage("_core:getMe", null, {
							onError: function (b) {
								return c(a.utils.errorToString(b))
							},
							onSuccess: function (a) {
								try {
									a = JSON.parse(a)
								} catch (d) {
									return c()
								}
								return "Y" === a.system_optin_notifs ? c(ea.PUSH_PERMISSION_ALREADY_GRANTED) : b()
							}
						})
					}) : d().then(function () {
						if (!a.utils.empty(ma.token)) return Promise.reject(ea.ENDPOINT_ALREADY_GENERATED)
					}).catch(function (b) {
						a.widgetManager.fire("debug", {
							type: "warning",
							callee: fa,
							content: a.utils.errorToString(b)
						})
					}) : "granted" !== ma.permission ? Promise.resolve() : new Promise(function (b, c) {
						a.utils.downwardMessage("_core:getMe", null, {
							onError: function (b) {
								return c(a.utils.errorToString(b))
							},
							onSuccess: function (a) {
								try {
									a = JSON.parse(a)
								} catch (d) {
									return c()
								}
								return "Y" === a.system_optin_notifs ? c(ea.PUSH_PERMISSION_ALREADY_GRANTED) : b()
							}
						})
					})
				}

				function k() {
					a.widgetManager.fire("debug", {
						type: "info",
						callee: fa,
						contents: ["handling optin case", ma.token]
					}), a.utils.downwardMessage("_core:updateUser", {
						__token: ma.token,
						__userAuth: ma.userAuth,
						__userPublicKey: ma.userPublicKey,
						system_optin_notifs: "Y",
						optinInMiddle: !0
					}), a.utils.downwardMessage("mid:put:storage", {
						value: {
							system_optin_notifs: "Y",
							optinInMiddle: !0,
							firstOptinDomain: window.location.hostname
						}
					})
				}

				function l() {
					a.widgetManager.fire("debug", {
						type: "info",
						callee: fa,
						content: "handling optout case"
					}), a.utils.downwardMessage("_core:updateUser", {
						system_optin_notifs: "N",
						optinInMiddle: !1
					}), a.utils.downwardMessage("mid:put:storage", {
						value: {
							system_optin_notifs: "N",
							optinInMiddle: !1
						}
					})
				}

				function m() {
					return "safari" === a.browserManager.getProperties().name ? Promise.resolve() : a.optinType ? new Promise(function (b, c) {
						if (a.optinType) return a.utils.downwardMessage("_middle:getIDBProfile", null, {
							onSuccess: function (b) {
								var d = JSON.parse(b);
								if ("Y" === d.system_optin_notifs) return a.utils.downwardMessage("_core:updateUser", d), c()
							},
							onError: function (d) {
								return a.utils.downwardMessage("mid:get:storage", null, {
									onSuccess: function (d) {
										var e = JSON.parse(d);
										return "Y" === e.system_optin_notifs ? window.location.hostname !== e.firstOptinDomain ? (a.utils.downwardMessage("_core:updateUser", e), c()) : "default" === window.Notification.permission ? b() : c() : b()
									},
									onError: function (a) {
										return b()
									}
								})
							}
						})
					}) : Promise.resolve()
				}

				function n() {
					a.eventManager.bind(ka), a.logicManager.add("push:askPermission", a.push.askPermission), a.logicManager.add("push:showAlert", a.push.showAlert), a.logicManager.add("push:launchLandingOnClick", B), a.logicManager.add("push:isOptin", J), a.logicManager.add("push:isCompliant", M), a.logicManager.add("push:addCustomListeners", w), a.optinType && a.logicManager.add("push:requestBrowserPermission", B)
				}

				function o() {
					a.push.start = q, a.logicManager.add("push:askPermission", q), a.logicManager.add("push:showAlert", q), a.logicManager.add("push:launchLandingOnClick", q), a.logicManager.add("push:isOptin", q), a.logicManager.add("push:isCompliant", q), a.logicManager.add("push:addCustomListeners", w), a.logicManager.add("push:requestBrowserPermission", q)
				}

				function p() {
					a.logicManager.add("push:askPermission", r), a.logicManager.add("push:showAlert", r), a.logicManager.add("push:launchLandingOnClick", r), a.logicManager.add("push:isOptin", r), a.logicManager.add("push:isCompliant", r), a.logicManager.add("push:requestBrowserPermission", r), a.logicManager.add("push:addCustomListeners", w)
				}

				function q(b, c) {
					return c = c || {}, a.utils.onError(c, "Current browser is not compliant for web push nor targeted by your configuration")
				}

				function r(b, c) {
					return callbacks = callbacks || {}, a.utils.onError(callbacks, "Push plugin is disabled as the user has not grant to collect the datas")
				}

				function s() {
					a.customEventManager.trigger("landingFeedback:hardOptout"), v(), a.optinType ? a.utils.downwardMessage("mid:put:storage", {
						value: {
							hardOptoutStatus: !0
						}
					}) : pa.setStatus("hardOptout")
				}

				function t(b) {
					var c = [];
					if ("array" !== a.utils.typeOf(b)) throw "Provided command options is not an array";
					for (var d = 0; d < b.length; d++) {
						var e = b[d];
						"string" != typeof e || e.length < 2 || -1 !== ["#", "."].indexOf(e.charAt(0)) && Array.prototype.push.apply(c, a.context.document.querySelectorAll(e))
					}
					return Array.prototype.slice.call(c).filter(function (b) {
						return "htmlanchorelement" === a.utils.typeOf(b) && !b.hasAttribute("data-acc-push-launch-landing")
					})
				}

				function u(b, c) {
					try {
						C(b)
					} catch (d) {
						return a.widgetManager.fire("debug", {
							callee: fa,
							contents: ["Launching of the optinisation popup has been prevented", d]
						})
					}
					a.utils.downwardMessage("_fireWidget", {
						widget: "subtrack",
						options: {
							type: "event",
							category: c,
							action: "click",
							label: "accept"
						}
					}), a.push.launchPopup(b)
				}

				function v() {
					var b = 'a[data-acc-push-launch-landing="true"]',
						c = a.context.document.querySelectorAll(b);
					if (c.length) {
						for (var d = 0; d < c.length; d++) c[d].removeEventListener("click", sa.accept.fromLaunchLanding), c[d].removeAttribute("data-acc-push-launch-landing");
						a.widgetManager.fire("debug", {
							callee: fa,
							content: "unbind " + c.length + " anchors on click"
						})
					}
				}

				function w(b, c) {
					var d;
					return c = c || {}, "object" !== a.utils.extendedTypeOf(b) ? a.utils.onError(c, "Provided command options is not an object") : (d = a.customEventManager.add(b, la), d.length ? a.utils.onSuccess(c, d) : a.utils.onError(c, "No listeners added"))
				}

				function x() {
					if (!("chrome" === a.browserManager.getProperties().name && a.browserManager.getProperties().version >= 69 || "firefox" === a.browserManager.getProperties().name) || a.optinType) {
						if (!("serviceWorker" in a.context.window.navigator)) throw ea.NO_SERVICE_WORKER_COMPLIANCY;
						if (!("Notification" in a.context.window)) throw ea.NO_NOTIFICATION_API_COMPLIANCY
					}
				}

				function y() {
					if (("firefox" !== a.browserManager.getProperties().name || "mobile" !== a.browserManager.getProperties().platform) && !a.browserManager.isTargeted(a.PLUGIN_COMPLIANCY.PUSH)) throw ea.BROWSER_UNCOMPLIANT
				}

				function z() {
					if ("array" === a.utils.extendedTypeOf(ga.browsers) && !a.browserManager.isTargeted(ga.browsers)) throw ea.UNTARGETED_BY_CONFIGURATION
				}

				function A() {
					var b = {
						onSuccess: function (b) {
							return a.widgetManager.fire("debug", {
								type: "success",
								callee: fa,
								contents: ['Scenario "' + ga.scenario + '" launched success', b]
							})
						},
						onError: function (b) {
							return a.widgetManager.fire("debug", {
								type: "warning",
								callee: fa,
								contents: ['Scenario "' + ga.scenario + '" launched error', b]
							})
						}
					};
					switch (a.utils.grep(da, ga.scenario).length || (ga.scenario = da.NONE), a.widgetManager.fire("debug", {
						callee: fa,
						content: 'Select scenario : "' + ga.scenario + '"'
					}), ga.scenario) {
						case da.SHOW_ALERT:
							if (a.optinType) {
								a.utils.downwardMessage("mid:get:storage", null, {
									onSuccess: function (c) {
										var d = JSON.parse(c);
										"denied" !== a.context.window.Notification.permission && (d.hardOptoutStatus || "N" === d.system_optin_notifs) && a.push.showAlert(null, b)
									},
									onError: function (c) {
										if ("profile is empty" === c) return a.utils.downwardMessage("_middle:getIDBProfile", null, {
											onSuccess: function (c) {
												if ("Y" === JSON.parse(c).system_optin_notifs) return Promise.resolve();
												a.push.showAlert(null, b)
											},
											onError: function (c) {
												a.push.showAlert(null, b)
											}
										});
										a.push.showAlert(null, b)
									}
								});
								break
							}
							"chrome" === a.browserManager.getProperties().name && a.browserManager.getProperties().version >= 71 || "firefox" === a.browserManager.getProperties().name ? a.utils.downwardMessage("_core:getMe", null, {
								onSuccess: function (c) {
									c = JSON.parse(c), "Y" !== c.system_optin_notifs && a.push.showAlert(null, b)
								}
							}) : a.utils.downwardMessage("mid:get:storage", null, {
								onSuccess: function (c) {
									var d = JSON.parse(c);
									a.optinType ? "denied" !== a.context.window.Notification.permission && (d.hardOptoutStatus || "N" === d.system_optin_notifs) && a.push.showAlert(null, b) : (d.hardOptoutStatus || "N" === d.system_optin_notifs) && a.push.showAlert(null, b)
								},
								onError: function (c) {
									a.push.showAlert(null, b)
								}
							});
						case da.NONE:
							if (!a.context.document.querySelectorAll('a[id="accengageRequestBrowserPermission"]').length && a.optinType) {
								a.utils.downwardMessage("mid:get:storage", null, {
									onSuccess: function (b) {
										var c = JSON.parse(b);
										"denied" !== a.context.window.Notification.permission && (c.hardOptoutStatus || "N" === c.system_optin_notifs) && a.push.askPermissionTop()
									},
									onError: function (b) {
										if ("profile is empty" === b) return a.utils.downwardMessage("_middle:getIDBProfile", null, {
											onSuccess: function (b) {
												if ("Y" === JSON.parse(b).system_optin_notifs) return Promise.resolve();
												a.push.askPermissionTop()
											},
											onError: function (b) {
												a.push.askPermissionTop()
											}
										});
										a.push.askPermissionTop()
									}
								});
								break
							}
					}
				}

				function B(b, d) {
					var e = [];
					return d = d || {}, j().then(function () {
						m().catch(function (b) {
							return a.utils.onError(d, a.utils.errorToString(b))
						})
					}).then(function () {
						return c()
					}).then(function () {
						return t(b)
					}).then(function (b) {
						if (e = b, a.utils.empty(e)) throw "No elements were binded because no anchors </a> were provided. (also, anchors already binded are filtered)";
						for (var c = 0; c < e.length; c++) e[c].setAttribute("data-acc-push-launch-landing", "true"), e[c].addEventListener("click", sa.accept.fromLaunchLanding, !1);
						return a.utils.downwardMessage("_fireWidget", {
							widget: a.WIDGET.SUBTRACK,
							options: {
								type: "event",
								category: "Launch Landing",
								action: "bind",
								value: e.length
							}
						}), a.utils.onSuccess(d, e)
					}).catch(function (b) {
						return a.utils.onError(d, a.utils.errorToString(b))
					})
				}

				function C(b) {
					var c, d = a.eventManager.list();
					"preventDefault" in b && "function" == typeof b.preventDefault && b.preventDefault();
					for (c = 0; c < d.length; c++)
						if (0 === d[c].indexOf("acc_landing#")) throw "a popup will soon be opened";
					if (void 0 !== ca && "closed" in ca && !1 === ca.closed) throw "a popup is currently opened"
				}

				function D(b) {
					b = b || {}, delete b.swUnreachable, delete b.swActivated, ma = a.utils.extend(ma, b || {}), a.widgetManager.fire("debug", {
						type: "info",
						callee: fa,
						contents: ["Refresh state", ma]
					})
				}

				function E(b) {
					return oa.migrate().then(function () {
						return oa.retrieveState()
					}).then(function (b) {
						return "object" !== a.utils.typeOf(b) ? Promise.reject("alert state is not an object") : a.utils.empty(b.date) ? Promise.reject("alert last show date is not provided") : a.utils.isValidDate(new Date(b.date)) ? Promise.resolve(b) : Promise.reject("alert last show date is not valid date")
					}).catch(function (b) {
						return a.widgetManager.fire("debug", {
							type: "warning",
							callee: fa,
							content: b
						}), Promise.resolve({})
					}).then(function (a) {
						return F(a, b)
					})
				}

				function F(b, c) {
					var d = b.date,
						e = b.interaction || "",
						f = c.reAskingDelay,
						g = c.reAskingDelay2;
					return new Promise(function (b, c) {
						if (a.utils.empty(d) || !a.utils.isValidDate(new Date(d))) return b();
						("number" != typeof f || f < 0) && (f = 0), ("number" != typeof g || g < 0) && (g = 0);
						var h = [R.IDLE, R.CLOSED],
							i = 3600 * f * 1e3,
							j = d < a.utils.getISOTimestampDate(-i);
						return -1 === h.indexOf(e) || j ? (i = 24 * g * 3600 * 1e3, j = d < a.utils.getISOTimestampDate(-i), e !== R.DENIED || j ? b() : c("alert previously denied, wait for delay period to be over")) : c("alert already showed or closed, wait for delay period to be over")
					})
				}

				function G() {
					if (oa.isDisplayed(N.ALERT)) throw "An alert is already displayed"
				}

				function H() {
					var a = function (a, b) {
						return Array.prototype.forEach.call(a, function (a) {
							a.addEventListener("click", b, !1)
						})
					};
					a(oa.getAcceptLinks(N.ALERT), sa.accept.fromHTMLAlert), a(oa.getDenyLinks(N.ALERT), sa.deny.fromHTMLAlert), a(oa.getCloseLinks(N.ALERT), sa.close.fromHTMLAlert)
				}

				function I() {
					a.widgetManager.fire("debug", {
						callee: fa,
						content: "Closing the Landing Popup"
					}), ca && ("close" in ca && "function" == typeof ca.close && ca.close(), ca = void 0)
				}

				function J(b) {
					var c = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
						d = void 0,
						e = {
							notificationPermission: void 0,
							optinToWebNotification: void 0,
							firstOptinDate: void 0,
							firstOptinDomain: void 0
						};
					a.utils.downwardMessage("_core:getMe", null, {
						onError: function (b) {
							return a.widgetManager.fire("debug", {
								type: "warning",
								callee: fa,
								contents: ['error while "push:isOptin" command', b]
							}), d = "An error occurred while retrieving the optin status of the user", a.utils.onError(c, {
								status: d,
								details: e
							})
						},
						onSuccess: function (b) {
							return b = JSON.parse(b), e.optinToWebNotification = "Y" === b.system_optin_notifs, e.notificationPermission = ma.permission, "safari" === a.browserProperties.name ? a.safari.getPermission().then(function (f) {
								"granted" === f.permission && (e.firstOptinDate = b.firstOptinDate, e.firstOptinDomain = b.firstOptinDomain, a.utils.onSuccess(c, {
									status: d,
									details: e
								}))
							}).catch(function (b) {
								return d = "Permission is denied. User is hard optout" === b ? "This user has denied the notification permission" : "This user has not granted the notification permission, nor denied it", a.utils.onError(c, {
									status: d,
									details: e
								})
							}) : e.optinToWebNotification ? (e.firstOptinDate = b.firstOptinDate, e.firstOptinDomain = b.firstOptinDomain, d = "This user is optin", a.utils.onSuccess(c, {
								status: d,
								details: e
							})) : (d = "denied" === e.notificationPermission ? "This user has denied the notification permission" : "This user has not granted the notification permission, nor denied it", a.optinType ? K(c) : a.utils.onError(c, {
								status: d,
								details: e
							}))
						}
					})
				}

				function K(b) {
					a.utils.downwardMessage("mid:get:storage", null, {
						onSuccess: function (c) {
							var d = JSON.parse(c);
							return "Y" === d.system_optin_notifs && d.isOptin ? a.utils.onSuccess(b, {
								firstOptinDate: d.firstOptinDate,
								firstOptinDomain: d.firstOptinDomain
							}) : d.hardOptoutStatus && "denied" === window.Notification.permission ? a.utils.onError(b, {
								status: "This user has denied the notification permission",
								details: {
									notificationPermission: "denied",
									optinToWebNotification: !1
								}
							}) : "denied" === ma.permission ? a.utils.onError(b, {
								status: "This user has denied the notification permission",
								details: {
									notificationPermission: "denied",
									optinToWebNotification: !1
								}
							}) : a.utils.onError(b, {
								status: "This user has not granted the notification permission, nor denied it",
								details: {
									notificationPermission: "default",
									optinToWebNotification: !1
								}
							})
						},
						onError: function (c) {
							"profile is empty" === c && "default" === window.Notification.permission && a.utils.onError(b, {
								status: "this user has not granted the notification permission, nor denied it",
								details: {
									notificationPermission: "default",
									optinToWebNotification: !1
								}
							})
						}
					})
				}

				function L() {
					a.utils.downwardMessage("_core:getMe", null, {
						onSuccess: function (b) {
							b = JSON.parse(b), b.UDID && a.utils.downwardMessage("mid:put:storage", {
								value: {
									UDID: b.UDID
								}
							})
						}
					})
				}

				function M(b) {
					var c = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					return "denied" === ma.permission ? a.utils.onError(c, "User has denied notification permission") : a.utils.onSuccess(c)
				}! function (a, b) {
					var c = "ACC::";
					a.prototype.get = function (a) {
						var d = this.handler.getItem(c + a);
						return d = b.parseJSON(d), "object" === b.typeOf(d) ? d : void 0
					}, a.prototype.set = function (a, b) {
						return this.handler.setItem(c + a, JSON.stringify(b)), this.get(a)
					}, a.prototype.remove = function (a) {
						return this.handler.removeItem(c + a)
					}
				}(b, a.utils);
				var N = {
						ALERT: "alert"
					},
					O = {
						CLOSE_LINK: "acc--closeLink",
						DENY_LINK: "acc--denyLink",
						DENY_CONTENT: "acc--denyContent",
						ACCEPT_LINK: "acc--acceptLink",
						ACCEPT_CONTENT: "acc--acceptContent",
						MISC_CONTENT: "acc--miscContent",
						LEFT: "acc--left",
						RIGHT: "acc--right",
						TOP: "acc--top",
						BOTTOM: "acc--bottom",
						CENTER: "acc--center",
						MIDDLE: "acc--middle",
						OVERLAY: "acc--overlay",
						VISIBLE: "acc--visible",
						HIDDEN: "acc--hidden",
						MOBILE: "acc--mobile",
						DESKTOP: "acc--desktop"
					},
					P = {
						TOP_RIGHT: "topRight",
						TOP_CENTER: "topCenter",
						TOP_LEFT: "topLeft",
						MIDDLE_RIGHT: "middleRight",
						MIDDLE_CENTER: "middleCenter",
						MIDDLE_LEFT: "middleLeft",
						BOTTOM_RIGHT: "bottomRight",
						BOTTOM_CENTER: "bottomCenter",
						BOTTOM_LEFT: "bottomLeft"
					},
					Q = {
						INJECTION_FAILED: "appended of the alert has failed",
						UNKNOWN_LAYOUT: "unknown layout for given theme"
					},
					R = {
						IDLE: "idle",
						ACCEPTED: "accepted",
						CLOSED: "closed",
						DENIED: "denied"
					},
					S = {
						options: {},
						element: null,
						isAppended: !1
					},
					T = function (a) {
						var b = {},
							c = {};
						return {
							init: function () {
								b.contentHelper.setProps(b.context), b.alertStyleHelper.setProps(b.dom), b.alertFactory.setProps(b.context, b.dom, b.alertStyleHelper, b.contentHelper)
							},
							setProps: function (a, c, d, e, f) {
								b.context = a, b.dom = c, b.contentHelper = d, b.alertFactory = e, b.alertStyleHelper = f
							},
							getInstance: function (a) {
								return c[a]
							},
							instanciate: function (d) {
								var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
								if (a.hasOwnProperty(d)) throw "unknown component type";
								var f = void 0;
								switch (d) {
									case a.ALERT:
										f = b.alertFactory
								}
								c.hasOwnProperty(d) && f.destruct(c[d]), c[d] = f.construct(e)
							}
						}
					}.bind({})(N),
					U = function (a, c) {
						var d = {},
							e = this,
							f = "uiComponent-",
							g = function (a, b) {
								var c = e.abstractFactory.getInstance(a);
								return c && c.isAppended ? c.element.getElementsByClassName(b) : []
							};
						return {
							init: function (a) {
								e.storeHandler = new b(d.context.window), e.abstractFactory = a
							},
							setProps: function (a, b) {
								d.context = a
							},
							getAcceptLinks: function (a) {
								return g(a, c.ACCEPT_LINK)
							},
							getDenyLinks: function (a) {
								return g(a, c.DENY_LINK)
							},
							getCloseLinks: function (a) {
								return g(a, c.CLOSE_LINK)
							},
							show: function (a) {
								var b = e.abstractFactory.getInstance(a);
								b && "function" == typeof b.show && b.show()
							},
							hide: function (a) {
								var b = e.abstractFactory.getInstance(a);
								b && "function" == typeof b.hide && b.hide()
							},
							isDisplayed: function (a) {
								var b = e.abstractFactory.getInstance(a);
								return !(!b || "function" != typeof b.isDisplayed) && b.isDisplayed()
							},
							migrate: function (b) {
								var c = e.storeHandler.get(f + b) || {};
								return a.empty(c) ? Promise.resolve() : new Promise(function (d, g) {
									a.downwardMessage("_middle:storeInteraction", c, {
										onSuccess: function () {
											return e.storeHandler.remove(f + b), d()
										},
										onError: function (a) {
											return g(a)
										}
									})
								})
							},
							retrieveState: function (b) {
								return new Promise(function (b, c) {
									a.downwardMessage("_middle:getInteraction", null, {
										onSuccess: function (a) {
											return b(JSON.parse(a))
										},
										onError: function (a) {
											return c(a)
										}
									})
								})
							},
							storeInteraction: function (b, c) {
								var d = {
									date: a.getISOTimestampDate(),
									interaction: c
								};
								this.retrieveState().then(function (b) {
									return a.downwardMessage("_middle:storeInteraction", Object.assign(b, d))
								})
							},
							getPrefix: function () {
								return f
							}
						}
					}.bind({})(a.utils, O),
					V = function () {
						var a = {},
							b = function (a, b) {
								return a.getElementsByClassName(b)
							},
							c = function (b, c, d) {
								b.innerHTML = a.context.localizeContent(d, c)
							};
						return {
							setProps: function (b) {
								a.context = b
							},
							hydrate: function (a, d, e) {
								Object.keys(e).forEach(function (f) {
									for (var g = f, h = e[f], i = b(a, g), j = 0; j < i.length; j++) c(i[j], d, h)
								})
							}
						}
					}.bind({})(),
					W = "acc-alert",
					X = {
						BLANK: "blank",
						LIGHT: "light",
						MODERN: "modern",
						CUSTOM: "custom"
					},
					Y = function (a, b, c, d, e, f) {
						var g, h, i = {},
							j = (g = {}, _defineProperty(g, b.LIGHT, '<div id="' + c + '">\n  <div id="' + c + '-body">\n    <a id="' + c + '-close"\n       class="' + d.CLOSE_LINK + '"></a>\n    <div id="' + c + '-content"\n         class="' + d.MISC_CONTENT + '"></div>\n  </div>\n  <div id="' + c + '-buttons">\n    <a class="' + c + "-button\n              " + c + "-success\n              " + d.ACCEPT_LINK + "\n              " + d.ACCEPT_CONTENT + '"></a>\n    <a class="' + c + "-button\n              " + c + "-error\n              " + d.DENY_LINK + "\n              " + d.DENY_CONTENT + '"></a>\n  </div>\n</div>\n'), _defineProperty(g, b.MODERN, '<div id="' + c + '">\n  <div id="' + c + '-wrapper"></div>\n  <div id="' + c + '-container">\n    <div id="' + c + '-header">\n      <a id="' + c + '-close"\n         class="' + d.CLOSE_LINK + '"></a>\n    </div>\n    <div id="' + c + '-body">\n      <div id="' + c + '-content"\n           class="' + d.MISC_CONTENT + '"></div>\n    </div>\n    <div id="' + c + '-footer">\n      <a id="' + c + '-deny"\n         class="' + d.DENY_LINK + "\n                " + d.DENY_CONTENT + '"></a>\n      <a id="' + c + '-accept"\n         class="' + d.ACCEPT_LINK + " \n                " + d.ACCEPT_CONTENT + '"></a>\n    </div>\n  </div>\n</div>'), g),
							k = (h = {}, _defineProperty(h, b.LIGHT, {
								common: '#acc-alert {\n  position: fixed;\n  background: #FBFBFB;\n  box-shadow: 0 1px 4px rgba(0,0,0,0.3);\n  overflow: hidden;\n  font-family: Arial, Helvetica, sans-serif;\n  z-index: 999;\n}\n\n#acc-alert-body {\n  position: relative;\n  height: auto;\n  z-index: 1;\n  margin-bottom: 50px;\n}\n\n#acc-alert-close {\n  position: absolute;\n  top: 6px;\n  height: 12px;\n  width: 12px;\n  opacity: 0.5;\n  z-index: 2;\n  cursor: pointer;\n}\n\n#acc-alert-close:hover {\n  opacity: 1;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  position: absolute;\n  left: 3px;\n  content: " ";\n  width: 2px;\n  background-color: #000000;\n}\n\n#acc-alert-close:before {\n  transform: rotate(45deg);\n}\n\n#acc-alert-close:after {\n  transform: rotate(-45deg);\n}\n\n#acc-alert-content {\n  position: relative;\n  left: 0;\n  right: 0;\n  width: auto;\n  padding-right: 30px;\n  color: #333333;\n}\n\n#acc-alert-buttons {\n  position: absolute;\n  bottom: 0;\n  height: 50px;\n  text-align: center;\n  line-height: 45px;\n}\n\n#acc-alert-buttons a {\n  position: relative;\n  display: inline-block;\n  min-width: 84px;\n  text-align: center;\n  border-radius: 3px;\n  text-decoration: none;\n  color: #FFFFFF;\n  margin-right: 10px;\n  text-shadow: 0 2px rgba(0,0,0,0.2);\n  cursor: pointer;\n}\n\n#acc-alert-buttons a:last-child {\n  margin-right: 0;\n}\n\n#acc-alert-buttons a:active {\n  border: none;\n  top: 2px;\n}\n\n#acc-alert-buttons .acc--acceptLink {\n  background: #4EB669;\n  border-bottom: 2px solid #179B53;\n}\n\n#acc-alert-buttons .acc--acceptLink:hover {\n  background: #23B05E;\n}\n\n#acc-alert-buttons .acc--denyLink {\n  background: #CCCCCC;\n  border-bottom: 2px solid #AAAAAA;\n  color: #444444;\n  text-shadow: none;\n}\n\n#acc-alert-buttons .acc--denyLink:hover {\n  background: #BBBBBB;\n}\n\n.acc--hidden {\n  display: none;\n}\n',
								desktop: "#acc-alert * {\n  box-sizing: border-box;\n}\n\n#acc-alert {\n  top: 10px;\n  right: 10px;\n  width: 400px;\n  height: auto;\n  min-height: 150px;\n  border-radius: 4px;\n}\n\n#acc-alert-body {\n  width: 100%;\n  padding: 25px 20px 10px 20px;\n}\n\n#acc-alert-close {\n  right: 5px;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  height: 13px;\n}\n\n#acc-alert-buttons {\n  width: 100%;\n}\n\n#acc-alert-buttons a {\n  height: 35px;\n  line-height: 35px;\n  padding: 0 8px;\n  width: auto;\n}\n\n.acc--left {\n  right: initial !important;\n  left: 10px !important;\n}\n\n.acc--bottom {\n  top: initial !important;\n  bottom: 10px !important;\n}\n\n.acc--center {\n  left: calc(-200px + 50%) !important;\n  right: initial !important;\n}\n\n.acc--middle {\n  top: 50% !important;\n  bottom: initial !important;\n  transform: translateY(-50%) !important;\n}",
								mobile: "#acc-alert * {\n  box-sizing: initial;\n}\n\n#acc-alert {\n  width: 100%;\n  bottom: 0;\n}\n\n#acc-alert-body {\n  width: 90%;\n  left: 50%;\n  padding: 10px 8px 15px 8px;\n  transform: translateX(-50%);\n}\n\n#acc-alert-close {\n  right: 8px;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  height: 20px;\n}\n\n#acc-alert-buttons {\n  width: 90%;\n  left: 50%;\n  padding: 8px 8px 5px 8px;\n  transform: translateX(-50%);\n}\n\n#acc-alert-buttons a {\n  height: 45px;\n  line-height: 47px;\n  padding: 0;\n  width: 155px;\n  max-width: 47%;\n}\n\n@media all and (min-width: 650px) {\n  #acc-alert {\n    background-color: rgba(0, 0, 0, 0);\n    box-shadow: none;\n    padding-top: 15px;\n  }\n\n  #acc-alert-body {\n    min-width: 650px;\n    background: #FBFBFB;\n    width: 60%;\n    max-width: 1200px;\n    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);\n    padding-bottom: 70px;\n    margin-bottom: 0;\n    z-index: 1;\n  }\n\n  #acc-alert-buttons {\n    min-width: 650px;\n    background: #FBFBFB;\n    width: 60%;\n    max-width: 1200px;\n    z-index: 2;\n  }\n\n  #acc-alert-content {\n    margin: 0 auto;\n    padding: 0 30px;\n  }\n}\n"
							}), _defineProperty(h, b.MODERN, {
								common: '#acc-alert * {\n  box-sizing: border-box;\n}\n\n#acc-alert {\n  position: fixed;\n  font-family: Arial, Helvetica, sans-serif;\n  z-index: 999;\n  width: 100%;\n  height: 100%;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n#acc-alert-wrapper {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  z-index: 1;\n}\n\n#acc-alert-container {\n  position: absolute;\n  width: 100%;\n  background: #FBFBFB;\n  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  z-index: 2;\n  pointer-events: auto;\n}\n\n#acc-alert-header {\n  position: relative;\n  width: 100%;\n}\n\n#acc-alert-body {\n  position: relative;\n  width: 100%;\n  z-index: 1;\n}\n\n#acc-alert-footer {\n  position: relative;\n  width: 100%;\n  text-align: right;\n}\n\n#acc-alert-close {\n  position: absolute;\n  top: 6px;\n  height: 12px;\n  width: 12px;\n  opacity: 0.5;\n  z-index: 2;\n  cursor: pointer;\n}\n\n#acc-alert-close:hover {\n  opacity: 1;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  position: absolute;\n  left: 3px;\n  content: " ";\n  width: 2px;\n  background-color: #000;\n}\n\n#acc-alert-close:before {\n  transform:rotate(45deg);\n}\n\n#acc-alert-close:after {\n  transform:rotate(-45deg);\n}\n\n#acc-alert-content {\n  position: relative;\n  color: #505050;\n}\n\n#acc-alert-accept {\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 1px;\n  background: #50B766;\n  color: #fff;\n  font-weight: bold;\n  margin-left: 35px;\n  cursor: pointer;\n}\n\n#acc-alert-accept:hover {\n  background: #45A85A;\n}\n\n#acc-alert-deny {\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n  color: #808080;\n  cursor: pointer;\n}\n\n#acc-alert-deny:hover {\n  color: #505050;\n}\n\n.acc--hidden {\n  display: none;\n}\n\n.acc--overlay #acc-alert-wrapper {\n  background-color: rgba(0,0,0,0.5);\n  pointer-events: auto;\n}\n\n.acc--overlay #acc-alert-container {\n  box-shadow: none;\n}\n',
								desktop: "#acc-alert-container {\n  width: 450px;\n  border-radius: 1px;\n}\n\n#acc-alert-header {\n  height: 20px;\n}\n\n#acc-alert-body {\n  height: auto;\n  min-height: 78px;\n  padding: 0 20px;\n}\n\n#acc-alert-footer {\n  padding: 10px 20px 15px;\n}\n\n#acc-alert-close {\n  right: 5px;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  height: 10px;\n}\n\n#acc-alert-accept {\n  height: 35px;\n  line-height: 35px;\n  width: auto;\n  padding: 0 8px;\n  min-width: 125px;\n}\n\n.acc--left #acc-alert-container {\n  right: initial;\n  left: 10px;\n}\n\n.acc--bottom #acc-alert-container {\n  top: initial;\n  bottom: 10px;\n}\n\n.acc--right #acc-alert-container {\n  right: 10px;\n  left: initial;\n}\n\n.acc--top #acc-alert-container {\n  top: 10px;\n  bottom: initial;\n}\n\n.acc--center #acc-alert-container {\n  left: calc(-200px + 50%);\n  right: initial;\n}\n\n.acc--middle #acc-alert-container {\n  top: 50%;\n  bottom: initial;\n  transform: translateY(-50%);\n}\n",
								mobile: "#acc-alert-container {\n  bottom: 0;\n}\n\n#acc-alert-close {\n  right: 8px;\n}\n\n#acc-alert-close:before,\n#acc-alert-close:after {\n  height: 20px;\n}\n\n\n#acc-alert-accept {\n  height: 45px;\n  line-height: 47px;\n  padding: 0;\n  width: 155px;\n  max-width: 47%;\n  min-width: 100px;\n}\n\n@media all and (max-width: 650px) {\n  #acc-alert-container {\n    width: 100%;\n    left: 0;\n  }\n  #acc-alert-body {\n    padding: 25px 5% 0;\n  }\n\n  #acc-alert-footer {\n    padding: 15px 5% 8px;\n  }\n}\n\n@media all and (min-width: 650px) {\n  #acc-alert {\n    text-align: center;\n  }\n\n  #acc-alert-container {\n    width: 60%;\n    min-width: 650px;\n    max-width: 1200px;\n    border-radius: 1px;\n    display: inline-block;\n    text-align: initial;\n    transform: translateX(-50%)\n  }\n\n  #acc-alert-body {\n    padding: 15px 30px 0;\n  }\n\n  #acc-alert-footer {\n    padding: 15px 30px 8px;\n  }\n}\n"
							}), h);
						return {
							setProps: function (a) {
								i.dom = a
							},
							getLayout: function (a) {
								switch (a.theme) {
									case b.LIGHT:
									case b.BLANK:
										return j[b.LIGHT];
									case b.MODERN:
									case b.CUSTOM:
										return j[b.MODERN];
									default:
										throw f.UNKNOWN_LAYOUT
								}
							},
							getSheet: function (b, c) {
								return a.empty(b.theme) || !k.hasOwnProperty(b.theme) ? "" : k[b.theme].common + k[b.theme][c]
							},
							addDefaultCSSClasses: function (c, f, g) {
								var h = -1 !== [b.BLANK, b.CUSTOM].indexOf(f.theme);
								if ("desktop" === g && !h) {
									var j = -1 !== [e.TOP_LEFT, e.MIDDLE_LEFT, e.BOTTOM_LEFT].indexOf(f.position),
										k = -1 !== [e.BOTTOM_LEFT, e.BOTTOM_CENTER, e.BOTTOM_RIGHT].indexOf(f.position),
										l = -1 !== [e.TOP_LEFT, e.TOP_CENTER, e.TOP_RIGHT].indexOf(f.position),
										m = -1 !== [e.TOP_RIGHT, e.MIDDLE_RIGHT, e.BOTTOM_RIGHT].indexOf(f.position),
										n = -1 !== [e.TOP_CENTER, e.MIDDLE_CENTER, e.BOTTOM_CENTER].indexOf(f.position),
										o = -1 !== [e.MIDDLE_LEFT, e.MIDDLE_CENTER, e.MIDDLE_RIGHT].indexOf(f.position);
									j && i.dom.addClass(c, "" + d.LEFT), k && i.dom.addClass(c, "" + d.BOTTOM), m && i.dom.addClass(c, "" + d.RIGHT), l && i.dom.addClass(c, "" + d.TOP), n && i.dom.addClass(c, "" + d.CENTER), o && i.dom.addClass(c, "" + d.MIDDLE)
								}
								a.empty(f.overlay) || h || i.dom.addClass(c, "" + d.OVERLAY), i.dom.addClass(c, "" + d.HIDDEN), "mobile" === g && i.dom.addClass(c, "" + d.MOBILE), "desktop" === g && i.dom.addClass(c, "" + d.DESKTOP), -1 !== ["blank", "light", "dark"].indexOf(f.theme) && "mobile" === g && i.dom.addClass(c, "acc-alert--mobile"), -1 !== ["blank", "light", "dark"].indexOf(f.theme) && "desktop" === g && i.dom.addClass(c, "acc-alert--desktop")
							}
						}
					}.bind({})(a.utils, X, W, O, P, Q),
					Z = function (a, b, c, d, e, f) {
						var g = {},
							h = d + "-stylesheet",
							i = Object.create(f);
						return i.type = e.ALERT, i.show = function () {
							this.isAppended && (g.dom.removeClass(this.element, "" + c.HIDDEN), g.dom.addClass(this.element, "" + c.VISIBLE), -1 !== ["blank", "light", "dark"].indexOf(this.options.theme) && (g.dom.removeClass(this.element, "acc-alert--hidden"), g.dom.addClass(this.element, "acc-alert--visible")))
						}, i.hide = function () {
							this.isAppended && (g.dom.removeClass(this.element, "" + c.VISIBLE), g.dom.addClass(this.element, "" + c.HIDDEN), -1 !== ["blank", "light", "dark"].indexOf(this.options.theme) && (g.dom.removeClass(this.element, "acc-alert--visible"), g.dom.addClass(this.element, "acc-alert--hidden")))
						}, i.isDisplayed = function () {
							return this.isAppended && g.dom.hasClass(this.element, "" + c.VISIBLE)
						}, {
							construct: function (a) {
								var d;
								alert = Object.create(i), alert.options = Object.assign({}, a);
								var e = g.styleHelper.getLayout(a);
								alert.element = g.dom.createHTML(e);
								var f = g.styleHelper.getSheet(a, g.context.devicePlatform);
								g.dom.createStyleSheet(f, h), g.styleHelper.addDefaultCSSClasses(alert.element, a, g.context.devicePlatform), g.contentHelper.hydrate(alert.element, a.contents || {}, (d = {}, _defineProperty(d, c.ACCEPT_CONTENT, "accept"), _defineProperty(d, c.DENY_CONTENT, "deny"), _defineProperty(d, c.MISC_CONTENT, "misc"), d));
								var j = g.context.document.body.appendChild(alert.element);
								if (alert.isAppended = "object" == typeof j, !alert.isAppended) throw b.INJECTION_FAILED;
								return alert
							},
							destruct: function (a) {
								a && a.isAppended && (g.dom.removeElement(a.element), g.dom.removeElement(h)), a = void 0
							},
							setProps: function (a, b, c, d) {
								g.context = a, g.dom = b, g.styleHelper = c, g.contentHelper = d
							}
						}
					}.bind({})(a.utils, Q, O, W, N, S),
					$ = function () {
						var a = {};
						return {
							setProps: function (b) {
								a.context = b
							},
							create: function (b, c, d) {
								("number" != typeof d || d <= 0) && (d = 720);
								var e = new Date;
								e.setTime((new Date).getTime() + 60 * d * 60 * 1e3), e = e.toGMTString(), a.context.document.cookie = b + "=" + c + "; expires=" + e + "; path=/;"
							},
							delete: function (b) {
								a.context.document.cookie = b + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
							},
							read: function (b) {
								b = b.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
								var c = new RegExp("(?:^|;)\\s?" + b + "=(.*?)(?:;|$)", "i"),
									d = a.context.document.cookie.match(c);
								if (null === d) throw "no cookie retrieved for given name";
								return d && d[1]
							}
						}
					}.bind({})(),
					_ = function () {
						var a = {},
							c = "acc_alert",
							d = function () {
								return a.cookieHandler.delete(c)
							},
							e = function () {
								return JSON.parse(a.cookieHandler.read(c))
							},
							f = function (b) {
								var c = a.storeProps.STORE_PREFIX + a.storeProps.TYPE;
								a.storeHandler.set(c, Object.assign({}, b))
							};
						return {
							setProps: function (b, c, d, e) {
								a.context = b, a.cookieHandler = c, a.widgetManager = d, a.storeProps = e
							},
							init: function () {
								a.cookieHandler.setProps(a.context), a.storeHandler = new b(a.context.window)
							},
							flash: function () {
								var b = {};
								try {
									var c = e(),
										g = _slicedToArray(c, 2),
										h = g[0],
										i = g[1];
									a.widgetManager.fire("debug", {
										callee: "library:cookie_alert",
										contents: ["previously state flashed", "value=" + h, "creationDate=" + i]
									}), b.date = i, b.interaction = "N" === h ? "denied" : "idle", f(b), d()
								} catch (j) {
									b = null
								} finally {
									return b
								}
							}
						}
					}.bind({})(),
					aa = {
						name: "chrome",
						version: 62
					},
					ba = function () {
						var b = {},
							c = void 0,
							d = function () {
								return c.name === aa.name && c.version >= aa.version
							},
							e = function () {
								return b.widgetManager.fire("debug", {
									type: "warning",
									callee: fa,
									content: "Initiationg Chrome 62+ specific HTTP & HTTPS optin process"
								}), new Promise(function (a, c) {
									b.utils.downwardMessage("_core:getMe", null, {
										onSuccess: function (b) {
											a(f(b))
										},
										onError: function (a) {
											c(a)
										}
									})
								})
							},
							f = function (a) {
								try {
									return a = JSON.parse(a), "hardOptout" === a.__specificOptinStatus ? Promise.resolve({
										permission: "denied"
									}) : "N" === a.system_optin_notifs || b.utils.empty(a.__token) ? Promise.resolve({
										permission: "default"
									}) : Promise.resolve({
										permission: "granted"
									})
								} catch (c) {
									return Promise.reject(c)
								}
							},
							g = function (a) {
								c.name === aa.name && (b.utils.downwardMessage("_core:updateUser", {
									__specificOptinStatus: a
								}), null !== a && b.widgetManager.fire("debug", {
									type: "warning",
									callee: fa,
									content: "Setting hard optout flag"
								}))
							},
							h = function (a) {
								var b = JSON.parse(a);
								c.name !== aa.name || c.version >= aa.version || g("denied" === b.permission ? "hardOptout" : null)
							};
						return {
							setProps: function (a, d, e, f) {
								b.browserManager = a, b.utils = d, b.context = e, b.widgetManager = f, c = b.browserManager.getProperties()
							},
							getOptinState: function (b) {
								return a.optinType ? Promise.resolve() : d() ? e() : (h(b), Promise.resolve())
							},
							setStatus: g
						}
					};
				a.push = {};
				var ca, da = {
						NONE: "none",
						SHOW_ALERT: "showAlert"
					},
					ea = {
						BROWSER_UNCOMPLIANT: "current browser not compliant for push plugin",
						ENDPOINT_ALREADY_GENERATED: "an endpoint has already been generated",
						NO_ENDPOINT_RETRIEVED: "no endpoint has been retrieved",
						NO_NOTIFICATION_API_COMPLIANCY: "no notification api compliancy",
						NO_SERVICE_WORKER_COMPLIANCY: "no service worker compliancy",
						PUSH_PERMISSION_DENIED: "native push permission is denied",
						PUSH_PERMISSION_NOT_GRANTED: "native push permission is not granted",
						PUSH_PERMISSION_ALREADY_GRANTED: "native push permission is already granted",
						SERVICE_WORKER_NOT_ACTIVATED: "service worker is not activated/registered",
						UNTARGETED_BY_CONFIGURATION: "current browser not targeted by push plugin configuration"
					},
					fa = "plugin:push",
					ga = {},
					ha = {
						scenario: da.NONE,
						browsers: {},
						alertOptions: {},
						landingOptinOptions: {}
					},
					ia = {
						theme: X.LIGHT,
						position: P.TOP_RIGHT,
						reAskingDelay: 24,
						reAskingDelay2: 24
					},
					ja = {
						theme: "light",
						width: 462,
						height: 135
					},
					ka = {},
					la = ["plugin:started", "landingFeedback:optin", "landingFeedback:softOptout", "landingFeedback:hardOptout"],
					ma = {
						serviceworker: void 0,
						token: void 0,
						permission: void 0
					},
					na = Object.create(T),
					oa = Object.create(U),
					pa = ba();
				ka["_push:popupFeedback"] = function (b) {
					a.widgetManager.fire("debug", {
						callee: fa,
						content: "Receive feedback from popup"
					});
					var c = a.eventManager.getMessageBody(b);
					a.optinType && "safari" !== a.browserProperties.name && (c = a.eventManager.getOptinTypeBody(b)), D(c);
					try {
						h(), a.widgetManager.fire("debug", {
							type: "success",
							callee: fa,
							content: "user is now optin"
						}), k(), a.utils.downwardMessage("_core:hashField", {
							__token: ma.token,
							__userAuth: ma.userAuth,
							__userPublicKey: ma.userPublicKey
						}, {
							onSuccess: function (b) {
								try {
									b = JSON.parse(b)
								} catch (d) {
									a.widgetManager.fire("debug", {
										type: "warning",
										callee: fa,
										contents: ["Error while parsing the hashed fields", a.utils.errorToString(d)]
									})
								}
								var c = Object.assign({}, b, {
									isOptin: !0
								});
								a.utils.downwardMessage("mid:put:storage", {
									value: c
								})
							},
							onError: function (b) {
								return a.widgetManager.fire("debug", {
									type: "warning",
									callee: fa,
									contents: ["Error while hashing the fields", a.utils.errorToString(b)]
								})
							}
						}), L(), v(), a.customEventManager.trigger("landingFeedback:optin"), "object" === a.utils.typeOf(ga.welcomeOptions) && a.utils.downwardMessage("_fireWidget", {
							widget: "notification",
							options: ga.welcomeOptions
						})
					} catch (e) {
						var d = a.utils.errorToString(e);
						a.widgetManager.fire("debug", {
							type: "warning",
							callee: fa,
							contents: ["user is still optout", d]
						}), l(), d === ea.PUSH_PERMISSION_DENIED ? s() : a.customEventManager.trigger("landingFeedback:softOptout")
					}
				}, ka["_push:refreshState"] = function (b) {
					return D(a.eventManager.getMessageBody(b))
				}, a.push.prepare = function () {
					try {
						a.browserProperties = a.browserManager.getProperties(), na.setProps(a.context, a.dom, V, Z, Y), na.init(), oa.setProps(a.context), oa.init(na), _.setProps(a.context, $, a.widgetManager, {
							STORE_PREFIX: oa.getPrefix(),
							TYPE: N.ALERT
						}), _.init(), pa.setProps(a.browserManager, a.utils, a.context, a.widgetManager), ga = a.utils.extend(ha, a.settings.dependencies.push || {}), ga.alertOptions = a.utils.extend(ia, ga.alertOptions), ga.landingOptinOptions = a.utils.extend(ja, ga.landingOptinOptions), x(a.browserProperties), y(), z()
					} catch (b) {
						return a.widgetManager.fire("debug", {
							type: "warning",
							callee: fa,
							content: "Push plugin disabled: " + a.utils.errorToString(b)
						}), o()
					}
				}, a.push.hideAlertGdpr = function () {
					oa.isDisplayed(N.ALERT) && oa.hide(N.ALERT)
				}, a.push.start = function () {
					return "safari" === a.browserProperties.name ? (e(), n(), A(), a.utils.downwardMessage("_dependencyStarted", "push")) : a.utils.downwardMessage("_sw:plugin_push_prepare", null, {
						onError: function (a) {
							console.log(a)
						},
						onSuccess: function (b) {
							ma = a.utils.extend(ma, JSON.parse(b)), a.widgetManager.fire("debug", {
								callee: fa,
								contents: ["Prepared with current state", ma]
							}), a.customEventManager.trigger("plugin:started", Object.assign({}, ga), !0), void 0 === ma.serviceworker && a.widgetManager.fire("debug", {
								callee: fa,
								content: "non secure origin: sw unreachable"
							}), pa.getOptinState(b).then(function (a) {
								void 0 !== a && D(a)
							}).then(function () {
								return a.optinType ? m().then(function () {
									return e(), n(), A(), a.utils.downwardMessage("_dependencyStarted", "push")
								}).catch(function (b) {
									return g(), n(), A(), a.utils.downwardMessage("_dependencyStarted", "push")
								}) : (e(), n(), A(), a.utils.downwardMessage("_dependencyStarted", "push"))
							}).catch(function (b) {
								if (a.widgetManager.fire("debug", {
										type: "debug",
										callee: fa,
										contents: ["Error during specific browser permission flow", b]
									}), b === ea.PUSH_PERMISSION_DENIED || ea.PUSH_PERMISSION_NOT_GRANTED) return n(), a.utils.downwardMessage("_dependencyStarted", "push")
							})
						}
					})
				}, a.push.disablePlugin = function () {
					p()
				}, a.push.askPermission = function (b, c) {
					return c = c || {}, a.utils.downwardMessage("_sw:plugin_push_askPermission", null, c)
				};
				var qa = function () {
						return "safari" === a.browserProperties.name ? a.safari.prepareSafari() : Notification.requestPermission().then(function (b) {
							if ("granted" === b) return void(a.optinType && a.utils.downwardMessage("mid:put:storage", {
								value: {
									hardOptoutStatus: !1
								}
							}));
							throw "denied" === b ? (l(), new Error("Permission is denied")) : (a.optinType && a.utils.downwardMessage("mid:put:storage", {
								value: {
									hardOptoutStatus: !1
								}
							}), a.customEventManager.trigger("landingFeedback:softOptout"), new Error("Permission is in default state"))
						})
					},
					ra = function (b) {
						return new Promise(function (c, d) {
							return "default" !== a.context.window.Notification.permission ? a.utils.empty(b) || "Y" !== b.system_optin_notifs ? c(qa()) : d(ea.PUSH_PERMISSION_ALREADY_GRANTED) : c(qa())
						})
					};
				a.push.askPermissionTop = function () {
					return ta().then(function (a) {
						return ra(a).then(i).then(L)
					}).catch(ua)
				}, a.push.showAlert = function (b, d) {
					d = d || {}, b = b || {};
					var e = Object.assign({}, ga.alertOptions, b),
						f = [a.utils.promisify(function () {
							return c()
						}), a.utils.promisify(function () {
							return j()
						}), a.utils.promisify(function () {
							return G()
						}), E(e)];
					return m().then(function () {
						Promise.all(f).then(function () {
							na.instanciate(N.ALERT, e), oa.storeInteraction(N.ALERT, R.IDLE), H(), oa.show(N.ALERT), a.utils.downwardMessage("_fireWidget", {
								widget: "subtrack",
								options: {
									type: "event",
									category: "HTML Alert",
									action: "display"
								}
							})
						}).catch(function (b) {
							if (b) return "profile is empty" === b && E(e).then(function () {
								na.instanciate(N.ALERT, e), oa.storeInteraction(N.ALERT, R.IDLE), H(), oa.show(N.ALERT), a.utils.downwardMessage("_fireWidget", {
									widget: "subtrack",
									options: {
										type: "event",
										category: "HTML Alert",
										action: "display"
									}
								})
							}), a.widgetManager.fire("debug", {
								callee: fa,
								contents: [b]
							})
						})
					}).catch(function (b) {
						E(e).then(function () {
							na.instanciate(N.ALERT, e), oa.storeInteraction(N.ALERT, R.IDLE), H(), oa.show(N.ALERT), a.utils.downwardMessage("_fireWidget", {
								widget: "subtrack",
								options: {
									type: "event",
									category: "HTML Alert",
									action: "display"
								}
							})
						}).catch(function (b) {
							if (b) return a.widgetManager.fire("debug", {
								callee: fa,
								contents: [b]
							})
						})
					})
				}, a.push.launchPopup = function (b) {
					if ("safari" === a.browserProperties.name) return oa.hide(N.ALERT), a.safari.prepareSafari();
					if (!a.optinType) {
						var c = "acc_landing#" + a.utils.generateUUID(),
							d = "https://" + a.settings.alias + a.settings.aliasPath + a.ASSETS.LANDING + "?" + a.widgetManager.getDebugQueryParams(),
							e = "menubar=no, status=no, scrollbars=no, toolbar=no, menubar=no, location=no, directories=no, resizable=no, width=" + ga.landingOptinOptions.width + ", height=" + ga.landingOptinOptions.height;
						try {
							C(b)
						} catch (f) {
							return a.widgetManager.fire("debug", {
								callee: fa,
								contents: ["Launching of the optinisation popup has been prevented", f]
							})
						}
						return ca = a.context.window.open(d, c, e), j().then(function () {
							if (void 0 === ca) return Promise.reject("landing not launched");
							a.eventManager.add(c, function () {
								a.widgetManager.fire("debug", {
									type: "info",
									callee: fa,
									content: "Popup launched"
								}), a.eventManager.remove(c), oa.hide(N.ALERT)
							})
						}).catch(function (b) {
							oa.hide(N.ALERT), I(), a.eventManager.remove(c), a.widgetManager.fire("debug", {
								type: "warning",
								callee: fa,
								contents: ["Unable to launch popup", a.utils.errorToString(b)]
							})
						})
					}
					oa.isDisplayed(N.ALERT) && oa.hide(N.ALERT), a.push.askPermissionTop()
				};
				var sa = {
						accept: {
							fromLaunchLanding: function (a) {
								return u(a, "Launch landing")
							},
							fromHTMLAlert: function (a) {
								oa.storeInteraction(N.ALERT, R.ACCEPTED), u(a, "HTML Alert")
							}
						},
						deny: {
							fromHTMLAlert: function (b) {
								a.utils.downwardMessage("_fireWidget", {
									widget: "subtrack",
									options: {
										type: "event",
										category: "HTML Alert",
										action: "click",
										label: "deny"
									}
								}), "preventDefault" in b && "function" == typeof b.preventDefault && b.preventDefault(), oa.storeInteraction(N.ALERT, R.DENIED), oa.hide(N.ALERT)
							}
						},
						close: {
							fromHTMLAlert: function (b) {
								a.utils.downwardMessage("_fireWidget", {
									widget: "subtrack",
									options: {
										type: "event",
										category: "HTML Alert",
										action: "click",
										label: "close"
									}
								}), "preventDefault" in b && "function" == typeof b.preventDefault && b.preventDefault(), oa.storeInteraction(N.ALERT, R.CLOSED), oa.hide(N.ALERT)
							}
						}
					},
					ta = function () {
						return new Promise(function (b, c) {
							a.utils.downwardMessage("_core:getMe", null, {
								onError: function (b) {
									return c(a.utils.errorToString(b))
								},
								onSuccess: function (a) {
									try {
										return b(JSON.parse(a))
									} catch (d) {
										return c(d)
									}
								}
							})
						})
					},
					ua = function (b) {
						var c = a.utils.errorToString(b);
						"Permission is denied" === c && s(), a.widgetManager.fire("debug", {
							type: "debug",
							filename: fa,
							contents: ["Permission status: ", c]
						})
					};
				a.dependencyManager.resourceIncluded("push", "top:push")
			}(n),
			function (a) {
				var b = function (a) {
						var b = {
								event: [{
									field: "id",
									type: "numeric"
								}, {
									field: "details",
									type: "object",
									optional: !0
								}],
								lead: [{
									field: "label",
									type: "string"
								}, {
									field: "value",
									type: "string",
									formattedDate: !0
								}],
								item: [{
									field: "id",
									type: "string"
								}, {
									field: "price",
									type: "numeric"
								}, {
									field: "currency",
									type: "string"
								}, {
									field: "quantity",
									type: "numeric",
									default: 1
								}, {
									field: "label",
									type: "string",
									optional: !0
								}, {
									field: "category",
									type: "string",
									optional: !0
								}],
								cart: [{
									field: "id",
									type: "string",
									optional: !0
								}, {
									field: "item",
									type: "object"
								}],
								purchase: [{
									field: "id",
									type: "string"
								}, {
									field: "price",
									type: "numeric"
								}, {
									field: "currency",
									type: "string"
								}, {
									field: "items",
									type: "array",
									optional: !0
								}]
							},
							c = {},
							d = function (b) {
								return function (d) {
									var e = {};
									return a.each(b, function (a, b) {
										var f = b.field,
											g = (new c.Option).addValue(d[f]).addRules(b).validate().toValue();
										b.optional && void 0 === g || (e[f] = g)
									}), e
								}
							},
							e = d(b.item);
						return this.setProps = function (a) {
							c.Option = a
						}, this.instanciate = function (c, f) {
							if ("object" !== a.typeOf(f)) throw "given options is not an object";
							var g = b[c],
								h = Object.assign({}, d(g)(f));
							if ("cart" === c) try {
								h.item = Object.assign({}, e(f.item))
							} catch (j) {
								throw "item " + a.errorToString(j)
							}
							if ("purchase" === c && "array" === a.typeOf(f.items)) {
								h.items = [];
								var i = f.items.slice();
								a.each(i, function (b, c) {
									try {
										h.items.push(Object.assign({}, e(c)))
									} catch (j) {
										throw "item #" + (b + 1) + " " + a.errorToString(j)
									}
								})
							}
							return {
								type: c,
								params: h
							}
						}, this
					}.bind({})(a.utils, F),
					c = function (a, b) {
						var c = {
								event: {
									id: "type",
									details: "value"
								},
								cart: {
									id: "cartId"
								},
								cartItem: {
									id: "articleId",
									price: "unitPrice"
								},
								purchase: {
									id: "purchaseId",
									price: "total"
								}
							},
							d = {
								event: "BMA4SEvent",
								lead: "BMA4SLead",
								cart: "BMA4SCart",
								purchase: "BMA4SPurchase"
							},
							e = function (b) {
								return function (d) {
									var e = Object.assign({}, d),
										f = c[b] || {};
									return a.each(f, function (a, b) {
										return e[b] = e[a]
									}), a.each(f, function (a) {
										return delete e[a]
									}), e
								}
							},
							f = e("cartItem");
						return this.commit = function (c) {
							var g = d[c.type],
								h = Object.assign({}, e(c.type)(c.params));
							if (h.date = a.getISOTimestampDate(), "event" === c.type && (h = {
									events: [Object.assign({}, h)]
								}), "cart" === c.type) {
								delete h.item;
								var i = Object.assign({}, f(c.params.item));
								h = Object.assign({}, h, i), h.label = h.label || "", h.category = h.category || ""
							}
							var j = {
								owner: b.ACCENGAGE,
								type: g,
								body: {
									method: "POST",
									body: h
								}
							};
							a.downwardMessage("_action:add", j)
						}, this
					}.bind({})(a.utils, a.OWNERS);
				a.track = function (a, b, c, d, e, f, g) {
					var h = this,
						i = "plugin:track",
						j = {};
					this.prepare = function () {
						j = Object.assign({}, c.getDependencyOptions("track"))
					}, this.start = function () {
						f.setProps(F), k(), a.downwardMessage("_dependencyStarted", "track")
					}, this.disablePlugin = function () {
						l()
					}, this.add = function (b) {
						return function (c) {
							var d = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
							try {
								var h = f.instanciate(b, c);
								g.commit(h), e.fire("debug", {
									type: "info",
									callee: i,
									contents: ["Add " + h.type, h.params]
								}), a.onSuccess(d, h)
							} catch (j) {
								return e.fire("debug", {
									type: "warning",
									callee: i,
									contents: ["Invalid " + b, j, Object.assign({}, c)]
								}), void a.onError(d, a.errorToString(j))
							}
						}
					};
					var k = function () {
							d.add("track:event", h.add("event")), d.add("track:lead", h.add("lead")), d.add("track:purchase", h.add("purchase")), d.add("track:cart", h.add("cart"))
						},
						l = function () {
							d.add("track:event", a.voidness), d.add("track:lead", a.voidness), d.add("track:purchase", a.voidness), d.add("track:cart", a.voidness)
						};
					return this
				}.bind({})(a.utils, a.context, a.dependencyManager, a.logicManager, a.widgetManager, b, c), a.dependencyManager.resourceIncluded("track", "top:track")
			}(n), s._controllersPlugged = function (a) {
				n.eventManager.remove("_controllersPlugged"), n.widgetManager.fire("debug", {
					type: "log",
					content: "`top` plugged"
				}), l()
			}, s._stopNotifying = function (a) {
				m()
			};
		s._dependencyLoaded = function (a) {
			var b = n.eventManager.getMessageBody(a);
			n.dependencyManager.dependencyLoaded(b), n.widgetManager.fire(n.WIDGET.DEBUG, {
				content: "`" + b + "` loaded +" + (1 * new Date - n.context.startDate) + " ms"
			}), n.dependencyManager.prepareDependency(b), -1 !== ["core", "storage"].indexOf(b) && n.dependencyManager.isDependencyLoaded("core") && n.dependencyManager.isDependencyLoaded("storage") && n.utils.downwardMessage("_core:instanciateUser", k(), {
				onSuccess: function (a) {
					a = JSON.parse(a), n.utils.downwardMessage("_fireWidget", {
						widget: n.WIDGET.SUBTRACK,
						options: {
							type: "start",
							clientId: a.UDID,
							masterDomain: n.settings.alias,
							navigatingDomain: a.__currentDomain
						}
					}), n.safari.makeBackupProfile(a)
				}
			})
		}, s._dependencyStarted = function (a) {
			var b = n.eventManager.getMessageBody(a);
			n.dependencyManager.dependencyStarted(b), n.widgetManager.fire(n.WIDGET.DEBUG, {
				content: "`" + b + "` started +" + (1 * new Date - n.context.startDate) + " ms"
			}), n.dependencyManager.isSDKLoaded() && p.consume()
		}, s._sdkLoaded = function () {
			n.dependencyManager.setSDKLoaded(!0), n.widgetManager.fire(n.WIDGET.DEBUG, {
				type: "success",
				content: "SDK loaded +" + (1 * new Date - n.context.startDate) + " ms"
			}), n.customEventManager.trigger("sdkLoaded", Object.assign({}, n.settings), !0), n.utils.downwardMessage("_fireWidget", {
				widget: n.WIDGET.SUBTRACK,
				options: {
					type: "page",
					url: n.context.window.location.pathname
				}
			}), n.settings.dependencies.allowDataCollection || !1 ? (n.dependencyManager.startGdprDependencies(), n.utils.downwardMessage("_core:getOptinData", null, {
				onError: function (a) {
					return n.widgetManager.fire(n.WIDGET.DEBUG, {
						type: "debug",
						content: "Optin data has not been set. Waiting for optinData to be set"
					})
				},
				onSuccess: function (a) {
					a = JSON.parse(a), a.optinData && n.dependencyManager.startDependencies()
				}
			})) : n.dependencyManager.startDependencies();
			var b = a.slice();
			a.length = 0, p = new C(b), a.push = function () {
				p.push(arguments), p.consume()
			}, p.consume()
		}, s["_top:loadResource"] = function (a) {
			var b = n.eventManager.getMessageBody(a);
			b && n.dom.loadJS(b)
		}, s["_top:isContextSecure"] = function (a) {
			var b = n.eventManager.getMessageTopic(a);
			n.context.isHTTPS ? n.utils.downwardFeedback(b, !0) : n.utils.downwardFeedback(b, null, !0)
		}, s["_top:isCompliantWithPlugin"] = function (a) {
			var b = n.eventManager.getMessageTopic(a),
				c = (n.eventManager.getMessageBody(a) || "").toUpperCase();
			if (!(c in n.PLUGIN_COMPLIANCY)) return n.utils.downwardFeedback(b, null, !0, n.optinType);
			n.browserManager.isTargeted(n.PLUGIN_COMPLIANCY[c]) ? n.utils.downwardFeedback(b, !0, null, n.optinType) : n.utils.downwardFeedback(b, null, !0, n.optinType)
		}, s._triggerCustomEvent = function (a) {
			"string" == typeof n.eventManager.getMessageBody(a) && n.customEventManager.trigger("string")
		}, s._downLoaded = function (a) {
			s._controllersPlugged()
		}, s._downInitialisation = function (a) {
			n.utils.downwardMessageToWW("_downInitialisation", a.data.body, null, n.optinType)
		}, s["_top:removeSw"] = function (a) {
			n.swHandler.removeSw()
		}, s["_top:getOptinType"] = function (a) {
			var b = n.eventManager.getMessageTopic(a);
			return n.utils.downwardMessageToWW(b, {
				optinType: n.optinType
			}, null, n.optinType)
		};
		var G = function (a) {
				var b = !1,
					c = n.eventManager.getMessageType(a),
					d = n.eventManager.getMessageBody(a),
					e = n.eventManager.getMessageTopic(a);
				v || n.utils.empty(c) || -1 === c.indexOf("_storage") || (n.utils.downwardMessage("_middle:prepareStorageMiddle"), v = !0);
				for (var f = ["_resourceLoaded", "_storage:get", "_storage:put", "_storage:remove", "_storage:removeLock", "_storage:update", "_storage:conditionalUpdate", "_storage:push", "_storage:pop", "_storage:commit", "_storage:rollback", "_middle:loadResource"], g = 0; g < f.length; g++) c === f[g] && (b = !0, n.utils.downwardMessage(c, Object.assign(d, {
					topic: e
				})));
				return b
			},
			H = function (a) {
				var b = n.eventManager.getMessageTopic(a),
					c = n.eventManager.getMessageBody(a);
				a.data.storageOneStep ? n.utils.downwardMessageToWW(b, c, null, !0) : n.eventManager.trigger(a)
			},
			I = function (a, b, c) {
				var d = ["core", "_resourceLoaded", "_action:add"],
					e = n.utils.createPayloadMessage(a, b);
				if (e) {
					if (n.optinType) {
						if (-1 !== a.indexOf("sw")) {
							if (c) return j(e, c, !1);
							var g = new MessageEvent(e.type, {
								data: e
							});
							return n.eventManager.trigger(g)
						}
						for (var h = 0; h < d.length; h++)
							if (-1 !== a.indexOf(d[h])) return c ? j(e, c, !0) : n.utils.downwardMessageToWW(a, b, c, n.optinType)
					}
					return c ? j(e, c) : u ? r.postMessage(e, f()) : void 0
				}
			},
			J = function (a, b, c) {
				var d = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3],
					e = n.utils.createPayloadMessage(a, b);
				if (e) return d ? t.postMessage(e) : r.postMessage(e, f())
			},
			K = function (a, b, c) {
				var d = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3],
					e = n.utils.createPayloadFeedback(a, b, c);
				if (e) return d ? t.postMessage(e) : r.postMessage(e, f())
			},
			L = function (a) {
				G(a) || n.eventManager.trigger(a)
			};
		c()
	}(a[a.AccengageWebSDKObject["eu.winnernotification.net"]])
}(window);