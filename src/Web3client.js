import Web3 from "web3";

let selectedAccount;

let erc20Contract;

let erc20ContractPool;

let isInitialized = false;

export const init = () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    //metamask is installed

    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log(accounts);
      })
      .catch((err) => {
        console.log(err);
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  const web3 = new Web3(provider);

  const erc20Abi = [
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalBurn",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getReserves",
      outputs: [
        { internalType: "uint112", name: "_reserve0", type: "uint112" },
        { internalType: "uint112", name: "_reserve1", type: "uint112" },
        { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  erc20Contract = new web3.eth.Contract(
    erc20Abi,
    "0x45CdaF3Fd17BD31d9830Fa977159162DD2431683"
  );
  erc20ContractPool = new web3.eth.Contract(
    erc20Abi,
    "0xf3F119cEb9A59e15DfC9D4989Df39ac076D2796b"
  );

  isInitialized = true;
};

// wavax contract 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

export const getLiquidityTJ = async () => {
  if (!isInitialized) {
    await init();
  }

  return erc20ContractPool.methods
    .getReserves()
    .call()
    .then((pool) => {
      return [
        Web3.utils.fromWei(pool._reserve0),
        Web3.utils.fromWei(pool._reserve1),
      ];
    });
};

export const getTotalSupply = async () => {
  if (!isInitialized) {
    await init();
  }

  return erc20Contract.methods.totalSupply().call();
};

export const getTotalBurn = async () => {
  if (!isInitialized) {
    await init();
  }

  return erc20Contract.methods.totalBurn().call();
};
