export default { // Card casted by a specific blob
	init: function() {
		this.blob = null;
		this.cancel = () => { // This functionis defined in the spell context
			this.removeStatus(this.blob);
			this.blob.currentSpell = null;
			this.blob = null;
		}
	},

	triggerCheck: function(data, army) {
		const blob = army[data.idBlob];
		if (!blob.alive) return true;
		if (blob.currentSpell != null && blob.currentSpell._cancelable != true) return true;
	},

	triggerDo: function(data, army) {
		this.blob = army[data.idBlob];
		if (this.blob.currentSpell != null) this.blob.currentSpell.cancel();
		this.blob.currentSpell = this;
	},

	iterate: function(army, enemy) {
		if (this.blob && !this.blob.alive) {
			this.cancel();
		}
		if (this.blob == null) return true;
	}
}
