import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';

function ForgotPassword() {
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

                    <h3 className="mb-3">Şifre Sıfırlama Bağlantısı Gönder</h3>

                    <Form.Group controlId="validationCustom01">
                        <Form.Label>E-Posta:</Form.Label>
                        <Form.Control
                            required
                            type="email"
                        />

                    </Form.Group>

                    <Button type="submit">Gönder</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default ForgotPassword;
