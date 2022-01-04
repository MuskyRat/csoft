import React from "react";
import style from './ContextMenu.module.css';
import {IconType} from "./GraphicField";

type PropsType = {

    iconsArray: Array<IconType>,

    closeContextMenu: () => void,

    mouseX: number,

    mouseY: number,

    width: number,

    height: number

};

const ContextMenu: React.FC<PropsType> = React.memo(({iconsArray, closeContextMenu, mouseX, mouseY, width, height}) => {

    // Расстояние от верхнего края HTML элемента с рефом до верхнего края родительского элемента с css свойством position: relative

    const yOffset = 71;

    // Ширина контекстного меню

    const contextMenuWidth = 132;

    // Высота контекстного меню

    const contextMenuHeight = 134;

    // Расчет координаты левого верхнего угла контестного меню по оси X

    const currentX = ((width - mouseX) < contextMenuWidth) ? mouseX - (contextMenuWidth - (width - mouseX)) : mouseX;

    // Расчет координаты левого верхнего угла контестного меню по оси Y

    const currentY = ((height - mouseY) < contextMenuHeight) ? yOffset + mouseY - (contextMenuHeight - (height - mouseY)) : yOffset + mouseY;

    // Мап массива с иконками в массив с HTML элементами

    const iconsElements = iconsArray.map((i, index) => {

        // Обработчики события клик

        const clickHandler = () => {

            closeContextMenu();

        };

        return (

            <div key={index} className={style.contextMenuItem} onClick={clickHandler}>
                <div className={style.iconContainer}>
                    <img src={i.icon} alt='icon' className={style.icon}/>
                </div>
                <div className={style.iconName}>{i.name}</div>
            </div>

        )

    });

    return (

            <div className={style.wrapper} style={{top: `${currentY}px`, left: `${currentX}px`}}>
                {iconsElements}
            </div>

    )

});

export default ContextMenu;