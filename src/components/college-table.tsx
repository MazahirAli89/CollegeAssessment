

import React, { useState, useRef, useCallback } from "react";
import { colleges, College } from "@/data";
import CollegeRow from "./college-row";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SortIconsProps {
  sortingField: string;
  sorting: "ascending" | "descending";
  field: string;
}

const SortIcons: React.FC<SortIconsProps> = ({
  sortingField,
  sorting,
  field,
}) => {
  const isActive = sortingField === field;

  return (
    <div className="flex items-center">
      <FaArrowUp
        className={`transition-opacity ${
          isActive && sorting === "ascending" ? "opacity-70" : "opacity-30"
        }`}
      />
      <FaArrowDown
        className={`transition-opacity ${
          isActive && sorting === "descending" ? "opacity-70" : "opacity-30"
        }`}
      />
    </div>
  );
};

const CollegeTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingField, setsortingField] = useState<keyof College>("ranking");
  const [sorting, setsorting] = useState<"ascending" | "descending">("ascending");
  const [displayedColleges, setDisplayedColleges] = useState<College[]>(
    colleges.slice(0, 10)
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = () => {
    setDisplayedColleges((prev) => [
      ...prev,
      ...colleges.slice(prev.length, prev.length + 10),
    ]);
  };

  const lastRowRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, []);

  const handlesearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSorting = (field: keyof College) => {
    const order = sortingField === field && sorting === "ascending" ? "descending" : "ascending";
    setsortingField(field);
    setsorting(order);
  };

  const filteredAndSortedColleges = displayedColleges
    .filter((college) => college.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      const compareValue =
        a[sortingField] > b[sortingField] ? 1 : a[sortingField] < b[sortingField] ? -1 : 0;
      return sorting === "ascending" ? compareValue : -compareValue;
    });

  return (
    <div className="p-4 bg-[#F4F9F9]">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by college name"
          className="border p-2 rounded w-full border-gray-300"
          value={searchTerm}
          onChange={handlesearch}
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#8BD5D7] text-white">
            <th
              className="border border-gray-300 p-2 text-left cursor-pointer"
              onClick={() => handleSorting("ranking")}
            >
              <div className="flex justify-between">
                <span>CD Rank</span>
                <SortIcons
                  sortingField={sortingField as string}
                  sorting={sorting}
                  field="ranking"
                />
              </div>
            </th>
            <th className="border border-gray-300 p-2 text-left">Colleges</th>
            <th
              className="border border-gray-300 p-2 text-left cursor-pointer"
              onClick={() => handleSorting("fees")}
            >
              <div className="flex justify-between">
                <span>Course Fees</span>
                <SortIcons
                  sortingField={sortingField as string}
                  sorting={sorting}
                  field="fees"
                />
              </div>
            </th>
            <th
              className="border border-gray-300 p-2 text-left cursor-pointer"
              onClick={() => handleSorting("placement")}
            >
              <div className="flex justify-between">
                <span>Placement</span>
                <SortIcons
                  sortingField={sortingField as string}
                  sorting={sorting}
                  field="placement"
                />
              </div>
            </th>
            <th
              className="border border-gray-300 p-2 text-left cursor-pointer"
              onClick={() => handleSorting("userRating")}
            >
              <div className="flex justify-between">
                <span>User Reviews</span>
                <SortIcons
                  sortingField={sortingField as string}
                  sorting={sorting}
                  field="userRating"
                />
              </div>
            </th>
            <th className="border border-gray-300 p-2 text-left">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedColleges.map((college, index) => (
            <CollegeRow
              key={college.id}
              college={college}
              isLastRow={index === filteredAndSortedColleges.length - 1}
              observerRef={lastRowRef}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;

