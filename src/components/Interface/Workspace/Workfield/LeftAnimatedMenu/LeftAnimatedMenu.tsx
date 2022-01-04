import React, {useRef, useState} from "react";
import style from './LeftAnimatedMenu.module.css';
import arrow from '../../../../../assets/LeftMenu/LeftAnimatedMenu/arrow.svg';
import disc from '../../../../../assets/LeftMenu/LeftAnimatedMenu/disc.svg';
import rocket from '../../../../../assets/LeftMenu/LeftAnimatedMenu/rocket.svg';
import hand from '../../../../../assets/LeftMenu/LeftAnimatedMenu/hand.svg';
import atom from '../../../../../assets/LeftMenu/LeftAnimatedMenu/atom.svg';
import {motion} from 'framer-motion';
import {useEffect} from "react";
import {useAnimation} from "framer-motion";
import useMouse from '@react-hook/mouse-position';
import LeftAnimatedMenuWindow from "./LeftAnimatedMenuWindow";
import {iconsArray2} from "../MainMenu/MainMenu";
import {subscribeLM} from "../LeftMenu/LeftMenu";
import classnames from "classnames";

// Тип для элемента массива иконок

export type IconType = {icon: string, name: string};

// Подписчик

let subscriber: null | (() => void) = null;

// Функция для подписки

export const subscribeLAM = (callback: () => void) => {

    subscriber = callback;

};

const LeftAnimatedMenu: React.FC = React.memo(() => {

    // Массив иконок

    const iconsArray: Array<string> = [arrow, disc, rocket, hand, atom ];

    // Рефы для определения позиции указателя мыши

    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    const ref5 = useRef<HTMLDivElement>(null);

    // Массив рефов

    const refArray = [ref1, ref2, ref3, ref4, ref5];

    // Хуки для определения позиции указателя мыши

    const mouse1 = useMouse(ref1).isOver;
    const mouse2 = useMouse(ref2).isOver;
    const mouse3 = useMouse(ref3).isOver;
    const mouse4 = useMouse(ref4).isOver;
    const mouse5 = useMouse(ref5).isOver;

    // Хуки для анимации

    const animation1 = useAnimation();
    const animation2 = useAnimation();
    const animation3 = useAnimation();
    const animation4 = useAnimation();
    const animation5 = useAnimation();

    // Массив хуков для анимации

    const animationArray = [animation1, animation2, animation3, animation4, animation5];

    // Локальные стейты для открытия / закрытия окон меню

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    // Массив локальных стейтов

    const openArray = [open1, open2, open3, open4, open5];

    // Массив функций локальных стейтов

    const setOpenArray = [setOpen1, setOpen2, setOpen3, setOpen4, setOpen5];

    // Синхронизация анимации с положением указателя мыши

    useEffect(() => {
        if(mouse1) {animation1.start({x: '50px', transition: {type: "tween"}})}
        if(!mouse1 && !open1) {animation1.start({x: 0})}
    }, [mouse1, open1]);

    // Синхронизация анимации с положением указателя мыши

    useEffect(() => {
        if(mouse2) {animation2.start({x: '50px', transition: {type: "tween"}})}
        if(!mouse2 && !open2) {animation2.start({x: 0})}
    }, [mouse2, open2]);

    // Синхронизация анимации с положением указателя мыши

    useEffect(() => {
        if(mouse3) {animation3.start({x: '50px', transition: {type: "tween"}})}
        if(!mouse3 && !open3) {animation3.start({x: 0})}
    }, [mouse3, open3]);

    // Синхронизация анимации с положением указателя мыши

    useEffect(() => {
        if(mouse4) {animation4.start({x: '50px', transition: {type: "tween"}})}
        if(!mouse4 && !open4) {animation4.start({x: 0})}
    }, [mouse4, open4]);

    // Синхронизация анимации с положением указателя мыши

    useEffect(() => {
        if(mouse5) {animation5.start({x: '50px', transition: {type: "tween"}})}
        if(!mouse5 && !open5) {animation5.start({x: 0})}
    }, [mouse5, open5]);

    // Функция для открытия / закрытия окна меню

    const openCloseWindow = (index: number) => {

        setOpenArray[index](!openArray[index])

    };

    // Функция для поиска открытого окна меню и его закрытия

    const findAndClose = () => {

        openArray.forEach((e, index) => e && openCloseWindow(index));

    };

    // Закрыть LeftMenuWindow, если оно открыто

    const closeLeftMenu = () => {

        if(!openArray.includes(true) && subscriber) subscriber();

    };

    // Подписываем компоненту LeftMenu на функцию findAndClose

    subscribeLM(findAndClose);

    // Мап массива иконок в массив HTML элементов

    const iconsArrayElements = iconsArray.map((i, index) => {

        // Обработчик события клик

        const clickHandler = () => {

            // Закрыть LeftMenuWindow, если оно открыто

            closeLeftMenu();

            // Проверить, есть ли уже открытые меню, и если есть, то закрыть

            findAndClose();

            // Открыть / закрыть окно меню

            openCloseWindow(index);

        };

        // Вспомогательная переменная для динамического определения стилей

        const className = classnames(style.iconWrapper0, {[style.iconWrapper1]: index === 1, [style.iconWrapper2]: index === 2, [style.iconWrapper3]: index === 3, [style.iconWrapper4]: index === 4});

        return (

            <div key={index} className={className} ref={refArray[index]}>
                <motion.div className={style.iconContainer} animate={animationArray[index]} onClick={clickHandler}>
                    <img src={i} alt="icon" className={style.icon}/>
                </motion.div>
            </div>

        )

    });

    return (
        <>
            <div className={style.wrapper}>
                {iconsArrayElements}
            </div>
            {(open1 || open2 || open3 || open4 || open5) && <LeftAnimatedMenuWindow findAndClose={findAndClose} iconsArray={iconsArray2} openArray={openArray} />}
        </>

    )

});

export default LeftAnimatedMenu;