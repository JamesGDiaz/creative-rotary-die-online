import React, { Component, Suspense, lazy } from 'react';
import zlib from 'zlib';
import { Card, Button, Form, Spinner, Row, Col, Accordion, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faHandPointRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import styles from './NewQuote.module.scss';
import { fromSchemaToId } from '../../methods/SchemaToDict';
import { BlobProvider } from '@react-pdf/renderer';
import DocumentTemplate from '../PrintPDF/DocumentTemplate';
import { Document, Page, pdfjs } from 'react-pdf';
import newQuoteSchema from './NewQuoteSchema';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Section1 = lazy(() => import('./Sections/Section1'));

class Quote extends Component {
  constructor(props) {
    super(props);
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
          <Alert variant={'danger'} key={index}>
            {`${value.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
              return str.toUpperCase();
            })}
          , ${errors[value]}`}
          </Alert>
        );
      });
    }
  };

  renderQueue = () => {
    /*if (!this.state.intervalIsSet) {
      setInterval(() => {
        this.setState({ intervalIsSet: true });
        if (
      JSON.stringify(this.state.nextPreviewProps) !==
      JSON.stringify(this.state.previewProps)
    ) {
      }, 1000);
      }
    }*/
    console.log('updating!');
    this.setState({
      previewProps: { ...this.state.nextPreviewProps }
    });
  };

  pdfPreview = () => {
    let MyDocument = new DocumentTemplate(this.state.previewProps);
    return (
      <BlobProvider document={MyDocument.render()}>
        {({ blob, url, loading, error }) => (
          <div className={styles.PdfCanvas}>
            <Document file={url} renderMode={'canvas'}>
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
        <Suspense fallback={<div>Loading...</div>}>
          <Row>
            <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }}>
              <Formik
                validationSchema={newQuoteSchema}
                onSubmit={(values, actions) => {
                  let json = fromSchemaToId(JSON.stringify(values));
                  zlib.gzip(json, (error, result) => {
                    let compressedString = result
                      .toString('base64')
                      .replace(/[+]/g, '-')
                      .replace(/[/]/g, '_');
                    console.log('done');
                    actions.setSubmitting(false);
                    this.props.history.push(`print/${compressedString}`);
                  });
                }}
                initialValues={{
                  dateReceived: `${new Date().getMonth() +
                    1}/${new Date().getDate()}/${new Date().getFullYear()}`,
                  type: 'Rectangular',
                  unitSize: 'in',
                  unitCornerRadius: 'in',
                  unitGapAcross: 'in',
                  unitGapAround: 'in'
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
                          type='submit'
                          variant='outline-primary'
                          size='lg'
                          disabled={isSubmitting}
                        >
                          {!isSubmitting ? (
                            <div>
                              Create File <FontAwesomeIcon icon={faHandPointRight} />{' '}
                              <FontAwesomeIcon icon={faFilePdf} />
                            </div>
                          ) : (
                            <div>
                              Creating... <Spinner animation='border' variant='primary' />
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
                          type='submit'
                          variant='outline-primary'
                          size='lg'
                          disabled={isSubmitting}
                        >
                          {!isSubmitting ? (
                            <div>
                              Create File <FontAwesomeIcon icon={faHandPointRight} />{' '}
                              <FontAwesomeIcon icon={faFilePdf} />
                            </div>
                          ) : (
                            <div>
                              Creating... <Spinner animation='border' variant='primary' />
                            </div>
                          )}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col
              xs={{ span: 12, order: 1 }}
              lg={{ span: 6, order: 2 }}
              style={{ marginBottom: '12px' }}
            >
              <Accordion defaultActiveKey='0'>
                {' '}
                <Card style={{ borderRadius: '.25rem' }}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey='0'
                    style={{ borderRadius: '.25rem' }}
                  >
                    <FontAwesomeIcon icon={faFilePdf} /> Preview
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body style={{ backgroundColor: '#535353' }}>
                      {this.pdfPreview()}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Suspense>
      </div>
    );
  }
}

export default Quote;
