import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
  minPrice, 
  maxPrice, 
  onPriceChange 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMax(value);
  };

  const handleApply = () => {
    onPriceChange(localMin, localMax);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">Price Range</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <div className="w-5/12">
              <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">Min</label>
              <input
                type="number"
                id="min-price"
                value={localMin}
                onChange={handleMinChange}
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="text-gray-500">to</div>
            <div className="w-5/12">
              <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">Max</label>
              <input
                type="number"
                id="max-price"
                value={localMax}
                onChange={handleMaxChange}
                min={localMin}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <button
            onClick={handleApply}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;