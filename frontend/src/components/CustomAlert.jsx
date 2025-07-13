import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomAlert({ alertOpen, setAlertOpen, status }) {
	// const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setAlertOpen(false);
	};

	return (
		<div>
			{/* <Button onClick={handleClick} sx={{ background: "Red" }}>
				Open Snackbar
			</Button> */}
			<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={status.type}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{status.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
