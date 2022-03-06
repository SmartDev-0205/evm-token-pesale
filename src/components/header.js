import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import imgMetamask from "../components/assets/metamask.svg";
import "./assets/css/mobile.css";
import "./assets/css/custom.css";
import "./assets/css/fontStyle.css";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	background: "transparent",
	boxShadow: "none",
}));

export default function Header() {
	/* ------------ connect wallet --------------*/

	const wallet = useWallet();
	var styledAddress = wallet.account
		? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
		: "";

	//check connection
	const handleChainChanged = (chainId) => {
		let { ethereum } = window;
		if (ethereum.isConnected() && Number(chainId) === 4) {
			onConnect();
		}
	};

	React.useEffect(() => {
		checkConnection();
	}, []);

	const checkConnection = async () => {
		let { ethereum } = window;
		if (ethereum !== undefined) {
			const chainId = await ethereum.request({ method: "eth_chainId" });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await provider.listAccounts();
			if (accounts.length !== 0 && Number(chainId) === 4) {
				onConnect();
			}
			ethereum.on("chainChanged", handleChainChanged);
		}
	};

	const onConnect = () => {
		if (wallet.status !== "connected") {
			wallet.connect().catch((err) => {
				alert("please check metamask!");
			});
		}
	};

	const disconnect = () => {
		if (wallet.status === "connected") {
			wallet.reset();
		}
	};

	return (
		<Container>
			<Grid item md={12} sm={12} xs={12}>
				<Item>
					{wallet.status === "connected" ? (
						<button
							className="connectbutton noselect x_font_w_3"
							style={{ textTransform: "none" }}
							onClick={disconnect}>
							<img
								src={imgMetamask}
								alt="wallet"
								style={{
									width: "1.5em",
									height: "1.5em",
									marginRight: 10,
								}}
							/>
							Disconnect
						</button>
					) : (
						<button
							onClick={() => onConnect()}
							className="connectbutton noselect x_font_w_3"
							style={{ textTransform: "none" }}>
							{wallet.status === "connecting" ? (
								<div>
									<span
										className="spinner-border"
										role="status"
										style={{
											width: "1.5em",
											height: "1.5em",
											marginRight: 10,
										}}></span>
									<span className="sr-only">
										Loading...
									</span>
								</div>
							) : (
								<div>
									<img
										src={imgMetamask}
										alt="wallet"
										style={{
											width: "1.5em",
											height: "1.5em",
											marginRight: 10,
										}}
									/>
									Connect
								</div>
							)}
						</button>
					)}
				</Item>
			</Grid>
		</Container >
	);
}
