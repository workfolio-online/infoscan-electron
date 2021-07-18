const {app, BrowserWindow} = require("electron"); // импорт electron
const path = require('path');


//создаем окно приложения
function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/index.html'); // интерфейс приложения
    win.webContents.openDevTools();
}


// запуск функции создания окна приложения
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function(){
        if(BrowserWindow.getAllWindows().length === 0)
        createWindow()
    })
})


//закрываем приложение когда все окна закрыты кроме macOS
app.on('window-all-closed', function(){
    if (process.platform !== 'darwin') 
        app.quit();
})