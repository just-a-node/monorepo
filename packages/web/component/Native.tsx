import React from "react";
import { Button, Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { xNatibeNFTABI } from "../lib/web3/abis/xNativeNFTABI";
import { injected } from "../lib/web3/injected";

export const Native: React.FC = () => {
  const contractABI = xNatibeNFTABI;
  const [NFTContractAddress, setNFTContractAddress] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [domainId, setDomainId] = useState("");
  const { activate, library } = useWeb3React<Web3Provider>();

  const handleNFTContractAddressChange = (e: any) => {
    const inputValue = e.target.value;
    setNFTContractAddress(inputValue);
  };
  const handleAddressFromChange = (e: any) => {
    const inputValue = e.target.value;
    setAddressFrom(inputValue);
  };
  const handleAddressToChange = (e: any) => {
    const inputValue = e.target.value;
    setAddressTo(inputValue);
  };
  const handleTokenIdChange = (e: any) => {
    const inputValue = e.target.value;
    setTokenId(inputValue);
  };
  const handleDomainIdChange = (e: any) => {
    const inputValue = e.target.value;
    setDomainId(inputValue);
  };

  const xCall = async () => {
    activate(injected).then(async () => {
      const contract = new ethers.Contract(NFTContractAddress, contractABI, library?.getSigner());
      const tx = await contract.xSend(addressFrom, addressTo, tokenId, domainId);
      console.log(tx);
    });
  };

  return (
    <Box textAlign="center" experimental_spaceY="5">
      <Input placeholder="NFT contract address" onChange={handleNFTContractAddressChange}></Input>
      <Input placeholder="Address from" onChange={handleAddressFromChange}></Input>
      <Input placeholder="Address to" onChange={handleAddressToChange}></Input>
      <Input placeholder="Token ID" onChange={handleTokenIdChange}></Input>
      <Input placeholder="Destination domain ID" onChange={handleDomainIdChange}></Input>
      <Button width="100%" onClick={xCall}>
        Bridge
      </Button>
    </Box>
  );
};
