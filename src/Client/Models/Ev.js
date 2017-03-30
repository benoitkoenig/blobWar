// An event class, to attach events like in Backbone.Events
export default class Ev {

	constructor() {
		this.Event_events = {};
	}

	trigger(name, params) { if (this.Event_events[name] != null) (this.Event_events[name])(params); }

	on(name, cb) { this.Event_events[name] = cb; }

}
