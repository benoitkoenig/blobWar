// Only for SingleBlobSpell
export default { // If a blob is casting and another asks, he takes it from the first one
	init: function() {
		this._previousBlob = null;
	},

	triggerCheck: function(data, army) {
		if (this.blob == army[data.idBlob]) {
			// The blob re-triggered the card to cancel the spell
			this.cancel();
			return true;
		}
		this._previousBlob = this.blob;
	},

	triggerDo: function(data, army) {
		if (this._previousBlob != null) { // Another blob was casting it ; we take it from him
			this.removeStatus(this._previousBlob);
			this._previousBlob.currentSpell = null;
			this._previousBlob = null;
		}
	},

	iterate: function(army, enemy) {
	}
}
