import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        let result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        setUsername("");
        setPassword("");
        setName("");
        setError("");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(135deg, #667eea, #764ba2)"
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: 380,
            borderRadius: 4,
            textAlign: "center"
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" fontWeight="bold" mb={2}>
            {formState === 0 ? "Sign In" : "Create Account"}
          </Typography>

          {/* Toggle Buttons */}
          <Box display="flex" gap={1} mb={2}>
            <Button
              fullWidth
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => setFormState(1)}
            >
              Register
            </Button>
          </Box>

          {formState === 1 && (
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" fontSize={14} mt={1}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 2 }}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>
        </Paper>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
          onClose={() => setOpen(false)}
        />
      </Grid>
    </ThemeProvider>
  );
}
