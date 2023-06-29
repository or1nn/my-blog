import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        <span style={{ color: "#c21717" }}>404</span> Страница не найдена
      </h2>
      <Button variant="contained" onClick={() => navigate("/")}>
        Вернуться на главную
      </Button>
    </div>
  );
};

export default NotFound;
