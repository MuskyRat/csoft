import React, {useEffect, useState} from "react";
import style from "./RightMenu.module.css";
import svg1 from '../../../../../assets/RightMenu/1.svg';
import svg2 from '../../../../../assets/RightMenu/2.svg';
import svg3 from '../../../../../assets/RightMenu/3.svg';
import svg4 from '../../../../../assets/RightMenu/4.svg';
import svg5 from '../../../../../assets/RightMenu/5.svg';
import svg6 from '../../../../../assets/RightMenu/6.svg';
import svg7 from '../../../../../assets/RightMenu/7.svg';
import svg8 from '../../../../../assets/RightMenu/8.svg';
import svg9 from '../../../../../assets/RightMenu/9.svg';
import svg10 from '../../../../../assets/RightMenu/10.svg';
import {subscribeIFtoRM} from "../../../Interface";
import {subscribeLMtoRM} from "../LeftMenu/LeftMenu";
import {subscribeMMtoRM} from "../MainMenu/MainMenu";
import {subscribeGFtoRM} from "../GraphicField/GraphicField";

// Подписчик на функцию CloseHandler компоненты LeftMenu

let leftMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeRMtoLM = (callback: () => void) => {

    leftMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты MainMenu

let mainMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeRMtoMM = (callback: () => void) => {

    mainMenuCloseHandlerSubscriber = callback;

};

// Тип для элемента массива иконок

type IconType = {icon: string}

const RightMenu: React.FC = React.memo(() => {

    // Локальный стейт для открытия / закрытия всплывающего окна меню

    const [open, setOpen] = useState(false);

    // Локальный стейт для хранения ссылки на SVG главной иконки

    const [mainIcon, setMainIcon] = useState<string>(svg1);

    // Массив с иконками

    const iconsArray: Array<IconType> = [{icon: svg1}, {icon: svg2}, {icon: svg3}, {icon: svg4}, {icon: svg5},
                                         {icon: svg6}, {icon: svg7}, {icon: svg8}, {icon: svg9}, {icon: svg10}];

    useEffect(() => {

        iconsArray.forEach((i) => {

            const img = new Image();

            img.src = i.icon;

            (window as any)[i.icon] = img;

        });

    });

    // Функция для изменения значения локального стейта open на противоположное (закрытие / открытие всплывающего окна меню)

    const setOpenHandler = () => {

        setOpen(!open);

    };

    // Обработчик события клик

    const clickHandler = (e: React.MouseEvent) => {

        leftMenuCloseHandlerSubscriber && leftMenuCloseHandlerSubscriber();
        mainMenuCloseHandlerSubscriber && mainMenuCloseHandlerSubscriber();

        setOpenHandler();
        e.preventDefault()

    };

    // Функция для закрытия окна меню

    const closeHandler = () => {

        if(open) setOpen(!open);

    };

    // Подписка компоненты Interface на closeHandler

    subscribeIFtoRM(closeHandler);

    // Подписка компоненты LeftMenu на CloseHandler

    subscribeLMtoRM(closeHandler);

    // Подписка компоненты MainMenu на функцию CloseHandler

    subscribeMMtoRM(closeHandler);

    // Подписка компоненты RightMenu на функцию CloseHandler

    subscribeGFtoRM(closeHandler);

    // Функция для установления локального стейта mainIcon в значение выбранной во всплавающем меню иконки, если выбранная иконка отлична от главной иконки

    const setMainIconHandler = (menuIcon: string) => {

        if(menuIcon !== mainIcon) setMainIcon(menuIcon);

    };

    return (

        <>
            <img src={mainIcon} alt="rightMenuIcon" className={style.rightMenuIcon} onClick={clickHandler} />
            {open && <RightMenuWindow setOpenHandler={setOpenHandler} setMainIconHandler={setMainIconHandler} iconsArray={iconsArray} />}
        </>

    )

});

export default RightMenu;

type PropsType = {

    setOpenHandler: () => void,

    setMainIconHandler: (icon: string) => void,

    iconsArray: Array<IconType>

};

const RightMenuWindow: React.FC<PropsType> = React.memo(({setOpenHandler, setMainIconHandler, iconsArray}) => {

    // Мап массива с иконками

    const iconsElements = iconsArray.map((i, index) => {

        // Обработчки события клик

        const clickHandler = (e: React.MouseEvent) => {

            setOpenHandler();
            setMainIconHandler(i.icon);
            e.preventDefault();

        };

        return (

            <div key={index} className={style.rightMenuItem} onClick={clickHandler}>
                    <img src={i.icon} alt='icon' className={style.icon}/>
            </div>

        )

    });

    return (

        <>
            <div className={style.triangle}></div>
            <div className={style.line}></div>
            <div className={style.rightMenuWindowWrapper}>
                {iconsElements}
            </div>
        </>

    )

});