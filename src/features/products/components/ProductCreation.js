import React from "react";
import CreateProductForm from "../components/CreateProductForm";
import CreateProductVariantForm from "../components/CreateProductVariantForm";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductCreation = (props) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#3f51b5" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: "#f2f2f2" }}
        >
          <Typography className=".css-1qvr50w-MuiTypography-root">
            General Details
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box mt={8}>
            <CreateProductForm
              categories={categories}
              onSubmitDetailsHandler={submitDetailsHandler}
              onSubmitAttributesHandler={submitAttributesHandler}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      {!disabledAttributes && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#3f51b5" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ backgroundColor: "#f2f2f2" }}
          >
            <Typography>Configurable Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mt={8}>
              <CreateProductVariantForm
                attributes={attributes}
                onSubmitAttributesHandler={submitAttributesHandler}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
export default ProductCreation;
