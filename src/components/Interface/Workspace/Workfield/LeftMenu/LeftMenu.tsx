import React, {useEffect, useState} from "react";
import style from "./LeftMenu.module.css";
import wireframe2D from '../../../../../assets/LeftMenu/2d_wireframe.svg';
import wireframe3D from '../../../../../assets/LeftMenu/3d_wireframe.svg';
import conceptual from '../../../../../assets/LeftMenu/conceptual.svg';
import hiddenLine from '../../../../../assets/LeftMenu/hidden_line.svg';
import shaded from '../../../../../assets/LeftMenu/shaded.svg';
import shadedWithEdges from '../../../../../assets/LeftMenu/shaded-with-edges.svg';
import sketchy from '../../../../../assets/LeftMenu/sketchy.svg';
import xRay from '../../../../../assets/LeftMenu/x_ray.svg';
import {subscribeLAM} from "../LeftAnimatedMenu/LeftAnimatedMenu";
import {subscribeWFtoLM} from "../Workfield";

// Тип для элемента массива иконок

type IconType = {icon: string, name: string}

// Подписчик

let subscriber: null | (() => void) = null;

// Функция для подписки

export const subscribeLM = (callback: () => void) => {

    subscriber = callback;

};

const LeftMenu: React.FC = React.memo(() => {

    // Локальный стейт для открытия / закрытия всплывающего окна меню

    const [open, setOpen] = useState(false);

    // Локальный стейт для хранения ссылки на SVG главной иконки

    const [mainIcon, setMainIcon] = useState<string>(wireframe2D);

    // Массив с иконками

    const iconsArray: Array<IconType> = [{icon: wireframe2D, name: '2D wireframe'},
                                         {icon: wireframe3D, name: '3D Wireframe'},
                                         {icon: hiddenLine, name: 'Hidden line'},
                                         {icon: sketchy, name: 'Sketchy'},
                                         {icon: shaded, name: 'Shaded'},
                                         {icon: shadedWithEdges, name: 'Shaded with edges'},
                                         {icon: xRay, name: 'X-Ray'},
                                         {icon: conceptual, name: 'Conceptual'}];

    useEffect(() => {

        iconsArray.forEach((i) => {

            const img = new Image();

            img.src = i.icon;

            (window as any)[i.name] = img;

        });

    });

    // Функция для изменения значения локального стейта open на противоположное (закрытие / открытие всплывающего окна меню) и закрытия LeftAnimatedMenuWindow, если оно открыто

    const setOpenHandler = () => {

        if(!open && subscriber) subscriber();
        setOpen(!open);

    };

    // Обрботчик события клик

    const clickHandler = (e: React.MouseEvent) => {

        setOpenHandler();
        e.preventDefault();

    };

    // Функция для закрытия окна меню

    const closeHandler = () => {

        if(open) setOpen(!open);

    };

    // Подписка компоненты Workfield на локальный стейт и closeHandler

    subscribeWFtoLM(open, closeHandler);

    // Подписка компоненты LeftAnimatedMenu на функцию closeHandler

    subscribeLAM(closeHandler);

    // Функция для установления локального стейта mainIcon в значение выбранной во всплавающем меню иконки, если выбранная иконка отлична от главной иконки

    const setMainIconHandler = (menuIcon: string) => {

        if(menuIcon !== mainIcon) setMainIcon(menuIcon);

    };

    return (

        <>
            <img src={mainIcon} alt="leftMenuIcon" className={style.leftMenuIcon} onClick={clickHandler} />
            {open && <LeftMenuWindow setOpenHandler={setOpenHandler} setMainIconHandler={setMainIconHandler} iconsArray={iconsArray} />}
        </>

    )

});

export default LeftMenu;

type PropsType = {

    setOpenHandler: () => void,

    setMainIconHandler: (icon: string) => void,

    iconsArray: Array<IconType>

};

const LeftMenuWindow: React.FC<PropsType> = React.memo(({setOpenHandler, setMainIconHandler, iconsArray}) => {

    // Мап массива с иконками

    const iconsElements = iconsArray.map((i) => {

        // Обработчки события клик

        const clickHandler = (e: React.MouseEvent) => {

            setOpenHandler();
            setMainIconHandler(i.icon);
            e.preventDefault();

        };

        return (

            <div key={i.name} className={style.leftMenuItem} onClick={clickHandler}>
                <div className={style.iconContainer}>
                    <img src={i.icon} alt='icon' className={style.icon}/>
                </div>
                <div className={style.iconName}>{i.name}</div>
            </div>

        )

    });

    return (

        <>
            <div className={style.triangle}></div>
            <div className={style.line}></div>
            <div className={style.leftMenuWindowWrapper}>
                {iconsElements}
            </div>
        </>

    )

});