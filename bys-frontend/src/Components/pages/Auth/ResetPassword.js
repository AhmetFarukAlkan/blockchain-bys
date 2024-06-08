import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';

function ResetPassword() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Row className="justify-content-center">
            <Col md="6">
                <Form className="box border" noValidate validated={validated} onSubmit={handleSubmit}>

                    <h3 className="mb-3">Yeni Şifrenizi Girin</h3>

                    <Form.Group controlId="validationCustom02">
                        <Form.Label>Yeni Şifre</Form.Label>
                        <Form.Control
                            required
                            type="password"
                        />

                    </Form.Group>
                    <Form.Group controlId="validationCustom02">
                        <Form.Label>Yeni Şifre <small>(Tekrar)</small></Form.Label>
                        <Form.Control
                            required
                            type="password"
                        />

                    </Form.Group>

                    <Button type="submit">Kaydet</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default ResetPassword;
