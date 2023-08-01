import React, { useEffect, useState } from "react";
import { GetQuickSearchFilterResults } from "../apis/filters";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Filters({ filters, setFilters }) {
  const [hideResults, setHideResults] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetQuickSearchFilterResults(filters);
      setResults(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (filters.search) {
      // use debounce here
      const debounce = setTimeout(() => {
        getData();
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [filters.search]);

  return (
    <div className="mb-5  flex gap-5 items-end lg:flex-row flex-col">
      <div className="w-1/2 relative">
        <input
          type="text"
          placeholder="Search Dorms or University Names"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          onFocus={() => setHideResults(false)}
          onBlur={() => {
            setTimeout(() => {
              setHideResults(true);
            }, 200);
          }}
        />

        {/* results div */}

        {filters.search &&
          !hideResults &&
          (results?.movies?.length || results?.artists?.length) && (
            <div className="quick-search-results text-gray-600">
              {results?.movies?.length > 0 &&
                results?.movies?.map((movie) => {
                  return (
                    <>
                      <div
                        key={movie?._id}
                        className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                        onClick={() => navigate(`/movie/${movie?._id}`)}
                      >
                        <img
                          src={movie?.posters[0]}
                          alt=""
                          className="h-10 w-10 rounded"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-600 text-md">
                            {movie?.name}
                          </span>
                          <span className="text-sm text-gray-500">Movie</span>
                        </div>
                      </div>
                    </>
                  );
                })}

              {results?.artists?.length > 0 &&
                results?.artists?.map((artist) => {
                  return (
                    <div
                      key={artist?._id}
                      className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                      onClick={() => navigate(`/artist/${artist?._id}`)}
                    >
                      <img
                        src={artist?.images[0]}
                        alt=""
                        className="h-10 w-10 rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-600 text-md">
                          {artist?.name}
                        </span>
                        <span className="text-sm text-gray-500">Artist</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
      </div>

      <div>
        <span className="text-sm text-gray-500">Select Dorm Inhabitants</span>
        <select
          name="dorminhabitants"
          value={filters.dorminhabitants}
          onChange={(e) => setFilters({ ...filters, dorminhabitants: e.target.value })}
        >
          <option value="">All</option>
          <option value="freshman">Freshman</option>
          <option value="sophomore">Sophomore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="graduate">Graduate</option>
        </select>
      </div>

      <div>
        <span className="text-sm text-gray-500">Select Type</span>
        <select
          name="type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="romance">Romance</option>
          <option value="thriller">Thriller</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
