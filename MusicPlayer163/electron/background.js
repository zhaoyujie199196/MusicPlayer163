//从electron中导入app，浏览器窗口
import { app, BrowserWindow } from 'electron'
import Store from 'electron-store'
import {isMac, isCreateMpris, isLinux} from '../src/utils/platform.js'
import {registerGlobalShortcut} from "./globalShortcut.js";
// const path = require("path")
import clc from 'cli-color'

const log = text=> {
    // console.log(`${clc.blueBright('[background.js]')} ${text}`)
    console.log(`${text}`)
}

const localUrl = "http://localhost:5173/home/"

class Background {
    //Background的构造函数
    constructor() {
        //定义窗口
        this.window = null
        //定义本地化存储
        this.store = new Store( {
            windowWidth: {
                width: {type: 'number', default: 1440},
                height:{type: 'number', default: 840}
            }
        });
        //zhaoyujie TODO 这三个是干嘛的。。。
        this.neteasyMusicAPI = null
        this.expressApp = null
        this.willQuitApp = !isMac
        this.init()
    }

    init() {
        //打印信息
        // log('initializing')
        console.log('initializing')
        //确保是单例程序
        if (!app.requestSingleInstanceLock()) {
            console.log("requestSingleInstanceLock fail")
            return app.quit()
        }

        //处理app的事件
        this.handleAppEvents()
        //检测升级
        this.checkForUpdates()
        this.createMenu()

        // // create dock menu for macOS
        // const createdDockMenu = createDockMenu(this.window);
        // if (createDockMenu && app.dock) app.dock.setMenu(createdDockMenu);
        //
        // // create touch bar
        // const createdTouchBar = createTouchBar(this.window);
        // if (createdTouchBar) this.window.setTouchBar(createdTouchBar);
    }

    handleAppEvents() {
        app.on('ready', async()=>{
            log('app ready event')
            //创建窗体
            this.createWindow()
            this.window.once('ready-to-show', ()=>{
                this.window.show()
            });
            this.handleWindowEvents()

            if (this.store.get("settings.enableGlobalShortcut") !== false) {
                registerGlobalShortcut(this.window, this.store);
            }

            if (this.store.get("setting.enableOsdlyricsSupport")) {

            }
            if (isCreateMpris) {

            }
        })

        app.on('activate', ()=>{
            log('app activate event')
        })

        app.on('window-all-closed', ()=> {
            if (!isMac) {
                app.quit()
            }
        })

        app.on('before-quit', ()=> {
            this.willQuitApp = true
        })

        app.on('quit', ()=>{
            // this.expressApp.close()
            log("app on quit")
        })

        app.on('will-quit', ()=>{
            log("app on will-quit")
        })

        if (!isMac) {
            app.on('second-instance', (e, cl, wd)=>{
                log("app on second-instance")
            })
        }
    }

    createWindow() {
        log('creating app window')

        const appearance = this.store.get('settings.appearance')
        const options = {
            width: this.store.get('window.width') || 1440,
            height: this.store.get('window.height') || 840,
            minWidth: 1080,
            minHeight: 720,
            titleBarStyle:'hiddenInset',
            title:'MusicPlayer163',
            backgroundColor: '#222'
        }

        //闯将窗体
        this.window = new BrowserWindow(options)
        //隐藏menuBar(windows和linux生效)
        this.window.setMenuBarVisibility(false)
        //窗体加载url
        this.window.loadURL(localUrl)
    }

    //升级检测
    checkForUpdates() {

    }

    //创建菜单栏
    createMenu() {

    }

    handleWindowEvents() {
        //显示处理事件
        this.window.once('ready-to-show', ()=>{
            log("window ready-to-show event")
            this.window.show()
            this.store.set("window", this.window.getBounds())
        });

        //关闭处理事件
        this.window.on('close', e=>{
            log("window close event")
            if (isMac) {
                if (this.willQuitApp) {
                    this.window = null
                    app.quit()
                }
                else {
                    e.preventDefault()
                    this.window.hide()
                }
            }
            else if (isLinux) {

            }
            else {

            }
        });

        //resize处理事件
        this.window.on('resized', ()=>{
            this.store.set('window', this.window.getBounds())
        });

        this.window.on('moved', ()=>{
            this.store.set('window', this.window.getBounds())
        })

        this.window.on("maximize", ()=>{
            this.window.webContents.send('isMaximized', true)
        });
        this.window.on('unmaximize', ()=>{
            this.window.webContents.send('isMaximized', false)
        })

        this.window.webContents.on('new-window', function(e, url) {
            log('webContent : new-Window')
        })
    }

}

new Background();
