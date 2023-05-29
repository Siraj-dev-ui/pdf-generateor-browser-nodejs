const puppeteer = require('puppeteer');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const ejs = require('ejs');

exports.loadReport = async (req, res) => {
  try {
    console.log('loading report');
    const data = {
      name: 'siraj',
      infos: [
        {
          id: 1,
          name: 'asif',
          age: 23,
        },
        {
          id: 2,
          name: 'momin',
          age: 24,
        },
        {
          id: 3,
          name: 'hairs',
          age: 25,
        },
        {
          id: 4,
          name: 'zeeshan',
          age: 26,
        },
      ],
    };
    res.render('report', data);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// exports.createLoadReport = async (req, res) => {
//   try {
//     console.log('loading report');
//     res.render('report', { name: 'siraj', age: 23 });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };
exports.createPdf = catchAsync(async (req, res) => {
  console.log('reqest data for pdf : ', req.body);
  const data = req.body;
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // console.log('infos are : ', data.infos);
  // const ejsData = ejs.render('report', { infos: 'this is my' });
  await page.goto(
    `http://localhost:5000/report/loadReport`,
    { age: 77 },
    {
      waitUntil: 'networkidle2',
    }
  );

  await page.setViewport({ width: 1680, height: 1050 });

  const fileName = new Date().getTime();

  const pdfn = await page.pdf({
    path: `${path.join(__dirname, '../files', fileName + '.pdf')}`,
    printBackground: true,
    format: 'A4',
  });

  await browser.close();
  const pdfUrl = path.join(__dirname, '../files', fileName + '.pdf');

  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdfn.length });
  res.sendFile(pdfUrl);
});

exports.downloadPdf = catchAsync(async (req, res) => {
  console.log('reqest data for pdf download : ', req.body);
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`http://localhost:5000/report/loadReport`, {
    waitUntil: 'networkidle2',
  });

  await page.setViewport({ width: 1680, height: 1050 });

  const fileName = new Date().getTime();

  const pdfn = await page.pdf({
    path: `${path.join(__dirname, '../files', fileName + '.pdf')}`,
    printBackground: true,
    format: 'A4',
  });

  await browser.close();
  const pdfUrl = path.join(__dirname, '../files', fileName + '.pdf');

  res.download(pdfUrl, function (err) {
    if (err) {
      console.log(err);
    }
  });
});

exports.uploadFile = (req, res) => {
  console.log('reviewing file....', req.file);
  req.file
    ? res.json({ success: true, message: 'file saved...' })
    : res.json({ success: false, message: 'file already exists...' });
};
