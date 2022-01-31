import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { Chip, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  usersList: {
    "& .red": {
      border: "1px solid #e06767 !important",
    },
    "& .center": {
      textAlign: "center !important",
    },
  }
});

const UsersList = (props) => {
  const classes = useStyles();

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
    {
      field: "email",
      headerName: "Email",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      minWidth: 117,
      flex: 1,
      renderCell: (params) => {
        const label = params.value ? "Active" : "Disabled";

        return params.value ? (
          <Chip label={label} color="success" variant="outlined" />
        ) : (
          <Chip label={label} color="error" variant="outlined" />
        );
      },
    },
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
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "updated_by",
      headerName: "Updated By",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "deleted_at",
      headerName: "Deleted At",
      minWidth: 170,
      flex: 1,
      valueGetter: (params) => params.value ?? '/'
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 214,
      flex: 1,
      iconSeparator: false,
      renderCell: (params) => {
        return (
          <Box>
            <Link to={"user/" + params.id}>
              <IconButton aria-label="edit">
                <EditTwoToneIcon color="primary" />
              </IconButton>
            </Link>
            
            <IconButton
              disabled={params.row.deleted_at ? true: false}
              color={params.row.deleted_at ? 'primary' : 'error'}
              aria-label="delete"
              onClick={() => props.deleteUserHandler(params.id)}
            >
              <DeleteOutlineTwoToneIcon/>
            </IconButton>

            <Link to={`user/${params.id}/show`}>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon color="primary" />
            </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <div className={classes.usersList}>

      <DataGrid
        rows={props.users}
        columns={columns.map((column) => ({
          ...column,
          sortable: false,
        }))}
        pagination
        paginationMode="server"
        page={props.currentTablePage}
        pageSize={props.metaData.per_page}
        rowsPerPageOptions={[props.metaData.per_page]}
        rowCount={props.metaData.total}
        onPageChange={(newPage) => props.pageChangeHandler(newPage + 1)}
        maxColumns={6}
        autoHeight
        loading={props.loading}
        disableColumnMenu
        density="comfortable"
        getCellClassName={(params) => {
          if (params.field === "deleted_at" && params.value !== '/') {
            return "red";
          }else{
            return "center"
          }
        }}
      />
      </div>
  );
};

export default UsersList;
