import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokemon.css";
import "../index.css"

function Pokemon() {
  const [pokeData, setPokeData] = useState([]);
  const [firstData, setFirstData] = useState([]);
  const [moreData, setMoreData] = useState(false);
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByName, setFilterByName] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((response) => {
        setPokeData(response.data.results);
      })
      .catch((error) => {
        console.error("error");
      });
  }, []);

  useEffect(() => {
    pokeData?.forEach((dt) => {
      axios.get(dt.url).then((response) => {
        setFirstData((prev) => [...prev, response.data]);
      });
    });
  }, [pokeData]);

  function handleMore(index) {
    setMoreData((prevIndex) => (prevIndex === index ? false : index));
  }

  const filterData = firstData.filter((item) =>
    item.name.toLowerCase().includes(filterBySearch.toLowerCase()) &&
    item.name.toLowerCase().includes(filterByName.toLowerCase())
  );
  return (
    <>
      <div className="bg ">
        <div  className="flex justify-end">

      <a href="https://github.com/Surbhisinghal1234" className="bg-white  mr-5 rounded-full py-4 px-2 flex flex-col w-20 justify-center items-center font-bold hover:bg-red-400 hover:text-white transition-all ease-out duration-300" > <span>GitHub</span> <span  className="">Profile</span> </a>
      </div>

        <div className="container">
          <h1 className="text-3xl font-bold py-4">Pokemon</h1>
          <div className="filter">
            <select
              value={filterByName}
              onChange={(e) => setFilterByName(e.target.value)}
              className=""
            >
              <option value="">Select a Pokemon</option>
              {firstData.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              className="rounded px-5"
              type="text"
              placeholder="Search by name..."
              value={filterBySearch}
              onChange={(e) => setFilterBySearch(e.target.value)}
            />
          </div>

          <div className="pokemon-list">
            {filterData.map((item, index) => {
              const newMore = index === moreData;
              return (
                <div className="poke-parent" key={item.id}>
                  <div className="poke-main">
                    <div className="pokemon">
                      <p className="index">{item.id}</p>
                      <h3 className="name">{item.name.toUpperCase()}</h3>
                      <img
                        src={item.sprites.other.dream_world.front_default}
                        alt=""
                      />
                    </div>
                    <div className="poke-back">
                      <p className="index">{item.id}</p>
                      <h3>{item.name.toUpperCase()}</h3>
                      <img
                        src={item.sprites.other.dream_world.front_default}
                        alt=""
                      />
                      <button
                        className="btn"
                        onClick={() => handleMore(index)}
                      >
                        {newMore ? "Hide" : "Know More"}
                      </button>
                      {newMore && (
                        <div className="show">
                          <p>Height: {item.height}</p>
                          <p>Weight: {item.weight}</p>
                          {item.stats.map((stat, statIndex) => (
                            <p key={statIndex}>
                              {stat.stat.name}: {stat.base_stat}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokemon;

