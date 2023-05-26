import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/report/loadReport'
        );
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHtml();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Report;
