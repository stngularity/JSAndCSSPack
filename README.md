# JS&CSS Pack
Набор стилей и скриптов для сайтов!
## Примеры
### Чекбоксы переключатели
```html
<input type="checkbox" id="check1" class="toggle">
<label for="check1">Обычный переключатель</label>

<input type="checkbox" id="check2" class="toggle colored">
<label for="check2">Цветной переключатель</label>

<input type="checkbox" id="check3" class="toggle" disabled>
<label for="check3">Выключеный переключатель</label>
```
![Checkboxs](https://cdn.discordapp.com/attachments/834490254031192116/960980245345861672/image.png)
### Кнопки
```html
<button class="btn">Обычная кнопка</button>
<button class="btn danger">Опасная(красная) кнопка</button>
<button class="btn success">Успешная(зелёная) кнопка</button>
<button class="btn main">Главная кнопка</button>
```
![Buttons](https://cdn.discordapp.com/attachments/834490254031192116/960980244947427348/image2.png)
### Инпуты
```html
<input type="text" class="input" placeholder="Текстовый инпут">
<input type="file" class="input">
<input type="text" class="input validation" required placeholder="Текстовое поле с валидатором">
<select class="select">
    <option value="1">Селект меню</option>
</select>
```
![Inputs](https://cdn.discordapp.com/attachments/834490254031192116/960981220659982336/unknown.png)
### Сообщения
```html
<script type="module">
    import {createToast} from "../js/main.js"

    document.getElementById("snow-toast").addEventListener("click", () => {
        createToast({
            position: "top-right", // top-left, top-center, top-right, bottom-left, bottom-center or bottom-right, default: top-left
            text: "Hello", // Toast text value
            autoClose: 2000, // Time before close toast, false - to not auto close, default: 1000
            canClose: true, // Closible?, default: true
            showProgress: true, // Snow progress?, default: true
            pauseOnHover: false, // Pause on toast hover, default: false
            pauseOnFocusLoss: false, // Pause focus loss, default: false,
            onClose: () => {console.log("Hello")} // Run after toast close, default: () => {}
        })
    })
</script>
```
![Toasts](https://cdn.discordapp.com/attachments/834490254031192116/960982129913774090/unknown.png)

## Установка
1. Заходим в вкалдку "Релизы"
2. Скачиваем последнюю стабильную версию(ну или бету)
3. Перекидываем папки **css**, **js** в папку сайта
4. Изменяем название файла по пути `css/themes/theme-template.css` на любое другое
5. Изменяем параметры в `css/themes/theme-template.css`
6. Используем
   - Примичание, сначал импортируйте тему, а потом уже `css/main.css`

## Примичания
1. Чтобы изменить скроубар - нужно добавить html-тегу класс new-scrollbar
## Цели
- [x] Сделать кастомный сайдбар
- [ ] Сделать кнопки
     * [x] Обычная, опасная(красная), успешная(зелёная), главная кнопки
     * [x] Скруглёные версии кнопок
     * [x] Поддержка картинок в кнопках
     * [ ] Кнопки "соц.сетей" и важных сайтов
- [x] Сообщения
- [x] Чекбоксы-переключатели(возможны баги длины такого чекбокса)
- [x] Кастомные инпуты(возможны изменения)
- [ ] Модальные окна
- [ ] Хеадеры(шапки)
- [ ] Футеры
---
**SyrGroup & TheStnularity © 2021-2022 Все права защищены**
