export default {
	init: function() {},

	triggerCheck: function(data, army) {},

	triggerDo: function(data, army) {},

	iterate: function(army, enemy) {
		if (this._idBlob != null) army[this._idBlob].removeIterate = true;
	}
}
