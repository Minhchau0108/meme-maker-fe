import React from "react";
import { Card, CardColumns } from "react-bootstrap";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const MemeList = ({ memes }) => {
  return (
    <>
      {memes?.length > 0 ? (
        <CardColumns>
          <>
            {memes.map((meme) => (
              <MemeCard meme={meme} key={meme.id} />
            ))}
          </>
        </CardColumns>
      ) : (
        <p className='text-center'>There are no memes</p>
      )}
    </>
  );
};

const MemeCard = ({ meme }) => {
  return (
    <Card>
      <Card.Img
        variant='top'
        src={`${process.env.REACT_APP_BACKEND_API}/${
          meme.outputMemePath.split("public/")[1]
        }?${meme.updatedAt}`}
      />
    </Card>
  );
};

export default MemeList;
