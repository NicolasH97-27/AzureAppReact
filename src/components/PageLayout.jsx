/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {React, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();
    const {modalCargarCateg,setModalCargarCateg} = props


    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = (e) => {
      setIsOpen(!isOpen);
      console.log('que onda')
    };

    const Popup = (props) => {
      return (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>
              x
            </span>
            {props.content}
          </div>
        </div>
      );
    };

    return (
        <>
            {isOpen && (
        <Popup
          content={
            <>
              <b>esta es tu compra</b>
              <p>
                <br />
                tu compra
                <br />
                <br />
                <div>
                </div>
                <br />

                <button
                  className="btn btn-primary"
                  onClick={console.log()}
                >
                comprar
                </button>
                
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Azure 
                </a>
                <div className="collapse navbar-collapse justify-content-end">
                    {isAuthenticated ? <button onClick={()=>{setModalCargarCateg(true);console.log(modalCargarCateg)}}>Cargar Productos</button> : <></>}
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                    {isAuthenticated ? <></> : <button title="Sign Ouddddddddddt" className='tucompra' onClick={()=>togglePopup()}></button>}
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </div>
                
            </Navbar>
            <br />
            <br />
            {props.children}
        </>
    );
};
