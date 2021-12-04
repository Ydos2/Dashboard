import React, { useState, setState } from "react";
import { useTheme } from "@material-ui/styles";

// nodejs library that concatenates classes
import classNames from "classnames";

import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "./Charts";

// styles
import useStyles from "./styles";

import ActionAreaCard from "../../components/Cards/Card";
import WeatherCard from "../../components/Cards/Weather";
import CryptoCard from "../../components/Cards/Crypto";

import { widgetConf, cookies } from "../../components/Cards/ConfWidget";

export function reloadPage()
{
  window.location.reload(false);
}

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  widgetConf.map((obj) =>
    (obj.id == 0) ? obj.stateWidget = cookies.get('widget0') :
    (obj.id == 1) ? obj.stateWidget = cookies.get('widget1') : null
  );
  console.log(widgetConf);

  return (
    
    <div className="content">
      {widgetConf.map((widgetObj) => (
        widgetObj.stateWidget == "true" ?
        <>
          {(widgetObj.id == 0) ? <WeatherCard></WeatherCard> : null}
          {(widgetObj.id == 1) ? <CryptoCard></CryptoCard> : null}
        </> : null
      ))}

      {/**Template widget */}
      <Row>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Total Shipments</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> 763,215
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/*<Line
                  data={chartExample2.data}
                  options={chartExample2.options}
                />*/}
                </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Daily Sales</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                3,500€
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/*<Bar
                  data={chartExample3.data}
                  options={chartExample3.options}
                />*/}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Completed Tasks</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" /> 12,100K
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/*<Line
                  data={chartExample4.data}
                  options={chartExample4.options}
                />*/}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>


      {/*Money*/}
      <Row>
        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Simple Table</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th className="text-center">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dakota Rice</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                    <td className="text-center">$36,738</td>
                  </tr>
                  <tr>
                    <td>Minerva Hooper</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                    <td className="text-center">$23,789</td>
                  </tr>
                  <tr>
                    <td>Sage Rodriguez</td>
                    <td>Netherlands</td>
                    <td>Baileux</td>
                    <td className="text-center">$56,142</td>
                  </tr>
                  <tr>
                    <td>Philip Chaney</td>
                    <td>Korea, South</td>
                    <td>Overland Park</td>
                    <td className="text-center">$38,735</td>
                  </tr>
                  <tr>
                    <td>Doris Greene</td>
                    <td>Malawi</td>
                    <td>Feldkirchen in Kärnten</td>
                    <td className="text-center">$63,542</td>
                  </tr>
                  <tr>
                    <td>Mason Porter</td>
                    <td>Chile</td>
                    <td>Gloucester</td>
                    <td className="text-center">$78,615</td>
                  </tr>
                  <tr>
                    <td>Jon Porter</td>
                    <td>Portugal</td>
                    <td>Gloucester</td>
                    <td className="text-center">$98,615</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
