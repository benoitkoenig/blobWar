// In this module, I don't extend classes bc composition is better than inheritance
// When trigger is called, we lanuch all triggerCheck. If one of them returns true, we stop there
// Otherwise all triggerDo are called
// All iterate get called at every iteration

import LastToCast from "./LastToCast.js"
import FirstToCast from "./FirstToCast.js"
import BlobMustFit from "./BlobMustFit.js"
import UseOnce from "./UseOnce.js"
import Counter from "./Counter.js"
import RemoveIterate from "./RemoveIterate.js"

const CardCategory = {
	LastToCast: LastToCast,
	FirstToCast: FirstToCast,
	BlobMustFit: BlobMustFit,
	UseOnce: UseOnce,
	Counter: Counter,
	RemoveIterate: RemoveIterate
};

export default class Card {

	constructor() {
		this.__composedWith = [];
	}

	trigger(data, army) {
		let shouldReturn = false;
		for (let name of this.__composedWith) {
			shouldReturn = CardCategory[name].triggerCheck.call(this, data, army) || shouldReturn;
		}
		if (shouldReturn) return true;
		army[data.idBlob].cancelPreviousSpell();
		for (let name of this.__composedWith) {
			CardCategory[name].triggerDo.call(this, data, army);
		}
	}

	iterate(army, enemy) {
		let returnOk = false;
		for (let name of this.__composedWith) {
			returnOk = CardCategory[name].iterate.call(this, army, enemy) || returnOk;
		}
		return returnOk;
	}

	composeWith(names) {
		this.__composedWith = names;
		for (let name of names) {
			CardCategory[name].init.call(this);
		}
	}

}
