// public/script.js
document.getElementById('connect-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const clientId = document.getElementById('clientId').value;

  try {
    await fetch('/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId }),
    });

    alert('Connected to Discord RPC');
    document.getElementById('rpc-form').style.display = 'block';
    document.getElementById('connect-form').style.display = 'none';
  } catch (error) {
    console.error('Error while connecting:', error);
  }
});

document.getElementById('rpc-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const state = document.getElementById('state').value;
  const details = document.getElementById('details').value;
  const largeImageKey = document.getElementById('largeImageKey').value;
  const largeImageText = document.getElementById('largeImageText').value;
  const smallImageKey = document.getElementById('smallImageKey').value;
  const smallImageText = document.getElementById('smallImageText').value;

  try {
    await fetch('/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, details, largeImageKey, largeImageText, smallImageKey, smallImageText }),
    });
    alert('Status zaktualizowany');
  } catch (error) {
    console.error('Error when updating status:', error);
  }
});
