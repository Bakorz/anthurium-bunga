// src/components/SmartAlert.jsx
import React, { useState, useEffect } from 'react';

const SmartAlert = ({ trenPertumbuhan, totalPanen }) => {
    const [alertInfo, setAlertInfo] = useState(null);

    useEffect(() => {
        // Logika rule-based sederhana
        if (trenPertumbuhan <= -2.0) { // Contoh: Jika turun lebih dari 2%
            setAlertInfo({
                type: 'danger',
                icon: '⚠️',
                title: 'Peringatan: Penurunan Tren Pertumbuhan',
                message: `Tren pertumbuhan turun menjadi ${trenPertumbuhan}%. Segera periksa data distribusi di wilayah terkait.`,
                color: 'bg-red-50 border border-red-200 text-red-700'
            });
        } else if (trenPertumbuhan >= 10.0) { // Jika naik lebih dari 10%
            setAlertInfo({
                type: 'success',
                icon: '🌟',
                title: 'Diagnosa: Lonjakan Positif',
                message: 'Pertumbuhan panen melebihi target. Wilayah ini stabil.',
                color: 'bg-green-50 border border-green-200 text-green-700'
            });
        } else {
            setAlertInfo(null); // Kondisi normal (-1.9% hingga 9.9%), sembunyikan alert
        }
    }, [trenPertumbuhan, totalPanen]);

    if (!alertInfo) return null;

    return (
        <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 shadow-sm ${alertInfo.color}`}>
            <div className="text-2xl">{alertInfo.icon}</div>
            <div>
                <h4 className="font-bold">{alertInfo.title}</h4>
                <p className="text-sm mt-1">{alertInfo.message}</p>
            </div>
        </div>
    );
};

export default SmartAlert;