var irc = require("irc");
var Backbone = require("backbone");
var moment = require("moment");

var models =
	module.exports =
		{};

var id = 1;

models.User = Backbone.Model.extend({
	defaults: {
		mode: "",
		name: ""
	}
});

models.UserCollection = Backbone.Collection.extend({
	model: models.User,
	comparator: function(user) {
		// Keep the collection sorted in alphabetical order
		return user.get("name");
	}
});

models.Message = Backbone.Model.extend({
	defaults: {
		time: "",
		user: "",
		text: ""
	},
	initialize: function() {
		this.set("time", moment().format("HH:mm"));
	}
});

models.MessageCollection = Backbone.Collection.extend({
	model: models.Message
});

models.Channel = Backbone.Model.extend({
	defaults: {
		type: "channel",
		name: "",
		topic: ""
	},
	initialize: function() {
		this.set({
			id: id++
		});

		this.set("users", new models.UserCollection());
		this.get("users").on(
			"add remove",
			function(model, collection) {
				// Bubble event
				this.trigger(
					"users", {
						target: this.get("id"),
						data: collection
					}
				);
			},
			this
		);

		this.set("messages", new models.MessageCollection());
		this.get("messages").on(
			"add",
			function(model, collection) {
				// Bubble event
				this.trigger(
					"messages", {
						target: this.get("id"),
						data: collection.last()
					}
				);
			},
			this
		);
	}
});

models.ChannelCollection = Backbone.Collection.extend({
	model: models.Channel
});

models.Network = Backbone.Model.extend({
	defaults: {
		host: "",
		nick: "default_username",
		connect: true
	},
	initialize: function() {
		this.set({
			id: id++,
		});

		this.set("channels", new models.ChannelCollection());
		this.get("channels").on(
			"all",
			function(type, model, collection) {
				if ([
					"users",
					"messages"
				].indexOf(type) != -1) {
					this.trigger(type, model);
				} else {
					// Bubble event
					this.trigger(
						"channels", {
							target: this.get("id"),
							data: collection
						}
					);
				}
			},
			this
		);
		this.get("channels").add(new models.Channel({
			type: "network",
			name: this.get("host")
		}));

		if (this.get("connect")) {
			this.irc = new irc.Client(
				this.get("host"),
				this.get("nick"), {
					channels: ["#test_channel"]
				}
			);
		}

		this.on("remove", function() {
			if (typeof this.irc !== "undefined") {
				this.irc.disconnect();
			}
		});
	}
});

models.NetworkCollection = Backbone.Collection.extend({
	model: models.Network,
	initialize: function() {
		this.add(new models.Network({
			host: "Lobby",
			connect: false
		}));
	},
	find: function(id) {
		var networks = this.models;
		for (var i = 0; i < networks.length; i++) {
			var find = networks[i].get("channels").findWhere({id: id});
			if (find) {
				return {
					network: networks[i],
					channel: find
				};
			}
		}
	}
});