import Contract from "web3-eth-contract";
import Web3WsProvider from "web3-providers-ws";
import abi from "../abi.json";

Contract.setProvider(
	new Web3WsProvider(
		"wss://ropsten.infura.io/ws/v3/e0521fe0263543b79880ef251466bf33"
	)
);

const ocean = (window.ocean = new Contract(
	abi,
	"0x97cF2bB8186439935894ce9628993B5476bB9343"
));

export { ocean };