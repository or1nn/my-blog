import { useSelector } from "react-redux";
import FavoritePost from "../components/FavoritePost";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.post.favorites);
  return (
    <div style={{textAlign: 'center'}}>
      <h2>Избранное</h2>
      {favorites.map((fav) => (
        <FavoritePost onClick={() => navigate(`/post/${fav.id}`)} post={fav} />
      ))}
    </div>
  );
};

export default Favorite;
