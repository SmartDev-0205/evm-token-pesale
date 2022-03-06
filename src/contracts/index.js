import { ethers } from "ethers";

// import Contrats from "./contracts/4002.json";
import Contrats from "./contracts/4.json";

const supportChainId = 4;

const RPCS = {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
}

const providers = {
    1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    4: new ethers.providers.JsonRpcProvider(RPCS[4]),
}

const tokenContract = new ethers.Contract(Contrats.token.address, Contrats.token.abi, providers[supportChainId]);
const presaleContract = new ethers.Contract(Contrats.presale.address, Contrats.presale.abi, providers[supportChainId]);

export {
    providers, tokenContract, presaleContract
}