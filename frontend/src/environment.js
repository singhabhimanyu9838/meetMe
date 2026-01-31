let IS_PROD = true;
const server = IS_PROD ?
    "https://meetme-backend-h1vb.onrender.com" :
    "http://localhost:8000";


export default server;