import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsBasket2Fill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart]=useCart()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand px-2">
              <HiOutlineShoppingCart />
              <span /> AP_Shop
            </Link>
            <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              {/* ------------------------- */}
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle mx-2"
                    data-bs-toggle="dropdown"
                    to={"/category"}
                  >
                    Category
                  </NavLink>

                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to={`/categories`} className="dropdown-item">
                        All Category
                      </NavLink>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <NavLink
                          to={`/category/${c.slug}`}
                          className="dropdown-item"
                        >
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </>
              {/* --------------------------- */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link  mx-2">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link  mx-2">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle mx-2"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.username}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashbaord
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <NavLink to="/cart" className="nav-link mx-4 notification">
          <BsBasket2Fill />
          <span className="badge">{(cart?.length)===0 ? "" : cart?.length}</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Header;
