import Api from "../../services/api";
import { User } from "../Layout/TemplateResponsive";
import { useState, useEffect, useContext } from "react";

export default function GetLoggedAccount() {
    const api = new Api();
    const [user, setUser] = useContext(User);

        if (!user) {
        api.getUser().then(r => {
            console.log(r);
            setUser(r)
        }
        )
        .catch(e => {
            console.log(e);
        }
        );
    }
    return <></>
}