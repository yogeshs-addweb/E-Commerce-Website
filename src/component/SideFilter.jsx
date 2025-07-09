import React from "react";

const SideFilter = ({ filters, setFilters, products }) => {
  const uniqueValues = (key) => [...new Set(products.map((p) => p[key]))];

  return (
    <aside className="md:w-64 w-full bg-white p-6 rounded-lg shadow-md sticky top-24 h-fit">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          {uniqueValues("category").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Company Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Company</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        >
          <option value="">All</option>
          {uniqueValues("brand").map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">Color</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="e.g. red"
          value={filters.color}
          onChange={(e) => setFilters({ ...filters, color: e.target.value })}
        />
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm mb-1">
          Max Price: ₹{filters.price}
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      <button
        onClick={() =>
          setFilters({ category: "", company: "", color: "", price: 1000 })
        }
        className="w-full mt-6 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default SideFilter;
