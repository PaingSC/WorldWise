import { createContext, useContext, useEffect, useState } from "react";

// The Base URL for fetching data
const BASE_URL = "http://localhost:8000";

const ExampleContext = createContext();

function ExampleProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert(`There was an error loading cities data...`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      throw new Error(`There was an error fetching city data`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ExampleContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
}

function useExample() {
  const context = useContext(ExampleContext);

  if (context === undefined)
    throw new Error(
      `The ExampleContext is used outside of the ExampleProvider!`
    );

  return context;
}

export { ExampleProvider, useExample };
