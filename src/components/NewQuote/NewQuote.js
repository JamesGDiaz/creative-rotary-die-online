import React, { Component, useState, useRef } from "react";
import zlib from "zlib";
import { Card, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faHandPointRight,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Section1 from "./Sections/Section1";
import { Formik } from "formik";
import newQuoteSchema from "./NewQuoteSchema";
import styles from "./NewQuote.module.scss";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { fromSchemaToId } from "../../methods/SchemaToDict";
import { BlobProvider } from "@react-pdf/renderer";
import DocumentTemplate from "../PrintPDF/DocumentTemplate";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Quote extends Component {
  constructor() {
    super();
    this.state = {
      WAIT: false,
      previewProps: undefined,
      nextPreviewProps: undefined,
      intervalIsSet: false
    };
  }

  listErrors = errors => {
    if (Object.getOwnPropertyNames(errors).length > 0) {
      return Object.getOwnPropertyNames(errors).map((value, index) => {
        return (
          <ErrorAlert
            text={`${value
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, function(str) {
                return str.toUpperCase();
              })}
          , ${errors[value]}`}
            key={index}
          />
        );
      });
    }
  };

  renderQueue = () => {
    if (!this.state.intervalIsSet) {
      setInterval(() => {
        this.setState({ intervalIsSet: true });
        if (
          JSON.stringify(this.state.nextPreviewProps) !==
          JSON.stringify(this.state.previewProps)
        ) {
          console.log("updating!");
          this.setState({
            previewProps: { ...this.state.nextPreviewProps }
          });
        }
      }, 2000);
    }
  };

  pdfPreview = () => {
    let MyDocument = new DocumentTemplate(this.state.previewProps);
    return (
      <BlobProvider document={MyDocument.render()}>
        {({ blob, url, loading, error }) => (
          <div className={styles.PdfCanvas}>
            <Document file={url} renderMode="canvas">
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </BlobProvider>
    );
  };

  render() {
    return (
      <div className={styles.NewQuote}>
        <Row>
          <Col md>
            <Formik
              validationSchema={newQuoteSchema}
              onSubmit={(values, actions) => {
                values.gapAcross = values.gapAcross
                  ? values.gapAcross + " " + values.unitGapAcross
                  : "";
                values.gapAround = values.gapAround
                  ? values.gapAround + " " + values.unitGapAround
                  : "";
                values.cornerRadius = values.cornerRadius
                  ? values.gapAcross + " " + values.unitCornerRadius
                  : "";
                values.size = values.size
                  ? values.size + " " + values.unitSize
                  : "";
                delete values.unitSize;
                delete values.unitCornerRadius;
                delete values.unitGapAcross;
                delete values.unitGapAround;
                let json = fromSchemaToId(JSON.stringify(values));
                zlib.gzip(json, (error, result) => {
                  let compressedString = result
                    .toString("base64")
                    .replace(/[+]/g, "-")
                    .replace(/[/]/g, "_");
                  console.log("done");
                  actions.setSubmitting(false);
                  this.props.history.push(`print/${compressedString}`);
                });
              }}
              initialValues={{
                dateReceived: `${new Date().getMonth() +
                  1}/${new Date().getDate()}/${new Date().getFullYear()}`,
                type: "Rectangular",
                unitSize: "inch",
                unitCornerRadius: "inch",
                unitGapAcross: "inch",
                unitGapAround: "inch"
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
                isSubmitting
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Card>
                    <Card.Header>
                      <FontAwesomeIcon icon={faInfoCircle} /> Order Data
                    </Card.Header>
                    <Card.Body>
                      <div>{this.listErrors(errors)}</div>
                      <Button
                        className={styles.Button}
                        type="submit"
                        variant="outline-primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {!isSubmitting ? (
                          <div>
                            Create File{" "}
                            <FontAwesomeIcon icon={faHandPointRight} />{" "}
                            <FontAwesomeIcon icon={faFilePdf} />
                          </div>
                        ) : (
                          <div>
                            Creating...{" "}
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </Button>
                      <Section1
                        handleChange={e => {
                          e.persist();
                          handleChange(e);
                          values[e.target.name] = e.target.value;
                          this.setState({ nextPreviewProps: values }, () => {
                            this.renderQueue();
                          });
                        }}
                        values={values}
                        touched={touched}
                        isValid={isValid}
                        errors={errors}
                      />
                      <Button
                        className={styles.Button}
                        type="submit"
                        variant="outline-primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {!isSubmitting ? (
                          <div>
                            Create File{" "}
                            <FontAwesomeIcon icon={faHandPointRight} />{" "}
                            <FontAwesomeIcon icon={faFilePdf} />
                          </div>
                        ) : (
                          <div>
                            Creating...{" "}
                            <Spinner animation="border" variant="primary" />
                          </div>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </Form>
              )}
            </Formik>
          </Col>
          <Col md>
            {/*<PDFViewer
              style={{ width: "100%", height: "100%", minHeight: "500px" }}
            >
              <DocumentTemplate {...this.state.previewProps} />
            </PDFViewer>*/}
            {this.pdfPreview()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Quote;
