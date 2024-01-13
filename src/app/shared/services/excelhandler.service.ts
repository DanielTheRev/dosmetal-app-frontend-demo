
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelHandlerService {
  constructor() { }

  readExcelFile(file: any) {
    const target: DataTransfer = <DataTransfer>(file.target);
    const reader: FileReader = new FileReader();

    const excel = new Promise<any>((resolve, reject) => {
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        return resolve((XLSX.utils.sheet_to_json(ws)));
      };
    })
    reader.readAsBinaryString(target.files[0]);
    return excel;
  };
}