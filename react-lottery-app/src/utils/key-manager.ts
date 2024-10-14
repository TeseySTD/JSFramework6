
export class KeyManager {
    private static _keysPressed: { [key: string]: boolean } = {};
    public static Init(){
        this.checkKeyEvent();
        this.searchEvent();
    }

    private static checkKeyEvent() {
        document.addEventListener('keydown', (e) => {
            this._keysPressed[e.key ] =  true;
        })
        document.addEventListener('keyup', (e) => {
            delete this._keysPressed[e.key];
        });
    }
    private static searchEvent = () => {
        document.addEventListener('keydown', (e) => {
            if(e.key === '/' && this._keysPressed['Control']) {
                document.getElementById('search-user-bar')?.focus();
            }
        })
    }
}