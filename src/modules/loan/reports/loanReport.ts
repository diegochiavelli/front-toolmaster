import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { LoanType } from '../types/LoanType';

function loanPDF(loansFiltered: LoanType[]) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = loansFiltered.map((e) => {
    return [
      { text: e.id, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: moment(e.dataSaida).format('DD-MM-YYYY'), fontSize: 9, margin: [0, 2, 0, 2] },
      { text: moment(e.dataDevolucao).format('DD-MM-YYYY'), fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.status, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.observacao, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.id_funcionario, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*'],
        body: [
          [
            { text: 'ID', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Data saída', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Data Devolução', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Status', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Observação', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'ID Colaborador', style: 'tableHeader', fontSize: 11, bold: true },
          ],
          ...dados,
        ],
      },
    },
  ];

  function Rodape(currentPage: string, pageCount: string) {
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitios: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: {
      text: 'Empréstimos',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitios).download();
}

export default loanPDF;
