import React from "react";
import style from "./Workfield.module.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import MainMenu from "./MainMenu/MainMenu";
import RightMenu from "./RightMenu/RightMenu";
import GraphicField from "./GraphicField/GraphicField";
import LeftAnimatedMenu from "./LeftAnimatedMenu/LeftAnimatedMenu";

// Подписчик на функцию CloseHandler компоненты LeftMenu

let leftMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeWFtoLM = (callback: () => void) => {

    leftMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты RightMenu

let rightMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeWFtoRM = (callback: () => void) => {

    rightMenuCloseHandlerSubscriber = callback;

};

// Компонента рабочей области интерфейса

const Workfield: React.FC = React.memo(() => {

    // Обработчик события клик

    const clickHandler = (e: React.MouseEvent) => {

        if(e.defaultPrevented) {

            return;

        } else {

            leftMenuCloseHandlerSubscriber && leftMenuCloseHandlerSubscriber();

            rightMenuCloseHandlerSubscriber && rightMenuCloseHandlerSubscriber();

        }

    };

    return (

        <div className={style.workfieldWrapper} onClick={clickHandler}>
            <LeftMenu />
            <MainMenu />
            <LeftAnimatedMenu />
            <RightMenu />
            <GraphicField />
        </div>

    )

});

export default Workfield;