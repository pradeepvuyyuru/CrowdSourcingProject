// This page displays a list of rental properties and allows you to filter the results.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvestmentListings.css'; // Import CSS file

const InvestmentListings = () => {
  const [listings, setListings] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // To keep track of whether filter is shown or hidden
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [sortByRecent, setSortByRecent] = useState(false);
  const [propertyType, setPropertyType] = useState('none');

  const toggleFilter = () => {
    setShowFilter(!showFilter); // Toggle the state of showing filter
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortByRecentChange = (e) => {
    setSortByRecent(e.target.checked);
  };

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  const reformatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchData = async () => {
    try {
      console.log(`minPrice: ${minPrice}`);
      console.log(`maxPrice: ${maxPrice}`);

      const response = await axios.get(
        `https://prod-44.southeastasia.logic.azure.com/workflows/2dd568592654417e8216e170db743a61/triggers/manual/paths/invoke/min_price/${minPrice}/max_price/${maxPrice}/sort_by_recent/${sortByRecent}/property_type/${propertyType}?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xqoE7trIuqQ2NkKl4zVVv3kijiPo2GZqT6MqFZuiIsw`
      );
      console.log(response.data.body);
      setListings(response.data.body);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

    useEffect(() => {
      fetchData(); // Fetch data when component mounts initially
    }, []);


  // Inside the InvestmentListings component
  return (
    <div className="listings-page">
      <div className={`filter ${showFilter ? 'active' : ''}`}>
        <div className="filter-btn" onClick={() => toggleFilter()}>
          Filter
        </div>
        <div className="filter-body">
          <label>
            Min Price:
            <input type="number" value={(minPrice === -1) ? '' : minPrice} onChange={handleMinPriceChange} />
          </label>
          <label>
            Max Price:
            <input type="number" value={(maxPrice === -1) ? '' : maxPrice} onChange={handleMaxPriceChange} />
          </label>
          <label className="checkbox-label">
            Sort By Recent:
            <input type="checkbox" checked={sortByRecent} onChange={handleSortByRecentChange} />
          </label>
          <label>
            Property Type:
            <select value={propertyType} onChange={handlePropertyTypeChange}>
              <option value="none">Select</option>
              <option value="hotel">Hotel</option>
              <option value="apartment">Apartment</option>
              <option value="condominium">Condominium</option>
            </select>
          </label>
          <button className="update-btn" onClick={fetchData}>Update</button>
        </div>
      </div>
    <div className="listings">
        {listings.map(listing => (
          <div key={listing.id} className="listing">
            <img src={listing.photos.split('\n')[0]} alt={listing.name} className="listing__img" />
            <h5 className="listing__name">{listing.name}</h5>
            <div className="listing__type listing__detail">
              <p>Property Type</p>
              <p className="listing__value">{listing.property_type}</p>
            </div>
            <div className="listing__date listing__detail">
              <p>Date Published</p>
              <p className="listing__value">{reformatDate(listing.date_published)}</p>
            </div>
            <div className="listing__price listing__detail">
              <p>Minimum Investment</p>
              <p className="listing__value">${numberWithCommas(listing.minimum_investment)}</p>
            </div>
            <button className="btn listing__btn">Contact Realtor</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentListings;
