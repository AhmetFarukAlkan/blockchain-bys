import React, {useState} from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Button from '../../../common/button/Button';

export const CopyTextToClipboardButton = ({copyText}) => {

  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <OverlayTrigger placement="top"
                      delay={{show: 250, hide: 400}}
                      overlay={<Tooltip id={copyText}>
                        {isCopied ? 'Kopyalandı!' : 'Kopyala'}
                      </Tooltip>}
      >
        <Button
          className="ml-2 mr-0 transparent hover:bg-dark-800 focus:ring-4 focus:outline-none focus:ring-dark-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
          icon="copy"
          onClick={() => handleCopyClick()}/>
      </OverlayTrigger>
    </>
  );
};
