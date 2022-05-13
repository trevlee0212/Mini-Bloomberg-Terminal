import React, { useState } from 'react';
import "../../App.css";
import Logo from "../picture/git.jpg";
import "./footer.css";

function footer() {
  return (
    <div class="footer-dark">
        <footer>
            <div class="container">
                    <div ><a href="https://github.com/trevlee0212" target="_blank"><img  className="social" src={Logo} /></a></div>
                <p class="copyright">Chin Wai Lee © 2022</p>
            </div>
        </footer>
    </div>



  );
}
export default footer;