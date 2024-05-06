import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokemon.css";

function Pokemon() {
  const [pokeData, setPokeData] = useState([]);
  const [firstData, setFirstData] = useState([]);
  const [moreData, setMoreData] = useState(null);
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
    pokeData?.map((dt) => {
      axios.get(dt.url).then((response) => {
        setFirstData((prev) => [...prev, response.data]);
      });
    });
  }, [pokeData]);

  function handleMore(index) {
    setMoreData((prevIndex) => (prevIndex === index ? null : index));
  }

  return (
    <>
      <div className="bg">
        <div className="container">
          <h1>Pokemon</h1>
          {/* <div className="poke-parent">

          <div className="poke-main"> */}

          <div className="pokemon-list">
            {firstData.map((item, index) => {
              const newMore = index === moreData;

              return (
                <>
                  <div className="poke-parent">
                    <div className="poke-main">
                      <div className="pokemon" key={item.id}>
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
                </>
              );
            })}

            {/* <div className="poke-back">
              {firstData.map((item, index) => {
                return (
                  <div className="back" key={index}>
                    <p className="index">{item.id}</p>
                    <h3 className="name">{item.name.toUpperCase()}</h3>
                    <img
                      src={item.sprites.other.dream_world.front_default}
                      alt=""
                    />
                  </div>
                );
              })}
            </div> */}
            {/* </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokemon;
