import React, { Component, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./LoadFile.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import jsQR from "jsqr";
import image from "get-image-data";

const DragZone = props => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png, image/jpeg",
    multiple: false,
    maxSize: 524288,
    onDrop: acceptedFiles => {
      setErrors(null);
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const loadQRCode = () => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      image(reader.result, function(err, info) {
        if (err) {
          console.error("Error reading image, more info below:");
          console.log(err);
        } else if (info) {
          const decoded = jsQR(info.data, info.width, info.height);
          if (!decoded) {
            setErrors(
              "Error decoding image. Are you sure there is a QR code in this image?"
            );
            return;
          }
          props.history.push(`print/${decoded.data}`);
        }
      });
    };
    files.forEach(file => reader.readAsDataURL(file));
  };

  const thumbs = files.map(file => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <Image src={file.preview} className={styles.img} />
      </div>
      <Button
        variant="success"
        style={{ marginTop: "4vh" }}
        size="lg"
        onClick={loadQRCode}
      >
        Submit this image{"  "}
        <FontAwesomeIcon icon={faHandPointRight} />{" "}
        <FontAwesomeIcon icon={faFilePdf} />
      </Button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div className={styles.DragZone}>
      {errors ? <Alert variant={"danger"}>errors</Alert> : null}
      <div>
        <section className={styles.DragContainer}>
          <div {...getRootProps({ className: "DropZone" })}>
            <input {...getInputProps()} />
            <p>
              Drag n drop the QR code here, or click to select an image (max.
              size 512kB)
            </p>
          </div>
          <aside className={styles.thumbsContainer}>{thumbs}</aside>
        </section>
      </div>
    </div>
  );
};

class LoadFile extends Component {
  constructor() {
    super();
    this.state = {
      quoteString: ""
    };
  }

  render() {
    return (
      <div className={styles.Container}>
        <DragZone history={this.props.history} />
        <div style={{ flex: 1, marginTop: "5vh" }}>
          <Form
            onSubmit={() =>
              this.props.history.push(`print/${this.state.quoteString}`)
            }
          >
            <Form.Group size="lg" controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ textAlign: "start" }}>
                Or enter the quote string here:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="8"
                placeholder="H4sIAAAA2WR3U4CQQyFX4WMtySwa2LQO10TYgJcLLxAmWlg4vw500W..."
                value={this.state.quoteString}
                onChange={event =>
                  this.setState({ quoteString: event.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" block size="lg" type="submit">
              Load this <FontAwesomeIcon icon={faHandPointRight} />{" "}
              <FontAwesomeIcon icon={faFilePdf} />
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoadFile;
