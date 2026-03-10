import { useState } from "react";

export const Legend = () => {
  const [isOpen, setIsOpen] = useState(false);

  const grades = [
    { color: '#800026', label: '> 2000' },
    { color: '#BD0026', label: '1000 - 2000' },
    { color: '#E31A1C', label: '800 - 1000' },
    { color: '#FC4E2A', label: '600 - 800' },
    { color: '#FD8D3C', label: '400 - 600' },
    { color: '#FEB24C', label: '200 - 400' },
    { color: '#FED976', label: '100 - 200' },
    { color: '#FFEDA0', label: '0 - 100' },
    { color: '#ccc', label: 'No data' },
  ];

  return (
    <div className="absolute bottom-6 left-6 z-[1000] flex flex-col items-start min-w-[32px]">
      {isOpen ? (
        <div className="bg-white/95 p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-sm text-gray-800 mr-4">m&sup3; per capita</h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black font-bold text-lg leading-none cursor-pointer"
            >
              &times;
            </button>
          </div>
          {grades.map((grade, i) => (
            <div key={i} className="flex items-center mb-1.5">
              <span 
                className="w-4 h-4 inline-block mr-2 border border-gray-400 opacity-70" 
                style={{ backgroundColor: grade.color }}
              ></span>
              <span className="text-xs font-semibold text-gray-700">{grade.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white/95 px-3 py-2 rounded-lg shadow-md border border-gray-200 flex items-center text-sm font-bold text-gray-800 hover:bg-white cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Legend
        </button>
      )}
    </div>
  );
};
