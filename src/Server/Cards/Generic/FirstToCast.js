// Only for SingleBlobSpell
export default { // A blob cannot cast this card if another blob is already casting it
	init: function() {},

	triggerCheck: function(data, army) {
		return (this.blob != null); // if a blob is currently casting, then we cancel the new trigger
	},

	triggerDo: function(data, army) {},

	iterate: function(army, enemy) {},
}
