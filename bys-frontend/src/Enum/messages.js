export const messages = [
    {
        key: 'APPOINTMENT.SLOT.FULL',
        trans: 'Bu saat doludur. Randevu alımı için musait değildir.'
    },
    {
        key: 'APPOINTMENT.HOLIDAY',
        trans: 'Tatil günlerinde randevu alınamaktadır.'
    },
    {
        key: 'COMPANY.ADDRESSES.NOT_FOUND',
        trans: 'Şirketin adres bilgisi bulunamadı.'
    },
    {
        key: 'INVOICE.HAS_DIFFERENT_STATUS',
        trans: 'Farkı durumları olan faturalar seçilemez.'
    }
];

export function getMessage(key) {
    var item = messages.find(item => {
        return item.key === key;
    });
    if (item) {
        return item.trans;
    }
    return key;
}
