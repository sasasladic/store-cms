import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { Chip, Box, IconButton } from "@mui/material";

const UsersList = (props) => {

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
      field: "email",
      headerName: "Email",
      minWidth: 170,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 170,
    },
    {
      field: "active",
      headerName: "Status",
      width: 117,
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
    },
    {
      field: "created_by",
      headerName: "Created By",
      minWidth: 170,
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
    },
    {
      field: "deleted_at",
      headerName: "Deleted At",
      minWidth: 170,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 214,
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
              aria-label="delete"
              onClick={() => props.deleteUserHandler(params.id)}
            >
              <DeleteOutlineTwoToneIcon color="error" />
            </IconButton>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon color="primary" />
            </IconButton>
          </Box>
        );
      },
    },
  ];


  return (
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
    />
  );
};

export default UsersList;
