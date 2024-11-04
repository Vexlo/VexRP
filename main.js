// main.js
const express = require('express');
const bodyParser = require('body-parser');
const DiscordRPC = require('discord-rpc');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let rpc = null; // Zmienna na połączenie RPC

app.post('/connect', (req, res) => {
  const { clientId } = req.body;

  // Inicjalizuj nowe połączenie RPC
  rpc = new DiscordRPC.Client({ transport: 'ipc' });
  rpc.login({ clientId }).catch(console.error);

  rpc.on('ready', () => {
    console.log(`RPC connected to the client ${clientId}`);
    res.status(200).json({ message: 'Linked' });
  });
});

app.post('/update', (req, res) => {
  const { state, details, largeImageKey, largeImageText, smallImageKey, smallImageText } = req.body;

  if (rpc) {
    rpc.setActivity({
      state: state || '',
      details: details || '',
      largeImageKey: largeImageKey || 'default_large',
      largeImageText: largeImageText || '',
      smallImageKey: smallImageKey || 'default_small',
      smallImageText: smallImageText || '',
      instance: false,
    });
    res.sendStatus(200);
  } else {
    res.status(400).json({ error: 'RPC is not connected' });
  }
});

app.listen(3000, () => {
  console.log('The server operates on http://localhost:3000');
});
