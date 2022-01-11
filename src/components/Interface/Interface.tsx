import React from 'react';
import style from './Interface.module.css';
import Header from "./Header/Header";
import Workspace from "./Workspace/Workspace";
import {
    graphicFieldCloseContextMenuSubscriber,
    leftMenuCloseHandlerSubscriber,
    mainMenuCloseHandlerSubscriber,
    rightMenuCloseHandlerSubscriber
} from "../../subscribers/subscribers";

const Interface: React.FC = React.memo(() => {

    // Обработчик события клик

    const clickHandler = (e: React.MouseEvent) => {

        graphicFieldCloseContextMenuSubscriber && graphicFieldCloseContextMenuSubscriber();

        if(e.defaultPrevented) {

            return;

        } else {

            leftMenuCloseHandlerSubscriber && leftMenuCloseHandlerSubscriber();
            rightMenuCloseHandlerSubscriber && rightMenuCloseHandlerSubscriber();
            mainMenuCloseHandlerSubscriber && mainMenuCloseHandlerSubscriber();

        }

    };

    return (

        <div className={style.wrapper} onClick={clickHandler} >
            <Header />
            <Workspace />
        </div>

    )

});

export default Interface;