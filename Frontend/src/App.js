import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Report from './Report';

function App() {
  const [pdfData, setPdfData] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleSubmit = async (event) => {
    // console.log('event files : ', event.target.files);
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      'http://localhost:5000/report/uploadFile',
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    console.log('reponse after file upload : ', response);

    if (!response.data.success) {
      alert('file already exisits.');
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

      <form onSubmit={handleSubmit}>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit'>upload</button>
      </form>
    </div>
  );
}

export default App;
