import Web3 from "web3";

let selectedAccount;

let erc20Contract;

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
  ];

  erc20Contract = new web3.eth.Contract(
    erc20Abi,
    "0x440aBbf18c54b2782A4917b80a1746d3A2c2Cce1"
  );

  isInitialized = true;
};

export const getTotalSupply = async () => {
  if (!isInitialized) {
    await init();
  }

  return erc20Contract.methods.totalSupply().call();
};
