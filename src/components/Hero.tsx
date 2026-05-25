import Image from "next/image";

// icons
import { FaUserDoctor } from "react-icons/fa6";
import { PiFlowerLotusBold } from "react-icons/pi";
import { IoBarbell } from "react-icons/io5";
import { GrUserFemale } from "react-icons/gr";
import { RxScissors } from "react-icons/rx";

export default function Hero() {
  const categories = [
    {
      name: "عيادة",
      Icon: <FaUserDoctor className="scale-150" />,
    },
    {
      name: "صالون",
      Icon: <GrUserFemale className="scale-150" />,
    },
    {
      name: "حلاق",
      Icon: <RxScissors className="scale-150" />,
    },
    {
      name: "gym",
      Icon: <IoBarbell className="scale-150" />,
    },
    {
      name: "مراكز تجميل",
      Icon: <PiFlowerLotusBold className="scale-150" />,
    },
  ];
  return (
    <div className="flex justify-between items-center mt-8 w-fit h-screen text-yellow-600 container mx-auto">
      {/* image */}
      <div>
        <Image
          src="/image.png"
          width={800}
          height={500}
          alt="hero image"
          quality={100}
        />
      </div>
      {/* text & search*/}
      <div className="text-center flex flex-col justify-center">
        <div>
          <h1 className="text-7xl text-cyan-50 ">احجز موعدك</h1>
          <h1 className="text-7xl ">بكل سهولة</h1>
          <div className="flex gap-1 my-4">
            <button className="bg-amber-500 h-10 text-xl w-16 px-2 py-1 rounded text-slate-950">
              ابحث
            </button>
            <input className="border rounded px-2" />
          </div>
          {/* categoryes */}
          <div className="flex my-8 text-amber-50">
            <div className="flex gap-2">
              {categories.map((item, index) => (
                <div
                  className="flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="p-4 border border-gray-500 rounded-md w-12 flex justify-center items-center text-yellow-600">
                    {item.Icon}
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-center text-center gap-4 my-8 text-amber-50">
            <button className="bg-amber-500 px-4 py-2 font-bold rounded text-slate-950">
              احجز موعد
            </button>
            <button className="bg-amber-500 px-4 py-2 font-bold rounded text-slate-950">
              سجل عملك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
