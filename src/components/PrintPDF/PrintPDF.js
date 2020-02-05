import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { faFileDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import zlib from 'zlib';
import QRCode from 'qrcode';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fromIdToSchema } from '../../methods/SchemaToDict';
import DocumentTemplate from './DocumentTemplate';
//const DocumentTemplate = lazy(() => import('../PrintPDF/DocumentTemplate'));

class PrintPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dirtyFormString: this.props.match.params.data,
      formObject: null,
      error: ''
    };
  }

  editQuote = () => {};

  decompressionDidFinish = result => {
    let formObject = JSON.parse(result.toString());
    formObject.quoteString = this.state.dirtyFormString;
    QRCode.toDataURL(
      this.state.dirtyFormString,
      {
        errorCorrectionLevel: 'L'
      },
      (error, url) => {
        formObject.qrCodeData = url;
        this.setState({
          formObject: formObject,
          loading: false,
          qrCodeURL: url
        });
      }
    );
  };

  componentDidMount() {
    let formString = this.state.dirtyFormString
      .replace(/[-]/g, '+')
      .replace(/[_]/g, '/')
      .replace(/(- )/g, '')
      .replace(/(-%20)/g, '')
      .replace(/(-^[\n])/g, '');
    zlib.gunzip(Buffer.from(formString, 'base64'), (error, result) => {
      if (error) {
        this.setState({
          loading: false,
          error: 'There was an error generating this quote. Is the decoded data correct?'
        });
        console.error(error);
        return;
      }
      console.log('Decompression succesful');
      this.decompressionDidFinish(fromIdToSchema(result));
    });
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ flex: 0.5, padding: '3vmin' }}>
          <Spinner style={{ alignSelf: 'center' }} variant='dark' animation='border' />
        </div>
      );
    else if (this.state.error) {
      return (
        <div style={{ flex: 0.5, padding: '3vmin' }}>
          <Alert variant={'danger'}>{this.state.error}</Alert>
        </div>
      );
    } else {
      let MyDocument = new DocumentTemplate(this.state.formObject);
      MyDocument.props.qrCodeData = this.state.qrCodeURL;

      let DownloadLink = () => {
        return (
          <PDFDownloadLink
            style={{ marginRight: '72px', marginLeft: '72px' }}
            document={MyDocument.render()}
            fileName={this.state.formObject.quoteNumber + '.pdf'}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading doc...'
              ) : (
                <Button variant='outline-success' size='lg' block>
                  <FontAwesomeIcon icon={faFileDownload} /> Download
                </Button>
              )
            }
          </PDFDownloadLink>
        );
      };

      return (
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            padding: '5px',
            marginTop: '5vh'
          }}
        >
          {this.state.error ? <Alert variant={'danger'}>{this.state.error}</Alert> : null}
          <DownloadLink />
          <PDFViewer
            style={{
              flex: 1,
              marginLeft: '3vmin',
              marginRight: '3vmin',
              marginTop: '3vmin',
              minHeight: '70vh',
              maxHeight: '80vh'
            }}
          >
            <DocumentTemplate {...this.state.formObject} />
          </PDFViewer>
          <p
            style={{
              marginBottom: '3vmin',
              marginLeft: '3vmin',
              fontSize: '12px',
              fontStyle: 'italic',
              textAlign: 'start'
            }}
          >
            This preview might not reflect exactly how the actual document will look like.
          </p>
          <DownloadLink />
          <div
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '12px'
            }}
          >
            <div style={{ flex: 0.5 }}>
              <p>
                You can recover this quote using this QRCode. Just scan it, and enter the decoded
                data on this page:
                <br />
                <b>
                  <a
                    href={`${window.location.protocol}//${window.location.host}/load`}
                  >{`${window.location.protocol}//${window.location.host}/load`}</a>
                </b>
              </p>
            </div>
            <div>
              <img src={this.state.qrCodeURL} alt={'QR Code'} />
              <p
                style={{
                  marginLeft: '10vw',
                  marginRight: '10vw',
                  marginTop: '1vh',
                  marginBottom: '1vh',
                  fontSize: '9pt',
                  fontStyle: 'italic',
                  fontWeight: 250,
                  wordWrap: 'break-word'
                }}
              >
                {this.state.dirtyFormString}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PrintPDF;
