import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'

import { FormGroup, FormControl, Button, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/HighlightOffOutlined';


var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest } from '../../controllers/authentication_controller';
import { GeneralResponseModal } from 'src/modals/general_response_modal';
import { grpc } from '@improbable-eng/grpc-web';
import ValidationMessage from '../validation';
// import { DoGetIpAddressRequest } from '../../controllers/ipinfo_controller';

export const Authentication = () => {


  var [fade, setFade] = useState("signup");
  var userLogin = new UserLogin();
  var user = new User();
  // var ipinfo = sessionStorage.getItem("ipinfo") === null ? JSON.parse(JSON.stringify("")) : sessionStorage.getItem("ipinfo")
  // if (ipinfo === "") {
  //   DoGetIpAddressRequest();
  // }

  function login() {
    if (!userLogin.getUsername() && !userLogin.getPassword()) {
      let username = (document.getElementById("usernameLogin") as HTMLInputElement).value;
      let password = (document.getElementById("passwordLogin") as HTMLInputElement).value;
      if (username && password) {
        userLogin.setUsername(username);
        userLogin.setPassword(password);
        DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            sessionStorage.setItem("token", userLoginResponse_.getToken());
            sessionStorage.setItem("userName", userLoginResponse_.getUsername());
            localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
            sessionStorage.setItem("routingPage", "nav_menu");
            window.location.href = '/home'
          } else {
            console.log(generalResponseModalResponse_.GrpcResponseCode)
            console.log(generalResponseModalResponse_.GrpcResponseMessage)  
          }
        });
      } else {
        console.log("username and password can not be null")
      }


    } else {
      DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          sessionStorage.setItem("token", userLoginResponse_.getToken());
          sessionStorage.setItem("userName", userLoginResponse_.getUsername());
          localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
          sessionStorage.setItem("routingPage", "nav_menu");
          location.reload();
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
  }
  function handleEmailChangeForLogin(e: any) {
    userLogin.setUsername(e.target.value)
  }
  function handlePasswordChangeForLogin(e: any) {
    userLogin.setPassword(e.target.value)
  }
  function handleUsernameChangeForRegister(e: any) {
    if (e.target.value.length > 0) {

      var username_form = document.getElementById('username_form') as HTMLElement;
      var exist = document.getElementById('user_exist_done') as HTMLElement;
      var non_exist = document.getElementById('user_exist_cross') as HTMLElement;

      user.setUsername(e.target.value)
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
         
          username_form.style.border = '2px solid red'
          exist.style.display = 'none';
          non_exist.style.display = 'block';
 
        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")

          username_form.style.border = '2px solid green';
          exist.style.display = 'block';
          non_exist.style.display = 'none';
        }
      });
    }
    else {
      var username_form2 = document.getElementById('username_form') as HTMLElement;
      var exist_done = document.getElementById('user_exist_done') as HTMLElement;
      var non_exist_cross = document.getElementById('user_exist_cross') as HTMLElement;
      
      username_form2.style.border = ' 1px solid #ced4da';
      exist_done.style.display = 'none';
      non_exist_cross.style.display = 'none';
    }
  }

  function handleEmailChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      var email_form = document.getElementById('email_form') as HTMLElement;
      var exist = document.getElementById('email_exist_done') as HTMLElement;
      var non_exist = document.getElementById('email_exist_cross') as HTMLElement;

      user.setEmail(e.target.value)
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
          email_form.style.border = '2px solid red'
          exist.style.display = 'none';
          non_exist.style.display = 'block';


        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")
          email_form.style.border = '2px solid green'
          exist.style.display = 'block';
          non_exist.style.display = 'none';
        }
      });
    }
    else {
      var email_form2 = document.getElementById('email_form') as HTMLElement;
      var exist_done = document.getElementById('email_exist_done') as HTMLElement;
      var non_exist_cross = document.getElementById('email_exist_cross') as HTMLElement;
      email_form2.style.border = ' 1px solid #ced4da';
      exist_done.style.display = 'none';
      non_exist_cross.style.display = 'none';
    }
  }
  return (
    <div className="wrap">
      <section className="navSection Logos" >
        <div className="nav-wrapper">
          <Nav className="mr-auto">
            <IndexLinkContainer to="/" activeClassName="active">
              <a><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" /></a>
            </IndexLinkContainer>
          </Nav>
        </div>
      </section>
      <section className="mainSection">
        <section className="leftSection">
          <img src={logos} style={{ width: "100%" }} />
        </section>
        <section className="rightSection">
          <DropdownButton alignRight title="Language" id="dropdown-menu-align-right" variant="warning" style={{ marginRight: "2%", float: "right", marginTop: "1%" }}>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "en")}>En</Dropdown.Item>
            <Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "tr")}>Tr</Dropdown.Item>
          </DropdownButton>

          <div className="sign-in-up-container">
            <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}> {i18next.t("authentication_page_sign_up")}</a>|
          <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_sign_in")}</a>
          </div>
          <div className="Signup" style={{ display: fade === "signup" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label>{i18next.t("authentication_page_or")} <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>
              <FormGroup style={{display: 'flow-root'}}>
                <label style={{width: '100%'}}>{i18next.t("authentication_page_username")}</label>
                <FormControl autoFocus type="text" style={{width: '88%', float: 'left'}} onChange={handleUsernameChangeForRegister} id="username_form"/>
                <span style={{padding: '5px', display: 'none', width: '10%', float: 'left'}} id="user_exist_done"><Done style={{color: 'green', fontSize: '33px'}}/></span>
                <span style={{padding: '5px', display: 'none', width: '10%', float: 'left'}} id="user_exist_cross"><Cross style={{color: 'red', fontSize: '33px'}}/></span>
                <ValidationMessage color="red" value="KULLANCI ADI GEÇERSİZ"/>
              </FormGroup>
              <FormGroup style={{display: 'flow-root'}}>
                <label style={{width: '100%'}}>Email</label>
                <FormControl autoFocus type="email" style={{width: '88%', float: 'left'}} onChange={handleEmailChangeForRegister}  id="email_form"/>
                <span style={{padding: '5px', display: 'none', width: '10%', float: 'left'}} id="email_exist_done"><Done style={{color: 'green', fontSize: '33px'}}/></span>
                <span style={{padding: '5px', display: 'none', width: '10%', float: 'left'}} id="email_exist_cross"><Cross style={{color: 'red', fontSize: '33px'}}/></span>
                <ValidationMessage color="green" value="Geçersiz email"/>
              </FormGroup>
              <FormGroup style={{display: 'flow-root'}}>
                <label style={{width: '100%'}}>{i18next.t("authentication_page_password")}</label>
                <FormControl type="password"  style={{width: '88%', float: 'left'}}/>
                <ValidationMessage color="blue" value="Geçersiz Şifre"/>
              </FormGroup>
              {(() => {
                switch (lang) {
                  case 'en':
                    return <label>{i18next.t('authentication_page_terms_start')} {i18next.t('authentication_page_accept_terms')} <a className='signup-title'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title'>{i18next.t('authentication_page_privacy_policy')}</a></label>;
                  case 'tr':
                    return <label>{i18next.t('authentication_page_terms_start')} <a className='signup-title' >{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title' >{i18next.t('authentication_page_privacy_policy')} </a> {i18next.t('authentication_page_accept_terms')}</label>;
                  default:
                    return "null";
                }
              })()}
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" onClick={() => setFade("verification")} >
                {i18next.t("authentication_page_sign_up")}
              </Button>
            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none' }}>
            <form className="loginForm">  
              <FormGroup >
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <FormControl autoFocus type="email" id="usernameLogin" onChange={handleEmailChangeForLogin}/>
              </FormGroup>
              <FormGroup>
                <label>{i18next.t("authentication_page_password")}</label>
                <FormControl type="password" id="passwordLogin" onChange={handlePasswordChangeForLogin}/>
              </FormGroup>
              <Button onClick={login} style={{ width: '100%', backgroundColor: '#17a2b8' }} >
                {i18next.t("authentication_page_sign_in")}
              </Button>
              <div className="login-need-help"><a className="forgot-password-link" onClick={() => setFade("reset")}>
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>

          <div className="reset" style={{ display: fade === "reset" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_password_reset_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_password_reset_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_password_reset")}
              </Button>
            </form>
          </div>
          <div className="verification" style={{ display: fade === "verification" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_verification_code_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_verification_code_info")}<br /></label>
              <FormGroup>
                <label>Email</label>
                <FormControl autoFocus type="email" />
              </FormGroup>
              <Button style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_verificate_code")}
              </Button>
              <label className="cursor" style={{ marginTop: "2%" }}>{i18next.t("authentication_page_verificate_did_not_get")}</label>
            </form>
          </div>

        </section>
      </section>
      </div>    
  );
};
