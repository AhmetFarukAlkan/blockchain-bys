import React from 'react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import LightButton from '../../../common/button/LightButton';
import PermissionsGate from '../../../common/roles/PermissionsGate';
import { PERMISSIONS } from '../../../../Constants/permissionConstants';

function ExportCopyButton(props) {
    const copyEl = () => {
        let range, sel;
        let table = document.querySelector("table#dataTable");

        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            // unselect any element in the page
            sel.removeAllRanges();

            try {
                range.selectNodeContents(table);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(table);
                sel.addRange(range);
            }

            document.execCommand("copy");
        }

        sel.removeAllRanges();
        Toastify({
            text: "Koyalandı!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #37ecba, #72afd3)",
            stopOnFocus: true,
            onClick: function () {
            }
        }).showToast();
    };


    return (
        <PermissionsGate scopes={[PERMISSIONS.EXCEL_EXPORT]}>
            <LightButton label="Excel Çıktısı Al" icon="file-excel" className="mr-2" onClick={() => props.filterData({key: "excel", value: true})}/>
            <LightButton label="Panoya Kopyala" icon="file-excel" onClick={() => copyEl()}/>
        </PermissionsGate>
    )
}

export default ExportCopyButton;

