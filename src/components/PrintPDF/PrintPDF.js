import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { faFileDownload, faEdit } from "@fortawesome/free-solid-svg-icons";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocumentTemplate } from "./DocumentTemplate";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { fromIdToSchema } from "../../methods/SchemaToDict";
import {
  receivedCompressedQuote,
  decompressionDidFinish
} from "../../methods/quoteMethods";

class PrintPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dirtyFormString: this.props.match.params.data,
      formObject: null,
      error: ""
    };
  }

  editQuote = () => {};

  componentDidMount() {
    receivedCompressedQuote(this.state.dirtyFormString);
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ flex: 0.5, padding: "3vmin" }}>
          <Spinner
            style={{ alignSelf: "center" }}
            variant="dark"
            animation="border"
          />
        </div>
      );
    else if (this.state.error) {
      return (
        <div style={{ flex: 0.5, padding: "3vmin" }}>
          <ErrorAlert text={this.state.error} />
        </div>
      );
    } else {
      let MyDocument = new DocumentTemplate(this.state.formObject);
      MyDocument.props.qrCodeData = this.state.qrCodeURL;

      let DownloadLink = () => {
        return (
          <PDFDownloadLink
            document={MyDocument.render()}
            fileName={this.state.formObject.quoteNumber + ".pdf"}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading doc..."
              ) : (
                <Button variant="outline-success" size="lg">
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
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: "5px",
            marginTop: "5vh"
          }}
        >
          {this.state.error ? <ErrorAlert text={this.state.error} /> : null}
          <div style={{ flexDirection: "row" }}>
            <DownloadLink />
            <Button
              variant="outline-secondary"
              size="lg"
              style={{ marginLeft: 12 }}
              onClick={this.editQuote}
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit quote
            </Button>
          </div>
          <PDFViewer
            style={{
              flex: 1,
              marginLeft: "3vmin",
              marginRight: "3vmin",
              marginTop: "3vmin",
              minHeight: "70vh",
              maxHeight: "80vh"
            }}
          >
            <DocumentTemplate {...this.state.formObject} />
          </PDFViewer>
          <p
            style={{
              marginBottom: "3vmin",
              marginLeft: "3vmin",
              fontSize: "12px",
              fontStyle: "italic",
              textAlign: "start"
            }}
          >
            This preview might not reflect exactly how the actual document will
            look like.
          </p>
          <DownloadLink />
          <div style={{ flexDirection: "row", marginTop: "12px" }}>
            <div style={{ flex: 0.5 }}>
              <p>
                You can recover this quote using this QRCode. Just scan it, and
                enter the decoded data on this page:
                <br />
                <b>
                  <a
                    href={`${window.location.protocol}//${window.location.host}/load`}
                  >{`${window.location.protocol}//${window.location.host}/load`}</a>
                </b>
              </p>
            </div>
            <div>
              <img src={this.state.qrCodeURL} alt={"QR Code"} />
              <p
                style={{
                  marginLeft: "10vw",
                  marginRight: "10vw",
                  marginTop: "1vh",
                  marginBottom: "1vh",
                  fontSize: "9pt",
                  fontStyle: "italic",
                  fontWeight: 250,
                  wordWrap: "break-word"
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
