export default { // Card casted by a specific blob
	init: function() {
		this.blob = null;
		this.idBlobCasting = null;
		this.cancel = () => { // This function is defined in the spell context
			this.removeStatus(this.blob);
			this.blob.currentSpell = null;
			this.blob = null;
			this.idBlobCasting = null;
		}

		this.getCurrentBlob = () => { return this.idBlobCasting; }
	},

	triggerCheck: function(data, army) {
		const blob = army[data.idBlob];
		if (!blob.alive) return true;
		if (blob.currentSpell != null && blob.currentSpell._cancelable != true) return true;
	},

	isUnavailable: function() {
		return false;
	},

	triggerDo: function(data, army) {
		this.blob = army[data.idBlob];
		this.idBlobCasting = data.idBlob;
		if (this.blob.currentSpell != null) this.blob.currentSpell.cancel();
		this.blob.currentSpell = this;
	},

	iterate: function(army, enemy) {
		if (this.blob && !this.blob.alive) {
			this.cancel();
		}
		if (this.blob == null) {
			if (this.idBlobCasting !== null) {
				this.idBlobCasting = null;
			}
			return true;
		}
	},
}
