// import React from "react";
// import "../App.css";

// function MovieListRate(props) {
//   const RateComponent = props.rateComponent;

//   return (
//     <>
//       <div className="scroll-container overflow-y-hidden overflow-x-auto flex flex-nowrap">
//         {props.movies.map((movie, index) => (
//           <div className="image-container relative me-4 flex-shrink-0 flex justify-start transition duration-200 hover:cursor-pointer hover:scale-105">
//             <img src={movie.Poster} alt="movie" className="rounded" />
//             <div onClick={() => props.handleRateClick(movie)} className="overlay flex items-center justify-center inset-0 w-full transition duration-250 ease-in opacity-0 text-xl p-5 text-center absolute">
//               <RateComponent />
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default MovieListRate;
