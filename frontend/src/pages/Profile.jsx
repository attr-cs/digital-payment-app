import React, { useState } from "react";
import { Button, InputAdornment, IconButton, Input, FormControl, InputLabel, TextField, Typography, CircularProgress, Collapse } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export function Profile() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [lastName, setLastName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSave = () => {
        // Here you can handle saving the changes, for example, make an API call
        setIsLoading(true);
        // Simulating API call delay
        setTimeout(() => {
            setIsLoading(false);
            // Reset fields after saving
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setLastName("");
        }, 2000);
    };

    const handlePasswordBlur = () => {
        if (password.length < 6) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    };

    return (
        <div className="w-full flex justify-center p-10">
            <div className="w-[90%] shadow-2xl bg-slate-900 rounded-md border-1 border-slate-400 px-7">
                <Typography variant="h5" className="font-bold text-lg text-white pt-6">Profile</Typography>

                <TextField
                    className="w-full mt-4"
                    label="Last Name"
                    variant="outlined"
                    color="success"
                    value={lastName}
                    onChange={handleLastNameChange}
                    sx={{ "& label": { color: "white" }, "& .MuiOutlinedInput-root": { color: "white" } }}
                />

                <FormControl className="w-full mt-4" variant="outlined" color="success">
                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: "white" }}>Password</InputLabel>
                    <Input
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        onBlur={handlePasswordBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ color: "white" }}
                                >
                                    {showPassword}
                                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Collapse in={passwordError} timeout={500}>
                    <Typography color="error">Password should be at least 6 characters long.</Typography>
                </Collapse>

                <FormControl className="w-full mt-4" variant="outlined" color="success">
                    <InputLabel htmlFor="outlined-adornment-new-password" sx={{ color: "white" }}>New Password</InputLabel>
                    <Input
                        id="outlined-adornment-new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle new password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ color: "white" }}
                                >
                                 {showNewPassword}   
                                 {/* {showNewPassword ? <VisibilityOff /> : <Visibility />} */}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl className="w-full mt-4" variant="outlined" color="success">
                    <InputLabel htmlFor="outlined-adornment-confirm-password" sx={{ color: "white" }}>Confirm New Password</InputLabel>
                    <Input
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={passwordMatchError}
                        onBlur={handleConfirmPasswordBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ color: "white" }}
                                >
                                    {showConfirmPassword}
                                    {/* {showConfirmPassword ? <VisibilityOff /> : <Visibility />} */}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Collapse in={passwordMatchError} timeout={500}>
                    <Typography color="error">Passwords do not match.</Typography>
                </Collapse>

                <Button
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={handleSave}
                    disabled={isLoading || passwordError || passwordMatchError}
                    sx={{ backgroundColor: blue[500], "&:hover": { backgroundColor: blue[700] } }}
                >
                    {isLoading ? <CircularProgress size={24} color="white" /> : "Save"}
    *            </Button>
            </div>
        </div>
    );
}
