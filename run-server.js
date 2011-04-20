#!/usr/bin/env node

var fs   = require('fs');
var path = require('path');

var BOSH_DEFAULT_CONFIG_PATH = '/etc/bosh.js.conf';



function show_version() {
	var pkg_str = fs.readFileSync("./package.json");
	var pkg_info = JSON.parse(pkg_str);
	console.log(pkg_info.name + ": BOSH server version " + pkg_info.version);
}

function main() {
	var opts = require('tav').set({
		logging: {
			note: "The logging level to use (default: DEBUG)", 
			value: -1
		}, 
		path: {
			note: "The HTTP PATH at which to run the BOSH server (default: /http-bind/)", 
			value: -1
		}, 
		port: {
			note: "The port on which to run the BOSH server (default: 5280)", 
			value: -1
		}, 
		version: {
			note: "Display version info and exit", 
			value: false
		}, 
		config: {
			note: "The config file to load (default: /etc/bosh.js.conf). NOTE: Command " + 
				"line options (if specified) will override options in the config file", 
			value: BOSH_DEFAULT_CONFIG_PATH
		}
	}, "Usage: bosh_server [option=value]");

	if (opts.version) {
		show_version();
		return;
	}

	var server_options = { };

	if (opts.config) {
		if (opts.config[0] != '/') {
			opts.config = "./" + opts.config;
		}

		try {
			var _cfg = require(opts.config);
			server_options = _cfg.config;
		}
		catch(ex) {
			if (opts.config != BOSH_DEFAULT_CONFIG_PATH) {
				console.error("Caught Exception: '" + ex.toString() + "' while trying to read " + 
					"config file '" + opts.config + "'");
				process.exit(2);
			}
		}
	}

	if (opts.port == -1) {
		if (!server_options.port) {
			server_options.port = 5280;
		}
	}
	else {
		var _port = Math.ceil(opts.port);
		if (!_port) {
			_port = 5280;
		}
		server_options.port = _port;
	}

	if (opts.path == -1) {
		if (!server_options.path) {
			server_options.path = '/http-bind/';
		}
	}
	else {
		if (opts.path.length > 0 && opts.path[0] != "/") {
			opts.path = "/" + opts.path;
		}
		server_options.path = opts.path;
	}

	if (opts.logging == -1) {
		if (!server_options.logging) {
			server_options.logging = 'DEBUG';
		}
	}
	else {
		server_options.logging = opts.logging.toUpperCase();
	}



	var nxb    = require("./src/main.js");

	var msg = "Starting the BOSH server on port '" + server_options.port + "' at '" + new Date() + "'";
	var hr  = "+-" + nxb.dutil.repeat('-', msg.length).join('') + "-+";
	console.log(hr);
	console.log("| " + msg + " |");
	console.log(hr);

	var server = nxb.start(server_options);

}

// Go!!
main();

// server.stop();