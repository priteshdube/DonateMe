import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import { useStateContext } from "../context";
import CustomButton from "../components/CustomButton";
import CountBox from "../components/CountBox";
import { calculateBarPercentage, daysLeft } from "../utils";
//@ts-ignore
import { thirdweb } from "../assets";

interface Donator {
  donator: string;
  donationamount: string;
}

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [donators, setDonators] = useState<Donator[]>([]);
  const [donationAmount, setDonationAmount] = useState("");

  const daysRemaining = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.id);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate({ id: state.id, amount: donationAmount });
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {isLoading && <Loader />}

      <div className="flex flex-col md:flex-row gap-10">
        {/* Campaign Image */}
        <div className="flex-1">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-lg shadow-lg"
          />
          <div className="relative w-full h-3 bg-gray-200 mt-4 rounded-full">
            <div
              className="absolute h-full bg-indigo-600 rounded-full"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        {/* CountBoxes */}
        <div className="flex flex-col md:flex-row md:w-1/4 gap-6 justify-between">
          <CountBox title="Days Left" value={daysRemaining} />
          <CountBox
            title={`Raised of ${parseFloat(state.target).toFixed(1)} ETH`}
            value={state.amountCollected}
          />
          <CountBox title="Donators" value={donators.length} />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="col-span-2 space-y-10">
          {/* Creator Section */}
          <div>
            <h4 className="text-lg font-bold text-white">Creator</h4>
            <div className="mt-4 flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded-full">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-white">{state.owner}</p>
            </div>
          </div>

          {/* Story Section */}
          <div>
            <h4 className="text-lg font-bold text-white">Story</h4>
            <p className="mt-4 text-gray-300 leading-7">{state.description}</p>
          </div>

          {/* Donators Section */}
          <div>
            <h4 className="text-lg font-bold text-white">Donators</h4>
            <div className="mt-4 space-y-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-md"
                  >
                    <p className="text-gray-300">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="text-indigo-400">{item.donationamount} ETH</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No donators yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg space-y-6">
          <h4 className="text-lg font-bold text-white">Fund the Campaign</h4>
          <input
            type="number"
            placeholder="Amount in ETH"
            step="0.01"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full p-3 text-white bg-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <CustomButton
            btnType="button"
            title="Fund Campaign"
            styles="w-full bg-indigo-600 hover:bg-indigo-500"
            handleClick={handleDonate}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
