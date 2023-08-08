import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";
import EditMovieForm from "./components/EditMovieForm";

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
    .then(res => {
      const updatedMovies = res.data.filter(movie => {
        return movie.id !== id
      })
      setMovies(updatedMovies)
      // navigate('/movies')
    })
  }

  const addToFavorites = (movie) => {
    const newFavoriteMovie = {
      id: movie.id,
      title: movie.title
    }
    const alreadyFavorited = favoriteMovies.find(film => film.id === movie.id);
    if(!alreadyFavorited) {
      setFavoriteMovies([...favoriteMovies, newFavoriteMovie])
    }
    else {
      return;
    }
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path='/movies/add' element={<AddMovieForm setMovies={setMovies}/>} />

            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />}/>

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} deleteModalShowing={deleteModalShowing} setDeleteModalShowing={setDeleteModalShowing}/>}/>

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
