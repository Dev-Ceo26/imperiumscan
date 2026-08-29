document.addEventListener('DOMContentLoaded', async () => {
  const blockHeightEl = document.getElementById('blockHeight');
  const lastBlockEl = document.getElementById('lastBlock');
  const blocksListEl = document.getElementById('blocksList');
  
  try {
    const status = await fetchStatus();
    blockHeightEl.textContent = `Block: ${status.blockNumber}`;
    lastBlockEl.textContent = status.blockNumber;
    
    const blocks = await fetchLastBlocks(10);
    blocksListEl.innerHTML = blocks.map((b, i) => `
      <div class="block-item" style="border-bottom:1px solid #222;padding:10px 0;display:flex;justify-content:space-between">
        <span>#${status.blockNumber - i}</span>
        <span>${new Date(parseInt(b.timestamp) * 1000).toLocaleTimeString()}</span>
        <span>${b.transactions ? b.transactions.length : 0} txs</span>
        <span style="color:#6C3CE1">${b.miner ? b.miner.slice(0,10)+'...' : 'Quantum'}</span>
      </div>
    `).join('');
  } catch (e) {
    blocksListEl.textContent = 'Errore nel caricamento dei dati';
  }
});
