// Header.js
import { useLocation } from "react-router-dom";
import { ParentComponent } from "./components/header/parent";

const ConditionalHeader = () => {
  const location = useLocation();
  const shouldShowHeader = !location.pathname.startsWith("/AdminPanel");

  return shouldShowHeader ? <ParentComponent /> : null;
};

export default ConditionalHeader;
