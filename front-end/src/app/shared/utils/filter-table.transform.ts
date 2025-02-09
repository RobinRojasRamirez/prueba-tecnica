
import { TableLazyLoadEvent } from 'primeng/table'
import { IParamsTable } from '../interfaces/params-table.interface'

export default function transform(
  filter: TableLazyLoadEvent,
  rowSize: number
): IParamsTable<null> {
  return {
    page: filter.first ? filter.first / rowSize : 1,
    row: filter.rows ? filter.rows : rowSize,
    search: filter.globalFilter ? filter.globalFilter : '',
    order_by: filter.sortField ? filter.sortField : 'id',
    order: filter.sortOrder == 1 || !filter.sortOrder ? 'ASC' : 'DESC',
  }
}
