// In this module, I don't extend classes bc composition is better than inheritance
// When trigger is called, we lanuch all triggerCheck. If one of them returns true, we stop there
// Otherwise all triggerDo are called
// All iterate get called at every iteration
// Note that SingleBlobSpell is called by almost all spells, and LastToCast, FirstToCast, RemoveIterate and Cancelable are mostly useless without it

import SingleBlobSpell from "./SingleBlobSpell.js"
import LastToCast from "./LastToCast.js"
import FirstToCast from "./FirstToCast.js"
import UseOnce from "./UseOnce.js"
import Counter from "./Counter.js"
import RemoveIterate from "./RemoveIterate.js"
import Cancelable from "./Cancelable.js"

const CardCategory = {
	SingleBlobSpell,
	LastToCast,
	FirstToCast,
	UseOnce,
	Counter,
	RemoveIterate,
	Cancelable
};

class Card {
	constructor(composedWith) {
		this._composedWith = composedWith;
		for (let name of composedWith) {
			CardCategory[name].init.call(this);
		}
	}

	trigger(data, army) {
		const shouldReturn = this._composedWith.map(name => CardCategory[name].triggerCheck.call(this, data, army));
		if (shouldReturn.find(isTrue => isTrue)) return true;
		this._composedWith.forEach(name => CardCategory[name].triggerDo.call(this, data, army));
	}

	iterate(army, enemy) {
		const returnOk = this._composedWith.map(name => CardCategory[name].iterate.call(this, army, enemy));
		return returnOk.find(isTrue => isTrue);
	}

	isAvailable() {
		return !(this._composedWith.find(name => (CardCategory[name].isUnavailable || CardCategory[name].triggerCheck).call(this)));
	}

	cancel() {}
}

export default Card;
