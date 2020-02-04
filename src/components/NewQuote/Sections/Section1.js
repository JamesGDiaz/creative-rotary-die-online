import React, { Component } from "react";
import { Form, FormControl, InputGroup, Col } from "react-bootstrap";
class Section1 extends Component {
  render() {
    return (
      <div>
        <Form.Check
          className="mb-3 sm-12 sm-12"
          custom
          name="fabrication"
          label="Fabrication Order"
          type={"checkbox"}
          onChange={this.props.handleChange}
          value={this.props.values.fabrication}
          id={"sec1-fabrication"}
        />
        <InputGroup className="mb-3" sm={12} md={12} lg={6}>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Quote Number
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="quoteNumber"
            onChange={this.props.handleChange}
            value={this.props.values.quoteNumber}
            isInvalid={!!this.props.errors.quoteNumber}
          />
        </InputGroup>
        <InputGroup className="mb-3" sm={12} md={12} lg={6}>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Customer
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            name="customer"
            onChange={this.props.handleChange}
            value={this.props.values.customer}
            isInvalid={!!this.props.errors.customer}
          />
        </InputGroup>

        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Date Received</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              name="dateReceived"
              onChange={this.props.handleChange}
              value={this.props.values.dateReceived}
              isInvalid={!!this.props.errors.dateReceived}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                State
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              name="state"
              onChange={this.props.handleChange}
              value={this.props.values.state}
              isInvalid={!!this.props.errors.state}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12}>
            <InputGroup.Prepend>
              <InputGroup.Text>Machine</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="machine"
              onChange={this.props.handleChange}
              value={this.props.values.machine}
              isInvalid={!!this.props.errors.machine}
            />
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Teeth</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="teeth"
              onChange={this.props.handleChange}
              value={this.props.values.teeth}
              isInvalid={!!this.props.errors.teeth}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Gear Pitch</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="gearPitch"
              onChange={this.props.handleChange}
              value={this.props.values.gearPitch}
              isInvalid={!!this.props.errors.gearPitch}
            />
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Client Key</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="clientKey"
              onChange={this.props.handleChange}
              value={this.props.values.clientKey}
              isInvalid={!!this.props.errors.clientKey}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Type</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              name="type"
              onChange={this.props.handleChange}
              value={this.props.values.type}
              isInvalid={!!this.props.errors.type}
            >
              <option>Circular</option>
              <option>Rectangular</option>
              <option>Oval</option>
              <option>Buttcut</option>
              <option>Sheeter</option>
              <option>Perforator</option>
              <option>Special</option>
            </FormControl>
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12}>
            <InputGroup.Prepend>
              <InputGroup.Text>Size</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="size"
              onChange={this.props.handleChange}
              value={this.props.values.size}
              isInvalid={!!this.props.errors.size}
            />
            <InputGroup.Append>
              <FormControl
                as="select"
                name="unitSize"
                onChange={this.props.handleChange}
                value={this.props.values.unitSize}
                isInvalid={!!this.props.errors.unitSize}
              >
                <option>mm</option>
                <option>in</option>
              </FormControl>
            </InputGroup.Append>
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12}>
            <InputGroup.Prepend>
              <InputGroup.Text>Corner Radius</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="cornerRadius"
              onChange={this.props.handleChange}
              value={this.props.values.cornerRadius}
              isInvalid={!!this.props.errors.cornerRadius}
            />
            <InputGroup.Append>
              <FormControl
                as="select"
                name="unitCornerRadius"
                onChange={this.props.handleChange}
                value={this.props.values.unitCornerRadius}
                isInvalid={!!this.props.errors.unitCornerRadius}
              >
                <option>mm</option>
                <option>in</option>
              </FormControl>
            </InputGroup.Append>
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Cav Across</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="cavAcross"
              onChange={this.props.handleChange}
              value={this.props.values.cavAcross}
              isInvalid={!!this.props.errors.cavAcross}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Gap Across</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="gapAcross"
              onChange={this.props.handleChange}
              value={this.props.values.gapAcross}
              isInvalid={!!this.props.errors.gapAcross}
            />
            <InputGroup.Append>
              <FormControl
                as="select"
                name="unitGapAcross"
                onChange={this.props.handleChange}
                value={this.props.values.unitGapAcross}
                isInvalid={!!this.props.errors.unitGapAcross}
              >
                <option>mm</option>
                <option>in</option>
              </FormControl>
            </InputGroup.Append>
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Cav Around</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="cavAround"
              onChange={this.props.handleChange}
              value={this.props.values.cavAround}
              isInvalid={!!this.props.errors.cavAround}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12} md={12} lg={6}>
            <InputGroup.Prepend>
              <InputGroup.Text>Gap Around</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="gapAround"
              onChange={this.props.handleChange}
              value={this.props.values.gapAround}
              isInvalid={!!this.props.errors.gapAround}
            />
            <InputGroup.Append>
              <FormControl
                as="select"
                name="unitGapAround"
                onChange={this.props.handleChange}
                value={this.props.values.unitGapAround}
                isInvalid={!!this.props.errors.unitGapAround}
              >
                <option>mm</option>
                <option>in</option>
              </FormControl>
            </InputGroup.Append>
          </InputGroup>
        </Form.Row>
        <Form.Row>
          <InputGroup as={Col} className="mb-3" sm={12}>
            <InputGroup.Prepend>
              <InputGroup.Text>Material</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="material"
              onChange={this.props.handleChange}
              value={this.props.values.material}
              isInvalid={!!this.props.errors.material}
            />
          </InputGroup>
          <InputGroup as={Col} className="mb-3" sm={12}>
            <InputGroup.Prepend>
              <InputGroup.Text>Price</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="price"
              onChange={this.props.handleChange}
              value={this.props.values.price}
              isInvalid={!!this.props.errors.price}
            />
          </InputGroup>
        </Form.Row>
      </div>
    );
  }
}

export default Section1;
