import { useLocation } from "react-router-dom";
function StafNav() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav_active_pharmacy" : "";

  return (
    <div>
      <div className="pharmacy_nav_bar_full">
        <div className="pharmacy_nav_left">
          <h1 className="logo_word">
            HealthHugs
            <span className="logo_sub_word">Staff</span>
          </h1>
        </div>
        <div className="pharmacy_nav_right">
          <h3
            className={`nav_item_pharmacy ${isActive("/stafdashpharmact")}`}
            onClick={() => (window.location.href = "/stafdashpharmact")}
          >
            Order
          </h3>
          <h3
            className={`nav_item_pharmacy ${isActive("/pharmacydash")}`}
            onClick={() => (window.location.href = "/pharmacydash")}
          >
            Pharmacy
          </h3>
        </div>
      </div>
    </div>
  );
}

export default StafNav;