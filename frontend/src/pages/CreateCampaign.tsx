import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useStateContext} from '../context'
import { ethers } from 'ethers'
import { checkIfImage } from '../utils'

import CustomButton from '../components/CustomButton'
import FormField from '../components/FormField'
import Loader from '../components/Loader'



const Createcampaign = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false)
  const {createCampaign} = useStateContext()

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    goal: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>): void => {
    setForm({ ...form, [fieldName]: e.target.value });
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();


    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, goal: ethers.utils.parseUnits(form.goal, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
}

  


  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isloading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-gray-500 rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px]  text-white">Start a Campaign</h1>
      </div>


      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

         <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.goal}
            handleChange={(e) => handleFormFieldChange('goal', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="Select a date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
      
    </div>
  )
}

export default Createcampaign
