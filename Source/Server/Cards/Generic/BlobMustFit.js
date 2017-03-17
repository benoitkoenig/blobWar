export default { // Card casted by a specific blob
	init: function() {},

	triggerCheck: function(data, army) {
		const blob = army[data.idBlob];
		if (!blob.canCastSpell || !blob.alive) return true;
	},

	triggerDo: function(data, army) {},

	iterate: function(army, enemy) {
		if (this._idBlob == null) return true;
		if (!army[this._idBlob].alive) {
			this._idBlob = null;
			return true;
		}
	}
}
