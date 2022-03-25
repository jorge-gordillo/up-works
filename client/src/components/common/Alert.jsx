import { Alert as Alerta, AlertTitle } from "@mui/material";

export const Alert = ({ children, type, title }) => {
    return (
        <Alerta severity={type} sx={{mt:1}}>
            <AlertTitle>{title}</AlertTitle>
            {children}
        </Alerta>
    )   
}