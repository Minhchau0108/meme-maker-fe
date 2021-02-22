import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Container, Button } from "react-bootstrap";
import memeActions from "../redux/actions/meme.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const HomePage = () => {
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);
  const handleImportImage = async () => {
    const files = inputFile.current.files;
    const meme = {
      uploadImage: files[0],
      localImageUrl: window.URL.createObjectURL(files[0]),
    };
    dispatch(memeActions.setSelectedMeme(meme));
  };
  const handleSubmitImage = () => {
    dispatch(memeActions.createMeme(selectedMeme.uploadImage));
  };
  const handleCancelImage = () => {
    dispatch(memeActions.setSelectedMeme(null));
  };
  return (
    <Container className='fill d-flex justify-content-center align-items-center'>
      {selectedMeme && (
        <div
          className='content-overley'
          style={{ backgroundImage: `url(${selectedMeme.localImageUrl})` }}
        ></div>
      )}
      {selectedMeme ? (
        <div className='main-meme'>
          <img src={selectedMeme.localImageUrl} alt='Selected Image'></img>
          {selectedMeme?.id ? (
            <div>
              <Button
                className='btn-block mt-1'
                variant='light'
                onClick={handleCancelImage}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <ButtonGroup className='d-flex m-3'>
              <Button
                variant='primary'
                className='mr-3'
                onClick={handleSubmitImage}
              >
                Take this image
              </Button>
              <Button variant='light' onClick={handleCancelImage}>
                Cancel
              </Button>
            </ButtonGroup>
          )}
        </div>
      ) : (
        <div className='text-center'>
          <label
            className='btn btn-light m-3 rounded-pill px-4 text-center'
            htmlFor='local-meme'
          >
            <input
              type='file'
              ref={inputFile}
              className='import-image-label-input'
              onChange={() => handleImportImage()}
              accept='image/png, image/jpeg'
              id='local-meme'
            />
            <FontAwesomeIcon icon={faUpload} className='mr-2' />
            <span className='text-muted text-uppercase'>Upload an image</span>
          </label>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
