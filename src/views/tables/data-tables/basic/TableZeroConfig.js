// ** Table Columns
//import { data, basicColumns } from '../data'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = ({ columns, contenido, title, footer }) => {
  /*console.log("DATA: ", data)
  console.log("basicColumns: ", basicColumns)
  console.log("contenido: ", contenido)*/
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log("currentPage: ", currentPage)
    console.log("rowsPerPage: ", rowsPerPage)
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle tag='h4'>{title}</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={contenido}/**/
          columns={columns}
          className='react-dataTable'
          footer={footer}
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por página:',
            rangeSeparatorText: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: 'Todos'
          }}
          onChangeRowsPerPage={(currentRowsPerPage) => setRowsPerPage(currentRowsPerPage)}
          onChangePage={handlePageChange}
          
        />
      </div>
    </Card>
  )
}

export default DataTablesBasic
