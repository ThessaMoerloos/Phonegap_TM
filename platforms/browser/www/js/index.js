/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		initGame();
    }
};

var game, preload, playgame;

preload = function (game) {}
preload.prototype = {
	preload: function () {
		game.load.spritesheet('pacman', 'assets/pacman.png', 32, 32, 5);
	},
	create: function () {
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		game.state.start("PlayGame");
	}
}

playgame = function (game) {}
playgame.prototype = {
	create: function () {
		pacman = game.add.sprite(game.width/2, game.height/2, "pacman");
		pacman.animations.add('pacman', [0,1,2], 6, true);
		pacman.animations.play('pacman');
		pacman.anchor.set(0.5);
	},
	update: function () {
		pacman.x = game.width/2;
		pacman.y = game.height/2;
	}
}

function initGame() {
	// hide Phonegap app
	var app = document.querySelector(".app");
	app.setAttribute("style", "display:none;");
	
	// init Phaser game
	game = new Phaser.Game(300, 300);
	game.state.add("Preload", preload);
	game.state.add("PlayGame", playgame);
	game.state.start("Preload");
}

