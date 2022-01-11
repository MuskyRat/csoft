import React, {useEffect, useState} from "react";
import style from "./MainMenu.module.css";
import arrow from '../../../../../assets/MainMenu/arrow.svg';
import disc from '../../../../../assets/MainMenu/disc.svg';
import rocket from '../../../../../assets/MainMenu/rocket.svg';
import hand from '../../../../../assets/MainMenu/hand.svg';
import atom from '../../../../../assets/MainMenu/atom.svg';
import opticGlass from '../../../../../assets/MainMenu/opticGlass.svg';
import block from '../../../../../assets/MainMenu/block.svg';
import pencil from '../../../../../assets/MainMenu/pencil.svg';
import text from '../../../../../assets/MainMenu/text.svg';
import close from '../../../../../assets/MainMenu/close.svg';
import settings from '../../../../../assets/MainMenu/settings.svg';
import arrow2 from '../../../../../assets/MainMenu/MainMenuWindow/arrow.svg';
import rocket2 from '../../../../../assets/MainMenu/MainMenuWindow/rocket.svg';
import atom2 from '../../../../../assets/MainMenu/MainMenuWindow/atom.svg';
import classnames from "classnames";
import MainMenuWindow from "./MainMenuWindow";
import {subscribeIFtoMM} from "../../../Interface";
import {subscribeLMtoMM} from "../LeftMenu/LeftMenu";
import {subscribeRMtoMM} from "../RightMenu/RightMenu";

// Подписчик на функцию CloseHandler компоненты LeftMenu

let leftMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeMMtoLM = (callback: () => void) => {

    leftMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты RightMenu

let rightMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeMMtoRM = (callback: () => void) => {

    rightMenuCloseHandlerSubscriber = callback;

};

// Тип для аргумента menu функции setOpenHandler

export type MenuType = 'R' | 'A';

// Тип элемента массива с иконками для всплывающего окна меню

export type IconType = {icon: string, name: string};

// Массив с иконками

export const iconsArray2: Array<IconType> = [{icon: arrow2, name: 'Unselect'}, {icon: disc, name: 'Isolate'}, {icon: rocket2, name: 'Hide'},
    {icon: hand, name: 'Show all'}, {icon: atom2, name: 'Explode'}];

const MainMenu: React.FC = React.memo(() => {

    // Массив иконок главного меню

    const iconsArray: Array<string> = [arrow, disc, rocket, hand, atom, opticGlass, block, pencil, text, close, settings];

    // Массив иконок главного меню с правым бордером

    const iconsWIthBorder: Array<string> = [disc, rocket, block, close];

    // Массив иконок с всплывающим меню

    const iconsWithMenuWindow: Array<string> = [rocket, atom];

    // Локальный стейт для открытия / закрытия всплывающего окна меню иконки ракета

    const [openR, setOpenR] = useState(false);

    // Локальный стейт для открытия / закрытия всплывающего окна меню иконки атом

    const [openA, setOpenA] = useState(false);

    // Хук для предзагрузки иконок всплывающего окна меню

    useEffect(() => {

        iconsArray2.forEach((i) => {

            const img = new Image();

            img.src = i.icon;

            (window as any)[i.icon] = img;

        });

    });

    // Функция для изменения значения локального стейта open на противоположное (закрытие / открытие всплывающего окна меню)

    const setOpenHandler = (menu: MenuType) => {

        if(menu === 'R') setOpenR(!openR);
        if(menu === 'A') setOpenA(!openA);

    };

    // Обработчик события клик

    const clickHandler = (element: string) => (e: React.MouseEvent) => {

        leftMenuCloseHandlerSubscriber && leftMenuCloseHandlerSubscriber();
        rightMenuCloseHandlerSubscriber && rightMenuCloseHandlerSubscriber();

        if(element === rocket) {

            if(openA) setOpenHandler('A');
            setOpenHandler('R');
            e.preventDefault();

        }
        if(element === atom) {

            if(openR) setOpenHandler('R');
            setOpenHandler('A');
            e.preventDefault();

        }

    };

    // Функция для закрытия окна меню

    const closeHandler = () => {

        if(openR) setOpenR(!openR);
        if(openA) setOpenA(!openA);

    };

    // Подписка компоненты Interface на closeHandler

    subscribeIFtoMM(closeHandler);

    // Подписка компоненты LeftMenu на CloseHandler

    subscribeLMtoMM(closeHandler);

    // Подписка компоненты RightMenu на CloseHandler

    subscribeRMtoMM(closeHandler);

    // Мап массива iconsArray в массив с HTML элементами

    const iconsElements = iconsArray.map((icon, index) => {

        // Вспомогательная переменная для динамического определения стилей

        const className = classnames(style.iconContainer, {[style.firstIconContainer]: index === 0});

        // Вспомогательная переменная для динамического определения условия, имеет ли элемент правый бордер

        const iconWithBorder = iconsWIthBorder.includes(icon);

        // Вспомогательная переменная для динамического определение условия, имеет ли элемент всплывающее окно меню

        const iconWithMenuWindow = iconsWithMenuWindow.includes(icon);

        return (

            <div key={index}>
                {iconWithMenuWindow && iconWithBorder && <div className={style.iconContainerWrapper}>
                    <div className={className} onClick={clickHandler(icon)}>
                        <img src={icon} alt="icon" className={style.icon}/>
                    </div>
                    <div className={style.border}></div>
                </div>}
                {!iconWithMenuWindow && iconWithBorder && <div className={style.iconContainerWrapper}>
                    <div className={className}>
                        <img src={icon} alt="icon" className={style.icon}/>
                    </div>
                    <div className={style.border}></div>
                </div>}
                {iconWithMenuWindow && !iconWithBorder && <div className={style.iconContainerWrapper}>
                    <div className={className} onClick={clickHandler(icon)}>
                        <img src={icon} alt="icon" className={style.icon}/>
                    </div>
                </div>}
                {!iconWithMenuWindow && !iconWithBorder && <div className={style.iconContainerWrapper}>
                    <div className={className}>
                        <img src={icon} alt="icon" className={style.icon}/>
                    </div>
                </div>}
            </div>

        )

    });

    return (

        <div className={style.wrapperContainer}>
            <div className={style.wrapper}>
                {iconsElements}
            </div>
            {(openA || openR) && <MainMenuWindow setOpenHandler={setOpenHandler} iconsArray={iconsArray2} openA={openA} openR={openR} />}
        </div>

    )

});

export default MainMenu;