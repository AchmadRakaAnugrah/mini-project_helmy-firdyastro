import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieListHeading from "../components/MovieListHeading";
import Button from "./Button";
import RemoveRate from "./RemoveRate"; // Import RemoveRate

function MovieListRate() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const URL_API = "https://653a1600e3b530c8d9e92290.mockapi.io/kinolist/rate";

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !poster || !rating || !description) {
      alert("Title, URL Poster, Rating, and Description are required.");
      return;
    }

    if (title.length > 30) {
      alert("Title should not exceed 30 characters");
      return;
    }

    if (rating < 1 || rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    const movieData = {
      Title: title,
      Poster: poster,
      Rating: rating,
      Description: description,
    };

    if (isEditing) {
      try {
        await axios.put(`${URL_API}/${editId}`, movieData);
        console.log("Movie has successfully been updated.");
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        await axios.post(URL_API, movieData);
        console.log("Movie has successfully been added.");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setTitle("");
    setPoster("");
    setRating("");
    setDescription("");
    getMovieList();
  };

  const handleEdit = (id) => {
    const movieToEdit = movieList.find((movie) => movie.id === id);
    setTitle(movieToEdit.Title);
    setPoster(movieToEdit.Poster);
    setRating(movieToEdit.Rating);
    setDescription(movieToEdit.Description);
    setIsEditing(true);
    setEditId(id);
  };

  const getMovieList = async () => {
    try {
      const response = await axios.get(URL_API);
      setMovieList(response.data);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_API}/${id}`);
      getMovieList();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleRatingClick = async (id) => {
    try {
      const response = await axios.get(`${URL_API}/${id}`);
      setSelectedMovie(response.data);
      setIsPopupActive(true);

      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const closePopup = () => {
    setIsPopupActive(false);

    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <div className="scroll-container overflow-y-hidden overflow-x-auto flex flex-nowrap">
        {movieList.map((movie) => (
          <div key={movie.id} className="relative me-4 mb-4 flex flex-col items-center justify-center shrink-0">
            <div className="image-container hover:scale-105 hover:cursor-pointer transition duration-250 ease-in">
              <img src={movie.Poster} alt={movie.Title} className="rounded w-75 h-110 transition" />
              <div onClick={() => handleDelete(movie.id)} className="overlay bg-white/[0.75] flex items-center justify-center inset-0 w-75 h-110  opacity-0 text-xl p-5 text-center absolute">
                <RemoveRate />
              </div>
            </div>
            <div onClick={() => handleRatingClick(movie.id)} className="hover:cursor-pointer">
              <div className="rounded-full bg-black p-4 w-10 h-10 -top-4 -right-4 flex items-center justify-center my-2">
                <p className="text-white text-lg">{movie.Rating}</p>
              </div>
            </div>
            <p className="text-center mb-2 font-bold w-75">{movie.Title}</p>
            <Button label="Edit" onClick={() => handleEdit(movie.id)} />
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 mb-4">
        <MovieListHeading heading={isEditing ? "Edit" : "Add Manually"} />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-black">
            Title:
          </label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-1/3 border border-black rounded px-3 py-2 focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="poster" className="text-black">
            URL Poster:
          </label>
          <input type="text" id="poster" value={poster} onChange={handlePosterChange} className="w-1/3 border border-black rounded px-3 py-2 focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rating" className="text-black">
            Rating:
          </label>
          <input type="text" id="rating" value={rating} onChange={handleRatingChange} className="w-1/3 border border-black rounded px-3 py-2 focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-black">
            Your thought:
          </label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} className="w-1/3 border border-black rounded px-3 py-2 focus:outline-none" />
        </div>

        <Button type="submit" label={isEditing ? "Update" : "Add"} />
      </form>

      {isPopupActive && selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <div className="flex">
              <div>
                <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="rounded w-75 h-110" />
              </div>
              <div className="ml-4">
                <h2 className="text-5xl italic font-bold">{selectedMovie.Title}</h2>
                <div className="my-4">
                  <div className="rounded-full bg-black p-4 w-10 h-10 -top-4 -right-4 flex items-center justify-center my-2">
                    <p className="text-white text-lg">{selectedMovie.Rating}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs">My thought:</p>
                  <p className="mt-2">{selectedMovie.Description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button onClick={closePopup} label="Close" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieListRate;
