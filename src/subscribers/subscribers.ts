// Подписчик на функцию CloseHandler компоненты LeftMenu

export let leftMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeToLM = (callback: () => void) => {

    leftMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты RightMenu

export let rightMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeToRM = (callback: () => void) => {

    rightMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseHandler компоненты MainMenu

export let mainMenuCloseHandlerSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeToMM = (callback: () => void) => {

    mainMenuCloseHandlerSubscriber = callback;

};

// Подписчик на функцию CloseContextMenu компоненты GraphicField

export let graphicFieldCloseContextMenuSubscriber: (() => void) | null = null;

// Функция для подписки

export const subscribeToGF = (callback: () => void) => {

    graphicFieldCloseContextMenuSubscriber = callback;

};