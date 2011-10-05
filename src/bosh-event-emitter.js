// -*-  tab-width:4  -*-

/*
 * Copyright (c) 2011 Dhruv Matani
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

var EventPipe   = require('eventpipe').EventPipe;
var util        = require('util');
var dutil       = require('./dutil.js');


function BoshEventPipe(http_server) {
    this.server = http_server;
}

util.inherits(BoshEventPipe, EventPipe);

dutil.copy(BoshEventPipe.prototype, {
	stop: function () {
		return this.server.close();
	},

	set_session_data: function (sessions) {
		this.sid_state = sessions.get_sessions_obj();
	},

	set_stream_data: function (streams) {
		this.sn_state = streams.get_streams_obj();
		this.stat_stream_add = streams.stat_stream_add;
		this.stat_stream_terminate = streams.stat_stream_terminate;
	}
});

exports.BoshEventPipe = BoshEventPipe;
