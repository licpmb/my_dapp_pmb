const { ethers } = require("ethers");
// Cargar dotenv
require('dotenv').config();

// // Reemplaza con tu URL de Alchemy
// const alchemyUrl =
//   "https://eth-sepolia.g.alchemy.com/v2/sv9e5nOMVMZrnDLvmNJsUl-bLEaXHS6h";

// Acceder a las variables de entorno
const alchemyUrl = process.env.ALCHEMY_URL;
const apiKey = process.env.API_KEY;
const port = process.env.PORT;
// Crear un proveedor usando la URL de Alchemy
const provider = new ethers.JsonRpcProvider(alchemyUrl);

// Obtener el número de bloque actual
async function getBlockNumber() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Número de bloque actual:', blockNumber);
  } catch (e) {
    console.error('Error al obtener el número de bloque', e);
  }
}

getBlockNumber();