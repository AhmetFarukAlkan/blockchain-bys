import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Image, Tooltip, Form} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LoadingAnimation from '../../../../Assets/Img/ripple_animation_200px.svg';
import BaseView from '../../../common/base-view/BaseView';
import TableLoader from '../../../_Shared/External/Loader/Table';
import { twMerge } from 'tailwind-merge';

const DataTable = (props) => {
  const {
    columns,
    data,
    loading,
    sortTable,
    rows,
    setRows,
    expandedRows,
    setExpandedRows,
    fetchAccordionData,
    fetchedAccordionData,
    accordions,
    overflowX = true
  } = props;

  function getPropByString(obj, propString) {
    if (!propString)
      return obj;

    let prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      let candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }

    if (obj === null) {
      return obj;
    }

    return obj[props[i]];
  }

  function multiselectAdd(id) {
    setRows([...rows, id]);
  }

  function multiselectRemove(id) {
    const index = rows.indexOf(id);
    if (index > -1) {
      rows.splice(index, 1);
      setRows(rows);
    }
  }

  function toggleRowExpansion(id) {
    accordions && setExpandedRows((prevState) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      };
    });
    accordions?.fetchUrl && !fetchedAccordionData[id] && fetchAccordionData(id);
  }

  const classes = twMerge(`
    flex shadow-md sm:rounded-lg
    ${overflowX ? 'overflow-x-auto' : ''}
  `);

  return (
    <BaseView className={classes}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className={'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'}>
        <tr>
          {rows &&
           <th scope="col" className="px-6 py-3"></th>
          }
          {accordions && 
            <th scope="col" className="px-6 py-3"></th>
          }
          {columns.map((column, index) => {
            return (
              !column['hide'] &&
              <>
                {
                  column['sortable']
                  ? (
                    <th key={index}
                        scope="col"
                        className={`px-4 py-3 text-xs hover:cursor-pointer ${column['style']} ${column['className']}`}
                        onClick={() => sortTable(column['field'])}
                    >
                      {column['title']}
                      <FontAwesomeIcon icon="sort" className={'!ml-2'}/>
                    </th>
                  )
                  : (
                    <th key={index}
                        scope="col"
                        className={`px-4 py-3 text-xs ${column['className']}`}
                    >
                      {column['title']}
                    </th>
                  )
                }
              </>
            );
          })
          }
        </tr>
        </thead>
        <tbody>

        {loading
         ? (<tr className={'bg-white border-b dark:bg-gray-900 dark:border-gray-700'}>
            <td className={'text-center bg-white'} colSpan={columns.length}>
              <Image src={LoadingAnimation}/>
            </td>
          </tr>)
         : (data?.length === 0
            ? (<tr className={'bg-white border-b dark:bg-gray-900 dark:border-gray-700'}>
                <td colSpan={columns.length}>No items found</td>
              </tr>)
            : (data?.map((data, index) => {
                  return (
                    <>
                      <tr
                        onClick={() => toggleRowExpansion(data.id)}
                        className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${accordions && 'cursor-pointer'} 
                        ${expandedRows && expandedRows[data.id] && 'bg-gray-200'}`}
                      >                   
                        {rows &&
                        <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Form.Check type={'checkbox'} id={`select-all-checkbox`}
                          >
                            <Form.Check.Input type={'checkbox'} isValid onClick={event => {
                              event.target.checked ? multiselectAdd(data.id) : multiselectRemove(data.id);
                            }}/>
                          </Form.Check>
                        </th>
                        }
                        {accordions && (
                          <td className="px-6 py-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <FontAwesomeIcon
                              icon={expandedRows[data.id] ? 'chevron-up' : 'chevron-down'}
                              onClick={() => toggleRowExpansion(data.id)}
                            />
                          </td>
                        )}
                        {columns.map((column, index) => {
                          return (
                            !column['hide'] &&
                            <>
                            {
                              column['type'] === 'button'
                              ? (
                                <td key={index}
                                    className={`px-4 py-3 text-sm ${column['className']}`}
                                    style={{whiteSpace: 'nowrap'}}
                                >
                                  {column.tooltip
                                  ? <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={<Tooltip id={index}>
                                      {column.tooltip}
                                    </Tooltip>}
                                  >
                                    <Button variant={column.buttonVariant} onClick={(e) => column['onClick'](e, data)}>
                                      <FontAwesomeIcon icon={column.icon}/> {column.buttonText}
                                    </Button>
                                  </OverlayTrigger>
                                  : <Button variant={column.buttonVariant}
                                            onClick={(e) => column['onClick'](e, data)}><FontAwesomeIcon
                                      icon={column.icon}/> {column.buttonText}</Button>
                                  }
                                </td>
                              )
                              : (
                                <td key={index}
                                    className={`px-4 py-3 text-sm ${column['className']}`}
                                    style={{whiteSpace: 'nowrap'}}
                                >
                                  {column['render']
                                  ? column['render'](data)
                                  : getPropByString(data, column['field'])}
                                </td>
                              )
                            }
                            </>
                          );
                        })}
                      </tr>
                      {accordions?.data && expandedRows[data.id] && (
                        <tr>
                          <td colSpan={columns.length + 1}>
                            <BaseView className={'relative overflow-x-auto shadow-md sm:rounded-lg p-6'}>
                              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className={'text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400'}>
                                <tr>
                                  {accordions.columns.map((column, index) => {
                                    return (
                                      <>
                                        {
                                          <th key={index}
                                              scope="col"
                                              className={`px-4 py-3 text-xs ${column['className']}`}
                                          >
                                            {column['title']}
                                          </th>
                                        }
                                      </>
                                    );
                                  })
                                  }
                                </tr>
                                </thead>
                                <tbody>

                                {accordions?.fetchUrl && !fetchedAccordionData[data.id] 
                                ? (<tr className={'bg-white dark:bg-gray-900'}>
                                    <td className={'text-center bg-white dark:bg-gray-900'} colSpan={accordions.columns.length}>
                                      <div className="bg-white dark:bg-gray-900 p-4">
                                        <TableLoader numberOfRows={5}/>
                                      </div>
                                    </td>
                                  </tr>)
                                : (data[accordions.data].length === 0
                                    ? (<tr className={'bg-white border-b dark:bg-gray-900 dark:border-gray-700'}>
                                        <td colSpan={accordions.columns.length}>No items found</td>
                                      </tr>)
                                    : (Array.isArray(data[accordions.data]) && data[accordions.data].map((data, index) => {
                                          return (
                                            <tr key={index} className={'bg-white border-b dark:bg-gray-900 dark:border-gray-700'}>
                                              {rows &&
                                              <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <Form.Check type={'checkbox'} id={`select-all-checkbox`}
                                                >
                                                  <Form.Check.Input type={'checkbox'} isValid onClick={event => {
                                                    event.target.checked ? multiselectAdd(data.id) : multiselectRemove(data.id);
                                                  }}/>
                                                </Form.Check>
                                              </th>
                                              }

                                              {accordions.columns.map((column, index) => {

                                                return (
                                                  column['type'] === 'button'
                                                  ? (
                                                    <td key={index}
                                                        className={`px-4 py-3 text-sm ${column['className']}`}
                                                        style={{whiteSpace: 'nowrap'}}
                                                    >
                                                      {column.tooltip
                                                      ? <OverlayTrigger
                                                        placement="top"
                                                        delay={{show: 250, hide: 400}}
                                                        overlay={<Tooltip id={index}>
                                                          {column.tooltip}
                                                        </Tooltip>}
                                                      >
                                                        <Button variant={column.buttonVariant} onClick={(e) => column['onClick'](e, data)}>
                                                          <FontAwesomeIcon icon={column.icon}/> {column.buttonText}
                                                        </Button>
                                                      </OverlayTrigger>
                                                      : <Button variant={column.buttonVariant}
                                                                onClick={(e) => column['onClick'](e, data)}><FontAwesomeIcon
                                                          icon={column.icon}/> {column.buttonText}</Button>
                                                      }
                                                    </td>
                                                  )
                                                  : (
                                                    <td key={index}
                                                        className={`px-4 py-3 text-sm ${column['className']}`}
                                                        style={{whiteSpace: 'nowrap'}}
                                                    >
                                                      {column['render']
                                                      ? column['render'](data)
                                                      : getPropByString(data, column['field'])}
                                                    </td>
                                                  )
                                                );
                                              })}
                                            </tr>
                                          );
                                        })
                                    )
                                )
                                }
                                </tbody>
                              </table>
                            </BaseView>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
            )
         )
        }
        </tbody>
      </table>
    </BaseView>
  );
};

export default DataTable;
