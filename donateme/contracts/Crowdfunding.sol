// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 balance;
        string image;
        address[] contributors;
        uint256[] contributions;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaigntCount= 0;

    function createCampaign( address _owner, string memory _title, string memory _description, uint256 _goal, uint256 _deadline, string memory _image) public returns(uint256){

        Campaign storage campaign= campaigns[campaigntCount];

        require( campaign.deadline< block.timestamp, "Deadline must be in the future");

        campaign.owner= _owner;
        campaign.title= _title;
        campaign.description= _description;
        campaign.goal= _goal;
        campaign.deadline= _deadline;
        campaign.image= _image;
        campaign.balance= 0;

        campaigntCount++;

        return campaigntCount -1;

  
    }

    

    function donateToCampaign(uint256 _id)public payable{
        
        Campaign storage campaign= campaigns[_id];
        uint256 amount= msg.value;

        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);

        (bool sent,)= payable(address(campaign.owner)).call{value:amount}("");

        if (sent){
            campaign.balance+= amount;
        }


    }

    function getContributors(uint256 _id) public view returns(address[] memory, uint256[] memory){

        return (campaigns[_id].contributors, campaigns[_id].contributions);
      
      

    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns= new Campaign[](campaigntCount); //create a new array of campaigns

        for(uint i=0; i < campaigntCount; i++){

            Campaign storage item= campaigns[i];

            allCampaigns[i]= item;

        }

        return allCampaigns;
    }  
}
