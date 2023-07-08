const { Network, Alchemy } = require("alchemy-sdk");

export const apiKey = "rnIswm-I5NMa9WvzxReFEbJb2Ajc9iiS";

const settings = {
  apiKey, 
  network: Network.ETH_MAINNET, 
};

export const alchemy = new Alchemy(settings);