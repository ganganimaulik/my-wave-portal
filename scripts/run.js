const main = async () => {
  const [_, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  let randomPersonBalance = await hre.ethers.provider.getBalance(
    randomPerson.address
  );
  console.log(
    "Random person balance:",
    hre.ethers.utils.formatEther(randomPersonBalance)
  );
  let myBalance = await hre.ethers.provider.getBalance(
    randomPerson.address
  );
  console.log(
    "my person balance:",
    hre.ethers.utils.formatEther(myBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log("waveCount: ", waveCount.toNumber());

  /**
   * Let's send a few waves!
   */
  let waveTxn = await waveContract.connect(randomPerson).wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  waveTxn = await waveContract.connect(randomPerson).wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  randomPersonBalance = await hre.ethers.provider.getBalance(
    randomPerson.address
  );
  console.log(
    "Random person balance:",
    hre.ethers.utils.formatEther(randomPersonBalance)
  );

  myBalance = await hre.ethers.provider.getBalance(_.address);
  console.log(
    "my balance:",
    hre.ethers.utils.formatEther(myBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log("allWaves: ", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
