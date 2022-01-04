import React, {useEffect, useState} from "react";
import style from './Header.module.css';
import logo from '../../../assets/Header/Logo_main_and_product_page.svg';
import closeIcon from '../../../assets/Header/Vector2.svg'
import classnames from "classnames";
import circle from '../../../assets/Header/Ellipse.svg';
import man from '../../../assets/Header/User.svg';

const Header: React.FC = React.memo(() => {

    // Демо массив открытых документов

    const array: Array<string> = ['File Name.dwg', 'File Name 2.dwg', 'File Name 3.dwg'];

    // Локальный стейт для хранения массива открытых документов

    const [openDocuments, setOpenDocuments] = useState<Array<string>>(array);

    // Локальный стейт для хранения активного открытого документа

    const [activeDocumentName, setActiveDocumentName] = useState<string>(array[0]);

    // Синхронизация для установления нового активного открытого документа при удалении текущего активного открытого объекта из массива открытых объектов

    useEffect(() => {

        if(!openDocuments.includes(activeDocumentName)) setActiveDocumentName(openDocuments[0]);

    }, [openDocuments, activeDocumentName]);

    // Функция для удаления открытого документа из локального стейта для хранения открытых документов

    const deleteOpenDocument = (documentName: string) => {

        setOpenDocuments(openDocuments.filter((d) => d !== documentName));

    };

    // Массив открытых документов для отрисовки

    const openDocumentsElements = openDocuments.map((d) => <OpenDocument key={d} documentName={d} activeDocumentName={activeDocumentName}
                                                                         setActiveDocumentName={setActiveDocumentName}
                                                                         deleteOpenDocument={deleteOpenDocument}/>)

    return (

        <div className={style.wrapper}>
            <div className={style.documentsContainer}>
                <div className={style.logoContainer}>
                    <img src={logo} alt='logo' className={style.logo}/>
                </div>

                <div className={style.openDocuments}>
                    {openDocumentsElements}
                </div>
            </div>
            <div className={style.userPic}>
                <div className={style.userSvgContainer}>
                    <img src={circle} alt="circle" className={style.circleSvg}/>
                    <img className={style.man} src={man} alt="man"/>
                </div>
            </div>
        </div>

    )

});

export default Header;

type PropsType = {
    documentName: string,
    activeDocumentName: string,
    setActiveDocumentName: (name: string) => void,
    deleteOpenDocument: (documentName: string) => void
}

const OpenDocument: React.FC<PropsType> = React.memo(({documentName, activeDocumentName, setActiveDocumentName, deleteOpenDocument}) => {

    // Обработчик события клик на открытом документе

    const openDocumentClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {

        if(activeDocumentName !== documentName) setActiveDocumentName(documentName);

    };

    // Обработчик события клик на иконке закрытия открытого документа

    const closeIconClickHandler = () => {

        deleteOpenDocument(documentName);

    };

    // Вспомогательная переменная для динамического определения стилей

    const className = classnames(style.openDocument, {[style.active]: activeDocumentName === documentName})

    return (

        <div className={className} onClick={openDocumentClickHandler}>
            {documentName}
            <div className={style.closeIconContainer} onClick={closeIconClickHandler}>
                <img src={closeIcon} alt='closeIcon' className={style.closeIcon}/>
            </div>
        </div>

    )

});