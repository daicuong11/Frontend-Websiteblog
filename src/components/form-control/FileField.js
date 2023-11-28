
import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types';



export default function InputField(props) {

   const { placeholder, name, form, type = 'text', color = 'success', onChange } = props
   const hasError = form.formState.errors[name]



  return (
    <Controller 
        name={name} 
        control={form.control}
        render={({ field }) => 
            <TextField 
                id="outlined-helperText"
                placeholder={placeholder}
                type="file"
                color={color}
                fullWidth 
                size="small" 
                {...field} 
                error={!!hasError}
                helperText={form.formState.errors[name]?.message}
                onBlur={() => {
                    form.trigger(name); 
                   
                }}
                onChange={(e) => {
                  field.onChange(e); 
                  onChange(e)
                }}
                
            />
        }
    />
  )
}

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool
}





// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import { Controller } from "react-hook-form";
// import PropTypes from "prop-types";
// import { Box, FormHelperText } from "@mui/material";
// import { UploadFile } from "@mui/icons-material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import DropdownSelect from "../DropdownSelect";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// export default function FileField(props) {

//   const { name, form, color = "success" } = props;
//   const hasError = form.formState.errors[name];

//   return (
//     <Controller
//       name={name}
//       control={form.control}
//       render={({ field }) => (
//         <Box>
//           <Button
//             className={`h-20 w-20`}
//             component="label"
//             fullWidth
//             variant={"outlined"}
//             color="success"
//             startIcon={ <UploadFile />}
            
//           >
             
//             <VisuallyHiddenInput
  
//               color={color}
//               type="file"
//               size="small"
//               {...field}
//               onBlur={() => {
//                 form.trigger(name);
//               }}
              
//             />
//           </Button>
//           {!!hasError && (
//             <FormHelperText error>
//               {form.formState.errors[name]?.message}
//             </FormHelperText>
//           )}
//         </Box>
//       )}
//     />
//   );
// }

// FileField.propTypes = {
//   form: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
// };
