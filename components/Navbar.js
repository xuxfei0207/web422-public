import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Navbar = ({ handleSearch, cartsItem }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLinks}>
              Timble Store
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLinks}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLinks}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLinks}>
              Contact
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/dashboard" className={styles.navLinks}>
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/dashboard-preferences" className={styles.navLinks}>
              Dashboard Preferences
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/products" className={styles.navLinks}>
              Products
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/cart" className={styles.navLinks}>
              Shopping Cart ({cartsItem.length})
            </Link>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              name="search"
              placeholder="Product ID (Number)"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
