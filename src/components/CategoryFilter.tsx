import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label 
                htmlFor={`category-${category}`}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;