export default {
	init: function() {
		this._used = false;
	},

	triggerCheck: function(data, army) {
		return this._used;
	},

	triggerDo: function(data, army) {
		this._used = true;
	},

	iterate: function(army, enemy) {},
}
