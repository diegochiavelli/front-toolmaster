import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { CollaboratorType } from '../types/CollaboratorType';

function collaboratorPDF(collaboratorsFiltered: CollaboratorType[]) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = collaboratorsFiltered.map((e) => {
    return [

      { text: e.id, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: insertMaskInCpf(e.cpf), fontSize: 9, margin: [0, 2, 0, 2] },
      { text: insertMaskInPhone(e.telefone), fontSize: 9, margin: [0, 2, 0, 2] },
      { text: e.cargo, fontSize: 9, margin: [0, 2, 0, 2] },
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
            { text: 'ID', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Nome', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'CPF', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Telefone', style: 'tableHeader', fontSize: 11, bold: true },
            { text: 'Cargo', style: 'tableHeader', fontSize: 11, bold: true },
          ],
          ...dados,
        ],
      },
    },
  ];

  const Rodape = (currentPage: number, pageCount: number) => {
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  };

  const docDefinitios: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: {
      text: 'Colaboradores',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
    content: [details],
    footer: Rodape,
  };
  pdfMake.createPdf(docDefinitios).download();
}

export default collaboratorPDF;
