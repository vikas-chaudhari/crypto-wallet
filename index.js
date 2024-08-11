// bip39 library is not working for me so I am using ethers library
let mnemonics = "";

let phraseBtn = document.getElementById("phraseBtn");
phraseBtn.addEventListener("click", function () {
  mnemonics = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));

  const phraseList = mnemonics.split(" ");
  console.log(phraseList);

  let ul = document.getElementById("phraseList");
  ul.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    let li = document.createElement("li");
    li.innerHTML = phraseList[i];
    ul.appendChild(li);
  }
});

let walletCount = 1;
createWallet.addEventListener("click", function () {
  if (!mnemonics) {
    alert("please generate Mnemonic first");
  } else {
    // const path = ethers.utils.defaultPath;
    // console.log(path);
    // const seed = ethers.utils.mnemonicToSeed(mnemonics);
    // console.log(seed);

    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonics);
    const seed = hdNode.derivePath(`m/44'/60'/0'/0/${walletCount}`);

    let walletAddresses = document.getElementById("walletAddresses");
    let p = document.createElement("p");
    let walletLabel = document.createElement("span");
    let walletAddress = document.createElement("span");
    walletLabel.setAttribute("class", "wallet-label");
    walletAddress.setAttribute("class", "wallet-address");
    walletLabel.innerHTML = `Wallet ${walletCount++}`;
    walletAddress.innerHTML = seed.publicKey;
    p.appendChild(walletLabel);
    p.appendChild(walletAddress);
    walletAddresses.appendChild(p);
  }
});
