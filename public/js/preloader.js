$(document).ready(function() {
	$("body").queryLoader2({
		barColor: "#000",
		backgroundColor: "#eee",
		percentage: !1,
		barHeight: 2,
		completeAnimation: "grow"
	})
}),
	function(a) {
	function b(a) {
		this.parent = a, this.container, this.loadbar, this.percentageContainer
	}

	function c(a) {
		this.toPreload = [], this.parent = a, this.container
	}

	function d(a) {
		this.element, this.parent = a
	}

	function e(d, e) {
		this.element = d, this.$element = a(d), this.options = e, this.foundUrls = [], this.destroyed = !1, this.imageCounter = 0, this.imageDone = 0, this.alreadyLoaded = !1, this.preloadContainer = new c(this), this.overlayLoader = new b(this), this.defaultOptions = {
			onComplete: function() {},
			backgroundColor: "#000",
			barColor: "#2aaa85",
			overlayId: "qLoverlay",
			barHeight: 1,
			percentage: !1,
			deepSearch: !0,
			completeAnimation: "fade",
			minimumTime: 500
		}, this.init()
	}
	b.prototype.createOverlay = function() {
		var b = "absolute";
		if ("body" == this.parent.element.tagName.toLowerCase()) b = "fixed";
		else {
			var c = this.parent.$element.css("position");
			("fixed" != c || "absolute" != c) && this.parent.$element.css("position", "relative")
		}
		this.container = a("<div id='" + this.parent.options.overlayId + "'></div>").css({
			width: "100%",
			height: "100%",
			backgroundColor: this.parent.options.backgroundColor,
			backgroundPosition: "fixed",
			position: b,
			zIndex: 666999,
			top: 0,
			left: 0
		}).appendTo(this.parent.$element), this.loadbar = a("<div id='qLbar'></div>").css({
			height: this.parent.options.barHeight + "px",
			marginTop: "-" + this.parent.options.barHeight / 2 + "px",
			backgroundColor: this.parent.options.barColor,
			width: "0%",
			position: "absolute",
			top: "50%"
		}).appendTo(this.container), 1 == this.parent.options.percentage && (this.percentageContainer = a("<div id='qLpercentage'></div>").text("0%").css({
			height: "40px",
			width: "100px",
			position: "absolute",
			fontSize: "3em",
			top: "50%",
			left: "50%",
			marginTop: "-" + (59 + this.parent.options.barHeight) + "px",
			textAlign: "center",
			marginLeft: "-50px",
			colour: this.parent.options.barColor
		}).appendTo(this.container)), this.parent.preloadContainer.toPreload.length && 1 != this.parent.alreadyLoaded || this.parent.destroyContainers()
	}, b.prototype.updatePercentage = function(a) {
		this.loadbar.stop().animate({
			width: a + "%",
			minWidth: a + "%"
		}, 200), 1 == this.parent.options.percentage && this.percentageContainer.text(Math.ceil(a) + "%")
	}, c.prototype.create = function() {
		this.container = a("<div></div>").appendTo("body").css({
			display: "none",
			width: 0,
			height: 0,
			overflow: "hidden"
		}), this.processQueue()
	}, c.prototype.processQueue = function() {
		for (var a = 0; this.toPreload.length > a; a++) this.parent.destroyed || this.preloadImage(this.toPreload[a])
			}, c.prototype.addImage = function(a) {
		this.toPreload.push(a)
	}, c.prototype.preloadImage = function(a) {
		var b = new d;
		b.addToPreloader(this, a), b.bindLoadEvent()
	}, d.prototype.addToPreloader = function(b, c) {
		this.element = a("<img />").attr("src", c), this.element.appendTo(b.container), this.parent = b.parent
	}, d.prototype.bindLoadEvent = function() {
		this.parent.imageCounter++;
		var a = this.element.attr("src");
		this.element.removeAttr("src");
		var b = this;
		setTimeout(function() {
			b.element.on("load error", b, function(a) {
				a.data.completeLoading()
			}), b.element.attr("src", a)
		}, 1)
	}, d.prototype.completeLoading = function() {
		this.parent.imageDone++;
		var a = this.parent.imageDone / this.parent.imageCounter * 100;
		this.parent.overlayLoader.updatePercentage(a), this.parent.imageDone == this.parent.imageCounter && this.parent.endLoader()
	}, e.prototype.init = function() {
		this.options = a.extend({}, this.defaultOptions, this.options);
		this.findImageInElement(this.element);
		if (1 == this.options.deepSearch)
			for (var c = this.$element.find("*:not(script)"), d = 0; d < c.length; d++) this.findImageInElement(c[d]);
		this.preloadContainer.create(), this.overlayLoader.createOverlay()
	}, e.prototype.findImageInElement = function(b) {
		var c = "",
			e = a(b),
			f = "normal";
		if ("none" != e.css("background-image") ? (c = e.css("background-image"), f = "background") : "undefined" != typeof e.attr("src") && "img" == b.nodeName.toLowerCase() && (c = e.attr("src")), !this.hasGradient(c)) {
			c = this.stripUrl(c);
			for (var g = c.split(", "), h = 0; h < g.length; h++)
				if (this.validUrl(g[h]) && this.urlIsNew(g[h])) {
					var i = "";
					if (this.isIE() || this.isOpera()) i = "?rand=" + Math.random(), this.preloadContainer.addImage(g[h] + i);
					else if ("background" == f) this.preloadContainer.addImage(g[h] + i);
					else {
						var j = new d(this);
						j.element = e, j.bindLoadEvent()
					}
					this.foundUrls.push(g[h])
				}
		}
	}, e.prototype.hasGradient = function(a) {
		return -1 == a.indexOf("gradient") ? !1 : !0
	}, e.prototype.stripUrl = function(a) {
		return a = a.replace(/url\(\"/g, ""), a = a.replace(/url\(/g, ""), a = a.replace(/\"\)/g, ""), a = a.replace(/\)/g, "")
	}, e.prototype.isIE = function() {
		return navigator.userAgent.match(/msie/i)
	}, e.prototype.isOpera = function() {
		return navigator.userAgent.match(/Opera/i)
	}, e.prototype.validUrl = function(a) {
		return a.length > 0 && !a.match(/^(data:)/i) ? !0 : !1
	}, e.prototype.urlIsNew = function(a) {
		return -1 == this.foundUrls.indexOf(a) ? !0 : !1
	}, e.prototype.destroyContainers = function() {
		this.destroyed = !0, this.preloadContainer.container.remove(), this.overlayLoader.container.remove()
	}, e.prototype.endLoader = function() {
		this.destroyed = !0, this.onLoadComplete()
	}, e.prototype.onLoadComplete = function() {
		if ("grow" == this.options.completeAnimation) {
			var b = 500;
			this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
				width: "100%"
			}, b, function() {
				a(this).animate({
					top: "0%",
					width: "100%",
					height: "100%"
				}, 500, function() {
					this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
						this.parent.destroyContainers(), this.parent.options.onComplete()
					})
				})
			})
		} else this.overlayLoader.container[0].parent = this, this.overlayLoader.container.fadeOut(500, function() {
			this.parent.destroyContainers(), this.parent.options.onComplete()
		})
			}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
		var b = this.length >>> 0,
			c = Number(arguments[1]) || 0;
		for (c = c < 0 ? Math.ceil(c) : Math.floor(c), c < 0 && (c += b); c < b; c++)
			if (c in this && this[c] === a) return c;
		return -1
	}), a.fn.queryLoader2 = function(a) {
		return this.each(function() {
			new e(this, a)
		})
	}
}(jQuery);