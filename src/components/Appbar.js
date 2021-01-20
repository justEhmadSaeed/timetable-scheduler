import React from "react"
import {
	makeStyles,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	MenuItem,
	Menu,
} from "@material-ui/core"
import { ExitToApp, MoreVert, AccountCircle } from "@material-ui/icons"
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	title: {
		display: "block",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}))

export default function PrimaryAppBar() {
	const classes = useStyles()
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					aria-label="Logged In User"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>
					{firebase.auth().currentUser
						? firebase.auth().currentUser.displayName
						: "Guest"}
				</p>
			</MenuItem>
			<MenuItem
				onClick={() => {
					firebase.auth().signOut()
				}}
			>
				<IconButton aria-label="SignOut" color="inherit">
					<ExitToApp />
				</IconButton>
				<p>Sign Out</p>
			</MenuItem>
		</Menu>
	)

	return (
		<div className={classes.grow}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Activity Scheduler
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton
							edge="end"
							aria-label="Logged In User"
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircle />
							<div className="f3">
								{firebase.auth().currentUser
									? firebase.auth().currentUser.displayName
									: "Ehmad"}
							</div>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="Sign Out"
							aria-haspopup="true"
							onClick={() => {
								firebase.auth().signOut()
								console.log("signout")
							}}
							color="inherit"
						>
							<ExitToApp />
							<div className="f5">Sign Out</div>
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreVert />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</div>
	)
}
