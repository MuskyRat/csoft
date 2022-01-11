import React from "react";
import style from "./Workfield.module.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import MainMenu from "./MainMenu/MainMenu";
import RightMenu from "./RightMenu/RightMenu";
import GraphicField from "./GraphicField/GraphicField";
import LeftAnimatedMenu from "./LeftAnimatedMenu/LeftAnimatedMenu";

const Workfield: React.FC = React.memo(() => {

    // Обработчик события правого клика мышью

    const rightMouseClickHandler = (e: React.MouseEvent) => {

        e.preventDefault();

    };

    return (

        <div className={style.workfieldWrapper} onContextMenu={rightMouseClickHandler}>
            <LeftMenu />
            <MainMenu />
            {/*<LeftAnimatedMenu />*/}
            <RightMenu />
            <GraphicField />
        </div>

    )

});

export default Workfield;