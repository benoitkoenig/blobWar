export default {
	init: function() {
		this._used = false;
	},

	triggerCheck: function(data, army) {
		if (this._used) return true;
	},

	triggerDo: function(data, army) {
		this._used = true;
	},

	iterate: function(army, enemy) {
	}
}
