import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import PaginationBar from "../components/PaginationBar";
import memeActions from "../redux/actions/meme.actions";
import MemeList from "../components/MemeList";

const GalleryPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const limit = 10;

  const memes = useSelector((state) => state.meme.memes);
  const totalPages = useSelector((state) => state.meme.totalPages);
  const loading = useSelector((state) => state.meme.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(memeActions.getMemes(pageNum, limit));
  }, [dispatch, pageNum, limit]);
  return (
    <Container fluid>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPages}
      />
      <Row className='d-flex justify-content-center align-items-center'>
        {loading ? (
          <ClipLoader color='#f86c6b' size={150} loading={loading} />
        ) : (
          <>
            <MemeList memes={memes} />
          </>
        )}
      </Row>
    </Container>
  );
};

export default GalleryPage;
