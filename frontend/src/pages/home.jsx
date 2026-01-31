import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <nav className="navBar">
        <h2 className="logo">meetMe</h2>

        <div className="navActions">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <span>History</span>

          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      <div className="meetContainer">
        <div className="leftPanel">
          <h1>High Quality Video Meetings</h1>
          

          <div className="joinBox">
            <TextField
              fullWidth
              label="Meeting Code"
              variant="outlined"
              onChange={e => setMeetingCode(e.target.value)}
            />
            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              size="large"
            >
              Join
            </Button>
          </div>
        </div>

        <div className="rightPanel">
          <img src="/logo3.png" alt="Video meeting" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
