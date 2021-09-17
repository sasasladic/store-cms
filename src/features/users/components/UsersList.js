import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";

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
        <Link to={"user/" + params.id}>
          <IconButton aria-label="edit">
            <EditTwoToneIcon color="primary" />
          </IconButton>
        </Link>
      );
    },
  },
];

const UsersList = (props) => {

  return (
      <DataGrid rows={props.users} columns={columns} loading={props.loading} />
  );
};

export default UsersList;
