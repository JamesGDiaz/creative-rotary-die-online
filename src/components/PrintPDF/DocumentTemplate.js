import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
//Font.registerHyphenationCallback(word => [word]);

//Document
export class DocumentTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "Creative Rotary Die",
      fileName: `${this.props ? this.props.quoteNumber : "quote"}.pdf`,
      counter: 0
    };
    if (!props) {
      this.state = {
        author: "Creative Rotary Die",
        fileName: `${this.props ? this.props.quoteNumber : "quote"}.pdf`,
        quoteNumber: "",
        customer: "",
        dateReceived: "",
        state: "",
        machine: "",
        teeth: "",
        gearPitch: "",
        clientKey: "",
        type: "",
        size: "",
        gapAcross: "",
        gapAround: "",
        cavAcross: "",
        cavAround: "",
        cornerRadius: "",
        material: "",
        price: "",
        quoteString: "",
        qrCodeData: ""
      };
    } else {
      this.state = {
        ...this.props,
        author: "Creative Rotary Die",
        fileName: `${this.props ? this.props.quoteNumber : "quote"}.pdf`
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
    if (nextProps.shouldUpdate) console.log("I shall update the PDF");
  }

  typeSelected = typeProp => {
    const types = [
      "Circular",
      "Rectangular",
      "Oval",
      "Buttcut",
      "Sheeter",
      "Perforator",
      "Special"
    ];
    const selected = {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 5,
      paddingLeft: 5,
      border: "3px solid #000",
      borderWidth: 2,
      borderRadius: 60,
      alignText: "center"
    };

    return (
      <Row
        style={{ padding: 3, alignItems: "center", justifyContent: "center" }}
      >
        {types.map((type, key) => {
          var text = type;
          if (text === "Circular") text = "Circle";
          if (text === "Rectangular") text = "Rectangle";
          return type === typeProp ? (
            <FieldName style={selected}>{text.toUpperCase()}</FieldName>
          ) : (
            <FieldName>{text}</FieldName>
          );
        })}
      </Row>
    );
  };

  render() {
    return (
      <Document
        author={this.author}
        title={`${this.state.quoteNumber}`}
        creator={this.author}
      >
        <Page size="A4" style={styles.page} orientation="portrait">
          <Region style={{ height: "12%" }} debug={false} id={"region1"}>
            <View style={{ flexDirection: "row" }}>
              <Image
                src={require("../../assets/images/CreativeRotary.png")}
                style={{ marginTop: 10, width: 220, height: 120 }}
              />
              <View
                style={[
                  styles.header,
                  {
                    justifyContent: "center",
                    alignItems: "center"
                  }
                ]}
              >
                <StrongText style={{ marginBottom: 3 }}>
                  {this.state.customer}
                </StrongText>
                <Text style={{ marginBottom: 3 }}>
                  {this.state.fabrication ? "P.O." : "QUOTE"}:{" "}
                  {this.state.quoteNumber}
                </Text>
                <RoundBox style={{ marginBottom: 3 }} />
                <Text style={{ marginBottom: 3 }}>{this.state.state}</Text>
              </View>
            </View>
          </Region>
          <Region
            style={{
              flexDirection: "row",
              height: "30%",
              padding: 30
            }}
            debug={false}
            id={"region2"}
          >
            <View
              style={{
                flex: 0.6,
                alignItems: "flex-start",
                justifyContent: "space-between"
              }}
              debug={false}
            >
              <Row>
                <FieldContainer>
                  <FieldName>DATE</FieldName>
                  <FieldValue>{this.state.dateReceived}</FieldValue>
                </FieldContainer>
              </Row>
              <Row>
                <FieldContainer>
                  <FieldName>PRESS MODEL {"&"} MANUF.</FieldName>
                  <FieldValue>{this.state.machine}</FieldValue>
                </FieldContainer>
              </Row>
              <Row>
                <FieldContainer>
                  <FieldName>TEETH</FieldName>
                  <FieldValue>{this.state.teeth}</FieldValue>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>PITCH GEAR</FieldName>
                  <FieldValue>{this.state.gearPitch}</FieldValue>
                </FieldContainer>
              </Row>
              {/*{this.typeSelected(this.state.type)}*/}
              <Row>
                <FieldContainer
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FieldName>SHAPE</FieldName>
                  <FieldValue style={styles.selectedShape}>
                    {this.state.type ? this.state.type.toUpperCase() : ""}
                  </FieldValue>
                </FieldContainer>
              </Row>
              <Row>
                <FieldContainer>
                  <FieldName>SIZE</FieldName>
                  <FieldValue>{this.state.size}</FieldValue>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>CORNER RADIUS</FieldName>
                  <FieldValue style={{ width: 50 }}>
                    {this.state.cornerRadius}
                  </FieldValue>
                </FieldContainer>
              </Row>
              <Row>
                <FieldContainer>
                  <FieldName>CAVITIES ACROSS</FieldName>
                  <FieldValue style={{ width: 50 }}>
                    {this.state.gapAcross}
                  </FieldValue>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>SPACE</FieldName>
                  <FieldValue>{this.state.gapAcross}</FieldValue>
                </FieldContainer>
              </Row>
              <Row>
                <FieldContainer>
                  <FieldName>CAVITIES AROUND</FieldName>
                  <FieldValue style={{ width: 50 }}>
                    {this.state.cavAround}
                  </FieldValue>
                </FieldContainer>
                <FieldContainer>
                  <FieldName>SPACE</FieldName>
                  <FieldValue>{this.state.gapAround}</FieldValue>
                </FieldContainer>
              </Row>
            </View>
            <View style={{ flex: 0.4 }}>
              {this.state.qrCodeData ? (
                <Image
                  cache={false}
                  src={this.state.qrCodeData}
                  style={{ flex: 1, alignSelf: "center" }}
                />
              ) : null}
            </View>
          </Region>
          <Region style={{ height: "32%" }} debug={false} id="quoteData">
            <FieldContainer>
              <FieldName>MATERIAL</FieldName>
              <FieldValue>{this.state.material}</FieldValue>
            </FieldContainer>
            <FieldContainer>
              <FieldName>PRICE</FieldName>
              <FieldValue>{this.state.price}</FieldValue>
            </FieldContainer>
          </Region>
          <Region
            style={{ height: "25%", paddingTop: 10 }}
            debug={false}
            id="quoteData"
          >
            <Image
              cache={false}
              src={require("../../assets/images/Die.jpg")}
              style={{ width: 560, height: 130, alignSelf: "center" }}
            />
            <LightText style={{ padding: 5 }}>
              {this.state.quoteString}
            </LightText>
          </Region>
        </Page>
      </Document>
    );
  }
}

//styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff"
  },
  header: {
    fontSize: 16
  },
  selectedShape: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 5,
    paddingLeft: 5,
    border: "solid #000",
    borderWidth: 1,
    borderRadius: 60,
    alignText: "center"
  }
});

//Styled Components
const FieldContainer = styled.View`
  margin-top: 3pt;
  margin-bottom: 3pt;
  flex-direction: row;
  margin-right: 5pt;
  margin-left: 10pt;
`;
const Region = styled.View`
  padding: 1pt;
`;
const Row = styled.View`
  flex-direction: row;
`;
const StrongText = styled.Text`
  font-size: 18pt;
  font-family: "Helvetica-Bold";
  font-style: bold;
`;
const LightText = styled.Text`
  font-family: "Courier";
  font-size: 10pt;
  margin-left: 4pt;
  margin-right: 4pt;
`;
const FieldName = styled.Text`
  font-size: 12pt;
  font-family: "Helvetica";
  margin-right: 3pt;
`;
const FieldValue = styled.Text`
  font-size: 12pt;
  font-family: "Helvetica";
  padding-left: 15pt;
  padding-right: 15pt;
  border-bottom: 1pt solid #000000;
`;
/*const StrongField = styled.Text`
  font-size: 16pt;
  font-family: "Helvetica-Bold";
  margin-right: 3pt;
`;*/
const RoundBox = styled.View`
  height: 7px;
  width: 100px;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 8px;
`;

export default DocumentTemplate;
