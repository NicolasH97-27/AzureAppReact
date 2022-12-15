import React from "react";
import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "https://nicolash97-27.github.io/AzureAppReact",
                mainWindowRedirectUri: "https://nicolash97-27.github.io/AzureAppReact"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/https://nicolash97-27.github.io/AzureAppReact",
            });
        }
    }

    
    return (
        <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign Out">
            <Dropdown.Item as="button" onClick={() => handleLogout("popup")}>Sign out using Popup</Dropdown.Item>
            {/* <Dropdown.Item as="button" onClick={() => handleLogout("redirect")}>Sign out using Redirect</Dropdown.Item> */}
        </DropdownButton>
    )
}