import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Box, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";


const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


let columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "sku",
    headerName: "SKU",
    minWidth: 170,
    flex: 1,
  },
  {
    field: "price",
    headerName: "price",
    minWidth: 170,
    flex: 1,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  },
  {
    field: "in_stock",
    headerName: "inStock",
    minWidth: 170,
    flex: 1,
    cellClassName: (params) =>
      clsx('in_stock', {
        red: params.value === 0,
      }),
  },

];

const useStyles = makeStyles({
    productVariantsList: {
      "& .red": {
        border: "1px solid #e06767 !important",
      },
      "& .center": {
        textAlign: "center !important",
      },
    }
  });

const ProductVariantsList = (props) => {
  const { id } = useParams();

  const classes = useStyles();
  const [loadedAttributes, setLoadedAttributes] = useState(false);

  if (
    !loadedAttributes &&
    props.attributes &&
    props.attributes.length > 0
  ) {
      props.attributes.map((attribute) => {
        let obj = {
            field: attribute.name,
            headerName: capitalizeFirstLetter(attribute.name),
            minWidth: 170,
            flex: 1,
          };
          return columns.push(obj);
      })
      let actions = {
        field: "action",
        headerName: "Action",
        sortable: false,
        minWidth: 214,
        flex: 1,
        iconSeparator: false,
        renderCell: (params) => {
          return (
            <Box>
              <Link to={`/product/${params.id}/variant/${id}`}>
                <IconButton aria-label="edit">
                  <EditTwoToneIcon color="primary" />
                </IconButton>
              </Link>
    
              <IconButton
                disabled={params.row.deleted_at}
                color={params.row.deleted_at ? "primary" : "error"}
                aria-label="delete"
                // onClick={() => props.deleteUserHandler(params.id)}
              >
                <DeleteOutlineTwoToneIcon />
              </IconButton>
            </Box>
          );
        },
      };
      columns.push(actions);

    setLoadedAttributes(true);
  }

  return (
    <div className={classes.productVariantsList}>
      <DataGrid
        rows={props.productVariants}
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
  );
};

export default ProductVariantsList;
