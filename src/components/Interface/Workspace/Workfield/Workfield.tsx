import React from "react";
import style from "./Workfield.module.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import MainMenu from "./MainMenu/MainMenu";
import RightMenu from "./RightMenu/RightMenu";
import GraphicField from "./GraphicField/GraphicField";
import LeftAnimatedMenu from "./LeftAnimatedMenu/LeftAnimatedMenu";

// Компонента рабочей области интерфейса

const Workfield: React.FC = React.memo(() => {

    return (

        <div className={style.workfieldWrapper}>
            <LeftMenu />
            <MainMenu />
            <LeftAnimatedMenu />
            <RightMenu />
            <GraphicField />
        </div>

    )

});

export default Workfield;