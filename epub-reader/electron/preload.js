const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openEpubDialog: () => ipcRenderer.invoke('open-epub-dialog'),
});
