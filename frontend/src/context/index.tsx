import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useConnect, useContractWrite, metamaskWallet} from '@thirdweb-dev/react';




import { ethers } from 'ethers';






const StateContext = createContext<any>(null);


export const StateContextProvider = ({ children}:{ children: React.ReactNode }) => {
  const { contract } = useContract('0x665091D69d6399945681bB815818c5BBd4e9b206');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
 const connect = useConnect();
  const metamaskConfig = metamaskWallet();

// Function to connect to MetaMask
const connectToMetamask = async () => {
  try {
    const wallet = await connect(metamaskConfig);
    console.log("Connected to MetaMask", wallet);
  } catch (error) {
    console.error("Failed to connect to MetaMask", error);
  }
};

  
  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.goal, // goal,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {

  
    const campaigns:any[] = await contract!.call('getCampaigns');
     
   
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.goal.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.balance.toString()),
      image: campaign.image,
      id: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns= async () => {
    const allcampaigns = await getCampaigns();

    const userCampaigns = allcampaigns.filter((campaign)=> campaign.owner === address);
    return userCampaigns;
  }

  const donate = async ({ id, amount }: { id: string; amount: string }) => {
    if (!amount || isNaN(Number(amount))) {
      throw new Error('Invalid donation amount');
    }
    const data = await contract!.call('donateToCampaign', [id], {
      value: ethers.utils.parseEther(amount), 
    });
    return data;
  };

  const getDonations = async (id:any) => {
    const donations = await contract!.call('getContributors', [id]);

    const numberofdonations = donations[0].length;
    // interface parsedDonations {
    //   donator: string;
    //   donationamount: number;
    // }
    const parsedDonations= [];

    for (let i= 0; i< numberofdonations; i++){
      parsedDonations.push({
        donator: donations[0][i],
        donationamount: ethers.utils.formatEther(donations[1][i].toString())

      })
    }
    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connectToMetamask,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )


}

export const useStateContext = () => useContext(StateContext);




