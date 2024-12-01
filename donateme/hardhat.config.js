

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    networks:{
      hardhat: {},
      sepolia: {
        url: 'https://eth-sepolia.g.alchemy.com/v2/c_Y4a2nrxGK89ixc6VogfVCrDtN2jk7X',
        accounts: ['0x{process.env.PRIVATE_KEY}'],  
        chainId: 11155111
  
  
    },
  },
}

};
