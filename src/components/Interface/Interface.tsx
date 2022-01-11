import React from 'react';
import style from './Interface.module.css';
import Header from "./Header/Header";
import Workspace from "./Workspace/Workspace";

// Подписчик на функцию CloseHandler компоненты LeftMenu

let leftMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeIFtoLM = (callback: () => void) => {

    leftMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты RightMenu

let rightMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeIFtoRM = (callback: () => void) => {

    rightMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseContextMenu компоненты GraphicField

let graphicFieldCloseContextMenuSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeIFtoGF = (callback: () => void) => {

    graphicFieldCloseContextMenuSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты MainMenu

let mainMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeIFtoMM = (callback: () => void) => {

    mainMenuCloseHandlerSubscriber = callback;

}

const Interface: React.FC = React.memo(() => {

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