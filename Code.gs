function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('iPhone Classic')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getNotes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    return { ok: false, message: 'Spreadsheet not found. Bind this script to a Google Sheet.' };
  }

  const sheet = ss.getSheetByName('Notes');
  if (!sheet) {
    return { ok: false, message: 'Sheet "Notes" not found. Create a sheet named Notes.' };
  }

  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).map((row, index) => ({
    id: index + 1,
    title: String(row[0] || 'Без названия'),
    body: String(row[1] || ''),
  }));

  return { ok: true, rows };
}
