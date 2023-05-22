import jsonexport from 'jsonexport/dist';

export const downloadCSV = <T>(data: T[], name: string) => {
  jsonexport(data, (err: Error, csvBuffer: any) => {
    if (err) throw new Error('Failed creating file');
    const csvData = new Blob([csvBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const csvUrl = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = `${name}.csv`;
    link.click();
    URL.revokeObjectURL(csvUrl);
  });
}