// ** Navigation imports
import pages from './pages'
import others from './others'
import charts from './charts'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import formsAndTables from './forms-tables'

// ** Merge & Export
export default [...dashboards, ...uiElements, ...formsAndTables, ...pages, ...charts, ...others]
