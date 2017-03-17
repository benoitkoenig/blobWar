export default { // A blob cannot cast this card if another blob is already casting it
	init: function() {
		this._idBlob = null;
	},

	triggerCheck: function(data, army) {
		if (this._idBlob != null) return true;
	},

	triggerDo: function(data, army) {
		army[data.idBlob].canCastSpell = false;
		this.setStatus(army[data.idBlob]);
		this._idBlob = data.idBlob;
	},

	iterate: function(army, enemy) {
		if (this._idBlob == null) return true;
	}
}
