import React from "react";
import reactToWebComponent from "react-to-webcomponent";
import App from "./App";

// Преобразуем React-компонент в Web Component
const WebComp = reactToWebComponent(App, React, {} as any);

// Регистрируем под тегом <my-app>
customElements.define("PushLightStudio", WebComp);
