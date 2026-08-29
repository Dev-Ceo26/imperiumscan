const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('../config/config.json');

const app = express();
const PORT = process.env.PORT || 30334;

app.use(cors());
app.use(express.json());

// Endpoint per ottenere lo stato della chain
app.get('/api/status', async (req, res) => {
  try {
    const response = await axios.post(config.rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1
    });
    res.json({
      status: 'ok',
      blockNumber: parseInt(response.data.result, 16),
      chainId: config.chainId,
      network: config.network
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint per ottenere un blocco
app.get('/api/block/:number', async (req, res) => {
  try {
    const blockNumber = req.params.number;
    const response = await axios.post(config.rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [`0x${parseInt(blockNumber).toString(16)}`, true],
      id: 1
    });
    res.json(response.data.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Imperium Scan Backend running on port ${PORT}`);
});
