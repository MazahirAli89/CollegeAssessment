import React from "react";
import { College, colleges } from "@/data";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { IoMdDownload, IoMdSwap } from "react-icons/io";

interface CollegeRowProps {
  college: College;
  isLastRow: boolean;
  observerRef: (node: HTMLDivElement | null) => void;
}

const CollegeRow: React.FC<CollegeRowProps> = ({
  college,
  isLastRow,
  observerRef,
}) => {
  return (
    <tr
      // ref={isLastRow ? observerRef : undefined}
      ref={isLastRow ? (e) => observerRef(e) : undefined}
    >
      <td className="border border-gray-200 p-2">#{college.ranking}</td>
      <td className="border border-gray-200 pb-2 px-2 flex flex-col gap-y-1 relative">
        <span className="font-semibold text-[#4ECBED]">{college.name}</span>
        <span className="text-xs text-gray-500">{college.location}</span>
        <div className="flex flex-col gap-y-1 bg-[#FDFEDF] rounded-r-md border-l-2 border-[#FF962D] w-fit px-3 py-1">
          <span className="text-sm text-[#FF962D] font-semibold">
            {college.course}
          </span>
          <span className="text-sm font-medium text-[#858477]">
            {college.cutoff}
          </span>
        </div>
        <div className="text-xs text-blue-500 mt-2 flex justify-between">
          <span className="hover:underline cursor-pointer text-[#FF962D] font-semibold flex items-center gap-x-1">
            <FaArrowRight /> Apply Now
          </span>
          <span className="hover:underline cursor-pointer text-[#60c5ad] font-semibold flex items-center gap-x-1">
            <IoMdDownload /> Download Brochure
          </span>
          <span className="hover:underline cursor-pointer text-zinc-700 font-semibold flex items-center gap-x-1">
          <input type="checkbox" /> Add To Compare
          </span>
        </div>
      </td>
      <td className="border border-gray-200 p-2 h-full">
        <div className="flex flex-col gap-y-1 h-full">
          <span className="text-sm font-bold text-[#60c5ad]">
            ₹ {college.fees}
          </span>
          <span className="text-xs text-zinc-700 font-medium">BE/B.Tech</span>
          <span className="text-xs text-zinc-700 font-medium">
            - 1st Year Fees
          </span>
          <span className="hover:underline cursor-pointer text-[#FF962D] font-semibold flex items-center gap-x-1 text-xs">
            <IoMdSwap /> Compare Fees
          </span>
        </div>
      </td>
      <td className="border border-gray-200 p-2">
        <div className="flex flex-col mb-1">
          <span className="font-bold text-sm text-[#60c5ad]">
            ₹ {college.placement}
          </span>
          <span className="text-xs">Average Package</span>
        </div>
        <div className="flex flex-col mb-1">
          <span className="font-bold text-sm text-[#60c5ad]">
            ₹ {college.highestPackage}
          </span>
          <span className="text-xs">Highest Package</span>
        </div>
        <span className="hover:underline cursor-pointer text-[#FF962D] font-semibold flex items-center gap-x-1 text-xs">
          <IoMdSwap /> Compare Placement
        </span>
      </td>
      <td className="border border-gray-200 p-2">
        <div className="flex flex-col gap-y-2">
          <span className="text-zinc-700 font-semibold">
            {college.userRating.toFixed(1)} / 10
          </span>
          <span className="text-zinc-600 text-xs font-medium">
            Based on 289 User Reviews
          </span>
          <div className="flex items-center gap-x-1 py-1 px-2 rounded-md bg-[#FCFDE2] text-[#EFA6AC] font-semibold text-xs w-fit">
            <FaCheck /> <span>Best in Social Life</span>
          </div>
        </div>
      </td>
      <td className="border border-gray-200 p-2">
        <span className="text-zinc-700 font-medium">
          #{college.ranking}/
          <span className="text-[#FF962D]">{colleges.length}</span> in India
        </span>
      </td>
    </tr>
  );
};

export default CollegeRow;
