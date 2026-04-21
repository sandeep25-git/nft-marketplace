import { ethers } from "ethers";

export const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
};

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum);
};

export const connectWallet = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = getProvider();
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    return { provider, signer, address };
};

export const getConnectedWallet = async () => {
    try {
        if (!window.ethereum) return null;

        // ✅ Check accounts first
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (!accounts || accounts.length === 0) return null;

        const provider = getProvider();

        // ✅ Use the account address directly instead of relying on getSigner().getAddress()
        const signer = provider.getSigner(accounts[0]);
        const address = accounts[0];

        return { provider, signer, address };
    } catch (e) {
        console.error("getConnectedWallet error:", e);
        return null;
    }
};