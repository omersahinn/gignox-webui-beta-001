import * as React from 'react';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/icons/Menu';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Settings from '@material-ui/icons/SettingsOutlined';
import './top_menu.css';

var logo = require('../../app_root/images/logo.png');
var logotransparent = require('../../app_root/images/logo_gignox.png');

export const TopMenuPrivate = () => {
    
    var toggleOpen = false;
    var sidebarToggle = "closed";
    var userDropdown = "closed";
    window.onload = () => {
  

      // ---------Dropdown menu in Add menu of left side bar menu----------------
      var addToggle = document.getElementById("addToggle") as HTMLElement;
      var addToggleMenu = document.getElementById("addToggleMenu") as HTMLElement;
      if (addToggle) {
        addToggle.addEventListener('click', function () {
          if (toggleOpen === false) {
            addToggleMenu.style.display = "block";
            addToggleMenu.style.transition = "all .3s linear 0s";
            addToggleMenu.style.webkitTransition = " all .3s linear 0s";
  
            toggleOpen = true;
          }
          else {
            addToggleMenu.style.display = "none";
            toggleOpen = false;
          }
        });
      }
  
      // -----------------------User dropdown menu--------------------------
      var userMenu = document.getElementById("user-menu") as HTMLElement;
      var userMenuBar = document.getElementById("dd") as HTMLElement;
      if (userMenu) {
        userMenu.addEventListener('click', function (e: any) {
  
          if (userDropdown == "closed") {
            userMenuBar.className = "wrapper-dropdown-3 active";
            userDropdown = "opened";
          }
          else {
            userMenuBar.className = "wrapper-dropdown-3";
            userDropdown = "closed";
          }
        });
      }
      window.addEventListener('click', function (e: any) {
        if (e.target.offsetParent != undefined && e.target.offsetParent.id != 'dd') {
          userMenuBar.className = "wrapper-dropdown-3";
          userDropdown = "closed";
        }
      });
  
      
  
  
      // ----Left side bar menu open and close action in mobile and tablet size------
      var leftSidebarToggle = document.getElementById("toggle_id") as HTMLElement;
      var leftSidebar = document.getElementById("floatLeft") as HTMLElement;
      if (leftSidebarToggle) {
        leftSidebarToggle.addEventListener('click', function () {
          if (sidebarToggle == "closed") {
            leftSidebar.style.display = "block";
            leftSidebar.style.transition = "";
            sidebarToggle = "opened";
          }
          else {
            leftSidebar.style.display = "none";
            sidebarToggle = "closed";
          }
        });
      }
    }
    function SignOut() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("token");
  }

    return (
        <nav className="top_menu">
            <a href="/home" className="logo_link">
                <img src={logo} className="topmenu-app-logo" alt="logo" />
                <img src={logotransparent} className="topmenu_logo_word" alt="logo" />
            </a>
            <div className="mr-auto-topmenu">
                <div className="gigx1">
                    <div className="gigx2">
                        <div className="gigx3">
                            <form className="inputForm" style={{ width: '100%', height: '85%' }}>
                                <input type="text" placeholder="Search on gignox" className="searchBox" />
                            </form>
                        </div>
                        <div className="gigx4">
                            <span><SearchOutlined className="gigx5" /></span>
                        </div>
                    </div>
                    <div className="profil_bar" id="profile_bar_id">

                        <div className="profil_content">
                            <div id="dd" className="wrapper-dropdown-3">
                                <div id="user-menu" style={{ textAlign: 'center' }}>
                                    <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', lineHeight: '2.7', display: 'inline-flex' }}>
                                        <span><img src="http://www.ilkerelektrik.com/public/img/avatar-large-1.png" alt="logo" width='45px' style={{ borderRadius: '50%' }} /></span>
                                        <span style={{ color: 'white', padding: '7px' }}>omer</span>
                                    </button>
                                </div>
                                <ul className="dropdown">
                                    <li><a href="profile" style={{ width: '100%' }}><PermIdentity /> <span>Profil</span></a></li>
                                    <li><a href="" style={{ width: '100%' }}><Settings /> <span>Ayarlar</span></a></li>
                                    <li><a href="/" onClick={SignOut} style={{ width: '100%' }}><ExitToApp /><span> Sign out</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="toggle_menu" id="toggle_id">
                <Menu />
            </div>
        </nav>
    );
}

