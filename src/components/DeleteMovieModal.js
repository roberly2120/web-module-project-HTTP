import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteMovieModal = (props) => {
  const {setDeleteModalShowing, deleteMovie, id} = props
  const navigate = useNavigate();
  const closeDeleteModal = () => {
    setDeleteModalShowing(false);
  }
  const removeMovie = (id) => {
    deleteMovie(id);
    setDeleteModalShowing(false);
    navigate('/movies');
  }

  return (<div id="deleteEmployeeModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <form>
          <div className="modal-header">
            <h4 className="modal-title">Delete Movie</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => closeDeleteModal()}>&times;</button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete these Records?</p>
            <p className="text-warning"><small>This action cannot be undone.</small></p>
          </div>
          <div className="modal-footer">
            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
            <input type="submit" className="btn btn-danger" value="Delete" onClick={() => removeMovie(id)}/>
          </div>
        </form>
      </div>
    </div>
  </div>)
}

export default DeleteMovieModal;
