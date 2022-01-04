import React from "react";
import style from "./LeftAnimatedMenuWindow.module.css";
import classnames from "classnames";
import {IconType} from "./LeftAnimatedMenu";

type PropsType = {

    findAndClose: () => void,

    iconsArray: Array<IconType>,

    openArray: Array<boolean>,

};

const LeftAnimatedMenuWindow: React.FC<PropsType> = React.memo(({findAndClose, iconsArray, openArray}) => {

    // Мап массива с иконками в массив с HTML элементами

    const iconsElements = iconsArray.map((i, index) => {

        // Обработчики события клик

        const clickHandler = () => {

            findAndClose();

        };

        return (

            <div key={index} className={style.leftAnimatedMenuWindowItem} onClick={clickHandler}>
                <div className={style.iconContainer}>
                    <img src={i.icon} alt='icon' className={style.icon}/>
                </div>
                <div className={style.iconName}>{i.name}</div>
            </div>

        )

    });

    // Вспомогательная переменная для динамического определения стилей

    const triangleClassName = classnames(style.triangle0, {[style.triangle1]: openArray[1], [style.triangle2]: openArray[2], [style.triangle3]: openArray[3], [style.triangle4]: openArray[4]});

    // Вспомогательная переменная для динамического определения стилей

    const lineClassName = classnames(style.line0, {[style.line1]: openArray[1], [style.line2]: openArray[2], [style.line3]: openArray[3], [style.line4]: openArray[4]});

    // Вспомогательная переменная для динамического определения стилей

    const leftAnimatedMenuWindowWrapperClassName = classnames(style.leftAnimatedMenuWindowWrapper0, {[style.leftAnimatedMenuWindowWrapper1]: openArray[1], [style.leftAnimatedMenuWindowWrapper2]: openArray[2],
        [style.leftAnimatedMenuWindowWrapper3]: openArray[3], [style.leftAnimatedMenuWindowWrapper4]: openArray[4]});

    return (

        <>
            <div className={triangleClassName}></div>
            <div className={lineClassName}></div>
            <div className={leftAnimatedMenuWindowWrapperClassName}>
                {iconsElements}
            </div>
        </>

    )

});

export default LeftAnimatedMenuWindow;