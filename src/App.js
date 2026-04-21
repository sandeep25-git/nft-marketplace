import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';

import { useEffect } from "react";
import { ethers } from "ethers";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
   useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected wallet:", address);
      } catch (err) {
        console.error("Wallet connection error:", err.message);
      }
    };

    connectWallet();
  }, [])
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/nftPage" element={<NFTPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellNFT" element={<SellNFT />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
