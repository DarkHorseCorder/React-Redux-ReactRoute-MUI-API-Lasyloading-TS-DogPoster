import { Delete, FilterList } from '@mui/icons-material';
import { alpha, Box, Checkbox, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { Suspense } from 'react';
import { StoreValue, IBreedItemType } from 'types';
import { useSelector } from 'react-redux';
import { DogApis } from 'service/api-service';
// import BreedGridDialog from './BreedGridDialog';
const BreedGridDialog = React.lazy(() => import('./BreedGridDialog'))

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: any },
    b: { [key in Key]: any },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id?: string;
  label: String;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'subBreed',
    numeric: false,
    disablePadding: false,
    label: 'Sub Breed',
  },
  {
    id: 'subcount',
    numeric: true,
    disablePadding: false,
    label: 'Sub Breeds Count',
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Action',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: String;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(({ id, numeric, disablePadding, label }, index) => (
          id ? <TableCell
            key={index}
            align={numeric ? 'right' : 'left'}
            padding={disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell> : <TableCell
            key={index}
            align={'center'}
            padding={disablePadding ? 'none' : 'normal'}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recipe List
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const BreedsTable = () => {
  const breeds = useSelector((state: StoreValue) => state.breedReducer.breeds)
  const breedList: Array<IBreedItemType> = Object.keys(breeds).map((item: string) => ({
    breedName: item,
    subBreeds: breeds[item as keyof object]
  }))
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [dlgImages, setDlgUmg] = React.useState({
    message: []
  })

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = breedList.map((n) => n.breedName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const onGenerateClick = async (clickedBreedName: string) => {
    setOpen(true)
    const breedImages = await DogApis.getBreedImages(clickedBreedName)
    setDlgUmg(breedImages)
  }

  // Avoid a layout jump when reaching the last page with empty recipes.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - breedList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={breedList.length}
            />
            <TableBody>
              {breedList.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((breedItem: IBreedItemType) => {
                  const { breedName, subBreeds } = breedItem
                  const isItemSelected = isSelected(breedName);
                  const labelId = `enhanced-table-checkbox-${breedName}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown, MouseEvent>) => handleClick(event, breedName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={breedName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={breedName}
                        scope="row"
                        padding="none"
                      >
                        {breedName}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={breedName + '_sub'}
                        scope="row"
                        padding="none"
                      >
                        <Box sx={{ m: 1, minWidth: 120 }}>
                          <Select
                            sx={{width: '100%'}}
                          >
                            {subBreeds.map(subBreedItem => (
                              <MenuItem value={subBreedItem} key={subBreedItem}>{subBreedItem}</MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{subBreeds.length}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => onGenerateClick(breedName)}
                        >
                          <Typography>Generate</Typography>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={breedList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <BreedGridDialog
          open={open}
          handleClose={handleClose}
          dlgImages={dlgImages}
        />
      </Suspense>
    </Box>
  );
}

export default BreedsTable;