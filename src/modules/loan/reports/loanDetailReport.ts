import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { insertMaskInPhone } from '../../../shared/functions/phone';
import { LoanType } from '../types/LoanType';

function loanDetailPDF(loan: LoanType[]) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  console.log('loanloanloanloan', loan);

  const dados = loan.map((e) => {
    return [
      { text: e.emprestimo?.id, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: moment(e.emprestimo?.dataSaida).format('DD-MM-YYYY'),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: moment(e.emprestimo?.dataDevolucao).format('DD-MM-YYYY'),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      { text: e.emprestimo?.status, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.emprestimo?.observacao, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [
            { text: 'ID empréstimo', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Data saída', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Data Devolução', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Status', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Observação', style: 'tableHeader', fontSize: 11, bold: true },
          ],
          ...dados,
        ],
      },
    },
  ];

  const dadosItem = loan.map((d) => {
    return [
      d.item?.map((f) => ({ text: f.id_equipamento, fontSize: 9, margin: [0, 2, 0, 2] })),
      d.item?.map((f) => ({ text: f.quantidade, fontSize: 9, margin: [0, 2, 0, 2] })),
      d.equipamento?.map((i) => ({ text: i.nome, fontSize: 9, margin: [0, 2, 0, 2] })),
      d.equipamento?.map((i) => ({ text: i.marca, fontSize: 9, margin: [0, 2, 0, 2] })),
      d.equipamento?.map((i) => ({ text: i.modelo, fontSize: 9, margin: [0, 2, 0, 2] })),
    ];
  });

  const detailsItem = [
    {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [
            {
              text: 'ID equipamento',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            {
              text: 'Quantidade',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            {
              text: 'Nome equipamento',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            {
              text: 'Marca',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            {
              text: 'Modelo',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
          ],
          ...dadosItem,
        ],
      },
    },
  ];

  const dadosColaborador = loan.map((g) => {
    return [
      { text: g.colaborador?.id, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: g.colaborador?.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: insertMaskInPhone(g.colaborador?.telefone || ''), fontSize: 9, margin: [0, 2, 0, 2] },
      { text: g.colaborador?.cargo, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const detailsColaborador = [
    {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            {
              text: 'ID colaborador',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            { text: 'Nome', style: 'tableHeader', margin: [0, 20, 0, 0], fontSize: 11, bold: true },
            {
              text: 'Telefone',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
            {
              text: 'Cargo',
              style: 'tableHeader',
              margin: [0, 20, 0, 0],
              fontSize: 11,
              bold: true,
            },
          ],
          ...dadosColaborador,
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
      text: 'Empréstimo',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
    content: [details, ...detailsItem, detailsColaborador],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitios).download();
}

export default loanDetailPDF;
