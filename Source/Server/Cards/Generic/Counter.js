export default {
	init: function() {
		this._counter = 0;
	},

	triggerCheck: function(data, army) {
		if (this._counter != 0) return true;
	},

	triggerDo: function(data, army) {
		this._counter = this.counterMax;
	},

	iterate: function(army, enemy) {
		if (this._counter == 0) return true;
		this._counter -= 1;
		if (this._counter == 0) {
			this.endOfCounter(army, enemy)
			return true;
		};
	}
}
