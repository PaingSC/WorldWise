import { useSearchParams } from "react-router-dom";

// creating a custom hook on top of another custom hook
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

// console.log(useUrlPosition);
