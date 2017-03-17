export default { // If a blob is casting and another asks, he takes it from the first one
	init: function() {
		this._idBlob = null;
	},

	triggerCheck: function(data, army) {
		if (this._idBlob == data.idBlob) {
			// The blob re-triggered the card to cancel the spell
			army[this._idBlob].cancelPreviousSpell();
			return true;
		}
	},

	triggerDo: function(data, army) {
		if (this._idBlob != null) {
			// Another blob was casting it ; we take it from him
			army[this._idBlob].cancelPreviousSpell();
		}
		const blob = army[data.idBlob];
		blob.cancelPreviousSpell(() => {
			this.removeStatus(blob);
			this._idBlob = null;
		});
		this.setStatus(blob);
		this._idBlob = data.idBlob;
	},

	iterate: function(army, enemy) {
		if (this._idBlob == null) return true;
	}
}
