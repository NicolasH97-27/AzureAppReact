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
                postLogoutRedirectUri: "/AzureAppReact/#code=0.AX0AqMjbJJo1_0Syj6uB87wdYccwkTIP_AZJhEi0yM-wTqSdABY.AgABAAIAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_DtJLnJoopk5xWl67qaeK-4Xkcs_AEd4qiE4FzemAoAmU0OtbXS_rdO79DWEQPjscTsXeVh-GOC1VRzb6unD74nAs1jPzeSrQ_lxeD3HIUzix4vxt_PS1Bj6wkgq_9Wc22O2C7vuhdNze3DU03MFulIFPIJG8o1FIi_GJRGEYiVwsWYWGlzBFD_vFFVoJkZIoL_zIP6zQDksuj26dS7IxDoVOKQiJTsXJMHyYIHnoAsD6Vw4WMRQb1cm9JasDg6FaNAlLVN4lcNaYhtyzjPTtTIHVXOXhNjkPb0FlqUoRXuWIsexKc3mObrx7b5KsekGMT_zg_1Ut-8kBxQeXykGcb7KH5k-QEBqyjzauiv_kXuk2Htv_dH6keyv_8JP3SAyeVLsKqv4GrLCMFLqVD8g1I1VO8p0TZ3LSGZ5di3KvnpR0S9P0OxzK5UbiGNQtpI1cNgQAFUCQklniCygqvFvPsrCOh5YhWxLBp7nDCRUGMPsSeXeEG8MjTqP-_EX9M6083JHvb34RgGMP7T16E1AusHTF--XH1WfmdzoGszgVFjYgsAqE4r53xiSWxPIiRC3gHyAjHSJxqmcxoJJd72Ie15CDD6ccqhBcAj6HI_Ct18NTc2t3kx4y9BOqHq5a-nScKViLGJddYJ6xEmTkkhJkVsKrH8KAwDTqU6q30Ly46Uhuurs4997A5OGO0mn-Vs7m9WRN7zgjuTas4g9BkRnTts7tnEcle4nJ5sV5pVRmne8mLezgmg4sV2CyFj6xbnPuv-tiNoYtUWhf2k0MsU7vfp9ywd6SWtBUHBXk9j1iw-She-k8DuU2SXto-wf1Wz0BJCdG-IJYU3aXkFwESPq0SDQKfIpErJihkI5i3QfQrHcf57xRuZOjlUVNUtW0vH3T1cydnqrp2GB-VBiMRLbRvoqII9glfpeqKGkawUPef_r7SdlzH3Sv9RkMdNo5J7RIl_R-MpXY43RHseBb3rksk8e8_Ez9blO2oPMasjCAud3PO1JpFcvFbrbby-Qr2RYaZxSl8gofuYDfpnXwWUuc84b93Rfr674UDCPh3JzWdM3WqeDjgqVn_FG7-EyARVHuuRK5lFj5PzsVhbU9J8EXLVbKfwOV63n3yAW-ROp7nrZbuz7Ry099WD1_CkLChg7mTYK2kKHNKh9_Qvui7m1TOEE0SR_rlGAsJdswQ0thPHOFXXE53kksGFwDZjkXFdQ22wuiSM3z5MbJkR_eRA4Boy29kNpgAGhTHCmPPPCNNitSgdjdwR5HfD62_buLK83eN0pw9Ub0h9_PCh4PtrxSaaH1X7VdQP9ceurBnIv1hHX2h1Kp3jeU0RpnILutyEz5fILCYUgU5peYOzFLaeUIRj1AITKdVOmR2nDha2vmk7YxzKe32JeaGjLt7d8nG-By_tTqXdhS5Jg&client_info=eyJ1aWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtZTkxNy1kMTFmNDczMWU3MmQiLCJ1dGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIn0&state=eyJpZCI6IjQ2ZDBkZTBkLTcxOTgtNDhjNy1hNTAyLWNmOGE2YzRhZDVkMSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&session_state=7282d079-6cf8-4fbe-ad76-75257c073457",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
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