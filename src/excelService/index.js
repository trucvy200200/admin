import * as FileSaver from "file-saver"
import * as ExcelJS from "exceljs/dist/exceljs.min.js"

/* handle export data */
const columns = (t) => {
  return [
    { header: "No.", key: "stt", width: 10 },
    { header: t("Username"), key: "username", width: 25 },
    { header: t("Package name"), key: "packageName", width: 25 },
    {
      header: t("Contribution points"),
      key: "amount",
      width: 25
    },
    {
      header: t("Date joined"),
      key: "createdAt",
      width: 25
    }
  ]
}

export const excelExportData = async (total, data, fileName, t) => {
  const workbook = new ExcelJS.Workbook()
  try {
    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet("sheet1")

    // each columns contains header and its mapping key from data
    worksheet.columns = columns(t)

    worksheet.mergeCells("A1:E2")

    const customCell = worksheet.getCell("A2")
    customCell.font = {
      family: 4,
      size: 20,
      underline: true,
      bold: true
    }

    customCell.value = `${t("Total dedication")}: ${total} POINTS`

    const headerRow = worksheet.addRow()

    for (let i = 0; i < columns(t).length; i++) {
      worksheet.getColumn(i + 1).width = columns(t)[i]?.width
      const cell = headerRow.getCell(i + 1)
      cell.value = columns(t)[i].header
    }

    // updated the font for first row.
    worksheet.getRow(3).font = { bold: true, size: 12 }
    worksheet.getRow(3).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d9ead3" }
      }
    })

    // loop through all of the columns and set the alignment with width.
    worksheet.columns.forEach((column) => {
      column.width = column?.width ? column?.width : 30
      column.alignment = { horizontal: "left" }
    })

    // loop through data and add each one to worksheet
    data.forEach((singleData) => {
      worksheet.addRow(singleData)
    })

    // loop through all of the rows and set the outline style.
    worksheet.eachRow((row) => {
      // store each cell to currentCell
      const currentCell = row._cells

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach((singleCell) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address
        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: "thin", width: 10 },
          left: { style: "thin", width: 10 },
          bottom: { style: "thin", width: 10 },
          right: { style: "thin" }
        }
      })
    })

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer()

    // download the processed file
    FileSaver.saveAs(new Blob([buf]), `${fileName}.xlsx`)
  } catch (error) {
    console.error("<<<ERRROR>>>", error)
    console.error("Something Went Wrong", error.message)
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet("sheet1")
  }
}

const columnsDetail = (t) => {
  return [
    { header: "No.", key: "stt", width: 10 },
    { header: t("Username"), key: "username", width: 25 },
    { header: t("Full name"), key: "full_name", width: 25 },
    {
      header: t("Country"),
      key: "country",
      width: 25
    },
    {
      header: t("Contribution points"),
      key: "totalAmountDevote",
      width: 25
    },
    {
      header: t("Date joined"),
      key: "createdAt",
      width: 25
    }
  ]
}

export const excelExportDetailData = async (total, data, fileName, t) => {
  const workbook = new ExcelJS.Workbook()
  try {
    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet("sheet1")

    // each columns contains header and its mapping key from data
    worksheet.columns = columnsDetail(t)

    worksheet.mergeCells("A1:F2")

    const customCell = worksheet.getCell("A2")
    customCell.font = {
      family: 4,
      size: 20,
      underline: true,
      bold: true
    }

    customCell.value = `${t("Total dedication")}: ${total} POINTS`

    const headerRow = worksheet.addRow()

    for (let i = 0; i < columnsDetail(t).length; i++) {
      worksheet.getColumn(i + 1).width = columnsDetail(t)[i]?.width
      const cell = headerRow.getCell(i + 1)
      cell.value = columnsDetail(t)[i].header
    }

    // updated the font for first row.
    worksheet.getRow(3).font = { bold: true, size: 12 }
    worksheet.getRow(3).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d9ead3" }
      }
    })

    // loop through all of the columns and set the alignment with width.
    worksheet.columns.forEach((column) => {
      column.width = column?.width ? column?.width : 30
      column.alignment = { horizontal: "left" }
    })

    // loop through data and add each one to worksheet
    data.forEach((singleData) => {
      worksheet.addRow(singleData)
    })

    // loop through all of the rows and set the outline style.
    worksheet.eachRow((row) => {
      // store each cell to currentCell
      const currentCell = row._cells

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach((singleCell) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address
        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: "thin", width: 10 },
          left: { style: "thin", width: 10 },
          bottom: { style: "thin", width: 10 },
          right: { style: "thin" }
        }
      })
    })

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer()

    // download the processed file
    FileSaver.saveAs(new Blob([buf]), `${fileName}.xlsx`)
  } catch (error) {
    console.error("<<<ERRROR>>>", error)
    console.error("Something Went Wrong", error.message)
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet("sheet1")
  }
}
