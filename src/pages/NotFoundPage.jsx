import "./NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <i className="fa-solid fa-question"></i>
      <h1>Sorry, this page was not found.</h1>
      <Link to="/">
      Go back to our home page.
      </Link>
    </div>
  );
};
export default NotFoundPage;
