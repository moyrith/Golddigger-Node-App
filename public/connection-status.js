export function connectionStatus() {
  const connectionStatusEl = document.getElementById('connection-status')

  connectionStatusEl.textContent = navigator.onLine ? 'Live Price 🟢' : 'Disconnected 🔴'
}