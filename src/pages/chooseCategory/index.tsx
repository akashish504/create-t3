import React, { useState } from 'react';
import categories from './categories.json';

export default function MultiSelectCheckbox() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  // Dummy data for demonstration
  // const allItems: string[] = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);
	const allItems: any[] = Array.from({ length: 100 }, (_, index) => categories.list[index]);
  // Pagination calculation
  const totalPages: number = Math.ceil(allItems.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = Math.min(startIndex + itemsPerPage, allItems.length);
  const currentItems: string[] = allItems.slice(startIndex, endIndex);

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>MultiSelect Checkbox</h2>
      {currentItems.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}
          </label>
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
