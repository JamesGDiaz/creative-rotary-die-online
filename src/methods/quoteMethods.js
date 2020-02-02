import zlib from "zlib";
import QRCode from "qrcode";

const receivedCompressedQuote = formString => {
  formString
    .replace(/[-]/g, "+")
    .replace(/[_]/g, "/")
    .replace(/(- )/g, "")
    .replace(/(-%20)/g, "")
    .replace(/(-^[\n])/g, "");
  zlib.gunzip(Buffer.from(formString, "base64"), (error, result) => {
    if (error) {
      this.setState({
        loading: false,
        error:
          "There was an error generating this quote. Is the decoded data correct?"
      });
      console.error(error);
      return;
    }
    console.log("Decompression succesful");
    this.decompressionDidFinish(fromIdToSchema(result));
  });
};

const decompressionDidFinish = result => {
  let formObject = JSON.parse(result.toString());
  formObject.quoteString = this.state.dirtyFormString;
  QRCode.toDataURL(
    this.state.dirtyFormString,
    {
      errorCorrectionLevel: "L"
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

module.exports = { receivedCompressedQuote, decompressionDidFinish };
