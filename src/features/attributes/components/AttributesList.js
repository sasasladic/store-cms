import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Chip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const AttributesList = (props) => {

  function getOptionValues(values) {
    let valString = '';
    values.map((item) => {
      console.log(item)

      valString += item.value +  ', ';
    })
    // console.log(valString)
    return valString.substring(0, valString.length-2)
  }
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
      flex: 1,
    },
    // {
    //   field: "active",
    //   headerName: "Status",
    //   width: 117,
    //   renderCell: (params) => {
    //     const label = params.value ? "Active" : "Disabled";

    //     return params.value ? (
    //       <Chip label={label} color="success" variant="outlined" />
    //     ) : (
    //       <Chip label={label} color="error" variant="outlined" />
    //     );
    //   },
    // },
      // {
      // field: "values",
      // headerName: "Values",
      // minWidth: 117,
      // flex: 1,
      // valueGetter: (params) => getOptionValues(params.value),
      // renderCell: (params) => {
      //   const label = params.value ? "Active" : "Disabled";

      //   return params.value ? (
      //     <Chip label={label} color="success" variant="outlined" />
      //   ) : (
      //     <Chip label={label} color="error" variant="outlined" />
      //   );
      // },
    // },
    {
      field: "created_at",
      headerName: "Created At",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "created_by",
      headerName: "Created By",
      minWidth: 170,
      flex: 1,
      valueGetter: (params) => params.value.name,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      minWidth: 170,
      flex: 1
    },
    {
      field: "updated_by",
      headerName: "Updated By",
      minWidth: 170,
      flex: 1,
      valueGetter: (params) => params.value.name,
    },
    {
      field: "deleted_at",
      headerName: "Deleted At",
      minWidth: 170,
      flex: 1,
      valueGetter: (params) => params.value ?? "-",
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
      minWidth: 214,
      flex: 1,
      iconSeparator: false,
      renderCell: (params) => {
        return (
          <Box>
            <Link to={`attribute/${params.id}`}>
              <IconButton aria-label="edit">
                <EditTwoToneIcon color="primary" />
              </IconButton>
            </Link>

            <IconButton
              // disabled={params.row.deleted_at}
              color={params.row.deleted_at ? "primary" : "error"}
              aria-label="delete"
              onClick={() => props.deleteAttributeHandler(params.id)}
            >
              <DeleteOutlineTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    // <Box sx={{ width: '75%' }}>
    <div>
      <DataGrid
        rows={props.products}
        columns={columns.map((column) => ({
          ...column,
          sortable: false,
        }))}
        loading={props.loading}
        pagination
        paginationMode="server"
        page={props.currentTablePage}
        pageSize={props.metaData.per_page}
        rowsPerPageOptions={[props.metaData.per_page]}
        rowCount={props.metaData.total}
        onPageChange={(newPage) => props.pageChangeHandler(newPage + 1)}
        maxColumns={6}
        autoHeight
        density="comfortable"
        disableColumnMenu
        disableColumnSelector
      />
      </div>
    // </Box>
  );
};

export default AttributesList;
