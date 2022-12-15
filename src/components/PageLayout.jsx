/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {React, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Note from './Note';
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

    const TENANTID = '71d929a5-af77-473e-bf1a-0d41e1affefe'

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

    const addInfo = () => {
    
      // console.log("holaaaaaaaaaaaa");
      // console.log('envios')
      // console.log("props.compra",props.compra)
      // console.log("props.compra2",props.compra2)
     
      // if(props.compra2.length>0){      
      //   fetch(
      //     "https://strnico2022n.blob.core.windows.net/input2/salida.json?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupyx&se=2022-12-12T20:49:50Z&st=2022-12-12T12:49:50Z&spr=https&sig=VP7bLk2D3p5lI6Oy9N9g2Ruad5dgw%2BL8cVCZSZGVgZM%3D",
      //     {
      //       method: "PUT",
      //       headers: {
      //         "x-ms-blob-type": "BlockBlob",
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(props.compra2),
      //     }
      //   )
      //     .then((response) => response.json())
      //     .then((response) => console.log(JSON.stringify(response)));
      //   props.setcompra2([])
      //   props.setcompra([])
      // }
      fetch("https://login.microsoftonline.com/" + TENANTID + "/oauth2/token", {
      method: 'POST',
      //mode: 'no-cors',
      body: 'grant_type=client_credentials&client_id=43c7e752-14dc-47a3-afae-932fcccd5a70&client_secret=sj08Q~INNS0jDmRWwYtmCJAtI1Rzmk9W0DE~mbdf&resource:https://management.azure.com/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '/',
      }
    }).then(function (resp) {

      // Return the response as JSON
      return resp.json();

    }).then(function (data) {

      // Log the API data
      console.log('Token: ', data);

    }).catch(function (err) {

      // Log any errors
      console.log('Error: ', err);

    });
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
                tu compra es:
                {(props.compra).map((note) => (
              <div>
                <Note key={note.id} note={note} />
              </div>
            ))}
                <br />
                <br />
                <div>
                </div>
                <br />

                <button
                  className="btn btn-primary"
                  onClick={addInfo}
                  
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
                    {isAuthenticated ? <button className=' btn btn-secondary' onClick={()=>{setModalCargarCateg(true);console.log(modalCargarCateg)}}>Cargar Productos</button> : <></>}
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                    {isAuthenticated ? <></> : <button title="Sign Ouddddddddddt" className=' btn btn-secondary' onClick={()=>togglePopup()}>tu compra</button>}
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
