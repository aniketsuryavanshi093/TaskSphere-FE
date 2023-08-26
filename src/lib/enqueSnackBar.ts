import { enqueueSnackbar } from 'notistack'

const enqueSnackBar = ({ type, message, duration }: { type: "default" | "error" | "success" | "warning" | "info", message: string, duration?: number }) => {
    enqueueSnackbar(message, {
        variant: type,
        preventDuplicate: true,
        autoHideDuration: duration || 4000
    })
}

export default enqueSnackBar