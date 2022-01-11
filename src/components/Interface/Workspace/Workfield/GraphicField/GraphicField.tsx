import React, {useEffect, useRef, useState} from "react";
import style from './GraphicField.module.css';
import Graphics from '../../../../../assets/Graphics/Grapics_1300.png'
import useMouse from "@react-hook/mouse-position";
import ContextMenu from "./ContextMenu";
import unselectIcon from '../../../../../assets/Graphics/ContextMenu/unselect.svg'
import isolateIcon from '../../../../../assets/Graphics/ContextMenu/isolate.svg'
import hideIcon from '../../../../../assets/Graphics/ContextMenu/hide.svg'
import showAllIcon from '../../../../../assets/Graphics/ContextMenu/show_all.svg'
import {subscribeIFtoGF} from "../../../Interface";

// Тип для элемента массива иконок

export type IconType = {icon: string, name: string};

const GraphicField: React.FC = React.memo(() => {

    // Массив иконок контекстного меню

    const iconsArray: Array<IconType> = [{icon: unselectIcon, name: 'Unselect'}, {icon: isolateIcon, name: 'Isolate'}, {icon: hideIcon, name: 'Hide'}, {icon: showAllIcon, name: 'Show all'}];

    // Хук для предзагрузки иконок контекстного меню

    useEffect(() => {

        iconsArray.forEach((i) => {

            const img = new Image();

            img.src = i.icon;

            (window as any)[i.icon] = img;

        });

    });

    // Локальный стейт определяющй статус окна контекстного меню (открыто / закрыто)

    const [open, setOpen] = useState(false);

    // Локальный стейт для хранения данных о X координате положения указателя мыши

    const [mouseX, setMouseX] = useState(100);

    // Локальный стейт для хранения информации о Y координате указателя мыши

    const [mouseY, setMouseY] = useState(100);

    // Локальный стейт для хранения информации о ширине HTML элемента с рефом

    const [width, setWidth] = useState(500);

    // Локальный стейт для хранения информации о высоте HTML элемента с рефом

    const [height, setHeight] = useState(500);

    // Реф для области отображения контекстного меню

    const anchorRef = useRef<HTMLDivElement>(null);

    // {x-координата внутри элемента с рефом, y-координата внутри элемента с рефом, высота элемента с рефом, ширина элемента с рефом}

    const {x, y, elementWidth, elementHeight} = useMouse(anchorRef);

    // Функция для закрытия контекстного меню

    const closeContextMenu = () => {

        if(open) setOpen(!open);

    };

    // Подписка компоненты Interface на функцию closeContextMenu

    subscribeIFtoGF(closeContextMenu);

    // Функция для отображения контекстного меню в заданной точке HTML элемента с рефом

    const showContextMenu = () => {

        // Закрыть контестное меню, если открыто на момент вызова функции

        closeContextMenu();

        // Сохранить в локальном стейте координаты курсора мыши внутри HTML элемента с рефом, полученные на момент вызова функции

        x && setMouseX(x);

        y && setMouseY(y);

        // Сохранить в локальном стейте размеры HTML элемента с рефом, полученные на момент вызова функции

        elementWidth && setWidth(elementWidth);

        elementHeight && setHeight(elementHeight);

        // Открыть контекстное меню

        setOpen(true);

    };

    // Обработчик события щелчка правой кнопкой мыши элемента div

    const rightMouseClickHandlerDiv = (e: React.MouseEvent<HTMLDivElement>) => {

        if(e.defaultPrevented) {

            e.preventDefault();

        } else {

            e.preventDefault();

            showContextMenu();

        }

    };

    // Обработчик события щелчка правой кнопкой мыши элемента img

    const rightMouseClickHandlerImg = (e: React.MouseEvent<HTMLImageElement>) => {

        e.preventDefault();

        showContextMenu();

    };

    return (

        <>
            <div className={style.wrapper} ref={anchorRef} onContextMenu={rightMouseClickHandlerDiv} >
                <img className={style.image} src={Graphics} alt="graphics" onContextMenu={rightMouseClickHandlerImg} />
            </div>
            {open && <ContextMenu iconsArray={iconsArray} closeContextMenu={closeContextMenu} mouseX={mouseX} mouseY={mouseY} width={width} height={height} />}
        </>

    )

});

export default GraphicField;