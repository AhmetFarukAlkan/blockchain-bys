import React from 'react';
import CurrencyFormat from 'react-currency-format';

const BaseCurrencyFormat = (props) => {
  const {value} = props;

  return (
    <CurrencyFormat
      value={parseFloat(value) || 0}
      prefix={'₺'}
      displayType={'text'}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
};

export default BaseCurrencyFormat;
