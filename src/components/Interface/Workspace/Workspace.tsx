import React from "react";
import style from './Workspace.module.css';
import Workfield from "./Workfield/Workfield";
import Sidebar from "./Sidebar/Sidebar";

const Workspace: React.FC = React.memo(() => {

    return (

        <div className={style.wrapper}>
            <Workfield />
            <Sidebar />
        </div>

    )

});

export default Workspace;

