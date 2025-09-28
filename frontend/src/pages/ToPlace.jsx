import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ToPlace() {
  const { locationSlug } = useParams();
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/toPlace/${locationSlug}/places`
        );
        const data = await res.json();

        if (res.ok) {
          setPlaces(data.data);
          setMessage(data.message);
        } else {
          setPlaces([]);
          setMessage(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        setMessage("Server error, please try again");
      }
    };

    fetchPlaces();
  }, [locationSlug]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">
        Places from <span className="text-blue-600">{locationSlug}</span>
      </h2>

      {message && <p className="mb-4 text-gray-700">{message}</p>}

      <div className="w-full max-w-md">
        {places.length > 0 ? (
          <ul className="space-y-3">
            {places.map((place) => (
            <li
              key={place._id}
              className="p-3 bg-white rounded-lg shadow-md border hover:shadow-lg transition"
            >
              {/* Link to PlaceDetails page */}
              <Link
                to={`/location/${locationSlug}/${place.placeSlug}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {place.placeName}
              </Link>
              <p className="text-sm text-gray-500">
                Location: {place.fromLocation?.locationName}
              </p>
            </li>
          ))}

          </ul>
        ) : (
          <p className="text-gray-500">No places found</p>
        )}
      </div>
    </div>
  );
}
