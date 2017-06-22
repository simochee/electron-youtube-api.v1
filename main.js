const electron = require('electron');
// アプリケーションのライフサイクルを制御するモジュール
const app = electron.app;
// ネイティブブラウザウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;
// Main<->Renderのイベントエミッタ的なもの
// const ipc = electron.ipcMain;

const path = require('path');
const url = require('url');
const YAML = require('yamljs');

// 設定ファイルを読み込み
const config = YAML.load('config.yml');

// ウィンドウオブジェクトをグローバルに参照することによって
// ガベージコレクションが起こった際にウィンドウが自動で閉じられます
let mainWindow;

const createWindow = () => {
    // ブラウザウィンドウを作成
    mainWindow = new BrowserWindow(config.window);

    // index.htmlを読み込む
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'build', 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // 開発者ツールを開く
    mainWindow.webContents.openDevTools();

    // ウィンドウが閉じた時の処理
    mainWindow.on('closed', () => {
        // ウィンドウオブジェクトの参照を切ります
        // 複数のウィンドウを利用する場合には、
        // 配列にウィンドウを格納します。
        mainWindow = null;
    });
};

// readyイベントはエレクトロンの呼び出しと
// ブラウザウィンドウの準備ができたときに発火します
// 様々なAPIはこのイベントの後にのみ利用可能です
app.on('ready', createWindow);

// すべてのウィンドウがとじられた時、アプリを終了する
app.on('window-all-closed', () => {
    // OS Xでは、ユーザーがCmd+Qで明示的に終了するまで
    // アプリケーションとメニューバーはアクティブなままになります
    // if(process.platform !== 'darwin') { // 誤植？
    if(process.platform === 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // OS Xでは、ドックアイコンがクリックされ、他のウィンドウが
    // 開いていない時、アプリケーションのウィンドウを再作成するのが一般的です
    if(mainWindow === null) {
        createWindow();
    }
});
