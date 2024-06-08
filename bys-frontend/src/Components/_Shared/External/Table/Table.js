import React, {useEffect, useRef, useState} from 'react';
import Pagination from 'react-js-pagination';
import {initialQueryState, perPageOptions} from '../../../../Constants/tableConstants';
import useLoadingDispatcher from '../../../../Hooks/useLoadingDispatcher';
import Http from '../../../../Http';
import {sortTable} from '../../../../Utils/utils';
import BaseParagraph from '../../../common/base-paragraph/BaseParagraph';
import BaseView from '../../../common/base-view/BaseView';
import DataTable from './DataTable';
import Form from 'react-bootstrap/Form';
import SweetAlert from 'sweetalert2-react';

const Table = (props) => {

  const {
    columns,
    accordions,
    hide,
    incomingData,
    fetchUrl,
    tablePerPage,
    mediator,
    customInitialQuery,
    type,
    setRows,
    rows
  } = props;

  const [fetchedAccordionData, setFetchedAccordionData] = useState({});
  const [isFetching, setIsFetching] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const {increaseLoading, decreaseLoading} = useLoadingDispatcher();
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(tablePerPage || 20);
  const [totalItems, setTotalItems] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState(customInitialQuery || initialQueryState);
  const [swTitle, setswTitle] = useState('');
  const [swText, setswText] = useState('');
  const [swShow, setswShow] = useState(false);

  const fetchData = async () => {
    increaseLoading();
    let response;
    if ('report' !== type) {
      response = await Http.get(fetchUrl, {params: query});
      setData(response.data.data);
      setTotalItems(response.data.total);
    } else {
      response = await Http.post(fetchUrl, query);
      setData(response.data.data);
      setTotalItems(response.data.total);
    }
  };

  const fetchAccordionData = async (id) => {
    if (isFetching[id]) {
      return;
    }

    setIsFetching((prevState) => ({ ...prevState, [id]: true }));

    try {
      let response;
      const accordionRow = data.find(item => item.id === id);
      const dynamicParams = Object.fromEntries(Object.entries(accordions.params).map(([key, value]) => [key, accordionRow[value]]));

      response = await Http.get(accordions.fetchUrl, { params: dynamicParams } );

      if (accordions.data) {
        const accordionRowCopy = { ...accordionRow };
        accordionRowCopy[accordions.data] = response.data.data;
        setData(prevData => {
          const newData = [...prevData];
          const dataIndex = newData.findIndex(item => item.id === id);
          if (dataIndex !== -1) {
            newData[dataIndex] = accordionRowCopy;
          }
          return newData;
        });
        setFetchedAccordionData((prevState) => ({ ...prevState, [id]: true }));
      }
    } catch (error) {
      setFetchedAccordionData((prevState) => ({ ...prevState, [id]: false }));
      setswTitle('Hata Oluştu!');
      setswText('Bir hata oluştu.');
      setswShow(true);
    } finally {
      setIsFetching((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const updateRowData = {
    updateRowData: (data) => {
      setData((prevState) => {
        const currentState = [...prevState];
        let itemIndex = currentState.findIndex((item) => item.id === data.id);
        currentState[itemIndex] = data;
        return currentState;
      });
    }
  };

  const addRowData = {
    addRowData: (rowData) => {
      setData(prevState => [...prevState, rowData]);
      setTotalItems(prevState => prevState + 1);
    }
  };

  const removeRowData = {
    removeRowData: (data) => {
      setData((prevState) => prevState.filter((item) => item.id !== data.id));
      setTotalItems(prevState => prevState - 1);
    }
  };

  const handleSetQuery = {
    updateQuery: (data) => {
      setActivePage(1);
      setQuery((prevState) => {
        return {
          ...prevState,
          page: 1,
          ...data
        };
      });
    }
  };

  const queryRef = useRef();
  queryRef.current = query;

  const getQuery = {
    filterQuery: () => {
      return queryRef.current;
    }
  };

  const fetchAndResetState = () => {
    fetchData().finally(() => {
      decreaseLoading();
      setFetchedAccordionData({});
      setExpandedRows({});
    });
  };

  const handlePageChange = (value) => {
    setActivePage(value);
    setQuery(prevState => {
      return {
        ...prevState,
        page: value
      };
    });
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setActivePage(1);
    setQuery(prevState => {
      return {
        ...prevState,
        perPage: value,
        page: 1
      };
    });
  };

  const handleSortTable = (key) => {
    sortTable(key, query, setQuery, setActivePage);
  };

  useEffect(() => {
    incomingData && setData(incomingData);
  }, [incomingData])
  
  useEffect(() => {
    fetchUrl && !incomingData && fetchAndResetState()
  }, [query, incomingData]);

  useEffect(() => {
    if (mediator) {
      mediator.register(handleSetQuery);
      mediator.register(getQuery);
      mediator.register(updateRowData);
      mediator.register(addRowData);
      mediator.register(removeRowData);
    }

    return () => {
      if (mediator) {
        mediator.unregister(handleSetQuery);
        mediator.unregister(getQuery);
        mediator.unregister(updateRowData);
        mediator.unregister(removeRowData);
      }
    };
  }, [mediator]);

  return (
    <>
      <SweetAlert
        show={swShow}
        title={swTitle}
        text={swText}
        onConfirm={() => setswShow(false)}
      />
      <BaseView className={'grid grid-cols-9 !my-4'}>
        {
          !hide?.totalItems && (
            <BaseView className={'col-span-3 my-auto'}>
              <BaseParagraph className={'!m-0'} text={`Toplam kayıt sayısı: ${totalItems}`}/>
            </BaseView> 
          )
        }
      </BaseView>

      <DataTable
        columns={columns}
        data={data}
        sortTable={handleSortTable}
        setRows={setRows}
        rows={rows}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}  
        accordions={accordions}
        fetchedAccordionData={fetchedAccordionData}
        fetchAccordionData={fetchAccordionData}
      />
      {
        // !hide?.paginate && (
        //   <BaseView className={'grid grid-cols-10 py-1.5'}>
        //     <BaseView className={'col-span-1'}>
        //       <Form.Control
        //         as="select"
        //         name="status"
        //         defaultValue={initialQueryState.perPage}
        //         onChange={(e) => handlePerPageChange(e.target.value)}
        //       >
        //         {perPageOptions.map(item => {
        //           return (
        //             <option key={item.value} value={item.value}>
        //               {item.label}
        //             </option>
        //           );
        //         })}
        //       </Form.Control>
        //     </BaseView>
        //     <BaseView className={'col-span-9'}>
        //       <BaseView className={'flex justify-center items-center'}>
        //         <Pagination
        //           totalItemsCount={totalItems}
        //           itemClass="page-item"
        //           linkClass="page-link"
        //           activePage={activePage}
        //           itemsCountPerPage={perPage}
        //           onChange={handlePageChange}
        //         />
        //       </BaseView>
        //     </BaseView>
        //   </BaseView>
        // )
      }
    </>
  );
};

export default Table;
