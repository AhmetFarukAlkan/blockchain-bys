import React, {useState} from 'react';
import {Button, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {serialize} from '../../../../Utils/utils';

const FilterSearchBar = (props) => {

  const [filterText, setFilterText] = useState('');
  const history = useHistory();
  const {query, setQuery, fetchData, filterableFields, pathname} = props;

  const {
    register,
    handleSubmit
  } = useForm();

  const filter = (data, send = true) => {
    const params = query;
    params.query_type = data.query;
    params.query = data.filter_text;
    params.page = 1;

    setQuery(params);
    if (send) {
      pathname ? history.push({pathname: pathname, search: serialize(params)}) : fetchData();
    }

  };

  const clearFilter = (event) => {
    event.stopPropagation();
    setFilterText('');

    const params = query;
    params.query_type = ''
    params.query = ''

    setQuery(params);
    fetchData();
  };

  return (
    <div className="box border filterBar mb-3">
      <Row>
        <Col md={7}>
          <Form className="d-block w-100" onSubmit={handleSubmit(filter)}>
            <Row className="no-gutters">
              {
                <Col md="4">
                  <InputGroup size="sm">
                    <Form.Control
                      as="select"
                      name="query"
                      ref={register()}
                    >
                      {
                        filterableFields.map(filterableField => {
                          return (
                            <option selected={filterableField?.selected} value={filterableField?.name} key={filterableField?.key}>
                              {filterableField?.displayName}
                            </option>
                          );
                        })
                      }
                    </Form.Control>
                  </InputGroup>
                </Col>
              }
              <Col md="7">
                <InputGroup size="sm" className="ml-2">
                  <FormControl
                    name="filter_text"
                    ref={register()}
                    value={filterText}
                    placeholder="Hızlı Arama..."
                    aria-label="Hızlı Arama..."
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  <InputGroup.Append>
                    {
                      filterText &&
                      <>
                        <Button variant="outline-success" type="submit">Ara</Button>
                        <Button variant="outline-danger" className="ml-2"
                                onClick={clearFilter}>Temizle</Button>
                      </>
                    }
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>

          </Form>
        </Col>
      </Row>

    </div>
  );
};

export default FilterSearchBar;
