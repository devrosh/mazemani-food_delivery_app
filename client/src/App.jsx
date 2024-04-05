import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import RestaurantDetail from "./pages/RestaurantDetail";
import DeliveryAreas from "./pages/DeliveryAreas";
import DeliveryCharges from "./pages/DeliveryCharges";
import Blog from "./pages/Blog";
import HowToOrder from "./pages/HowToOrder";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/restaurant_detail" element={<RestaurantDetail />} />
          <Route path="/delivery_areas" element={<DeliveryAreas />} />
          <Route path="/delivery_charges" element={<DeliveryCharges />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/how_to_order" element={<HowToOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post_detail" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
