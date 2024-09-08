import { Routes, Route } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import PropTypes from "prop-types";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

function AppRouter({ info, aboutInfo, servicesInfo }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage info={info} />} />
      <Route
        path="/about"
        element={
          <AboutPage
            aboutPartStyleInfo={aboutInfo.aboutPartStyleInfo}
            setCurrentPage={aboutInfo.setCurrentPage}
          />
        }
      />
      <Route
        path="/services"
        element={
          <ServicesPage
            learning={servicesInfo.learning}
            setLearning={servicesInfo.setLearning}
            setCurrentPage={servicesInfo.setCurrentPage}
          />
        }
      />
      <Route path="/contact" element={<ContactPage />} />
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

AppRouter.propTypes = {
  info: PropTypes.array,
  aboutInfo: PropTypes.object,
  servicesInfo: PropTypes.object,
};

export default AppRouter;
