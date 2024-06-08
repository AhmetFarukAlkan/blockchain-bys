import React from 'react';

function Footer() {
  return (
    <>
      <footer className="dark:bg-gray-900">
        <hr className="border-gray-200 dark:border-gray-700"/>
        <p
          className="w-full text-center my-6 text-gray-500 font-medium dark:text-white"
        >
          Copyright {new Date().getFullYear()} Marmara | Tüm Hakları Saklıdır.
        </p>
      </footer>
    </>
  );
}

export default Footer;

