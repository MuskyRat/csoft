import React from 'react';
import style from './Interface.module.css';
import Header from "./Header/Header";
import Workspace from "./Workspace/Workspace";

const Interface: React.FC = React.memo(() => {

    return (

        <div className={style.wrapper}>
            <Header />
            <Workspace />
        </div>

    )

});

export default Interface;