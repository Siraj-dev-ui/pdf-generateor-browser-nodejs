import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Report from './Report';

const PdfViewer = () => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get('<YOUR_API_ENDPOINT>', {
          responseType: 'arraybuffer', // Important: Set the responseType to 'arraybuffer' to receive binary data
        });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, []);

  if (!pdfData) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div>
      <embed src={pdfData} type='application/pdf' width='100%' height='600px' />
    </div>
  );
};

function App() {
  const [pdfData, setPdfData] = useState(null);

  const fetchPdf = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/report/downloadPdf',
        {
          responseType: 'arraybuffer', // Important: Set the responseType to 'arraybuffer' to receive binary data
        }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfData(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const createPdf = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/report/createPdf',
        {
          responseType: 'arraybuffer', // Important: Set the responseType to 'arraybuffer' to receive binary data
        }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfData(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  /*  if (!pdfData) {
    return <div>Loading PDF...</div>;
  } */

  return (
    <div>
      {!pdfData ? (
        <>
          <Report />
          <button onClick={createPdf}>Create Pdf</button>
          <button onClick={fetchPdf}>Download Pdf</button>
        </>
      ) : (
        <embed
          src={pdfData}
          type='application/pdf'
          width='100%'
          height='600px'
        />
      )}
    </div>
  );
}

export default App;
