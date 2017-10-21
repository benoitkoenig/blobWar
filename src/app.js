// I know this isnt a good pratice, but simply uncomment this for electron packaging is the easiest option I came up with

/*
import {app, BrowserWindow} from 'electron'
import path from 'path'
import url from 'url'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'Client/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
*/

import http from "http";
import express from "express";
import socket from "socket.io";
import Game from "./Server/Game.js";

const appExpress = express();
const server = http.createServer(appExpress);
const io = socket.listen(server);

appExpress.use("/", express.static(__dirname + "/Client"));

// When a user connects, he can either look for an opponent or fight an idle opponent (bot)
io.on("connection", (socket) => {
	socket.on("action", (action) => {
		if (action.category === "Idle") {
			Game.playerAgainstIdle(socket, action.cards);
		} else if (action.category === "Bot") {
			Game.playerAgainstBot(socket, action.cards);
		} else if (action.category === "MatchMaking") {
			Game.playerJoin(socket, action.cards);
		}
	});
});

server.listen(process.env.PORT || 8080); // process.env.PORT is for Heroku
