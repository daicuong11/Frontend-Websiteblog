import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CheckBoxField(props) {

    const { name, form, color = 'success' } = props
 
   return (
     <Controller 
         name={name} 
         control={form.control}
         render={({ field }) => 
         <FormControlLabel
                control={<Checkbox {...field} color={color} />}
                label="Premium"
                checked={field.value}
                className="flex justify-start"
        />
         }
     />
   )
 }