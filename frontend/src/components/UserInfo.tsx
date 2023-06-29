import { FC } from "react";
import Avatar from "@mui/material/Avatar";

interface UserInfoProps {
  avatar: string;
  name: string;
  date: string;
}
const UserInfo: FC<UserInfoProps> = ({ avatar, name, date }) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Avatar src={`http://localhost:5000/avatars/${avatar}`} />
      <div>
        <p style={{ margin: '2px 10px', fontWeight: 600}}>{name}</p>
        <p style={{ margin: '2px 10px'}}>
          {new Date(date).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
