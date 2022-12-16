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

    const comprarProducto = () => {
    
     console.log("holaaaaaaaaaaaa");
      // console.log('envios')
      // console.log("props.compra",props.compra)
      // console.log("props.compra2",props.compra2)
     
      if(props.compra2.length>0){      
        fetch(
          
          "https://storagesiglog4.blob.core.windows.net/putfront/nuevasVentas/ventas.json?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupyx&se=2022-12-16T10:34:51Z&st=2022-12-16T02:34:51Z&spr=https&sig=Z2KpVrx86eNkALHV7vng1Voy8EfqbtdlsKVbNWlDCro%3D",
          {
            method: "PUT",
            headers: {
              "x-ms-blob-type": "BlockBlob",
            },
            body: JSON.stringify(props.compra2),
          }
        )
          .then((response) => response.json())
          .then((response) => console.log(JSON.stringify(response)));
        props.setcompra2([])
        props.setcompra([])
      }
    }
    // const subsID = '9cd6251c-8a67-432f-a673-0c45fb77031c' //de active directory
    // const adfName = 'adfPruebaAPI';
    // const pipeName = 'pipeline1';
    // const srcGrpName = 'resourcenico2022n';
    // const tokenP = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcxZDkyOWE1LWFmNzctNDczZS1iZjFhLTBkNDFlMWFmZmVmZS8iLCJpYXQiOjE2NzEwNzY1ODIsIm5iZiI6MTY3MTA3NjU4MiwiZXhwIjoxNjcxMDgwNDgyLCJhaW8iOiJFMlpnWU5BenlmdlRrWFYxeGRtckc5cG16bXFjQ1FBPSIsImFwcGlkIjoiNDNjN2U3NTItMTRkYy00N2EzLWFmYWUtOTMyZmNjY2Q1YTcwIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzFkOTI5YTUtYWY3Ny00NzNlLWJmMWEtMGQ0MWUxYWZmZWZlLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNmEyMmExMWQtNmViMC00YzFhLWExMzgtOGEzNzhjMTRkMjNmIiwicmgiOiIwLkFWa0FwU25aY1hldlBrZV9HZzFCNGFfLV9rWklmM2tBdXRkUHVrUGF3ZmoyTUJPZEFBQS4iLCJzdWIiOiI2YTIyYTExZC02ZWIwLTRjMWEtYTEzOC04YTM3OGMxNGQyM2YiLCJ0aWQiOiI3MWQ5MjlhNS1hZjc3LTQ3M2UtYmYxYS0wZDQxZTFhZmZlZmUiLCJ1dGkiOiJCUlYtZmloVzZFU2k5d1NrVy1GMkFBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjE2NjI0NzA3OTl9.RXfHm6hVdi5ZeGQ4e-6b-6gS59QykFTvEo14SB95qhurDaLR0I2qbwWxf3qeGewXRukMvcnAnusIrcWnbcXj0Ux0tUlvMwefrPQ-SGq7u1tXub87sb45cTg7sTMlgqMbNWmXvKtCOLs1kXHbfC8fLDNxQOKu0fzcpdMkZkk64-romiGBHbAngZ3KR6dju1ihsLNerrfVWZ-Jo07TpV1-8Xs7G00-o6CeBk0qfxo6Y8JGY0Yk-S5BaVSt-L6dBJrFPz969p8owqA3zpE1zq4aILupuSmcbv3ddy324DoGsxTy0nljVPGTB643cbdg0xju_ProC72fbJpaAJInU7twLQ.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcxZDkyOWE1LWFmNzctNDczZS1iZjFhLTBkNDFlMWFmZmVmZS8iLCJpYXQiOjE2NzEwNzI0NjUsIm5iZiI6MTY3MTA3MjQ2NSwiZXhwIjoxNjcxMDc2MzY1LCJhaW8iOiJFMlpnWUpoVGJaM0ZyL09wZk1LQzVHL0haancyQndBPSIsImFwcGlkIjoiNDNjN2U3NTItMTRkYy00N2EzLWFmYWUtOTMyZmNjY2Q1YTcwIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzFkOTI5YTUtYWY3Ny00NzNlLWJmMWEtMGQ0MWUxYWZmZWZlLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNmEyMmExMWQtNmViMC00YzFhLWExMzgtOGEzNzhjMTRkMjNmIiwicmgiOiIwLkFWa0FwU25aY1hldlBrZV9HZzFCNGFfLV9rWklmM2tBdXRkUHVrUGF3ZmoyTUJPZEFBQS4iLCJzdWIiOiI2YTIyYTExZC02ZWIwLTRjMWEtYTEzOC04YTM3OGMxNGQyM2YiLCJ0aWQiOiI3MWQ5MjlhNS1hZjc3LTQ3M2UtYmYxYS0wZDQxZTFhZmZlZmUiLCJ1dGkiOiJuQUxaVmlyZi1FbXZpYTdlaVpNc0FBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjE2NjI0NzA3OTl9.o1q8ziAyeBkWhopBpoeRFsOV9nPmr7z17GT2Cj0aToTE7awsT5YqVfYXJ4FvKupxp2ET0jYkZViaDRutLg0LopCztCw0sC5VaqBGMRyzyp1PPi5LQvvVCypQrMyUUJhD63xdNdoy5DVrTZuiFGhN7qJJ_tRTh18x_V6B1S35DVSPBaM4lSBMQ_OEL47M2b-d8IzbW008QtU6bn_qMbQJ5tKH4ghLqrsCi8a1HAmVbFjLw5-XHxzDxpDsszx0o51Dm4hJRrrodiqN3YKOlcA0eereE9NRBgyT1zd4cv8HqN_ZOgW2ApEZUeWsrcm4RxbxROIckW8IVWk0_vyOaNV10Q';
    
    // fetch("https://management.azure.com/subscriptions/"+subsID+"/resourceGroups/"+srcGrpName+"/providers/Microsoft.DataFactory/factories/"+adfName+"/pipelines/"+pipeName+"/createRun?api-version=2018-06-01", {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: 'grant_type=client_credentials&client_id=43c7e752-14dc-47a3-afae-932fcccd5a70&client_secret=sj08Q~INNS0jDmRWwYtmCJAtI1Rzmk9W0DE~mbdf&resource:https://management.azure.com/',
    //   headers: {
    //     'Authorization': 'Bearer : '+tokenP+'',
    //   }
    // }).then(function (resp) {

    //   Return the response as JSON
    //   return resp.json();

    // }).then(function (data) {

    //   Log the API data
    //   console.log('Pag.j/157 Token: ', data);

    // }).catch(function (err) {

    //   Log any errors
    //   console.log('Pag.j/162 Error: ', err);

    // });
    // };

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
                  onClick={comprarProducto}
                  
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
