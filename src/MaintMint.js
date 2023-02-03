import { useState } from "react";
import { ethers, BigNumber } from 'ethers';
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = "0x4cad62C79Bf6cE125ADbdd83f21dF76CfA3dB074"

const MaintMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {value: ethers.utils.parseEther((0.02 * mintAmount).toString())});
                console.log('response : ', response);
            }
            catch (err){
                console.log(err);
            }
        }
    }

    async function enableMint(){
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.setIsPublicMintEnabled(true);
                console.log('response : ', response);
            }
            catch (err){
                console.log(err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount -1);
    };
    
    
    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="5px 10px #000000">RoboPunksNFT</Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex>
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"
                                onClick={handleDecrement}>-</Button>
                            <Input readOnly
                                fontFamily="inherit"
                                fontSize="25px"
                                width="100%"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="5px"
                                type='number' value={mintAmount} />
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"
                                onClick={handleIncrement}>+</Button>
                        </Flex>
                        <Button 
                        fontSize="25px"
                         backgroundColor="#D6517D"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #0F0F0F"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="30px 30px"
                         onClick={handleMint} >Mint now</Button>

                    <Button 
                        fontSize="25px"
                         backgroundColor="#D6517D"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #0F0F0F"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="30px 30px"
                         onClick={enableMint} >EnableMint</Button>
                    </div>

                ) : (
                    <Text fontSize="25px">You must be connected to mint !</Text>
                )}
            </Box>
        </Flex>
    );

};
export default MaintMint;