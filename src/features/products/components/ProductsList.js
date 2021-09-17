import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Chip from '@mui/material/Chip';


const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 170,
  },
  {
    field: "active",
    headerName: "Status",
    width: 117,
    renderCell: (params) => {
      const label = params.value ? 'Active' : 'Disabled';

      return (
        params.value ?
        <Chip label={label} color="success" variant="outlined"/> : <Chip label={label} color="error" variant="outlined"/>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Created At",
    minWidth: 170,
  },
  {
    field: "created_by",
    headerName: "Created By",
    minWidth: 170,
    valueGetter: (params) => params.value.name
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    minWidth: 170,
  },
  {
    field: "updated_by",
    headerName: "Updated By",
    minWidth: 170,
    valueGetter: (params) => params.value.name

  },
  {
    field: "deleted_at",
    headerName: "Deleted At",
    minWidth: 170,
    valueGetter: (params) => params.value ?? '-'
  },
  // {
  //   field: "deleted_by",
  //   headerName: "Deleted By",
  //   minWidth: 170,
  // },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    iconSeparator: false,
    renderCell: (params) => {
      return (
        <IconButton aria-label="edit" size="small">
          <EditOutlinedIcon color="primary" fontSize="inherit" />
        </IconButton>
      );
    },
  },
];

const ProductList = (props) => {

  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
      <DataGrid
        rows={props.products}
        columns={columns}
        loading={props.loading}
        disableColumnMenu
        disableReorder
        disableColumnSelector
      />
    </div>
  );
};

export default ProductList;
