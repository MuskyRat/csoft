import React from "react";
import style from "./MainMenuWindow.module.css";
import classnames from "classnames";
import {IconType, MenuType} from "./MainMenu";

type PropsType = {

    setOpenHandler: (menu: MenuType) => void,

    iconsArray: Array<IconType>,

    openR: boolean,

    openA: boolean

};

const MainMenuWindow: React.FC<PropsType> = React.memo(({setOpenHandler, iconsArray, openR, openA}) => {

    // Мап массива с иконками в массив с HTML элементами

    const iconsElements = iconsArray.map((i, index) => {

        // Обработчики события клик

        const clickHandler = () => {

            if(openR) setOpenHandler("R");
            if(openA) setOpenHandler("A");

        };

        return (

            <div key={index} className={style.mainMenuWindowItem} onClick={clickHandler}>
                <div className={style.iconContainer2}>
                    <img src={i.icon} alt='icon' className={style.icon2}/>
                </div>
                <div className={style.iconName}>{i.name}</div>
            </div>

        )

    });

    // Вспомогательная переменная для динамического определения стилей

    const triangleClassName = classnames(style.triangleR, {[style.triangleA]: openA});

    // Вспомогательная переменная для динамического определения стилей

    const lineClassName = classnames(style.lineR, {[style.lineA]: openA});

    // Вспомогательная переменная для динамического определения стилей

    const mainMenuWindowWrapperClassName = classnames(style.mainMenuWindowWrapperR, {[style.mainMenuWindowWrapperA]: openA});

    return (

        <>
            <div className={triangleClassName}></div>
            <div className={lineClassName}></div>
            <div className={mainMenuWindowWrapperClassName}>
                {iconsElements}
            </div>
        </>

    )

});

export default MainMenuWindow;