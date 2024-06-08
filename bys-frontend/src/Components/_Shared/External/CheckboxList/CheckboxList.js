import React, {useState} from "react";
import {Row, Col, Form} from 'react-bootstrap';


function CheckboxList(props) {

    function handleSubmit(e) {

    }

    function checkboxChange(event) {


        props.checkboxList.map(checkItem => {
            return (
                checkItem.name === event.target.name ? checkItem.status = event.target.checked : ''
            )
        });

        props.checkboxUpdate(props.checkboxList)


    }

    return (
        <div>
            <Row className="mt-3">
                <Col md="12">
                    <div className="box border">
                        <h5>Şirket Kategorisi</h5>
                        <Form onChange={handleSubmit} className="mt-4">
                            {
                                props.checkboxList.map((item, index) => {
                                    return (
                                        <Form.Group key={index} controlId={"categoryCheck_" + index}
                                                    className="d-inline-block mr-3">
                                            {
                                                item.status === true ?
                                                    <Form.Check name={item.name} onClick={checkboxChange}
                                                                type="checkbox" label={item.name}/> :
                                                    <Form.Check name={item.name} onClick={checkboxChange}
                                                                type="checkbox" label={item.name}/>
                                            }

                                        </Form.Group>
                                    )
                                })
                            }
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CheckboxList
