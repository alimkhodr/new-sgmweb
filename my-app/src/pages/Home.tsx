import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import Sidebar from "../components/layout/Sidebar/Sidebar";

const Home = () => {
    return (
        <Box display="flex" flexDirection="row" minHeight="100vh">
            <Sidebar />
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <Outlet />
                <Footer />
            </Box>
        </Box>
    );
}

export default Home;