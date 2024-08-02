import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const Navbar = () => {
  const { state } = useCart();
  const [jwtToken, setJwtToken] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    console.log("access_token: ", access_token);
    setJwtToken(access_token);
    console.log("pathname:", router.pathname);
    if (!jwtToken) {
      if (router.pathname !== "/login" && router.pathname !== "/register") {
        router.push("/login");
      }
    }
  }, [jwtToken, router]);

  async function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    setJwtToken();
  }

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
              Shopping Cart ({state.items.length})
            </Link>
          </li>
        </ul>
        {jwtToken ? (
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href="/" onClick={handleLogout} className={styles.navLinks}>
                Log out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href="/register" className={styles.navLinks}>
                Register
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/login" className={styles.navLinks}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
