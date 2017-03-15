// An event class, to attach events like in Backbone.Events. I think it is a pretty clever way to organize code
class Event {

	constructor() {
		this.Event_events = {};
	}

	trigger(name, params) { if (this.Event_events[name] != null) (this.Event_events[name])(params); }

	on(name, cb) { this.Event_events[name] = cb; }

}
