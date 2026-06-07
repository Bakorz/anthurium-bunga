import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const DAFTAR_PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
  "Bengkulu", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung",
  "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
  "Maluku", "Maluku Utara",
  "Papua Barat", "Papua Barat Daya", "Papua", "Papua Selatan", "Papua Tengah", "Papua Pegunungan"
];

export default function MetabaseDashboard() {
  const [iframeUrl, setIframeUrl] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchMetabaseUrl = async () => {
      try {
        const url = getApiUrl(`/api/metabase/embed-url?location=${selectedLocation}`);
        const response = await fetch(url);
        const data = await response.json();
        setIframeUrl(data.iframeUrl);
      } catch (error) {
        console.error('Gagal memuat peta:', error);
      }
    };
    fetchMetabaseUrl();
  }, [selectedLocation]);

  // ==========================================
  // LOGIKA DATA DINAMIS UNTUK KARTU STATISTIK
  // ==========================================
  let dataStatistik = {
    total: "114.500",
    labelTop: "Provinsi Tertinggi",
    namaTop: "Jawa Barat",
    tren: "+12.5%",
    isNaik: true
  };

  // Jika user memilih provinsi tertentu, ubah datanya
  if (selectedLocation === "Jawa Barat") {
    dataStatistik = { total: "45.200", labelTop: "Kabupaten Tertinggi", namaTop: "Cianjur", tren: "+15.3%", isNaik: true };
  } else if (selectedLocation === "Jawa Timur") {
    dataStatistik = { total: "32.100", labelTop: "Kabupaten Tertinggi", namaTop: "Malang", tren: "+8.1%", isNaik: true };
  } else if (selectedLocation !== "") {
    // Data tiruan untuk provinsi lainnya
    dataStatistik = { total: "8.400", labelTop: "Status Distribusi", namaTop: "Stabil", tren: "-2.1%", isNaik: false };
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto">

      {/* HEADER & TOMBOL CETAK */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Visualisasi Anthurium</h2>
          <p className="text-gray-500 text-sm">Sistem Informasi Geografis Luas Panen Bunga di Indonesia</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Cetak Laporan
        </button>
      </div>

      {/* 1. KOTAK FILTER */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 print:hidden">
        <label className="font-bold text-gray-700">Filter Wilayah:</label>
        <select
          className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-gray-50"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Semua Provinsi (Nasional)</option>
          {DAFTAR_PROVINSI.map((provinsi) => (
            <option key={provinsi} value={provinsi}>{provinsi}</option>
          ))}
        </select>
      </div>

      {/* 2. KARTU RINGKASAN STATISTIK (Sekarang Dinamis) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kartu 1: Total Panen */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-all">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Total Panen Anthurium</p>
            <h3 className="text-2xl font-bold text-gray-800">{dataStatistik.total} <span className="text-base font-normal text-gray-500">Pohon</span></h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">🌱</div>
        </div>

        {/* Kartu 2: Top Wilayah */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-all">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{dataStatistik.labelTop}</p>
            <h3 className="text-2xl font-bold text-gray-800">{dataStatistik.namaTop}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">🏆</div>
        </div>

        {/* Kartu 3: Pertumbuhan */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-all">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Tren Pertumbuhan</p>
            {/* Warna teks akan berubah merah/hijau tergantung tren isNaik */}
            <h3 className={`text-2xl font-bold flex items-center gap-2 ${dataStatistik.isNaik ? 'text-green-600' : 'text-red-500'}`}>
              <span className="text-xl">{dataStatistik.isNaik ? '▲' : '▼'}</span> {dataStatistik.tren}
            </h3>
          </div>
          <div className="bg-purple-100 p-3 rounded-full text-purple-600 text-xl">📈</div>
        </div>
      </div>

      {/* 3. KOTAK PETA METABASE */}
      <div className="h-[600px] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden">
        {iframeUrl ? (
          <iframe
            src={`${iframeUrl}#bordered=false&titled=false`}
            frameBorder="0"
            width="100%"
            height="100%"
            allowtransparency="true"
          ></iframe>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Memuat peta spasial...</p>
          </div>
        )}
      </div>

    </div>
  );
}