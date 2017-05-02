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
	SingleBlobSpell: SingleBlobSpell,
	LastToCast: LastToCast,
	FirstToCast: FirstToCast,
	UseOnce: UseOnce,
	Counter: Counter,
	RemoveIterate: RemoveIterate,
	Cancelable: Cancelable
};

class Card {
	constructor(composedWith) {
		this._composedWith = composedWith;
		for (let name of composedWith) {
			CardCategory[name].init.call(this);
		}
	}

	trigger(data, army) {
		let shouldReturn = false;
		for (let name of this._composedWith) {
			shouldReturn = CardCategory[name].triggerCheck.call(this, data, army) || shouldReturn;
		}
		if (shouldReturn) return true;
		for (let name of this._composedWith) {
			CardCategory[name].triggerDo.call(this, data, army);
		}
	}

	iterate(army, enemy) {
		let returnOk = false;
		for (let name of this._composedWith) {
			returnOk = CardCategory[name].iterate.call(this, army, enemy) || returnOk;
		}
		return returnOk;
	}
}

Card.prototype.cancel = function() {}

export default Card;
