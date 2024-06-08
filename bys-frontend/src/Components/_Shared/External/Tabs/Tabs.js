import React, {useState} from 'react';
import {Col, Nav, Row} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import {slugify} from '../../../../Utils/utils';

const CustomTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(slugify(children[0].props.label));

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveTab));
  };

  return (
    <Tab.Container defaultActiveKey={activeTab}>
      <Row>
        <Col sm={12} className="border-bottom">
          <Nav variant="pills" className="d-flex flex-row mt-4">
            {children.map((item, index) => {
              return (
                <Nav.Item key={index} onClick={(e) => handleClick(e, item.props.label)}>
                  <Nav.Link style={{marginBottom: "-1px", borderRadius: 0}} className={`${slugify(item.props.label) === activeTab ? 'active-tab-border active-tab' : 'inactive-tab'} text-dark bg-transparent`} eventKey={slugify(item.props.label)}>{item.props.label}</Nav.Link>
                </Nav.Item>
              )
            })}
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            {children.map((item, index) => {
              if (slugify(item.props.label) === activeTab)
                return(
                  <Tab.Pane key={index} eventKey={slugify(item.props.label)} title={item.props.label}>
                    {item.props.children}
                  </Tab.Pane>
                );
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default CustomTabs;
