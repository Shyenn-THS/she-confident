import { utils } from 'ethers';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';

type Props = {};

const SupportUs = (props: Props) => {
  const [value, setValue] = useState('0.1');
  const [other, setOther] = useState(false);

  const { config } = usePrepareSendTransaction({
    request: {
      to: '0xc8261Ba37F8170f5926d22cEd1cFcD59Cd1C351E', // My Address
      value: parseFloat(value) ? utils.parseEther(value) : '0.1', // In Matic
    },
  });

  const { data, sendTransaction } = useSendTransaction({
    ...config,
    onSuccess: (data) => console.log('SUCCESS', data),
    onError: (error) => toast.error(error),
    onSettled: (data, error) => console.log('SETTLED', data, error),
  });

  return (
    <div className="flex justify-center items-center bg-froly-200 min-h-screen">
      <div className="h-[650px] my-10 w-96 md:w-4/5 bg-white rounded-lg md:rounded-lg">
        <div className="flex h-full w-full">
          <div className="h-full hidden md:block relative rounded-lg overflow-hidden bg-[url('https://imgur.com/2hR32WP.jpg')] w-full">
            <img
              className="h-1/2 w-full object-cover pl-4 pt-4 pb-4 pr-4 rounded-lg"
              src="https://media.istockphoto.com/id/1220167694/vector/five-women-of-different-nationalities-and-cultures-standing-together.jpg?s=612x612&w=0&k=20&c=74IWmqUDN3BfdaKZwBf6aub-qiXR25m_jp0UALuWdgQ="
            />
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-cascade-800">
              Support Us
            </h2>
            <p className="px-4 text-cascade-800 font-extrabold">Our Mission</p>
            <p className="mt-4 px-4 text-gray-500">
              This charitable trust works for women's empowerment. We are
              committed to the growth of women in corporate sectors and making
              them confident and independent. The aim remains to have efficient
              opportunities for them so that they can achieve their optimum
              potential.{' '}
            </p>
          </div>

          <div className="h-full p-3 rounded-lg w-full bg-white">
            <p className="font-semibold text-xl mt-2 text-cascade-800 text-center">
              Where would you like to give?
            </p>
            <div className="mt-4 w-full flex flex-col">
              <div className="flex gap-2 w-full">
                <input
                  className="appearance-none"
                  type="radio"
                  name="select_option"
                  id="select_option1"
                />
                <label className="w-full">
                  <div className="click_option h-16 gap-3 cursor-pointer transition-all w-full px-2 border-2 flex justify-center items-center">
                    <img className="w-8" src="https://imgur.com/8n0nocQ.png" />
                    <p className="text-sm text-cascade-800 font-semibold">
                      Where it's needed most
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-2 w-full mt-4">
                <input
                  className="appearance-none"
                  type="radio"
                  name="select_option"
                  id="select_option3"
                />
                <label className="w-full">
                  <div className="click_option h-16 gap-3 cursor-pointer transition-all w-full px-2 border-2 flex justify-center items-center">
                    <img className="w-8" src="https://imgur.com/BHkXQhS.png" />
                    <p className="text-sm text-cascade-800 font-semibold">
                      Research
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-5">
              {' '}
              When you support She-confident, you're powering a strong,
              strategically savvy organisation that makes real change happen!
            </p>

            <p className="mt-3 font-semibold text-cascade-800">
              I would like to give:
            </p>
            <div className="flex mt-5 gap-2">
              <label
                onClick={() => setValue('1')}
                className="h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex "
              >
                1 MATIC
              </label>
              <label
                onClick={() => setValue('0.5')}
                className="h-10 text-gray-700 font-semibold cursor-pointer transition-all text-sm justify-center items-center w-full border-2 flex "
              >
                0.5 MATIC
              </label>
              <label
                onClick={() => setValue('0.25')}
                className="h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex "
              >
                0.25 MATIC
              </label>
              <label
                onClick={() => {
                  setOther(!other);
                }}
                className="h-10 text-gray-700 font-semibold cursor-pointer transition-all text-sm justify-center items-center w-full border-2 flex "
              >
                Other
              </label>
            </div>
            {other ? (
              <input
                type="number"
                min={0.1}
                max={1}
                className="w-full border"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            ) : null}
            <p className="mt-4 text-xl font-semibold text-cascade-800">
              {value} MATIC
            </p>
            <hr className="my-4" />
            <div className=" flex gap-3 items-center">
              <span className="check_it h-6 w-6 border border-gray-500 rounded flex justify-center items-center cursor-pointer transition-all ">
                <i className=" text-white fa fa-check"></i>
              </span>
              <p className="text-sm font-semibold  text-gray-700">
                This gift is in honour or in memory
              </p>
            </div>
            <div className="my-4 flex justify-between">
              <button
                onClick={() => sendTransaction?.()}
                className="h-10 w-32 bg-froly-500 text-sm text-white rounded-lg cursor-pointer transition-all hover:bg-rajah-200 "
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
