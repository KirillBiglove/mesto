export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userInfo = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

getUserinfo() {
    this._userAbout = { name: this._userName.textContent, about: this._userInfo.textContent }
    return this._userAbout;
}

setUserInfo(inputs) {
    this._userName.textContent = inputs.name;
    this._userInfo.textContent = inputs.about;
}

setAvatar(avatar) {
    this._avatar.src = avatar;
    this._avatar.alt = this._userName.textContent;
}

}
