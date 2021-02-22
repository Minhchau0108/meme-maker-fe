import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import { Nav, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import memeActions from "../redux/actions/meme.actions";

const COLORS = ["BLACK", "WHITE"];
const FONT_SIZES = [8, 16, 32, 64, 128];
const ALIGNMENT_X = [
  { value: "HORIZONTAL_ALIGN_LEFT", view: "Left" },
  { value: "HORIZONTAL_ALIGN_CENTER", view: "Center" },
  { value: "HORIZONTAL_ALIGN_RIGHT", view: "Right" },
];
const ALIGNMENT_Y = [
  { value: "VERTICAL_ALIGN_TOP", view: "Top" },
  { value: "VERTICAL_ALIGN_MIDDLE", view: "Middle" },
  { value: "VERTICAL_ALIGN_BOTTOM", view: "Bottom" },
];
const SideMenu = () => {
  const [texts, setTexts] = useState([
    {
      id: "text_top",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_TOP",
    },
    {
      id: "text_bottom",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_BOTTOM",
    },
  ]);
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);
  const dispatch = useDispatch();
  const handleInput = ({ textId, type, value }) => {
    const temp = JSON.parse(JSON.stringify(texts));
    temp.map((text) => {
      if (text.id === textId) {
        if (type in text) text[type] = value;
      }
      return text;
    });
    setTexts(temp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMeme?.id) {
      dispatch(memeActions.updateMeme(texts, selectedMeme.id));
    }
  };
  useEffect(() => {
    if (selectedMeme?.id) {
      if (selectedMeme?.texts?.length) {
        setTexts((texts) => {
          return texts.map((text, index) => ({
            ...text,
            ...selectedMeme.texts[index],
          }));
        });
      }
    }
  }, [selectedMeme]);
  return (
    <Nav className='col-md-3 d-md-block bg-light sidebar collapse'>
      <div className='sidebar-sticky pt-3'>
        <Form onSubmit={handleSubmit}>
          {texts.map(
            ({ id, content, color, size, alignmentX, alignmentY }, index) => (
              <div key={id} className='mb-3'>
                <Form.Group className='px-2 mb-2'>
                  <Form.Label>TEXT {index + 1}</Form.Label>
                  <Form.Control
                    type='text'
                    value={content}
                    onChange={(e) =>
                      handleInput({
                        textId: id,
                        type: "content",
                        value: e.target.value,
                      })
                    }
                    placeholder='Text content...'
                  />
                </Form.Group>
                <Form.Group as={Row} className='px-2 mb-0'>
                  <Form.Label column sm={7}>
                    Color
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      as='select'
                      size='sm'
                      value={color}
                      onChange={(e) =>
                        handleInput({
                          textId: id,
                          type: "color",
                          value: e.target.value,
                        })
                      }
                    >
                      {COLORS.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='px-2 mb-0'>
                  <Form.Label column sm={7}>
                    Font Size
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      as='select'
                      size='sm'
                      value={size}
                      onChange={(e) =>
                        handleInput({
                          textId: id,
                          type: "size",
                          value: e.target.value,
                        })
                      }
                    >
                      {FONT_SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='px-2 mb-0'>
                  <Form.Label column sm={7}>
                    Vertical Align
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      as='select'
                      size='sm'
                      value={alignmentX}
                      onChange={(e) =>
                        handleInput({
                          textId: id,
                          type: "alignmentX",
                          value: e.target.value,
                        })
                      }
                    >
                      {ALIGNMENT_X.map((x) => (
                        <option key={x.value} value={x.value}>
                          {x.view}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='px-2 mb-0'>
                  <Form.Label column sm={7}>
                    Horizontal Align
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      as='select'
                      size='sm'
                      value={alignmentY}
                      onChange={(e) =>
                        handleInput({
                          textId: id,
                          type: "alignmentY",
                          value: e.target.value,
                        })
                      }
                    >
                      {ALIGNMENT_Y.map((y) => (
                        <option key={y.value} value={y.value}>
                          {y.view}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </div>
            )
          )}
          {selectedMeme?.id && (
            <div className='text-center'>
              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </div>
          )}
        </Form>
      </div>
    </Nav>
  );
};

export default SideMenu;
