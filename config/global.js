const {BrowserWindow} = require("electron");
module.exports = {
    loadURL:(targetWindow,url,options)=>{
        let load_finished = false
        const loadingWindow = new BrowserWindow({
            show:false,
            width:600,
            height:400,
            center:true,
            resizable:false,
            minimizable:false,
            skipTaskbar:true,
            webPreferences:{
                webSecurity:false
            }
            // titleBarStyle:'hidden',
        })
        loadingWindow.on('close',(e)=>{
            if(!load_finished)
            targetWindow.loadFile('./view/system/fail.html')
        })
        loadingWindow.loadFile('./view/system/loading.html')
        loadingWindow.removeMenu()

        targetWindow.hide()
        loadingWindow.center()
        loadingWindow.show()

        targetWindow.loadURL(url,options).then(()=>{
            //define loading success action.
            targetWindow.center()
            targetWindow.show()
            load_finished = true
            loadingWindow.close()
        }).catch(()=>{
            //define loading fail action.
            targetWindow.loadFile('./view/system/fail.html')
            targetWindow.show()
            loadingWindow.close()
        })
    }
}
