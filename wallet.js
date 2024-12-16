const { ethers } = require("ethers");
require("dotenv").config();

// URL del proveedor de Sepolia desde el archivo .env
const sepoliaUrl = process.env.SEPOLIA_URL;

// Crear un proveedor usando la URL de Sepolia
const provider = new ethers.JsonRpcProvider(sepoliaUrl);

// Cargar la billetera desde una clave privada
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

async function sendTransaction() {
  const tx = {
    to: "TARGET_ADDRESS", // Dirección de destino que debes especificar
    value: ethers.parseEther("0.01"), // Cantidad a enviar en ETH
    gasLimit: 21000,
    // gasPrice: opcional, puedes dejar que el proveedor determine el precio adecuado
  };

  try {
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transacción enviada:", txResponse.hash);

    // Esperar a que la transacción sea validada
    const receipt = await txResponse.wait();
    console.log("Transacción validada:", receipt);
  } catch (e) {
    console.error("Error al enviar la transacción", e);
  }
}

sendTransaction();

/* 
Llamadas más usadas en ethers.js
Proveedores (providers)
Creación de un proveedor

const provider = new ethers.JsonRpcProvider(url);
Obtener el número de bloque actual

const blockNumber = await provider.getBlockNumber();
Obtener el saldo de una dirección

const balance = await provider.getBalance(address);
Obtener información de un bloque

const block = await provider.getBlock(blockNumber);
Obtener el historial de transacciones de una dirección

const history = await provider.getHistory(address);
Obtener el precio del gas

const gasPrice = await provider.getGasPrice();
Obtener una transacción

const tx = await provider.getTransaction(transactionHash);
Obtener el estado de una transacción

const txReceipt = await provider.getTransactionReceipt(txHash);
Wallets
Crear una billetera aleatoria

const wallet = ethers.Wallet.createRandom();
console.log("Address:", wallet.address);//para conocer la cuenta
console.log("Private Key:", wallet.privateKey); //para conocer la clave privada
Cargar una billetera desde una clave privada

const wallet = new ethers.Wallet(privateKey);
Conectar una billetera a un proveedor

const connectedWallet = wallet.connect(provider);
Firmar un mensaje

const signedMessage = await wallet.signMessage(message);
Enviar una transacción

const txResponse = await wallet.sendTransaction(transaction);
Utilidades
Convertir Ether a Wei

const weiAmount = ethers.parseEther("1.0");
Convertir Wei a Ether

const etherAmount = ethers.formatEther(weiAmount);
Calcular el hash de un mensaje

const messageHash = ethers.hashMessage(message);
Obtener la dirección de un contrato a partir de su bytecode

const contractAddress = ethers.getContractAddress(transaction);
Contratos
Conectar a un contrato

const contract = new ethers.Contract(contractAddress, abi, provider);
Llamar a una función de solo lectura

const result = await contract.someReadOnlyFunction();
Enviar una transacción a una función de escritura

const txResponse = await contract.someWriteFunction(params, { gasLimit, gasPrice });
Escuchar eventos de un contrato

contract.on("EventName", (param1, param2, event) => {
  console.log(param1, param2, event);
});
*/