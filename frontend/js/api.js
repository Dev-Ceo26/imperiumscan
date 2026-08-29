const API_BASE = window.location.origin.includes('imperiumscan.com') 
  ? 'https://api.imperiumscan.com' 
  : 'http://localhost:30334';

async function fetchStatus() {
  const res = await fetch(`${API_BASE}/api/status`);
  return res.json();
}

async function fetchBlock(number) {
  const res = await fetch(`${API_BASE}/api/block/${number}`);
  return res.json();
}

async function fetchLastBlocks(count = 10) {
  const status = await fetchStatus();
  const lastBlock = status.blockNumber;
  const blocks = [];
  for (let i = 0; i < Math.min(count, lastBlock); i++) {
    const block = await fetchBlock(lastBlock - i);
    blocks.push(block);
  }
  return blocks;
}
