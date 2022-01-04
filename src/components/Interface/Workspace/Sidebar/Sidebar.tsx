import React from "react";
import classnames from "classnames";
import style from "./Sidebar.module.css";
import mainBlockIcon from "../../../../assets/Workspace/Group 320.svg";

// Компонента сайдбара интрфейса

const Sidebar: React.FC = React.memo(() => {

    // Типы для удобства работы с массивом sidebarArray

    type SidebarBlockType = Array<Array<string | SidebarObjectType>>

    type SidebarObjectType = {name: string, value: string}

    // Массив для создания сайдбара

    const sidebarArray: SidebarBlockType = [[{name: 'Объекты', value: 'Объекты'}]
        , ['Общие', {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}]
        , ['3D-визуализация', {name: 'Объекты', value: 'Объекты'}], ['Стили', {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}]
        , ['Стиль печати', {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}]
        , ['Разное', {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}, {name: 'Объекты', value: 'Объекты'}]];

    // Мап массива sidebarArray для создания HTML элементов сайдбара

    const sidebarArrayElements = sidebarArray.map((e, i) => {

        // Индексная переменная для динамического определения стилей

        let index = 1;

        // Создание подмассива с HTML элементами структурной единицы сайдбара

        const subArrayElements = e.map((el, j) => {

            // Создание вспомогательной переменной для динамического определения стилей

            const className = classnames(style.blockItem, {[style.blockItemWhite]: index % 2 === 0})

            // Если элемент подмассива - строка

            if(typeof el === 'string') {

                return (

                    <div key={`${i}.${j}`} className={style.mainBlock}>
                        <div className={style.mainBlockName}>{el}</div>
                        <div className={style.mainBlockIconContainer}><img src={mainBlockIcon} alt="mainBlockIcon" className={style.mainBlockIcon}/></div>
                    </div>

                )

                // Если элемент подмассива - объект

            } else {

                index++;

                return (

                    <div key={`${i}.${j}`} className={className}>

                        <div className={style.blockItemName}>
                            {el.name}
                        </div>

                        <div className={style.blockItemValue}>
                            {el.value}
                        </div>

                    </div>

                )

            }

        });

        return (

            <div key={i} className={style.item}>

                { subArrayElements }

            </div>

        )

    });

    return (

        <div className={style.sidebarWrapper}>
            <div className={style.topField}>
                <div className={style.properties}>Properties</div>
                <div className={style.propertiesValue}>Draft</div>
            </div>
            <div className={style.fields}>
                {sidebarArrayElements}
            </div>
        </div>

    )

});

export default Sidebar;